# Ngày cập nhật: 28 tháng 8, 2025 13:01 

Nguồn: Notion AI


Dựa trên kế hoạch Task405 và cấu trúc molecule-feature-card từ sections "Giải pháp" và "Lợi ích", đây là nội dung file `HUONG-DAN.md`:


```yaml
---
tenTiengViet: "Thẻ Tính Năng"
maLinhKien: "molecule-feature-card"
phienBan: "v1.0-default"
moTa: "Component phân tử để hiển thị tính năng/lợi ích sản phẩm với icon, tiêu đề và mô tả chi tiết"
anhChupManHinh: "./screenshot.png"
thamSo:
  - name: featureIcon
    type: string
    description: "Class Font Awesome cho icon tính năng"
    required: true
  - name: featureTitle
    type: string
    description: "Tiêu đề tính năng/lợi ích"
    required: true
  - name: featureDescription
    type: string
    description: "Mô tả chi tiết về tính năng"
    required: true
  - name: featureType
    type: string
    description: "Loại card ('solution', 'benefit', 'pillar')"
    required: false
    default: "solution"
  - name: targetAudience
    type: string
    description: "Đối tượng hướng đến (cho benefit cards)"
    required: false
viDuSuDung: |
  <include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
    "featureIcon": "fas fa-shield-alt",
    "featureTitle": "Bảo Mật Dữ Liệu Tuyệt Đối",
    "featureDescription": "Mã hóa end-to-end, backup tự động và kiểm soát truy cập đa lớp đảm bảo dữ liệu luôn được bảo vệ tối ưu.",
    "featureType": "solution"
  }'></include>
---

# Hướng Dẫn Sử Dụng: Thẻ Tính Năng (molecule-feature-card)

## 📝 Mô tả

Component `molecule-feature-card` là một linh kiện phân tử được thiết kế để trình bày tính năng, lợi ích hoặc trụ cột chiến lược của sản phẩm/dịch vụ. Component này kết hợp icon, tiêu đề và mô tả để tạo thành một đơn vị thông tin trực quan và dễ hiểu.

## 🎨 Các loại feature cards

### 1. Solution Cards (`featureType: "solution"`)
- **Sử dụng trong:** Sections "Giải pháp QTDS", "Trụ cột chiến lược"
- **Mục đích:** Trình bày các tính năng/giải pháp cốt lõi
- **Style:** Icon lớn, background nhẹ, border subtle

### 2. Benefit Cards (`featureType: "benefit"`)
- **Sử dụng trong:** Sections "Lợi ích vượt trội"
- **Mục đích:** Highlight lợi ích cho từng đối tượng khách hàng
- **Style:** Icon màu primary, card có shadow, targeted messaging

### 3. Pillar Cards (`featureType: "pillar"`)
- **Sử dụng trong:** Strategic pillars, foundation elements
- **Mục đích:** Trình bày các trụ cột/nền tảng quan trọng
- **Style:** Icon distinctive, layout balanced, professional tone

## 🔧 Cách sử dụng

### Ví dụ 1: Solution feature card
```html
<include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
  "featureIcon": "fas fa-robot",
  "featureTitle": "Tự Động Hóa Quy Trình",
  "featureDescription": "Hệ thống AI tự động xử lý 90% công việc thủ công, giảm thiểu sai sót và tăng tốc độ xử lý hồ sơ lên 5 lần.",
  "featureType": "solution"
}'></include>
```

### Ví dụ 2: Benefit card cho đối tượng cụ thể
```html
<include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
  "featureIcon": "fas fa-chart-line",
  "featureTitle": "Tăng Hiệu Quả Vận Hành",
  "featureDescription": "Giảm 70% thời gian xử lý hồ sơ, tăng 40% năng suất làm việc và cải thiện chất lượng dịch vụ khách hàng.",
  "featureType": "benefit",
  "targetAudience": "Cán bộ Tín dụng"
}'></include>
```

### Ví dụ 3: Strategic pillar card
```html
<include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
  "featureIcon": "fas fa-database",
  "featureTitle": "Nền Tảng Dữ Liệu Thống Nhất",
  "featureDescription": "Tích hợp toàn bộ dữ liệu tín dụng vào một hệ thống duy nhất, đảm bảo tính nhất quán và truy xuất nhanh chóng.",
  "featureType": "pillar"
}'></include>
```

### Ví dụ 4: Grid layout cho solutions section
```html
<div class="features-grid">
  <include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
    "featureIcon": "fas fa-shield-alt",
    "featureTitle": "Bảo Mật Tuyệt Đối",
    "featureDescription": "Mã hóa end-to-end và kiểm soát truy cập đa lớp.",
    "featureType": "solution"
  }'></include>
  
  <include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
    "featureIcon": "fas fa-sync-alt",
    "featureTitle": "Đồng Bộ Realtime",
    "featureDescription": "Cập nhật dữ liệu ngay lập tức trên tất cả thiết bị.",
    "featureType": "solution"
  }'></include>
  
  <include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
    "featureIcon": "fas fa-brain",
    "featureTitle": "AI Thông Minh",
    "featureDescription": "Phân tích rủi ro tự động với độ chính xác 95%.",
    "featureType": "solution"
  }'></include>
</div>
```

## 📊 Tham số (Parameters)

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|---------|------|----------|----------|-------|
| `featureIcon` | string | ✅ Có | - | Class Font Awesome (vd: "fas fa-shield-alt") |
| `featureTitle` | string | ✅ Có | - | Tiêu đề tính năng (20-50 ký tự) |
| `featureDescription` | string | ✅ Có | - | Mô tả chi tiết (80-200 ký tự) |
| `featureType` | string | ❌ Không | "solution" | Loại card: solution, benefit, pillar |
| `targetAudience` | string | ❌ Không | - | Đối tượng hướng đến (cho benefit cards) |

## 🎯 Khi nào sử dụng

### ✅ **Nên sử dụng molecule-feature-card khi:**
- Trình bày tính năng sản phẩm/dịch vụ
- Highlight lợi ích cho khách hàng
- Giới thiệu trụ cột chiến lược
- Solutions/benefits sections
- Feature comparison pages

### ❌ **Không nên sử dụng khi:**
- Hiển thị content dài (dùng article-card)
- Thống kê số liệu (dùng stat-card)
- Thông tin liên hệ (dùng contact-card)
- Navigation elements (dùng menu components)

## 💡 Best Practices

### Nội dung:
- **Icon:** Chọn icon phù hợp, dễ hiểu, consistent style
- **Title:** 3-7 từ, có từ khóa quan trọng, action-oriented
- **Description:** Tập trung vào benefit, dùng số liệu cụ thể
- **Layout:** Maintain visual hierarchy rõ ràng

### UX Guidelines:
```html
<!-- Nhóm các features liên quan -->
<section class="solutions-section">
  <h2>Giải Pháp Cốt Lõi</h2>
  <div class="features-grid">
    <!-- 3-4 feature cards per row -->
  </div>
</section>
```

### Content Strategy:
- **Problem → Solution:** Lead với vấn đề, follow với giải pháp
- **Benefit-focused:** Nhấn mạnh lợi ích cho user hơn là tính năng
- **Quantifiable:** Dùng số liệu cụ thể (70%, 5 lần, 90% tự động...)

## 🚀 Tùy chỉnh và mở rộng

### Thêm CTA button:
```html
<include src="library/02_molecules/molecule-feature-card/molecule-feature-card.html" locals='{
  "featureIcon": "fas fa-rocket",
  "featureTitle": "Triển Khai Nhanh Chóng", 
  "featureDescription": "Setup hoàn tất trong 24h với đội ngũ support 24/7.",
  "featureType": "solution",
  "ctaText": "Tìm hiểu thêm",
  "ctaUrl": "/features/deploy-fast"
}'></include>
```

### Custom styling cho industries:
```css
.qtds-feature-card--banking {
  border-top: 3px solid var(--banking-primary);
}

.qtds-feature-card--fintech {
  background: linear-gradient(135deg, var(--fintech-bg) 0%, white 100%);
}
```

### Interactive states:
```css
.qtds-feature-card {
  transition: all 0.3s ease;
}

.qtds-feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
}
```

## 📱 Responsive Design

- **Desktop (>1200px):** 3-4 cards per row với spacing thoải mái
- **Laptop (900-1200px):** 3 cards per row
- **Tablet (600-900px):** 2 cards per row
- **Mobile (<600px):** 1 card per row, full width
- **Icon size:** Adaptive từ 48px (mobile) đến 64px (desktop)

## 🔗 Dependencies và tương tác

### Atoms được sử dụng:
- **Font Awesome icons** - Cho featureIcon
- **Typography system** - Cho title và description
- **Color variables** - Từ theme.css
- **Spacing system** - Cho consistent layout

### Có thể kết hợp với:
- **atom-button** - Cho CTA actions
- **atom-tag** - Cho feature categories
- **molecule-modal** - Cho detailed feature info

## ⚡ Performance và SEO

### Schema markup:
```html
<div itemscope itemtype="http://schema.org/Product">
  <h3 itemprop="name">{{ featureTitle }}</h3>
  <div itemprop="description">{{ featureDescription }}</div>
</div>
```

### Loading optimization:
- Icons load nhanh (Font Awesome CDN)
- CSS được bundle trong build process
- No external dependencies nặng

## 📂 File structure

```
library/02_molecules/molecule-feature-card/
├── molecule-feature-card.html    # Template với conditionals
├── molecule-feature-card.css     # Styles cho 3 types
├── molecule-feature-card.js      # Optional interactions
└── HUONG-DAN.md                 # Documentation này
```

## 🎨 Color scheme và branding

### Primary colors:
```css
.qtds-feature-card--solution .feature-icon {
  color: var(--primary);
}

.qtds-feature-card--benefit .feature-icon {
  color: var(--success);
}

.qtds-feature-card--pillar .feature-icon {
  color: var(--secondary);
}
```

---

**Phiên bản:** v1.0-default  
**Complexity level:** Molecule (Medium)  
**Use cases:** Solutions, Benefits, Features, Pillars  
**Dự án:** Task405 - Chia nhỏ CT9  
**Ngày cập nhật:** 2025-08-28
```

Nội dung này được thiết kế dựa trên cấu trúc feature cards trong các sections "Giải pháp", "Lợi ích" và "Trụ cột chiến lược" của CT9, tuân thủ tiêu chuẩn manifest component với YAML frontmatter machine-readable. Bạn có thể copy toàn bộ để tạo file `HUONG-DAN.md` nhé!