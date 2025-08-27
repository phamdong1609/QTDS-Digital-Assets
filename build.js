// build.js (Version 3.0 - Now with Expressions!)

const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const include = require('posthtml-include');
// --- BƯỚC NÂNG CẤP 1: Import công cụ mới ---
const expressions = require('posthtml-expressions');

// --- KHAI BÁO CÁC ĐƯỜNG DẪN CỐT LÕI (Không đổi) ---
const rootDir = __dirname;
const templatesDir = path.join(rootDir, 'template');
const distDir = path.join(rootDir, 'dist');
const libraryDir = path.join(rootDir, 'library');
const coreDir = path.join(rootDir, 'core');

// --- CÁC HÀM HIỆN TẠI (Không đổi) ---
function getIncludedComponents(htmlContent) {
    console.log('   - Đang phân tích bản thiết kế để tìm linh kiện...');
    // Cập nhật Regex để bắt cả các thẻ include có thuộc tính locals
    const includeRegex = /<include src="([^"]+)"/g;
    const components = [];
    let match;
    while ((match = includeRegex.exec(htmlContent)) !== null) {
        components.push(match[1]);
    }
    console.log(`   ✅ Đã tìm thấy ${components.length} linh kiện cần lắp ráp.`);
    return components;
}

async function buildSinglePage(templateFile) {
    const hubName = path.basename(templateFile, '-index.html');
    const sourcePath = path.join(templatesDir, templateFile);
    const destPath = path.join(distDir, `${hubName}-dist.html`);

    console.log(`\n--- Bắt đầu xử lý đơn hàng: ${hubName} ---`);
    try {
        let htmlContent = fs.readFileSync(sourcePath, 'utf8');
        
        const requiredComponents = getIncludedComponents(htmlContent);

        // === 1. TỔNG HỢP CSS THÔNG MINH (Không đổi) ===
        console.log('   - Đang tổng hợp CSS theo đơn hàng...');
        const cssContents = [];
        const themePath = path.join(coreDir, 'styles', 'theme.css');
        if (fs.existsSync(themePath)) {
            cssContents.push(fs.readFileSync(themePath, 'utf8'));
        }
        requiredComponents.forEach(componentPath => {
            const cssPath = path.join(rootDir, componentPath.replace('.html', '.css'));
            if (fs.existsSync(cssPath)) {
                cssContents.push(fs.readFileSync(cssPath, 'utf8'));
            }
        });
        const finalCss = cssContents.join('\n\n');
        console.log('   ✅ Đã tổng hợp CSS thành công.');

        // === 2. ĐÓNG GÓI JAVASCRIPT THÔNG MINH (Không đổi) ===
        console.log(`   - Đang đóng gói JS theo đơn hàng cho ${hubName}...`);
        const jsContents = [];
        requiredComponents.forEach(componentPath => {
            const jsPath = path.join(rootDir, componentPath.replace('.html', '.js'));
            if (fs.existsSync(jsPath)) {
                jsContents.push(fs.readFileSync(jsPath, 'utf8'));
            }
        });
        const initPath = path.join(coreDir, 'scripts', `${hubName}-init.js`);
        if (fs.existsSync(initPath)) {
            jsContents.push(fs.readFileSync(initPath, 'utf8'));
        }
        const finalJs = jsContents.join('\n\n');
        console.log('   ✅ Đã đóng gói JS thành công.');
        
        // === 3. LẮP RÁP HTML (Nâng cấp) ===
        console.log('   - Đang lắp ráp và đóng gói HTML...');
        
        // --- BƯỚC NÂNG CẤP 2: Sử dụng pipeline mới với expressions ---
        const result = await posthtml([
            include({ root: rootDir, encoding: 'utf8' }),
            expressions({ locals: {} }) // Thêm expressions vào pipeline
        ]).process(htmlContent);

        // Thay thế các placeholder CSS và JS sau khi đã xử lý include
        let finalHtml = result.html
            .replace('<!-- INJECT_CSS_PLACEHOLDER -->', `<style>\n${finalCss}\n</style>`)
            .replace('<!-- INJECT_JS_PLACEHOLDER -->', `<script>\n${finalJs}\n</script>`);

        fs.writeFileSync(destPath, finalHtml);
        console.log(`   🎉 Đã tạo file hoàn chỉnh: ${path.basename(destPath)}`);

    } catch (error) {
        console.error(`❌ Lỗi khi xử lý file ${templateFile}:`, error);
    }
}

async function buildAll() {
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT PHIÊN BẢN 3.0 ---');
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
