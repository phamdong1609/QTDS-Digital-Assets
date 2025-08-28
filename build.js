// build.js (Version 3.2 - Smart Atom & Molecule CSS Loading)

const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const include = require('posthtml-include');
const expressions = require('posthtml-expressions');

const rootDir = __dirname;
const templatesDir = path.join(rootDir, 'template');
const distDir = path.join(rootDir, 'dist');
const libraryDir = path.join(rootDir, 'library');
const coreDir = path.join(rootDir, 'core');

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

async function buildSinglePage(templateFile) {
    const hubName = path.basename(templateFile, '-index.html');
    const sourcePath = path.join(templatesDir, templateFile);
    const destPath = path.join(distDir, `${hubName}-dist.html`);

    console.log(`\n--- Bắt đầu xử lý đơn hàng: ${hubName} ---`);
    try {
        let htmlContent = fs.readFileSync(sourcePath, 'utf8');
        const requiredComponents = getIncludedComponents(htmlContent);

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

        // --- NÂNG CẤP: Tự động nạp CSS cho ATOMS và MOLECULES ---
        const componentLevels = ['01_atoms', '02_molecules'];
        
        componentLevels.forEach(level => {
            console.log(`   - Tự động nạp CSS cho các linh kiện ${level.toUpperCase()}...`);
            const levelDir = path.join(libraryDir, level);
            if (fs.existsSync(levelDir)) {
                const componentFolders = fs.readdirSync(levelDir, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name);

                componentFolders.forEach(folder => {
                    const cssPath = path.join(levelDir, folder, `${folder}.css`);
                    if (fs.existsSync(cssPath)) {
                        cssContents.push(fs.readFileSync(cssPath, 'utf8'));
                        console.log(`     -> Đã nạp: ${folder}.css`);
                    }
                });
            }
        });
        // --- KẾT THÚC NÂNG CẤP ---

        const finalCss = cssContents.join('\n\n');
        console.log('   ✅ Đã tổng hợp CSS thành công.');

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
        
        console.log('   - Đang lắp ráp và đóng gói HTML...');
        const result = await posthtml([
            include({ root: rootDir, encoding: 'utf8' }),
            expressions({ locals: {} })
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
    console.log('--- KHỞI ĐỘNG NHÀ MÁY SẢN XUẤT PHIÊN BẢN 3.2 ---');
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
