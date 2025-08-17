// build.js - Version 3: Full JS Bundling

const fs = require('fs-extra');
const path = require('path');
const { parse } = require('node-html-parser');

async function build() {
    try {
        console.log('🚀 Bắt đầu quá trình build v3...');

        const indexPath = path.join(__dirname, 'index.html');
        console.log(`1. Đọc file index.html từ: ${indexPath}`);
        if (!await fs.pathExists(indexPath)) {
            throw new Error('Lỗi nghiêm trọng: Không tìm thấy file index.html ở thư mục gốc!');
        }
        const indexHtmlContent = await fs.readFile(indexPath, 'utf8');

        console.log('2. Phân tích cú pháp HTML...');
        const root = parse(indexHtmlContent);

        const includeElements = root.querySelectorAll('[data-include]');
        console.log(`3. Tìm thấy ${includeElements.length} thành phần HTML cần nhúng.`);
        for (const element of includeElements) {
            const fileToInclude = element.getAttribute('data-include');
            const filePath = path.join(__dirname, fileToInclude);
            console.log(`   -> Đang xử lý HTML: ${fileToInclude}`);

            if (await fs.pathExists(filePath)) {
                const content = await fs.readFile(filePath, 'utf8');
                element.replaceWith(content);
            } else {
                console.warn(`   ⚠️ Cảnh báo: Bỏ qua vì không tìm thấy file ${fileToInclude}`);
            }
        }
        
        const cssLinks = root.querySelectorAll('link[rel="stylesheet"]');
        let allCssContent = '';
        console.log(`4. Tìm thấy ${cssLinks.length} file CSS cần gom.`);
        for (const link of cssLinks) {
            const cssHref = link.getAttribute('href');
            const cssPath = path.join(__dirname, cssHref);
             console.log(`   -> Đang xử lý CSS: ${cssHref}`);

            if (await fs.pathExists(cssPath)) {
                const cssContent = await fs.readFile(cssPath, 'utf8');
                allCssContent += `\n/* === Bắt đầu ${cssHref} === */\n${cssContent}\n/* === Kết thúc ${cssHref} === */\n`;
                link.remove();
            } else {
                 console.warn(`   ⚠️ Cảnh báo: Bỏ qua vì không tìm thấy file ${cssHref}`);
            }
        }
        
        if (allCssContent) {
            console.log('5. Nhúng toàn bộ CSS vào trong thẻ <style>...');
            const head = root.querySelector('head');
            head.insertAdjacentHTML('beforeend', `<style>${allCssContent}</style>`);
        }

        // *** NÂNG CẤP MỚI BẮT ĐẦU TỪ ĐÂY ***
        console.log('6. Tìm và nhúng các file JavaScript cục bộ...');
        const scriptTags = root.querySelectorAll('script[src]');
        for (const scriptTag of scriptTags) {
            const src = scriptTag.getAttribute('src');
            // Chỉ xử lý các file script cục bộ, bỏ qua các link bên ngoài (http, https)
            if (src && !src.startsWith('http')) {
                const scriptPath = path.join(__dirname, src);
                console.log(`   -> Đang xử lý JS: ${src}`);
                if (await fs.pathExists(scriptPath)) {
                    const scriptContent = await fs.readFile(scriptPath, 'utf8');
                    scriptTag.removeAttribute('src'); // Bỏ thuộc tính src
                    scriptTag.set_content(scriptContent); // Nhúng code vào thẳng thẻ script
                } else {
                    console.warn(`   ⚠️ Cảnh báo: Bỏ qua vì không tìm thấy file script ${src}`);
                }
            }
        }

        console.log('7. Dọn dẹp các script không cần thiết...');
        const mainScript = root.querySelector('script[src="main.js"]');
        if (mainScript) {
            // Script main.js có thể đã được xử lý ở trên, bước này để đảm bảo
            mainScript.remove();
            console.log('   -> Đã xóa script main.js.');
        }

        const buildPath = path.join(__dirname, 'ladipage-build.html');
        console.log(`8. Ghi kết quả cuối cùng ra file: ${buildPath}`);
        await fs.writeFile(buildPath, root.toString());

        console.log('\n🎉 Build thành công! File "ladipage-build.html" đã được nâng cấp với đầy đủ JavaScript.');

    } catch (error) {
        console.error('\n❌ Đã có lỗi xảy ra trong quá trình build:');
        console.error(error.message);
    }
}

build();
