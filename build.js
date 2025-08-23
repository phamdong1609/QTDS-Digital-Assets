// Import các module cần thiết của Node.js
const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const include = require('posthtml-include');

// Định nghĩa các đường dẫn quan trọng
const templatesDir = path.join(__dirname, 'template');
const distDir = path.join(__dirname, 'dist');
const rootDir = __dirname; // Thư mục gốc của dự án

/**
 * Hàm lắp ráp một file HTML duy nhất, bao gồm cả CSS và JS.
 * @param {string} templateFile - Tên file template (ví dụ: 'ct9-index.html')
 */
async function buildSinglePage(templateFile) {
    const sourcePath = path.join(templatesDir, templateFile);
    const outputHtmlName = templateFile.replace('-index.html', '-dist.html');
    const destPath = path.join(distDir, outputHtmlName);

    console.log(`\n--- Bắt đầu xử lý: ${templateFile} ---`);
    try {
        const htmlContent = fs.readFileSync(sourcePath, 'utf8');
        
        const includePaths = [];
        const includeRegex = /<include src="([^"]+)"/g;
        let match;
        // Reset lastIndex trước mỗi lần thực thi mới
        includeRegex.lastIndex = 0; 
        while ((match = includeRegex.exec(htmlContent)) !== null) {
            includePaths.push(match[1]);
        }

        // === 1. TỔNG HỢP CSS ===
        console.log(`   - Đang tổng hợp các file CSS...`);
        const cssContents = [];
        const themeFileName = templateFile.replace('-index.html', '-theme.css');
        const themePath = path.join(rootDir, 'core', 'styles', themeFileName);
        
        if (fs.existsSync(themePath)) {
            cssContents.push(fs.readFileSync(themePath, 'utf8'));
        }

        includePaths.forEach(includePath => {
            const cssPath = path.join(rootDir, includePath.replace('.html', '.css'));
            if (fs.existsSync(cssPath)) {
                cssContents.push(fs.readFileSync(cssPath, 'utf8'));
            }
        });
        const finalCss = cssContents.join('\n\n');
        console.log(`   ✅ Đã tổng hợp xong CSS.`);

        // === 2. TỔNG HỢP JAVASCRIPT (ĐÃ SỬA LỖI TRÙNG LẶP) ===
        console.log(`   - Đang tổng hợp các file JS...`);
        const jsContents = [];
        const initFileName = templateFile.replace('-index.html', '-init.js');
        const initPath = path.join(rootDir, 'core', 'scripts', initFileName);

        // Ưu tiên file init. Nếu có, chỉ dùng nó.
        if (fs.existsSync(initPath)) {
            console.log(`   -> Đã tìm thấy file init chính: ${initFileName}. Sẽ chỉ sử dụng file này.`);
            jsContents.push(fs.readFileSync(initPath, 'utf8'));
        } else {
            // Nếu không có file init, mới đi thu thập từ các component lẻ
            console.log(`   -> Không tìm thấy file init. Sẽ thu thập JS từ các component...`);
            includePaths.forEach(includePath => {
                const jsPath = path.join(rootDir, includePath.replace('.html', '.js'));
                if (fs.existsSync(jsPath)) {
                    jsContents.push(fs.readFileSync(jsPath, 'utf8'));
                }
            });
        }
        const finalJs = jsContents.join(';\n\n');
        console.log(`   ✅ Đã tổng hợp xong JS.`);


        // === 3. LẮP RÁP HTML (QUY TRÌNH MỚI ĐẢM BẢO THỨ TỰ) ===
        console.log(`   - Đang lắp ráp và đóng gói HTML...`);
        
        // Bước 3.1: Chèn CSS và JS vào file template GỐC trước
        let intermediateHtml = htmlContent
            .replace('', `<style>\n${finalCss}\n</style>`)
            .replace('', `<script>\n${finalJs}\n</script>`);

        // Bước 3.2: Bây giờ mới dùng posthtml để xử lý các thẻ <include> trên file đã được chèn
        const result = await posthtml([include({ root: rootDir })]).process(intermediateHtml);
        
        const finalHtml = result.html;

        fs.writeFileSync(destPath, finalHtml);
        console.log(`   ✅ Đã tạo file hoàn chỉnh: ${outputHtmlName}`);

        return { status: 'fulfilled', file: templateFile };

    } catch (error) {
        console.error(`❌ Lỗi khi xử lý file ${templateFile}:`, error.message);
        return { status: 'rejected', file: templateFile, reason: error.message };
    }
}

/**
 * Hàm chính, "quản đốc nhà máy".
 */
async function buildAllPages() {
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT TỰ ĐỘNG ---');
    try {
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        const templateFiles = fs.readdirSync(templatesDir).filter(file =>
            file.endsWith('-index.html')
        );

        if (templateFiles.length === 0) {
            console.log('Không tìm thấy file template nào trong thư mục /template.');
            return;
        }

        const results = await Promise.all(templateFiles.map(buildSinglePage));

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        console.log('\n--- BÁO CÁO KẾT QUẢ ---');
        console.log(`Thành công: ${successCount}/${results.length}`);
        if (successCount < results.length) {
            console.log(`Thất bại: ${results.length - successCount}/${results.length}`);
        }
        console.log('🎉 Quá trình build đã hoàn tất! 🎉');

    } catch (error) {
        console.error('❌ Đã xảy ra lỗi nghiêm trọng trong nhà máy:', error);
    }
}

buildAllPages();
