// architect.js (Version 1.0 - "Kỹ sư trưởng")
// Nhiệm vụ: Đọc file JSON blueprint và tự động tạo ra file HTML template.

const fs = require('fs');
const path = require('path');

// --- CÁC ĐƯỜNG DẪN CỐ ĐỊNH ---
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const templatesDir = path.join(rootDir, 'template');

/**
 * Hàm chính để chạy kịch bản
 */
function runArchitect() {
    console.log('--- KHỞI ĐỘNG KỸ SƯ TRƯỞNG (ARCHITECT V1.0) ---');

    // 1. Lấy đường dẫn file JSON từ tham số dòng lệnh
    const args = process.argv.slice(2);
    const srcArg = args.find(arg => arg.startsWith('--src='));

    if (!srcArg) {
        console.error('❌ Lỗi: Vui lòng cung cấp đường dẫn file blueprint. Ví dụ: npm run architect -- --src=data/ct11.json');
        return;
    }

    const blueprintPath = path.join(rootDir, srcArg.split('=')[1]);

    if (!fs.existsSync(blueprintPath)) {
        console.error(`❌ Lỗi: Không tìm thấy file blueprint tại: ${blueprintPath}`);
        return;
    }

    console.log(`✅ Đã nhận bản thiết kế từ: ${path.basename(blueprintPath)}`);

    // 2. Đọc và phân tích file JSON
    try {
        const blueprintContent = fs.readFileSync(blueprintPath, 'utf8');
        const blueprint = JSON.parse(blueprintContent).landing_page_blueprint;

        if (!blueprint || !blueprint.content_hub_id || !blueprint.sections) {
            console.error('❌ Lỗi: File JSON không hợp lệ hoặc thiếu các trường bắt buộc (content_hub_id, sections).');
            return;
        }

        // 3. Tạo nội dung cho file HTML Template
        const templateHTML = generateTemplate(blueprint);

        // 4. Ghi file HTML Template
        const hubName = blueprint.content_hub_id.toLowerCase(); // vd: ct11
        const templateFileName = `${hubName}-index.html`; // vd: ct11-index.html
        const templateFilePath = path.join(templatesDir, templateFileName);

        fs.writeFileSync(templateFilePath, templateHTML);

        console.log(`🎉 Thành công! Đã tạo bản vẽ kỹ thuật tại: ${path.relative(rootDir, templateFilePath)}`);
        console.log(`\n👉 Bước tiếp theo: Chạy 'npm run build' để lắp ráp thành phẩm.`);

    } catch (error) {
        console.error('❌ Đã xảy ra lỗi trong quá trình xử lý:', error);
    }
}

/**
 * Tạo ra nội dung HTML cho file template từ blueprint
 * @param {object} blueprint - Đối tượng JSON đã được phân tích
 * @returns {string} - Chuỗi HTML hoàn chỉnh cho file template
 */
function generateTemplate(blueprint) {
    const { page_title, sections } = blueprint;

    // Tạo các dòng <include> từ mảng sections
    const includeTags = sections.map(section => {
        // Chuyển đổi đối tượng locals thành chuỗi JSON để nhúng vào thuộc tính
        // Quan trọng: Phải dùng JSON.stringify để giữ đúng cấu trúc
        const localsString = JSON.stringify(section.locals);
        return `        <include src="${section.component_path}" locals='${localsString}'></include>`;
    }).join('\n\n');

    // Đây là khuôn mẫu HTML chung cho mọi landing page
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Phần Head chung -->
    <include src="library/01_atoms/partials/head-includes.html"></include>

    <title>${page_title}</title>
    
    <!-- Vị trí chờ để Robot nhúng toàn bộ CSS vào đây -->
    <!-- INJECT_CSS_PLACEHOLDER -->
</head>
<body>
    <main>
${includeTags}
    </main>

    <!-- Vị trí chờ để Robot nhúng toàn bộ JS vào đây -->
    <!-- INJECT_JS_PLACEHOLDER -->
</body>
</html>`;
}

// Chạy kịch bản
runArchitect();
