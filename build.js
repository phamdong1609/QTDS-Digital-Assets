// Import các module cần thiết của Node.js
const fs = require('fs'); // Module để làm việc với hệ thống file
const path = require('path'); // Module để làm việc với đường dẫn file
const fileinclude = require('gulp-file-include'); // Module chính để lắp ráp file
const { pipeline } = require('stream/promises'); // Module mới để xử lý stream an toàn và hiện đại

// Định nghĩa các đường dẫn quan trọng
const templatesDir = path.join(__dirname, 'template'); // Thư mục chứa các "bản vẽ"
const distDir = path.join(__dirname, 'dist'); // Thư mục chứa "sản phẩm hoàn thiện"
const libraryDir = path.join(__dirname, 'library'); // Thư mục chứa "thư viện linh kiện"

/**
 * Hàm lắp ráp một file HTML duy nhất.
 * Đây là một "công nhân" chuyên biệt, nhận một bản vẽ và lắp ráp nó.
 * @param {string} sourcePath - Đường dẫn đến file "bản vẽ" (ví dụ: template/ct8-index.html)
 * @param {string} destPath - Đường dẫn đến file "sản phẩm" (ví dụ: dist/ct8-dist.html)
 */
async function buildSingleFile(sourcePath, destPath) {
    console.log(`Bắt đầu xử lý: ${path.basename(sourcePath)}`);
    try {
        // Sử dụng pipeline để đảm bảo "dây chuyền lắp ráp" chạy đúng thứ tự và an toàn
        // 1. Đọc "bản vẽ"
        // 2. Lắp ráp các linh kiện
        // 3. Ghi ra sản phẩm hoàn thiện
        await pipeline(
            fs.createReadStream(sourcePath),
            fileinclude({
                prefix: '@@',
                basepath: libraryDir, // Cho phép @@include tìm file từ thư mục /library
                context: {}
            }),
            fs.createWriteStream(destPath)
        );
        console.log(`✅ Đã lắp ráp thành công: ${path.basename(destPath)}`);
        return { status: 'fulfilled', file: path.basename(sourcePath) };
    } catch (error) {
        // Nếu có lỗi, báo cáo chính xác file nào bị lỗi và không làm sập toàn bộ nhà máy
        console.error(`❌ Lỗi khi xử lý file ${path.basename(sourcePath)}:`, error.message);
        return { status: 'rejected', file: path.basename(sourcePath), reason: error.message };
    }
}

/**
 * Hàm chính, đóng vai trò "quản đốc nhà máy".
 * Quản đốc sẽ tìm tất cả các bản vẽ và giao việc cho từng "công nhân".
 */
async function buildAllPages() {
    console.log('--- Bắt đầu quá trình build tự động ---');
    try {
        // --- Bước 1: Đảm bảo thư mục /dist tồn tại ---
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
            console.log('Đã tạo thư mục /dist.');
        }

        // --- Bước 2: Đọc tất cả các "bản vẽ" từ thư mục /templates ---
        const templateFiles = fs.readdirSync(templatesDir).filter(file =>
            file.endsWith('.html') && !fs.statSync(path.join(templatesDir, file)).isDirectory()
        );

        if (templateFiles.length === 0) {
            console.log('Không tìm thấy file template nào trong thư mục /template.');
            return;
        }
        console.log(`\nĐã tìm thấy ${templateFiles.length} file template để xử lý.`);

        // --- Bước 3: Giao việc cho các "công nhân" xử lý song song ---
        const buildPromises = templateFiles.map(file => {
            const sourcePath = path.join(templatesDir, file);
            // Tạo tên file đầu ra, ví dụ: ct8-index.html -> ct8-dist.html
            const outputFileName = file.replace('-index.html', '-dist.html');
            const destPath = path.join(distDir, outputFileName);
            return buildSingleFile(sourcePath, destPath);
        });

        // Chờ tất cả các công nhân hoàn thành công việc
        const results = await Promise.all(buildPromises);

        // --- Bước 4: Báo cáo kết quả cuối cùng ---
        const successCount = results.filter(r => r.status === 'fulfilled').length;
        const failureCount = results.length - successCount;

        console.log('\n--- Báo cáo kết quả ---');
        console.log(`Thành công: ${successCount}/${results.length}`);
        if (failureCount > 0) {
            console.log(`Thất bại: ${failureCount}/${results.length}`);
        }
        console.log('🎉 Quá trình build đã hoàn tất! 🎉');

    } catch (error) {
        console.error('❌ Đã xảy ra lỗi nghiêm trọng trong nhà máy:', error);
    }
}

// Khởi động "nhà máy"
buildAllPages();
