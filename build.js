const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const include = require('posthtml-include');

const rootDir = __dirname;
const templatesDir = path.join(rootDir, 'template');
const distDir = path.join(rootDir, 'dist');
const libraryDir = path.join(rootDir, 'library');
const coreDir = path.join(rootDir, 'core');

/**
 * Hàm quét đệ quy để tìm tất cả các file CSS trong thư mục library
 * @returns {string[]} Một mảng chứa nội dung của tất cả các file CSS
 */
function getAllLibraryCss() {
    console.log('   - Quét toàn bộ kho linh kiện CSS...');
    const cssContents = [];
    const readFilesRecursively = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                readFilesRecursively(fullPath);
            } else if (path.extname(file) === '.css') {
                cssContents.push(fs.readFileSync(fullPath, 'utf8'));
            }
        });
    };
    readFilesRecursively(libraryDir);
    console.log(`   ✅ Đã tìm thấy và nạp ${cssContents.length} file CSS từ library.`);
    return cssContents;
}

// Tối ưu: Chỉ quét library một lần và lưu kết quả
const allLibraryCssContents = getAllLibraryCss();

async function buildSinglePage(templateFile) {
    const hubName = path.basename(templateFile, '-index.html'); // => "ct8", "ct9"
    const sourcePath = path.join(templatesDir, templateFile);
    const destPath = path.join(distDir, `${hubName}-dist.html`);

    console.log(`\n--- Bắt đầu xử lý: ${hubName} ---`);
    try {
        const htmlContent = fs.readFileSync(sourcePath, 'utf8');

        // === 1. TỔNG HỢP CSS THÔNG MINH ===
        const cssContents = [];

        // 1.1 Nạp theme.css lõi
        const themePath = path.join(coreDir, 'styles', 'theme.css');
        if (fs.existsSync(themePath)) {
            cssContents.push(fs.readFileSync(themePath, 'utf8'));
        }

        // 1.2 Nạp TẤT CẢ CSS từ kho library
        cssContents.push(...allLibraryCssContents);
        
        const finalCss = cssContents.join('\n\n');
        console.log('   ✅ Đã tổng hợp CSS thành công.');

        // === 2. ĐÓNG GÓI JAVASCRIPT ===
        console.log(`   - Tìm và đóng gói JS cho ${hubName}...`);
        const initPath = path.join(coreDir, 'scripts', `${hubName}-init.js`);
        let finalJs = '';

        if (fs.existsSync(initPath)) {
            finalJs = fs.readFileSync(initPath, 'utf8');
             console.log(`   ✅ Đã nạp ${hubName}-init.js`);
        } else {
            console.log(`   -> Không tìm thấy file init cho ${hubName}. Bỏ qua JS.`);
        }
        
        // === 3. LẮP RÁP HTML ===
        console.log('   - Đang lắp ráp và đóng gói HTML...');
        let intermediateHtml = htmlContent
            .replace('<!-- INJECT_CSS_PLACEHOLDER -->', `<style>\n${finalCss}\n</style>`)
            .replace('<!-- INJECT_JS_PLACEHOLDER -->', `<script>\n${finalJs}\n</script>`);

        const result = await posthtml([include({ root: rootDir })]).process(intermediateHtml);
        fs.writeFileSync(destPath, result.html);
        console.log(`   🎉 Đã tạo file hoàn chỉnh: ${path.basename(destPath)}`);

    } catch (error) {
        console.error(`❌ Lỗi khi xử lý file ${templateFile}:`, error);
    }
}

async function buildAll() {
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT TỰ ĐỘNG ---');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('-index.html'));
    
    for (const file of templateFiles) {
        await buildSinglePage(file);
    }
    
    console.log('\n--- BÁO CÁO: Quá trình build đã hoàn tất! ---');
}

buildAll();