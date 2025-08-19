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