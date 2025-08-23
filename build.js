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

        // === 2. ĐÓNG GÓI JAVASCRIPT MODULES (LOGIC NÂNG CẤP) ===
        console.log(`   - Đang đóng gói các module JS...`);
        const initFileName = templateFile.replace('-index.html', '-init.js');
        const initPath = path.join(rootDir, 'core', 'scripts', initFileName);
        
        let finalJs = '';
        if (fs.existsSync(initPath)) {
            const initContent = fs.readFileSync(initPath, 'utf8');
            const importRegex = /import\s*{[^}]*}\s*from\s*['"](.+\.js)['"];/g;
            
            let bundledComponentJs = '';
            let mainScriptContent = initContent;

            let importMatch;
            importRegex.lastIndex = 0;
            while ((importMatch = importRegex.exec(initContent)) !== null) {
                const moduleRelativePath = importMatch[1];
                const moduleFullPath = path.resolve(path.dirname(initPath), moduleRelativePath);
                
                if (fs.existsSync(moduleFullPath)) {
                    console.log(`     -> Đang đọc module: ${path.basename(moduleFullPath)}`);
                    let componentContent = fs.readFileSync(moduleFullPath, 'utf8');
                    // Xóa từ khóa 'export' để biến nó thành hàm thông thường, an toàn hơn
                    componentContent = componentContent.replace(/export\s+function/g, 'function');
                    bundledComponentJs += componentContent + '\n\n';
                } else {
                    console.warn(`     -> ⚠️ Cảnh báo: Không tìm thấy module tại: ${moduleFullPath}`);
                }
            }
            
            // Xóa tất cả các dòng import khỏi file init
            mainScriptContent = mainScriptContent.replace(importRegex, '');

            // Nối các module đã được xử lý vào trước, sau đó đến file init
            finalJs = bundledComponentJs + mainScriptContent;
            console.log(`   ✅ Đã đóng gói xong JS.`);
        } else {
            console.log(`   -> Không tìm thấy file init cho ${templateFile}. Bỏ qua JS.`);
        }

        // === 3. LẮP RÁP HTML ===
        console.log(`   - Đang lắp ráp và đóng gói HTML...`);
        
        let intermediateHtml = htmlContent
            .replace('<!-- INJECT_CSS_PLACEHOLDER -->', `<style>\n${finalCss}\n</style>`)
            .replace('<!-- INJECT_JS_PLACEHOLDER -->', `<script>\n${finalJs}\n</script>`);

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
