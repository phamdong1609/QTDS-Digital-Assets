// Import các module cần thiết của Node.js
const fs = require('fs'); // Module để làm việc với hệ thống file
const path = require('path'); // Module để làm việc với đường dẫn file
const fileinclude = require('gulp-file-include'); // Module chính để lắp ráp file

// Định nghĩa các đường dẫn quan trọng
const templatesDir = path.join(__dirname, 'template'); // Thư mục chứa các "bản vẽ"
const distDir = path.join(__dirname, 'dist'); // Thư mục chứa "sản phẩm hoàn thiện"
const libraryDir = path.join(__dirname, 'library'); // Thư mục chứa "thư viện linh kiện"

// Hàm chính để thực hiện việc lắp ráp
async function buildPages() {
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

        console.log(`Đã tìm thấy ${templateFiles.length} file template:`, templateFiles);

        // --- Bước 3: Lắp ráp từng "bản vẽ" ---
        for (const file of templateFiles) {
            const sourcePath = path.join(templatesDir, file);
            
            // Tạo tên file đầu ra, ví dụ: ct8-index.html -> ct8-dist.html
            const outputFileName = file.replace('-index.html', '-dist.html');
            const destPath = path.join(distDir, outputFileName);

            console.log(`Đang xử lý: ${file} -> ${outputFileName}`);

            // Sử dụng gulp-file-include để lắp ráp
            await new Promise((resolve, reject) => {
                fileinclude({
                    prefix: '@@',
                    basepath: libraryDir, // Cho phép @@include tìm file từ thư mục /library
                    context: {
                        // Nơi bạn có thể truyền biến vào file HTML nếu cần
                    }
                })
                .on('error', reject)
                .pipe(fs.createReadStream(sourcePath))
                .pipe(fs.createWriteStream(destPath))
                .on('finish', resolve)
                .on('error', reject);
            });

            console.log(`✅ Đã lắp ráp thành công: ${outputFileName}`);
        }

        console.log('\n🎉 Quá trình build đã hoàn tất!');

    } catch (error) {
        console.error('❌ Đã xảy ra lỗi trong quá trình build:', error);
    }
}

// Chạy hàm lắp ráp
buildPages();
