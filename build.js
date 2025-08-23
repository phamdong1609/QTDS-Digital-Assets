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
        
        // Trích xuất tất cả các đường dẫn từ thẻ <include>
        const includePaths = [];
        const includeRegex = /<include src="([^"]+)"/g;
        let match;
        includeRegex.lastIndex = 0; 
        while ((match = includeRegex.exec(htmlContent)) !== null) {
            includePaths.push(match[1]);
        }

        // === 1. TỔNG HỢP CSS ===
        console.log(`   - Đang tổng hợp các file CSS...`);
        const cssContents = [];
        const themeFileName = templateFile.replace('-index.html', '-theme.css');
        const themePath = path.join(rootDir, 'core', 'styles', themeFileName);
        
        // Thêm file theme chung trước
        if (fs.existsSync(themePath)) {
            cssContents.push(fs.readFileSync(themePath, 'utf8'));
        }

        // Thêm CSS của từng section/component
        includePaths.forEach(includePath => {
            const cssPath = path.join(rootDir, includePath.replace('.html', '.css'));
            if (fs.existsSync(cssPath)) {
                cssContents.push(fs.readFileSync(cssPath, 'utf8'));
            }
        });
        const finalCss = cssContents.join('\n\n');
        console.log(`   ✅ Đã tổng hợp xong CSS.`);

        // === 2. TỔNG HỢP JAVASCRIPT (LOGIC ĐÃ SỬA) ===
        console.log(`   - Đang tổng hợp các file JS...`);
        const jsContents = [];
        const initFileName = templateFile.replace('-index.html', '-init.js');
        const initPath = path.join(rootDir, 'core', 'scripts', initFileName);

        // Bước 1: Luôn thu thập JS từ các component/section lẻ trước để định nghĩa hàm
        console.log(`   -> Thu thập JS từ các component...`);
        includePaths.forEach(includePath => {
            const jsPath = path.join(rootDir, includePath.replace('.html', '.js'));
            if (fs.existsSync(jsPath)) {
                let content = fs.readFileSync(jsPath, 'utf8');
                 // Xóa các dòng import/export để tránh lỗi cú pháp khi gộp file
                content = content.replace(/^(import|export).*/gm, '');
                jsContents.push(content);
            }
        });

        // Bước 2: Nếu có file init, thêm nó vào CUỐI CÙNG để gọi các hàm đã được định nghĩa
        if (fs.existsSync(initPath)) {
            console.log(`   -> Đã tìm thấy file init chính: ${initFileName}. Sẽ thêm vào cuối.`);
            let initContent = fs.readFileSync(initPath, 'utf8');
            // Xóa các dòng import/export khỏi file init
            initContent = initContent.replace(/^(import|export).*/gm, '');
            jsContents.push(initContent);
        }
        
        const finalJs = jsContents.join(';\n\n');
        console.log(`   ✅ Đã tổng hợp xong JS.`);


        // === 3. LẮP RÁP HTML ===
        console.log(`   - Đang lắp ráp và đóng gói HTML...`);
        
        // Chèn CSS và JS vào các vị trí giữ chỗ
        let intermediateHtml = htmlContent
            .replace('<!-- INJECT_CSS_PLACEHOLDER -->', `<style>\n${finalCss}\n</style>`)
            .replace('<!-- INJECT_JS_PLACEHOLDER -->', `<script>\n${finalJs}\n</script>`);

        // Xử lý các thẻ <include> để gộp nội dung HTML
        const result = await posthtml([include({ root: rootDir })]).process(intermediateHtml);
        
        const finalHtml = result.html;

        // Ghi file kết quả ra thư mục /dist
        fs.writeFileSync(destPath, finalHtml);
        console.log(`   ✅ Đã tạo file hoàn chỉnh: ${outputHtmlName}`);

        return { status: 'fulfilled', file: templateFile };

    } catch (error) {
        console.error(`❌ Lỗi khi xử lý file ${templateFile}:`, error.message);
        return { status: 'rejected', file: templateFile, reason: error.message };
    }
}

/**
 * Hàm chính, điều phối toàn bộ quá trình build.
 */
async function buildAllPages() {
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT TỰ ĐỘNG ---');
    try {
        // Tạo thư mục /dist nếu chưa có
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        // Tìm tất cả các file template cần build
        const templateFiles = fs.readdirSync(templatesDir).filter(file =>
            file.endsWith('-index.html')
        );

        if (templateFiles.length === 0) {
            console.log('Không tìm thấy file template nào trong thư mục /template.');
            return;
        }

        // Chạy build cho tất cả các file song song
        const results = await Promise.all(templateFiles.map(buildSinglePage));

        // Báo cáo kết quả
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

// Bắt đầu chạy "nhà máy"
buildAllPages();
