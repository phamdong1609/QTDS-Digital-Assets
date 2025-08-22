# keHoachCongViec-QTDS_20250822
Ngày cập nhật: 22 tháng 8, 2025 18:19
Nguồn: KLK-584_20250822_2.5Pro_DeepResearch_Ngày 5 - Tổng hợp CT-9 vào nhánh main
https://gemini.google.com/app/96b338955fbdad47

## Kế Hoạch Tái Cấu Trúc Thư Viện QTDS (Bản Cập Nhật Mới Nhất)

Mục tiêu: Xây dựng "nhà kho LEGO" cho dự án QTDS theo một cấu trúc đơn giản, có tổ chức, áp dụng cách đặt tên dễ nhớ và có khả năng quản lý nhiều biến thể linh kiện cho các "content hub" khác nhau.

### Phần 1: Cấu Trúc "Nhà Kho" Mới (Hỗ trợ Biến thể)
Chúng ta sẽ áp dụng cấu trúc thư mục đã được tinh chỉnh, với một cải tiến quan trọng để quản lý các phiên bản linh kiện khác nhau cho từng content hub (CT).
Cấu trúc thư mục chuẩn:
/library/
├── /01_atoms/
│   └── /button-nut-bam/
│
├── /02_molecules/
│   └── /card-dich-vu/
│
└── /03_sections/
    └── /sections-hero/

Cách quản lý biến thể cho từng Content Hub (CT):
Để quản lý các phiên bản khác nhau của cùng một linh kiện (ví dụ: section-hero cho CT1 và CT2), chúng ta sẽ đặt tất cả các file biến thể trong cùng một thư mục cha.
Ví dụ thực tế với sections-hero (Đã cập nhật):
/library/03_sections/
└── /sections-hero/
    ├── ct1--section-hero.html
    ├── ct1--section-hero.css
    ├── ct2--section-hero.html
    ├── ct2--section-hero.css
    └── HUONG-DAN.md

Cách làm này, theo đề xuất rất thông minh của bạn, sẽ giúp gom nhóm tất cả các file của cùng một content hub lại với nhau khi xem trong trình quản lý file. Điều này giúp thư viện cực kỳ gọn gàng, dễ dàng tìm thấy và so sánh các phiên bản khác nhau của cùng một linh kiện khi dự án lớn mạnh.

### Phần 2: Quy Tắc Đặt Tên CSS (Không đổi)

Quy tắc đặt tên vẫn giữ nguyên sự đơn giản và hiệu quả như bạn đã đề ra:
Tiền tố bắt buộc: qtds-
Tên linh kiện: qtds-btn, qtds-card-dich-vu, qtds-hero
Biến thể: Dùng -- để phân biệt. Ví dụ: qtds-btn--chinh, qtds-btn--phu.
Phần 3: Lộ Trình Hành Động (Cập nhật)
Các bước hành động được cập nhật theo đúng kế hoạch mới nhất của bạn.

- Bước 1: Tạo Nhánh Mới ("Khu Vực Làm Việc")
Mở terminal và tạo nhánh mới với tên đã được chuẩn hóa:
git checkout -b cau-truc/task401-sap-xep-library

- Bước 2 -> Bước 5 (Giữ nguyên)

Chúng ta sẽ tiếp tục các bước:

- Bước 2: Phân tích & Phân loại linh kiện từ CT-9.
- Bước 3: Di chuyển & Đổi tên theo cấu trúc mới.
- Bước 4: Tạo file HUONG-DAN.md cho mỗi linh kiện.
- Bước 5: Cập nhật lại "robot lắp ráp" build.js.

### Phần 4: Quy Trình Ghi Chép Công Việc Mới
Đây là một nâng cấp quan trọng để chúng ta quản lý dự án chuyên nghiệp hơn.
Tạo Thư Mục docs: Chúng ta sẽ tạo một thư mục mới ở gốc dự án tên là docs.
Lưu Kế Hoạch: Mọi kế hoạch, mô tả công việc liên quan đến các task lớn sẽ được lưu trong thư mục này dưới dạng file Markdown (.md).
Cách Đặt Tên File: Tên file sẽ theo cấu trúc: [ma-task]-[ten-task]_[ngay-thuc-hien].md.
Ví dụ: task401-sap-xep-library_20250822.md
Kế hoạch đã được đồng bộ hoàn toàn. Mọi thứ đã sẵn sàng để chúng ta bắt đầu. Hãy thực hiện Bước 1 để tạo nhánh mới và khởi động công cuộc tái cấu trúc nhé!

-----
# moTaCongViec-QTDS_20250822

Ngày cập nhật: 22 tháng 8, 2025 22:04 

Nguồn: Task401 - Tái cấu trúc Library Components cho dự án QTDS

## Ghi chú:

Công việc này sẽ tái cấu trúc lại thư viện components đã rã từ CT-6 theo cấu trúc đơn giản, dễ nhớ, chuyên biệt cho dự án QTDS với tiền tố `qtds-` chuẩn.

## Mục tiêu chính:

- **Xây dựng "nhà kho LEGO" QTDS có tổ chức** với cấu trúc library rõ ràng
- **Sử dụng `/03_sections/` quen thuộc** thay vì organisms để dễ nhớ, dễ dùng
- **Phân loại components** theo mức độ phức tạp (atoms → molecules → sections)
- **Tạo hệ thống tài liệu** bằng tiếng Việt cho mỗi component QTDS

## Cấu trúc thư viện QTDS mới (tinh chỉnh):

```jsx
/library/
├── /01_atoms/                   (Components cơ bản QTDS)
│   ├── /button-nut-bam/         (qtds-btn)
│   ├── /input-o-nhap/           (qtds-input)
│   └── /icon-bieu-tuong/        (qtds-icon)
├── /02_molecules/               (Nhóm components QTDS)
│   ├── /card-dich-vu/           (qtds-card-dich-vu)
│   ├── /form-lien-he/           (qtds-form-lien-he)
│   └── /menu-dieu-huong/        (qtds-menu)
└── /03_sections/                (Section lớn QTDS - dễ nhớ)
    ├── /sections-hero/          (qtds-hero)
    ├── /sections-pricing/       (qtds-pricing)
    └── /footer/                 (qtds-footer)
```

## Quy tắc đặt tên class CSS cho QTDS:

- **Base prefix**: `qtds-` (bắt buộc cho tất cả components)
- **Atoms**: `qtds-btn`, `qtds-input`, `qtds-icon` (ngắn gọn, dễ gõ)
- **Molecules**: `qtds-card-dich-vu`, `qtds-form-lien-he` (mô tả rõ chức năng)
- **Sections**: `qtds-hero`, `qtds-pricing` (tên khối, quen thuộc)
- **Modifiers**: `qtds-btn--chinh`, `qtds-btn--phu`, `qtds-btn--lon` (biến thể tiếng Việt)

## Kết quả mong đợi:

✅ Thư viện components QTDS có tổ chức, dễ nhớ với `/03_sections/`

✅ Tiền tố `qtds-` nhất quán cho toàn bộ dự án

✅ Tài liệu [HUONG-DAN.md](http://HUONG-DAN.md) bằng tiếng Việt cho mỗi component

✅ Cấu trúc đơn giản: atoms → molecules → sections

✅ Build system tương thích với cấu trúc QTDS mới

✅ Templates sẵn sàng cho landing pages QTDS chuyên nghiệp

## **Docs cho task401:**

- **Thư mục**: `/docs/tasks/20250822_task401_sap-xep-library/`
- **File chính**: `MO-TA_task401_[tong-quan.md](http://tong-quan.md)`
- **Quy tắc**: `YYYYMMDD_taskXXX_ten-cong-viec/`](http://cau-truc-library.md)