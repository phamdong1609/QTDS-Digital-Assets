// build.js

// Import các thư viện cần thiết đã cài đặt ở bước 2
const fs = require('fs-extra');
const path = require('path');
const { parse } = require('node-html-parser');

// Hàm chính để thực hiện việc build
async function build() {
    try {
        console.log('🚀 Bắt đầu quá trình build...');

        // 1. Đọc nội dung file index.html gốc
        const indexPath = path.join(__dirname, 'index.html');
        const indexHtmlContent = await fs.readFile(indexPath, 'utf8');

        // 2. Phân tích cú pháp HTML để làm việc với nó như một đối tượng
        const root = parse(indexHtmlContent);

        // 3. Tìm tất cả các thẻ div có thuộc tính 'data-include'
        const includeElements = root.querySelectorAll('[data-include]');
        console.log(`🔍 Tìm thấy ${includeElements.length} thành phần cần nhúng.`);

        // 4. Lặp qua từng thẻ và thay thế nó bằng nội dung thật
        for (const element of includeElements) {
            const fileToInclude = element.getAttribute('data-include');
            const filePath = path.join(__dirname, fileToInclude);

            if (await fs.pathExists(filePath)) {
                const content = await fs.readFile(filePath, 'utf8');
                // Thay thế thẻ div bằng nội dung file tương ứng
                element.replaceWith(content);
                console.log(`✅ Đã nhúng thành công: ${fileToInclude}`);
            } else {
                console.warn(`⚠️ Cảnh báo: Không tìm thấy file ${fileToInclude}`);
            }
        }
        
        // 5. Gom tất cả CSS vào trong thẻ <style>
        const cssLinks = root.querySelectorAll('link[rel="stylesheet"]');
        let allCssContent = '';
        console.log(`🎨 Tìm thấy ${cssLinks.length} file CSS cần gom.`);

        for (const link of cssLinks) {
            const cssHref = link.getAttribute('href');
            const cssPath = path.join(__dirname, cssHref);
            if (await fs.pathExists(cssPath)) {
                const cssContent = await fs.readFile(cssPath, 'utf8');
                allCssContent += `\n/* === Bắt đầu ${cssHref} === */\n${cssContent}\n/* === Kết thúc ${cssHref} === */\n`;
                // Xóa thẻ link cũ đi
                link.remove();
                 console.log(`✅ Đã gom thành công CSS: ${cssHref}`);
            }
        }
        
        // Tạo một thẻ <style> duy nhất và chèn vào <head>
        const head = root.querySelector('head');
        head.insertAdjacentHTML('beforeend', `<style>${allCssContent}</style>`);


        // 6. Xóa các script không cần thiết cho LadiPage (như main.js)
        const mainScript = root.querySelector('script[src="main.js"]');
        if (mainScript) {
            mainScript.remove();
            console.log('🗑️ Đã xóa script main.js không cần thiết.');
        }

        // 7. Ghi kết quả cuối cùng ra file ladipage-build.html
        const buildPath = path.join(__dirname, 'ladipage-build.html');
        await fs.writeFile(buildPath, root.toString());

        console.log('🎉 Build thành công! File kết quả là ladipage-build.html');

    } catch (error) {
        console.error('❌ Đã có lỗi xảy ra trong quá trình build:', error);
    }
}

// Chạy hàm build
build();
