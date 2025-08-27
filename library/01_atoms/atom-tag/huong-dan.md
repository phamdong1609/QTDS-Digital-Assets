Đây là nội dung file `HUONG-DAN.md` cho atom-tag mà tôi tạo cho bạn:

Nguồn: Notion AI 

---
tenTiengViet: "Thẻ Nhãn Tương Tác"
maLinhKien: "atom-tag"
phienBan: "v1.0-default"
moTa: "Component nhỏ để hiển thị thông tin dưới dạng thẻ/nhãn với nhiều kiểu style khác nhau"
anhChupManHinh: "./screenshot.png"
thamSo:
  - name: type
    type: string
    description: "Kiểu style của thẻ ('default', 'hero-badge')"
    required: true
    default: "default"
  - name: text
    type: string
    description: "Nội dung text hiển thị trên thẻ"
    required: true
  - name: icon
    type: string
    description: "Class Font Awesome cho icon (tùy chọn)"
    required: false
viDuSuDung: |
  <include src="library/01_atoms/atom-tag/atom-tag.html" locals='{
    "type": "hero-badge",
    "icon": "fas fa-shield-alt",
    "text": "BẢO MẬT DỮ LIỆU"
  }'></include>
---

# Hướng Dẫn Sử Dụng: Thẻ Nhãn Tương Tác (atom-tag)

## 📝 Mô tả

Component `atom-tag` là một linh kiện nguyên tử cơ bản để hiển thị thông tin dưới dạng thẻ nhãn nhỏ. Component này hỗ trợ nhiều kiểu style khác nhau và có thể tùy chọn hiển thị icon.

## 🎨 Các kiểu style có sẵn

### 1. Default Style (`type: "default"`)
- **Sử dụng cho:** Thẻ phân loại trong bài viết, danh mục sản phẩm
- **Giao diện:** Nền xám, chữ đen
- **Ví dụ:** Thẻ category trên article cards

### 2. Hero Badge Style (`type: "hero-badge"`)
- **Sử dụng cho:** Huy hiệu nổi bật trong hero section
- **Giao diện:** Nền trong suốt với backdrop blur, chữ trắng, viền mờ
- **Ví dụ:** Badge "BẢO MẬT DỮ LIỆU" trong CT9 hero

## 🔧 Cách sử dụng

### Ví dụ 1: Thẻ hero badge với icon
```html
<include src="library/01_atoms/atom-tag/atom-tag.html" locals='{
  "type": "hero-badge",
  "icon": "fas fa-shield-alt",
  "text": "BẢO MẬT DỮ LIỆU"
}'></include>
```

### Ví dụ 2: Thẻ default không có icon
```html
<include src="library/01_atoms/atom-tag/atom-tag.html" locals='{
  "type": "default",
  "text": "Công nghệ"
}'></include>
```

### Ví dụ 3: Thẻ default với icon
```html
<include src="library/01_atoms/atom-tag/atom-tag.html" locals='{
  "type": "default",
  "icon": "fas fa-star",
  "text": "Nổi bật"
}'></include>
```

## 📊 Tham số (Parameters)

| Tham số | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---------|--------------|----------|----------|-------|
| `type` | string | ✅ Có | "default" | Kiểu style: "default" hoặc "hero-badge" |
| `text` | string | ✅ Có | - | Nội dung text hiển thị |
| `icon` | string | ❌ Không | - | Class Font Awesome (vd: "fas fa-star") |

## 🎯 Khi nào sử dụng

### ✅ **Nên sử dụng atom-tag khi:**
- Cần hiển thị thông tin phân loại ngắn gọn
- Tạo badges/labels cho content
- Đánh dấu trạng thái hoặc thuộc tính
- Tạo các indicator nhỏ trong UI

### ❌ **Không nên sử dụng khi:**
- Nội dung text quá dài (>20 ký tự)
- Cần button functionality (dùng atom-button thay thế)
- Hiển thị data phức tạp (dùng molecule)

## 🚀 Mở rộng và tùy chỉnh

### Thêm kiểu style mới:
```css
/* Trong atom-tag.css */
.qtds-tag--warning {
    background: var(--warning);
    color: white;
}
```

### Sử dụng style mới:
```html
<include src="library/01_atoms/atom-tag/atom-tag.html" locals='{
  "type": "warning",
  "text": "Cảnh báo"
}'></include>
```

## 📱 Responsive

Component tự động responsive và hoạt động tốt trên mọi thiết bị. Text sẽ không wrap (sử dụng `white-space: nowrap`).

## 🔄 Tương thích

- ✅ Hoạt động với build.js v3.1+
- ✅ Hỗ trợ posthtml-expressions
- ✅ Tương thích với tất cả browsers hiện đại
- ✅ Có thể sử dụng trong CT9, CT10, CT11...

## 📂 File liên quan

- `atom-tag.html` - Template HTML
- `atom-tag.css` - Styles
- `HUONG-DAN.md` - Tài liệu này

---

**Phiên bản:** v1.0-default  
**Ngày cập nhật:** 2025-08-27  
**Tác giả:** Task405 - Chia nhỏ CT9
```

Nội dung này tuân thủ đúng tiêu chuẩn manifest component đã được định nghĩa trong kế hoạch, bao gồm YAML frontmatter và tài liệu chi tiết. Bạn có muốn tôi điều chỉnh gì không?