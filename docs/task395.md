<<<<<<< HEAD
# TÓM TẮT NHIỆM VỤ

- **ID Task Notion:** Task395
- **Link Notion:** [Dán link đến task trên Notion của bạn vào đây]

## MỤC TIÊU CẦN ĐẠT
Sửa lỗi và nâng cấp CSS giao diện cho 4 section chính của dự án:

1.  [cite_start]**sections-solutions**: Sửa lỗi hiển thị CSS đang chưa được ưng ý[cite: 630].
2.  [cite_start]**sections-featured**: Sửa lỗi hiển thị bố cục kém chất lượng[cite: 631].
3.  [cite_start]**sections-cta**: Sửa lỗi giao diện và tab[cite: 632].
4.  [cite_start]**sections-library**: Sửa lỗi hiển thị nút "Xem thêm"[cite: 633].

## TIÊU CHUẨN HOÀN THÀNH
- Giao diện hiển thị đúng và đẹp trên cả desktop và mobile.
- Code CSS tuân thủ quy ước BEM đã học.
- Mỗi section được sửa xong sẽ có một commit riêng.

## GHI CHÚ
- Có thể tham khảo ct-7.html để làm tham khảo các tính năng cần chỉnh sửa. 

# BẮT ĐẦU CÔNG VIỆC 

## Công việc 1 
- Sửa lỗi **sections-featured**: Sửa lỗi hiển thị bố cục kém chất lượng 
- Vấn đề, các giả lập hiển thị khi load API đang hiển thị sát nhau, trông rất xấu. 

Kết quả: 

- Phân Tích & Giải Pháp
- Vấn đề Skeleton Loader: Khi JavaScript chèn các skeleton card vào, div chứa chúng (.swiper-wrapper) là một flex container nhưng không có thuộc tính gap. - Điều này khiến các skeleton dính liền vào nhau.

- Giải pháp: Thêm gap vào cho .qtds-featured__carousel .swiper-wrapper trong file CSS.

- Vấn đề Swiper Carousel: Cấu hình Swiper trong file JS của bạn thiếu tham số spaceBetween, nên khi thư viện chạy, nó cũng đặt các slide thật sát nhau.

- Giải pháp: Thêm thuộc tính spaceBetween: 30 vào cấu hình Swiper trong file JS.


## Công việc 2 
- Sửa lỗi [cite_start]**sections-library**: Sửa lỗi hiển thị nút "Xem thêm"[cite: 633]. 
- Cung cấp: section-library.css, section-library.html, section-library.js

- Kết quả: Tôi đã phân tích và xác định chính xác nguyên nhân lỗi như bạn mô tả: Nút "Xem thêm" khi tải sẽ hiện cả chữ và vòng xoay loading.

Lỗi này xảy ra do một quy tắc CSS trong file component-button.css đang "ép" chữ và icon bên trong nút phải luôn có màu, kể cả khi nút đang ở trạng thái loading.

Giải Pháp
Chúng ta chỉ cần thêm một quy tắc CSS mới vào file component-button.css để "ra lệnh" cho chữ và icon phải ẩn đi (trở nên trong suốt) khi nút có class .loading.

Các file HTML và JS của bạn đã xử lý logic đúng nên không cần thay đổi.

## Công việc 3
- [cite_start]**sections-solutions**: Sửa lỗi hiển thị CSS đang chưa được ưng ý[cite: 630]. 
- Cung cấp: section solutions 
1. section-solutions.css
2. section-solutions.html

Tôi đã phân tích và xác định chính xác hai vấn đề bạn nêu ra trong sections-solutions:

Hiệu ứng cứng nhắc: Các khối "Pillar" khi rê chuột vào bị giật lên thay vì chuyển động mượt mà. Nguyên nhân là do class .qtds-pillar thiếu thuộc tính transition.

Hiệu ứng nền xanh khó đọc: Khi rê chuột, có một vầng sáng màu xanh lam hiện ra làm mờ chữ. Đây là hiệu ứng được tạo bởi pseudo-element ::before.

Chúng ta sẽ khắc phục cả hai vấn đề này bằng cách cập nhật duy nhất file sections-solutions.css.

## Công việc 4
- Sửa lỗi **sections-cta**: Sửa lỗi giao diện và tab 
- Cung cấp: 
1. section-cta.css 
2. section-cta.html

Tôi đã phân tích và hiểu rõ vấn đề của sections-cta. Bạn nói đúng, nó không giống với ct-7 vì có một hiệu ứng trang trí ở góc trên bên phải, tạo ra cảm giác như một cái "tab" không được bo góc.

Nguyên nhân là do một quy tắc CSS (.qtds-cta::before) đang tạo ra một vầng sáng trang trí, nhưng nó lại phá vỡ thiết kế thẻ (card) đồng nhất. Để làm cho nó giống với ct-7, chúng ta chỉ cần loại bỏ hiệu ứng trang trí này.

## Công việc 5
- Công việc phát sinh: làm cho các section màu sắc khác nhau để tạo cảm giác dễ chịu. 
- Cung cấp đoạn code gốc và yêu cầu tiếp 

Bạn nói đúng, có một vài chỗ chúng ta cần dọn dẹp để các file CSS mới mà chúng ta vừa sửa có thể hoạt động chính xác. Cụ thể là các thuộc tính style="..." nằm trực tiếp trên các thẻ <section>. Giờ đây, màu nền đã được định nghĩa trong các file CSS riêng, nên các thuộc tính style này không còn cần thiết nữa.

Tôi đã giúp bạn dọn dẹp lại file index.html cho gọn gàng. Bạn hãy thay thế toàn bộ nội dung file cũ bằng phiên bản đã được tinh chỉnh dưới đây nhé.

## Công việc 6
- Vấn đề: phát sinh lỗi ở section-solutions
1. Phần hiển thị hình ảnh bị phá cấu trúc - hình ảnh đang hiển thị rất to. 
2. Button không còn hiển thị đúng nữa - bị di chuyển sát lên tab 

Nguyên nhân của cả hai lỗi này là do khi chúng ta dọn dẹp code bằng cách xóa các thuộc tính style="..." ra khỏi HTML (một việc làm rất tốt), chúng ta đã quên không chuyển các quy tắc định dạng đó vào file sections-solutions.css.

Dưới đây là phiên bản CSS đã được bổ sung lại các quy tắc bị thiếu để khắc phục triệt để vấn đề.
=======
## TÓM TẮT NHIỆM VỤ: TASK399

ID Task Notion: Task399

Link Notion: https://www.notion.so/aigrowthlabvn/Task399_HOC-18_Ng-y-4-ph-n-t-ch-CT-6_20250819-254607b02a1a809ca812cbcd079f53d7?v=187607b02a1a80c9a5b6000c038cfc28&source=copy_link

## MỤC TIÊU
Thực hiện rã (deconstruct) landing page CT-6 thành các thành phần (components) và khối (sections) riêng lẻ.

Phân tích, so sánh và đối chiếu các thành phần được tách ra với thư viện hiện có trong nhánh main.

Chuẩn hóa các thành phần mới hoặc các phiên bản cải tiến theo tiêu chuẩn của dự án (BEM, CSS Variables).

Xây dựng một tài sản mới, CT-9, từ các thành phần đã được chuẩn hóa.

## VẤN ĐỀ CẦN GIẢI QUYẾT
Xử lý tình trạng nội dung/component từ CT-6 bị trùng lặp hoặc chồng chéo với các component đã có trong dự án.

Thiết lập một quy trình chuẩn để "hấp thụ" các thiết kế bên ngoài vào thư viện một cách có hệ thống.

## THÔNG TIN CÔNG VIỆC 

1. Tạp TASK_BRIEF.md 
- Nơi đang làm việc 

2. Tạo thư mục CT-6_breakdown

### 1.3. Cấu trúc Thư mục Workshop: "Phòng sạch" cho Kỹ thuật Đảo ngược
Đây là bước hiện thực hóa ý tưởng "xưởng rã" của bạn thành một cấu trúc thư mục vật lý, logic và có tổ chức.

Hành động: Trong thư mục gốc của dự án, hãy tạo cấu trúc thư mục sau:

/workshops/
└── CT-6_breakdown/
    ├── original/
    ├── extracted-sections/
    └── analysis.md

Lý do: Cấu trúc này cung cấp một không gian làm việc cực kỳ khoa học:

workshops/: Thư mục cấp cao nhất, chứa tất cả các "xưởng" phân tích trong tương lai.

CT-6_breakdown/: "Xưởng" dành riêng cho nhiệm vụ hiện tại.

original/: Nơi lưu trữ tệp CT-6.html nguyên bản, không bị chỉnh sửa. Đây là bản gốc để đối chiếu bất cứ lúc nào.

extracted-sections/: Đây là "bàn mổ" chính, nơi chúng ta sẽ đặt các đoạn mã HTML, CSS, JS thô sau khi tách ra từ tệp gốc.

analysis.md: Cuốn "sổ tay phòng thí nghiệm". Chúng ta sẽ sử dụng tệp này để ghi lại quá trình phân tích, các quyết định kiến trúc và ma trận đối chiếu, tận dụng thế mạnh của Markdown trong việc viết tài liệu mà bạn đã quen thuộc.

### 1.4. Commit Khởi tạo: Đóng dấu Nền móng
Sau khi đã hoàn tất việc thiết lập, chúng ta sẽ lưu lại trạng thái ban đầu này bằng một commit đầu tiên.

Hành động: Thực thi các lệnh sau trong terminal:

Bash

git add.
git commit -m "docs(task): khởi tạo workshop rã CT-6 (Task399)"
Lý do: Commit này khóa lại toàn bộ cấu trúc và bản tóm tắt nhiệm vụ chúng ta vừa tạo. Nó tuân thủ chuẩn Conventional Commits đã học  và chính thức đánh dấu sự bắt đầu của công việc trên Task399.

Việc thiết lập một cách bài bản như trên không chỉ là sự chuẩn bị cho một nhiệm vụ. Nó là một bước nâng cấp cơ bản cho toàn bộ phương pháp luận phát triển của bạn. Bạn đang chuyển từ việc phát triển theo yêu cầu (ad-hoc) sang phát triển dựa trên hệ thống (system-driven), thiết lập một năng lực R&D và kỹ thuật đảo ngược chính thức cho "nhà máy tài sản số" của mình. Điều này biến nỗi lo về "sự chồng chéo" thành một quy trình an toàn, có kiểm soát và có thể lặp lại để đổi mới.

- Chuyển sang nội dung ghi chú trong analysis.md của CT-6_bearkdown
>>>>>>> workshop/task399-deconstruct-ct6
