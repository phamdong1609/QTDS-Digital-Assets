const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const include = require('posthtml-include');

// --- KHAI BÁO CÁC ĐƯỜNG DẪN CỐT LÕI ---
const rootDir = __dirname;
const templatesDir = path.join(rootDir, 'template');
const distDir = path.join(rootDir, 'dist');
const libraryDir = path.join(rootDir, 'library');
const coreDir = path.join(rootDir, 'core');

/**
 * ===================================================================================
 * HÀM MỚI: Quét file HTML để tìm tất cả các linh kiện được <include>
 * Đây là bộ não mới của robot, giúp nó biết chính xác cần lấy những linh kiện nào.
 * ===================================================================================
 * @param {string} htmlContent - Nội dung của file template (ví dụ: ct9-index.html)
 * @returns {string[]} Một mảng chứa các đường dẫn đến file HTML của linh kiện.
 */
function getIncludedComponents(htmlContent) {
    console.log('   - Đang phân tích bản thiết kế để tìm linh kiện...');
    const includeRegex = /<include src="([^"]+)"/g;
    const components = [];
    let match;
    while ((match = includeRegex.exec(htmlContent)) !== null) {
        components.push(match[1]);
    }
    console.log(`   ✅ Đã tìm thấy ${components.length} linh kiện cần lắp ráp.`);
    return components;
}


/**
 * ===================================================================================
 * HÀM CHÍNH: Lắp ráp một trang hoàn chỉnh
 * Hàm này đã được nâng cấp để chỉ lấy CSS và JS của các linh kiện cần thiết.
 * ===================================================================================
 * @param {string} templateFile - Tên của file bản thiết kế (ví dụ: 'ct9-index.html')
 */
async function buildSinglePage(templateFile) {
    const hubName = path.basename(templateFile, '-index.html'); // => "ct8", "ct9"
    const sourcePath = path.join(templatesDir, templateFile);
    const destPath = path.join(distDir, `${hubName}-dist.html`);

    console.log(`\n--- Bắt đầu xử lý đơn hàng: ${hubName} ---`);
    try {
        const htmlContent = fs.readFileSync(sourcePath, 'utf8');
        
        // BƯỚC MỚI: Lấy danh sách các linh kiện cần dùng từ file template
        const requiredComponents = getIncludedComponents(htmlContent);

        // === 1. TỔNG HỢP CSS THÔNG MINH ===
        console.log('   - Đang tổng hợp CSS theo đơn hàng...');
        const cssContents = [];

        // 1.1 Luôn nạp theme.css lõi
        const themePath = path.join(coreDir, 'styles', 'theme.css');
        if (fs.existsSync(themePath)) {
            cssContents.push(fs.readFileSync(themePath, 'utf8'));
        }

        // 1.2 Chỉ nạp CSS của các linh kiện được yêu cầu
        requiredComponents.forEach(componentPath => {
            const cssPath = path.join(rootDir, componentPath.replace('.html', '.css'));
            if (fs.existsSync(cssPath)) {
                cssContents.push(fs.readFileSync(cssPath, 'utf8'));
            }
        });
        
        const finalCss = cssContents.join('\n\n');
        console.log('   ✅ Đã tổng hợp CSS thành công.');

        // === 2. ĐÓNG GÓI JAVASCRIPT THÔNG MINH (GIẢI QUYẾT LỖI IMPORT) ===
        console.log(`   - Đang đóng gói JS theo đơn hàng cho ${hubName}...`);
        const jsContents = [];

        // 2.1 Chỉ nạp JS của các linh kiện được yêu cầu
        requiredComponents.forEach(componentPath => {
            const jsPath = path.join(rootDir, componentPath.replace('.html', '.js'));
            if (fs.existsSync(jsPath)) {
                // Xóa bỏ dòng 'export' để biến nó thành script thường
                const jsModuleContent = fs.readFileSync(jsPath, 'utf8');
                const jsScriptContent = jsModuleContent.replace(/export function/g, 'function');
                jsContents.push(jsScriptContent);
            }
        });

        // 2.2 Nạp file init chuyên dụng cho hub này (nếu có)
        const initPath = path.join(coreDir, 'scripts', `${hubName}-init.js`);
        if (fs.existsSync(initPath)) {
            const initContent = fs.readFileSync(initPath, 'utf8');
            // Xóa bỏ các dòng 'import' vì chúng ta đã gộp file thủ công
            const cleanInitContent = initContent.replace(/import .*\n/g, '');
            jsContents.push(cleanInitContent);
            console.log(`   ✅ Đã nạp và xử lý ${hubName}-init.js`);
        } else {
            console.log(`   -> Không tìm thấy file init cho ${hubName}.`);
        }
        
        const finalJs = jsContents.join('\n\n');
        console.log('   ✅ Đã đóng gói JS thành công.');
        
        // === 3. LẮP RÁP HTML ===
        console.log('   - Đang lắp ráp và đóng gói HTML...');
        let intermediateHtml = htmlContent
            .replace('<!-- INJECT_CSS_PLACEHOLDER -->', `<style>\n${finalCss}\n</style>`)
            .replace('<!-- INJECT_JS_PLACEHOLDER -->', `<script>\n${finalJs}\n</script>`);

        // Sử dụng posthtml-include để ghép các file HTML linh kiện vào
        const result = await posthtml([include({ root: rootDir })]).process(intermediateHtml);
        fs.writeFileSync(destPath, result.html);
        console.log(`   🎉 Đã tạo file hoàn chỉnh: ${path.basename(destPath)}`);

    } catch (error) {
        console.error(`❌ Lỗi khi xử lý file ${templateFile}:`, error);
    }
}

/**
 * ===================================================================================
 * HÀM KHỞI ĐỘNG: Chạy toàn bộ quy trình
 * ===================================================================================
 */
async function buildAll() {
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT PHIÊN BẢN 2.0 ---');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    // Tự động tìm tất cả các file bản thiết kế trong thư mục template
    const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('-index.html'));
    
    for (const file of templateFiles) {
        await buildSinglePage(file);
    }
    
    console.log('\n--- BÁO CÁO: Quá trình build đã hoàn tất! ---');
}

// Chạy "nhà máy"
buildAll();
