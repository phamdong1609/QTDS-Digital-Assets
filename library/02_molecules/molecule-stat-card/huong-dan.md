Nguồn: Notion AI 

Dựa trên nội dung trong tài liệu Task405 và theo tiêu chuẩn manifest component, đây là nội dung file `HUONG-DAN.md` cho molecule-stat-card:

```yaml
---
tenTiengViet: "Thẻ Hiển Thị Thống Kê"
maLinhKien: "molecule-stat-card"
phienBan: "v1.0-default"
moTa: "Component phân tử để hiển thị số liệu thống kê quan trọng với tiêu đề và mô tả"
anhChupManHinh: "./screenshot.png"
thamSo:
  - name: statNumber
    type: string
    description: "Số liệu thống kê chính (vd: '59,8%', '1.176')"
    required: true
  - name: statLabel
    type: string
    description: "Nhãn mô tả cho số liệu"
    required: true
  - name: statDescription
    type: string
    description: "Mô tả chi tiết về số liệu thống kê"
    required: false
  - name: highlightColor
    type: string
    description: "Màu highlight cho số liệu ('primary', 'danger', 'warning')"
    required: false
    default: "primary"
viDuSuDung: |
  <include src="library/02_molecules/molecule-stat-card/molecule-stat-card.html" locals='{
    "statNumber": "59,8%",
    "statLabel": "QTDND vi phạm quy định",
    "statDescription": "Theo báo cáo NHNN 2024",
    "highlightColor": "danger"
  }'></include>
---

# Hướng Dẫn Sử Dụng: Thẻ Hiển Thị Thống Kê (molecule-stat-card)

## 📝 Mô tả

Component `molecule-stat-card` là một linh kiện phân tử dùng để hiển thị các số liệu thống kê quan trọng một cách trực quan và thu hút. Component này thường được sử dụng trong các section thể hiện thành tích, vấn đề, hoặc các chỉ số quan trọng.

## 🎨 Cấu trúc và giao diện

- **Số liệu chính:** Hiển thị lớn, nổi bật với màu highlight
- **Nhãn mô tả:** Text mô tả ngắn gọn về số liệu
- **Mô tả chi tiết:** Text bổ sung (tùy chọn) để giải thích thêm
- **Responsive:** Tự động điều chỉnh kích thước trên mobile

## 🔧 Cách sử dụng

### Ví dụ 1: Stat card cơ bản
```html
<include src="library/02_molecules/molecule-stat-card/molecule-stat-card.html" locals='{
  "statNumber": "59,8%",
  "statLabel": "QTDND vi phạm quy định",
  "highlightColor": "danger"
}'></include>
```

### Ví dụ 2: Stat card với mô tả chi tiết
```html
<include src="library/02_molecules/molecule-stat-card/molecule-stat-card.html" locals='{
  "statNumber": "1.176",
  "statLabel": "Quỹ Tín Dụng Nhân Dân",
  "statDescription": "Trên toàn quốc cần giải pháp QTDS",
  "highlightColor": "primary"
}'></include>
```

### Ví dụ 3: Stat card thành tích tích cực
```html
<include src="library/02_molecules/molecule-stat-card/molecule-stat-card.html" locals='{
  "statNumber": "70%",
  "statLabel": "Giảm rủi ro vận hành",
  "statDescription": "So với phương pháp truyền thống",
  "highlightColor": "success"
}'></include>
```

## 📊 Tham số (Parameters)

| Tham số | Kiểu | Bắt buộc | Mặc định | Mô tả |
|---------|------|----------|----------|-------|
| `statNumber` | string | ✅ Có | - | Số liệu chính (59,8%, 1.176, v.v.) |
| `statLabel` | string | ✅ Có | - | Nhãn mô tả ngắn gọn |
| `statDescription` | string | ❌ Không | - | Mô tả chi tiết bổ sung |
| `highlightColor` | string | ❌ Không | "primary" | Màu highlight (primary, danger, warning, success) |

## 🎨 Màu sắc highlight có sẵn

- **`primary`** - Xanh dương chủ đạo (mặc định)
- **`danger`** - Đỏ cảnh báo (cho các vấn đề, rủi ro)
- **`warning`** - Vàng chú ý (cho các chỉ số cần lưu ý)
- **`success`** - Xanh lá (cho các thành tích tích cực)

## 🎯 Khi nào sử dụng

### ✅ **Nên sử dụng molecule-stat-card khi:**
- Hiển thị số liệu thống kê quan trọng
- Thể hiện thành tích, KPI của sản phẩm/dịch vụ
- Nêu bật các vấn đề cần giải quyết
- Trong sections "Challenges", "Benefits", "Results"

### ❌ **Không nên sử dụng khi:**
- Hiển thị thông tin không phải số liệu
- Nội dung quá phức tạp (dùng card khác)
- Chỉ cần hiển thị text đơn giản

## 💡 Best Practices

### Layout và sắp xếp:
```html
<!-- Nhóm nhiều stat cards trong một container -->
<div class="stats-grid">
  <include src="library/02_molecules/molecule-stat-card/molecule-stat-card.html" locals='{
    "statNumber": "59,8%",
    "statLabel": "Vi phạm quy định",
    "highlightColor": "danger"
  }'></include>
  
  <include src="library/02_molecules/molecule-stat-card/molecule-stat-card.html" locals='{
    "statNumber": "70%",
    "statLabel": "Giảm rủi ro",
    "highlightColor": "success"
  }'></include>
</div>
```

### Nguyên tắc nội dung:
- **Số liệu:** Ngắn gọn, dễ đọc (59,8% thay vì 59.8%)
- **Label:** Súc tích, không quá 30 ký tự
- **Description:** Bổ sung thông tin nguồn hoặc context

## 🚀 Mở rộng và tùy chỉnh

### Thêm màu highlight mới:
```css
/* Trong molecule-stat-card.css */
.qtds-stat-card__number--info {
    color: var(--info);
}
```

### Thêm animation:
```css
.qtds-stat-card {
    transition: transform 0.3s ease;
}

.qtds-stat-card:hover {
    transform: translateY(-5px);
}
```

## 📱 Responsive Design

Component tự động thích ứng:
- **Desktop:** Hiển thị đầy đủ với spacing thoải mái
- **Tablet:** Giảm padding, font size vừa phải
- **Mobile:** Stack vertically, font size nhỏ hơn

## 🔗 Tương thích và dependencies

- **Build system:** Cần build.js v3.1+
- **CSS dependencies:** Variables từ theme.css
- **Browser support:** IE11+, tất cả browsers hiện đại
- **Usage context:** Sections challenges, benefits, statistics

## 📂 File liên quan

- `molecule-stat-card.html` - Template HTML
- `molecule-stat-card.css` - Styles và responsive
- `HUONG-DAN.md` - Tài liệu này

## 🔄 Version History

- **v1.0-default** - Phiên bản ban đầu với 4 màu highlight cơ bản

---

**Phiên bản:** v1.0-default  
**Ngày tạo:** 2025-08-27  
**Dự án:** Task405 - Chia nhỏ CT9  
**Loại component:** 02_molecules (Phân tử)
```

Nội dung này được thiết kế dựa trên:
- Tiêu chuẩn manifest component trong kế hoạch Task405
- Cấu trúc thống kê từ CT9 sections-challenges
- Best practices cho documentation component
- YAML frontmatter machine-readable để hỗ trợ automation tương lai

Bạn có thể copy toàn bộ nội dung này vào file `HUONG-DAN.md` của molecule-stat-card nhé!