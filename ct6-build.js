// ct6-build.js - Version 2.4 (Corrected All Directory Paths)
// This script automates combining standardized files into a single HTML file for LadiPage.
// This version uses a more robust method for injecting CSS and JS.

const fs = require('fs');
const path = require('path');

console.log('🚀 Bắt đầu quá trình build cho workshop...');

// Define paths
const workshopPath = path.join(__dirname, 'workshop', 'CT-6_breakdown', 'extracted-sections');
const outputPath = path.join(__dirname, 'ct6-ladipage-build.html');

// Helper to read files
const readFileContent = (filePath) => {
    try {
        const fullPath = path.join(workshopPath, filePath);
        if (fs.existsSync(fullPath)) {
            return fs.readFileSync(fullPath, 'utf8');
        }
        console.warn(`   ⚠️ Cảnh báo: Không tìm thấy file ${filePath}`);
        return '';
    } catch (error) {
        console.error(`❌ Lỗi khi đọc file: ${filePath}`, error);
        return '';
    }
};

try {
    // 1. Read the main template
    let finalHtml = readFileContent('index-ct6.html');
    if (!finalHtml) throw new Error("Không thể đọc file khuôn mẫu index-ct6.html!");

    // 2. Read all HTML partials
    const partials = {
        '{{HEAD_CONTENT}}': readFileContent('partials-ct6/head-includes.html'),
        // --- FIX: Corrected all directory names to plural 'sections-' ---
        '{{NAVBAR_CONTENT}}': readFileContent('sections-navbar/section-navbar.html'),
        '{{HERO_CONTENT}}': readFileContent('sections-hero/section-hero.html'),
        '{{CHALLENGES_CONTENT}}': readFileContent('sections-challenges/section-challenges.html'),
        '{{STANDARDIZATION_CONTENT}}': readFileContent('sections-standardization/section-standardization.html'),
        '{{SOLUTIONS_CONTENT}}': readFileContent('sections-solutions/section-solutions.html'),
        '{{BENEFITS_CONTENT}}': readFileContent('sections-benefits/section-benefits.html'),
        '{{FAQ_CONTENT}}': readFileContent('sections-faq/section-faq.html'),
        '{{PODCAST_CONTENT}}': readFileContent('sections-podcast/section-podcast.html'),
        '{{CTA_CONTENT}}': readFileContent('sections-cta/section-cta.html'),
        '{{LIBRARY_CONTENT}}': readFileContent('sections-library/section-library.html'),
        '{{FOOTER_CONTENT}}': readFileContent('sections-footer/section-footer.html'),
        '{{BACK_TO_TOP_CONTENT}}': readFileContent('components-ct6/component-back-to-top/component-back-to-top.html')
    };

    // 3. Replace all HTML placeholders first
    console.log('1. Lắp ráp các thành phần HTML...');
    for (const [placeholder, content] of Object.entries(partials)) {
        finalHtml = finalHtml.replace(`<!-- ${placeholder} -->`, content);
    }

    // 4. Read and combine all CSS files
    console.log('2. Gom tất cả các file CSS...');
    const cssContents = [
        readFileContent('_global-ct6.css'),
        // --- FIX: Corrected all directory names to plural 'sections-' ---
        readFileContent('sections-navbar/section-navbar.css'),
        readFileContent('sections-hero/section-hero.css'),
        readFileContent('sections-challenges/section-challenges.css'),
        readFileContent('sections-standardization/section-standardization.css'), 
        readFileContent('sections-solutions/section-solutions.css'),
        readFileContent('sections-benefits/section-benefits.css'),
        readFileContent('sections-faq/section-faq.css'),
        readFileContent('sections-podcast/section-podcast.css'),
        readFileContent('sections-cta/section-cta.css'),
        readFileContent('sections-library/section-library.css'),
        readFileContent('sections-footer/section-footer.css'),
        readFileContent('components-ct6/component-back-to-top/component-back-to-top.css')
    ].join('\n\n/* --- */\n\n');
    const finalCssBlock = `<style>\n${cssContents}\n</style>`;

    // 5. Read the main JS file
    console.log('3. Gom file JavaScript chính...');
    const jsContents = readFileContent('_main-ct6.js');
    const finalJsBlock = `<script>\n${jsContents}\n</script>`;

    // 6. Inject CSS and JS into the assembled HTML
    console.log('4. Chèn CSS và JS vào file HTML cuối cùng...');
    finalHtml = finalHtml.replace('</head>', `${finalCssBlock}\n</head>`);
    finalHtml = finalHtml.replace('</body>', `${finalJsBlock}\n</body>`);
    
    // Clean up any remaining script placeholders
    finalHtml = finalHtml.replace('<!-- {{SCRIPT_CONTENT}} -->', '');

    // 7. Write the final file
    fs.writeFileSync(outputPath, finalHtml);

    console.log(`\n✅ Build thành công! File đã sẵn sàng tại: ${outputPath}`);

} catch (error) {
    console.error('\n🔥 Đã có lỗi nghiêm trọng xảy ra trong quá trình build:', error);
}
