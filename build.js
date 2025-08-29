// build.js (Version 3.5 - Safe Environment)
// Ghi chú: Phiên bản này được nâng cấp dựa trên phân tích chính xác từ Notion AI.
// Nó tạo ra một "Môi trường An toàn" bằng cách khởi tạo tất cả các biến có thể có,
// giải quyết triệt để lỗi `ReferenceError`.

const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const include = require('posthtml-include');
const expressions = require('posthtml-expressions');

// ... (các đường dẫn không đổi)
const rootDir = __dirname;
const templatesDir = path.join(rootDir, 'template');
const distDir = path.join(rootDir, 'dist');
const libraryDir = path.join(rootDir, 'library');
const coreDir = path.join(rootDir, 'core');
const dataDir = path.join(rootDir, 'data');


function getIncludedComponents(htmlContent) {
    const includeRegex = /<include src="([^"]+)"/g;
    const components = new Set();
    let match;
    while ((match = includeRegex.exec(htmlContent)) !== null) {
        components.add(match[1]);
    }
    const componentArray = Array.from(components);
    console.log(`   ✅ Đã tìm thấy ${componentArray.length} linh kiện cần lắp ráp.`);
    return componentArray;
}

async function buildSinglePage(templateFile) {
    const hubName = path.basename(templateFile, '-index.html');
    const sourcePath = path.join(templatesDir, templateFile);
    const destPath = path.join(distDir, `${hubName}-dist.html`);
    const dataPath = path.join(dataDir, `${hubName}.json`);

    console.log(`\n--- Bắt đầu xử lý đơn hàng: ${hubName} ---`);

    try {
        let htmlContent = fs.readFileSync(sourcePath, 'utf8');
        const requiredComponents = getIncludedComponents(htmlContent);

        let pageData = {};
        if (fs.existsSync(dataPath)) {
            console.log(`   - Tìm thấy bản thiết kế dữ liệu: ${path.basename(dataPath)}`);
            const jsonData = fs.readFileSync(dataPath, 'utf8');
            const parsedData = JSON.parse(jsonData);
            pageData = parsedData.landing_page_blueprint || parsedData || {};
        } else {
            console.log(`   - Không tìm thấy bản thiết kế dữ liệu, tiến hành build tĩnh.`);
        }

        // --- NÂNG CẤP QUAN TRỌNG: TẠO MÔI TRƯỜNG AN TOÀN (SAFE ENVIRONMENT) ---
        const safeLocals = Object.assign({
            // Khai báo tất cả các biến có thể có từ 11 sections
            // Navbar
            navbar_logo_src: null, navbar_brand_name: null, nav_links: null,
            // Hero
            hero_badge: null, hero_title_gradient: null, hero_title_main: null, hero_subtitle: null, hero_description: null, hero_actions: null,
            // Challenges
            tagline: null, title: null, description: null, stats: null, highlightTitle: null, highlightDescription: null, cards: null,
            // Standardization
            flowItems: null, analysisCards: null, keyInsight: null,
            // Solutions
            pillars: null, processTitle: null, processSteps: null,
            // Benefits
            stakeholderBenefits: null,
            // FAQ
            faqs: null,
            // Podcast
            podcast_title: null, podcast_description: null, podcast_url: null,
            // CTA
            features: null,
            // Library
            library_tagline: null, library_title_main: null, library_title_gradient: null, library_description: null, library_cta: null,
            // Footer
            footer_logo_src: null, footer_tagline: null, footer_socials: null, footer_copyright: null

        }, pageData.locals || {});
        // --- KẾT THÚC NÂNG CẤP ---


        console.log('   - Đang tổng hợp CSS...');
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
        const componentLevels = ['01_atoms', '02_molecules'];
        componentLevels.forEach(level => {
            const levelDir = path.join(libraryDir, level);
            if (fs.existsSync(levelDir)) {
                fs.readdirSync(levelDir).forEach(folder => {
                    const cssPath = path.join(levelDir, folder, `${folder}.css`);
                    if (fs.existsSync(cssPath)) {
                        cssContents.push(fs.readFileSync(cssPath, 'utf8'));
                    }
                });
            }
        });
        const finalCss = cssContents.join('\n\n');
        console.log('   ✅ Đã tổng hợp CSS thành công.');

        console.log(`   - Đang đóng gói JS cho ${hubName}...`);
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
        
        console.log('   - Đang lắp ráp và đóng gói HTML...');
        const result = await posthtml([
            include({ root: rootDir, encoding: 'utf8' }),
            // Sử dụng safeLocals đã được tạo
            expressions({ locals: safeLocals }) 
        ]).process(htmlContent);

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
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT PHIÊN BẢN 3.5 ---');
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

