# keHoachCongViec-Ngay5_20250822
Ngày cập nhật: 22 tháng 8, 2025 18:19
Nguồn: KLK-584_20250822_2.5Pro_DeepResearch_Ngày 5 - Tổng hợp CT-9 vào nhánh main
https://gemini.google.com/app/96b338955fbdad47

# Kế Hoạch Tái Cấu Trúc Thư Viện QTDS (Bản Tổng Thể)
Mục tiêu: Xây dựng "nhà kho LEGO" cho dự án QTDS theo một cấu trúc chuyên nghiệp, có tổ chức, áp dụng cách đặt tên dễ nhớ, có khả năng quản lý nhiều biến thể linh kiện và sẵn sàng mở rộng cho quy mô lớn.
## Phần 1: Kiến Trúc Tổng Thể Của "Nhà Kho"
Đây là bản thiết kế hoàn chỉnh cho toàn bộ kho tài sản số của bạn, bao gồm cả thư viện linh kiện, lõi hệ thống và kho thành phẩm.
### 1.1. Cấu trúc thư mục chuẩn
/PD-Digital-Assets/
├── /core/                  <-- Nơi chứa "Móng và Khung" chung
├── /library/               <-- Nơi chứa "Nội thất" (linh kiện)
│   ├── /01_atoms/
│   ├── /02_molecules/
│   └── /03_sections/
├── /workshop/              <-- (MỚI) Nơi lắp ráp, thử nghiệm các trang
├── /dist/                  <-- Nơi chứa "Ngôi nhà hoàn thiện"
├── /docs/                  <-- Nơi lưu trữ tài liệu, kế hoạch
├── /templates/             <-- Nơi chứa "Bản thiết kế" các ngôi nhà
└── build.js                <-- "Robot" lắp ráp

### 1.2. Thư viện Linh kiện (/library/) - Kho "Nội Thất"
Đây là nơi chứa các "viên gạch LEGO" có thể tái sử dụng.
Phân loại:
/01_atoms/: Linh kiện nhỏ nhất (nút bấm, ô nhập liệu).
/02_molecules/: Cụm linh kiện (thẻ bài viết, form tìm kiếm).
/03_sections/: Các khối lớn, hoàn chỉnh (khối giới thiệu, bảng giá).
Cách quản lý biến thể cho Content Hub (CT): Để quản lý các phiên bản khác nhau của cùng một linh kiện, chúng ta sẽ đặt tiền tố [mã-ct]-- vào trước tên file.
Ví dụ: /library/03_sections/sections-hero/
ct8--section-hero.html
ct9--section-hero.html Cách làm này giúp gom nhóm tất cả các file của cùng một content hub lại với nhau, cực kỳ dễ quản lý khi dự án lớn mạnh.
Nguyên tắc Vàng "Không Lặp Lại" (DRY): Nếu một linh kiện (ví dụ: section-footer) được dùng chung cho cả CT8 và CT9 mà không có gì khác biệt, chúng ta sẽ chỉ tạo một file duy nhất và không cần tiền tố.
Ví dụ: /library/03_sections/sections-footer/section-footer.html Đây sẽ là linh kiện "gốc". Chúng ta chỉ tạo biến thể ct...-- khi thực sự có sự khác biệt về cấu trúc hoặc giao diện.
### 1.3. Lõi Hệ Thống (/core/) - "Móng và Khung"
Đây là nơi chứa những file nền tảng, dùng chung cho tất cả các "ngôi nhà" (content hub).
Cấu trúc:
/core/
├── /styles/
│   ├── _base.css           <-- CSS nền móng, dùng cho TẤT CẢ
│   ├── ct8-theme.css       <-- Lớp "sơn" trang trí chỉ cho CT8
│   └── ct9-theme.css       <-- Lớp "sơn" trang trí chỉ cho CT9
│
└── /scripts/
    ├── main.js             <-- JS nền móng, dùng cho TẤT CẢ
    ├── ct8-init.js         <-- JS chức năng riêng chỉ cho CT8
    └── ct9-init.js         <-- JS chức năng riêng chỉ cho CT9


Cách hoạt động: "Robot" build.js sẽ tự động lấy file _base.css chung, sau đó lấy file -theme.css riêng của từng CT để gộp lại thành một file CSS hoàn chỉnh cho mỗi sản phẩm.

### 1.4. Xưởng Thực Hành (/workshop/) - Nơi Lắp Ráp & Thử Nghiệm

Đây là không gian làm việc linh hoạt của bạn. Trong khi /templates/ chứa các "bản thiết kế" chính thức, /workshop/ là nơi bạn có thể:
Thử nghiệm: Lắp ráp nhanh các linh kiện để xem chúng hoạt động cùng nhau như thế nào.
Phát triển trang mới: Xây dựng một landing page mới từ đầu đến cuối trong một không gian riêng biệt trước khi quyết định đưa nó vào /templates/ chính thức.

Lưu trữ các phiên bản đang làm dở: Giữ lại các trang đang trong quá trình phát triển mà chưa sẵn sàng để hoàn thiện.
Cách làm này giúp giữ cho thư mục /templates/ luôn sạch sẽ, chỉ chứa những bản thiết kế đã được kiểm duyệt và sẵn sàng để "robot" lắp ráp hàng loạt.

### 1.5. Kho Thành Phẩm (/dist/) - "Ngôi Nhà Hoàn Thiện"

Đây là thư mục chứa các file HTML cuối cùng sau khi đã được "robot" lắp ráp xong, sẵn sàng để bạn sao chép và nhúng lên LadiPage.
Quyết định quan trọng: Thư mục /dist/ sẽ KHÔNG được thêm vào .gitignore.
Lý do: Việc này biến mỗi file HTML hoàn chỉnh thành một "tài sản" được lưu trữ và quản lý phiên bản trên Git. Bạn có thể dễ dàng truy cập, xem lại lịch sử và lấy code từ bất cứ đâu.

## Phần 2: Quy Tắc Đặt Tên CSS (Không đổi)

Quy tắc đặt tên vẫn giữ nguyên sự đơn giản và hiệu quả:
Tiền tố bắt buộc: qtds-
Tên linh kiện: qtds-btn, qtds-card-dich-vu, qtds-hero
Biến thể: Dùng -- để phân biệt. Ví dụ: qtds-btn--chinh, qtds-btn--phu.

## Phần 3: Lộ Trình Hành Động

- Bước 1: Tạo Nhánh Mới ("Khu Vực Làm Việc")
git checkout -b cau-truc/task401-sap-xep-library

- Bước 2 -> Bước 5 (Giữ nguyên) Chúng ta sẽ tiếp tục các bước:
- Bước 2: Phân tích & Phân loại linh kiện từ CT8, CT9.
- Bước 3: Di chuyển & Đổi tên theo cấu trúc mới.
- Bước 4: Tạo file HUONG-DAN.md cho mỗi linh kiện.
- Bước 5: Nâng cấp "robot lắp ráp" build.js để hiểu được cấu trúc /core/ và /library/ mới.

## Phần 4: Quy Trình Ghi Chép Công Việc

Tạo Thư Mục docs: Lưu trữ mọi kế hoạch, tài liệu liên quan đến các task lớn.
Cách Đặt Tên File: [ma-task]-[ten-task]_[ngay-thuc-hien].md.
Ví dụ: task401-sap-xep-library_20250822.md
Kế hoạch đã được cập nhật đầy đủ. Đây là bản thiết kế cuối cùng để chúng ta bắt tay vào việc xây dựng một "nhà kho" chuyên nghiệp và bền vững.

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