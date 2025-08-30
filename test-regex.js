const fs = require('fs');

const htmlContent = fs.readFileSync('template/ct11-index.html', 'utf8');
console.log('HTML length:', htmlContent.length);
console.log('First 500 chars:', htmlContent.substring(0, 500));

// THỬ NHIỀU REGEX PATTERNS
const patterns = [
    /<include\\s+src\\s*=\\s*["']([^"']+)["']/gi,
    /<include src="([^"]+)"/gi,
    /<include.*?src="([^"]+)"/gi,
    /<include[^>]*src="([^"]+)"/gi
];

patterns.forEach((regex, index) => {
    console.log(`\\n--- Pattern ${index + 1} ---`);
    let match;
    let count = 0;
    regex.lastIndex = 0; // Reset regex

    while ((match = regex.exec(htmlContent)) !== null) {
        count++;
        console.log(`Found #${count}:`, match[1]);
    }
    console.log(`Total with pattern ${index + 1}: ${count}`);
});
