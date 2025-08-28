Dựa trên tiêu chuẩn manifest component trong Task405 và cấu trúc molecule-article-card từ sections-library, đây là nội dung file `HUONG-DAN.md`:

```yaml
---
tenTiengViet: "Thẻ Bài Viết"
maLinhKien: "molecule-article-card"
phienBan: "v1.0-default"
moTa: "Component phân tử để hiển thị thông tin bài viết với ảnh, tiêu đề, mô tả và thẻ phân loại"
anhChupManHinh: "./screenshot.png"
thamSo:
  - name: articleImage
    type: string
    description: "URL ảnh thumbnail của bài viết"
    required: true
  - name: articleTitle
    type: string
    description: "Tiêu đề bài viết"
    required: true
  - name: articleDescription
    type: string
    description: "Mô tả ngắn gọn nội dung bài viết"
    required: true
  - name: articleUrl
    type: string
    description: "Link đến bài viết đầy đủ"
    required: true
  - name: articleTag
    type: string
    description: "Thẻ phân loại bài viết"
    required: false
  - name: readTime
    type: string
    description: "Thời gian đọc ước tính (vd: '5 phút đọc')"
    required: false
viDuSuDung: |
  <include src="library/02_molecules/molecule-article-card/molecule-article-card.html" locals='{
    "articleImage": "images/articles/qtds-security.jpg",
    "articleTitle": "Bảo Mật Dữ Liệu Tín Dụng - Thách Thức Của QTDND",
    "articleDescription": "Phân tích chi tiết về các rủi ro bảo mật và giải pháp toàn diện...",
    "articleUrl": "/bai-viet/bao-mat-du-lieu-tin-dung",
    "articleTag": "Bảo Mật",
    "readTime": "7 phút đọc"
  }'></include>
---

# Hướng Dẫn Sử Dụng: Thẻ Bài Viết (molecule-article-card)

## 📝 Mô tả

Component `molecule-article-card` là một linh kiện phân tử phức tạp dùng để hiển thị thông tin bài viết/nội dung dưới dạng card. Component này kết hợp nhiều atoms (ảnh, tiêu đề, text, tag, button) để tạo thành một đơn vị nội dung hoàn chỉnh.

## 🎨 Cấu trúc giao diện

- **Ảnh thumbnail:** Hiển thị ở đầu card, responsive với aspect ratio cố định
- **Thẻ phân loại:** Sử dụng atom-tag để hiển thị category
- **Tiêu đề:** Headline của bài viết, có thể click để đọc full
- **Mô tả:** Summary ngắn gọn về nội dung
- **Meta info:** Thời gian đọc và thông tin bổ sung
- **Hover effects:** Card có animation khi hover

## 🔧 Cách sử dụng

### Ví dụ 1: Article card đầy đủ thông tin
```html
<include src="library/02_molecules/molecule-article-card/molecule-article-card.html" locals='{
  "articleImage": "images/articles/qtds-transformation.jpg",
  "articleTitle": "Chuyển Đổi Số Cho QTDND - Lộ Trình 2025",
  "articleDescription": "Hướng dẫn chi tiết các bước thực hiện chuyển đổi số hiệu quả, giúp QTDND nâng cao năng suất và tuân thủ quy định...",
  "articleUrl": "/bai-viet/chuyen-doi-so-qtdnd-2025",
  "articleTag": "Chuyển đổi số",
  "readTime": "12 phút đọc"
}'></include>
```

### Ví dụ 2: Article card tối giản
```html
<include src="library/02_molecules/molecule-article-card/molecule-article-card.html" locals='{
  "articleImage": "images/articles/risk-management.jpg",
  "articleTitle": "Quản Lý Rủi Ro Trong Hoạt Động Tín Dụng",
  "articleDescription": "Những nguyên tắc cơ bản và công cụ hỗ trợ quản lý rủi ro hiệu quả...",
  "articleUrl": "/bai-viet/quan-ly-rui-ro-tin-dung"
}'></include>
```

### Ví dụ 3: Grid layout với nhiều cards
```html
<div class="articles-grid">
  <include src="library/02_molecules/molecule-article-card/molecule-article-card.html" locals='{
    "articleImage": "images/articles/compliance.jpg",
    "articleTitle": "Tuân Thủ Quy Định NHNN 2025",
    "articleDescription": "Cập nhật những thay đổi mới nhất trong quy định...",
    "articleUrl": "/compliance-2025",
    "articleTag": "Quy định"
  }'></include>
  
  <include src="library/02_molecules/molecule-article-card/molecule-article-card.html" locals='{
    "articleImage": "images/articles/technology.jpg", 
    "articleTitle": "Công Nghệ AI Trong Tín Dụng",
    "articleDescription": "Ứng dụng trí tuệ nhân tạo để tối ưu hóa quy trình...",
    "articleUrl": "/ai-in-credit",
    "articleTag": "Công nghệ"
  }'></include>
</div>
```

## 📊 Tham số (Parameters)

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|---------|------|----------|----------|-------|
| `articleImage` | string | ✅ Có | - | Đường dẫn đến ảnh thumbnail |
| `articleTitle` | string | ✅ Có | - | Tiêu đề bài viết (tối đa 60 ký tự) |
| `articleDescription` | string | ✅ Có | - | Mô tả tóm tắt (80-150 ký tự) |
| `articleUrl` | string | ✅ Có | - | Link đến trang bài viết đầy đủ |
| `articleTag` | string | ❌ Không | - | Thẻ phân loại (sử dụng atom-tag) |
| `readTime` | string | ❌ Không | - | Thời gian đọc ước tính |

## 🎯 Khi nào sử dụng

### ✅ **Nên sử dụng molecule-article-card khi:**
- Hiển thị danh sách bài viết/nội dung
- Tạo blog/news section
- Thư viện tài liệu, case studies
- Portfolio/showcase content
- Resource/download center

### ❌ **Không nên sử dụng khi:**
- Hiển thị sản phẩm (dùng product-card)
- Thông tin người dùng (dùng profile-card) 
- Nội dung quá ngắn (dùng atom-tag hoặc text)
- Cần interaction phức tạp (dùng custom component)

## 💡 Best Practices

### Nội dung:
- **Tiêu đề:** 40-60 ký tự, có từ khóa quan trọng
- **Mô tả:** 80-150 ký tự, tóm tắt value proposition
- **Ảnh:** Aspect ratio 16:9, tối thiểu 400x225px
- **URL:** SEO-friendly slug (/bai-viet/ten-bai-viet)

### Layout:
```css
/* Container cho grid layout */
.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-8);
    padding: var(--space-8) 0;
}
```

### Performance:
- Sử dụng lazy loading cho ảnh
- Optimize ảnh với WebP format
- Implement infinite scroll nếu có nhiều articles

## 🚀 Tùy chỉnh và mở rộng

### Thêm author information:
```html
<!-- Mở rộng parameters -->
<include src="library/02_molecules/molecule-article-card/molecule-article-card.html" locals='{
  "articleAuthor": "Nguyễn Văn A",
  "articleDate": "15/08/2025",
  "authorAvatar": "images/authors/nguyen-van-a.jpg"
}'></include>
```

### Custom styling cho từng loại content:
```css
.qtds-article-card--featured {
    border: 2px solid var(--primary);
    box-shadow: var(--shadow-xl);
}

.qtds-article-card--urgent {
    border-left: 4px solid var(--danger);
}
```

## 📱 Responsive Behavior

- **Desktop (>1024px):** 3-4 cards per row
- **Tablet (768-1024px):** 2 cards per row
- **Mobile (<768px):** 1 card per row, stack vertically
- **Image:** Maintains aspect ratio, crops intelligently
- **Text:** Truncates with ellipsis if too long

## 🔗 Dependencies và atoms con

Molecule này sử dụng các atoms:
- **atom-tag** - Cho article category
- **atom-button** - Cho "Đọc thêm" (tùy chọn)
- **HTML image** - Cho thumbnail
- **Typography atoms** - Cho title và description

## ⚡ Performance Tips

### Lazy loading images:
```html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" />
```

### Skeleton loading:
```css
.qtds-article-card--loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    animation: loading 1.5s infinite;
}
```

## 📂 File cấu trúc

```
library/02_molecules/molecule-article-card/
├── molecule-article-card.html    # Template chính
├── molecule-article-card.css     # Styles & responsive
├── molecule-article-card.js      # Interactions (optional)
└── HUONG-DAN.md                 # Tài liệu này
```

## 🔄 Integration với CMS

Component được thiết kế để dễ dàng integration với:
- **WordPress REST API**
- **Strapi Headless CMS**
- **Notion API**
- **JSON static data**

```javascript
// Ví dụ populate từ API
const articles = await fetch('/api/articles');
articles.forEach(article => {
    // Generate include tags với dynamic data
});
```

---

**Phiên bản:** v1.0-default  
**Độ phức tạp:** Molecule (Trung bình)  
**Maintenance:** Định kỳ kiểm tra responsive, performance  
**Dự án:** Task405 - Chia nhỏ CT9  
**Ngày cập nhật:** 2025-08-28
```

Đây là tài liệu chi tiết cho molecule-article-card theo tiêu chuẩn manifest component, bao gồm cả YAML frontmatter machine-readable và hướng dẫn sử dụng đầy đủ. Bạn có thể copy toàn bộ nội dung này vào file `HUONG-DAN.md` nhé!