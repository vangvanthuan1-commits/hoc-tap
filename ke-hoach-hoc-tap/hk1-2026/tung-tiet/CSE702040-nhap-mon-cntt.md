# CSE702040 — Nhập môn CNTT: 20 tiết tự học

Cập nhật 07/10/2026 theo yêu cầu người dùng. **Một tiết trong tài liệu này là 45 phút tự học**, không phải bảng phân bố tiết chính thức của trường. Tất cả tiết mặc định chưa hoàn thành.

Đúng mã CSE702040 được tìm thấy ở nguồn School of Computing và trang giảng viên. Nguồn comp-beta đọc được mô tả về nghề nghiệp, đạo đức, pháp lý, an ninh và tác động xã hội; chưa có bảng tiết/rubric thi. IT11–17 là nhánh Linux/Python dự phòng theo catalog tham khảo, chờ xác nhận công cụ thực hành lớp; nếu lớp dùng công cụ khác, thay bằng lab chính thức.

Bạn có kinh nghiệm CS/C/web. Kiểm tra IT01–03 và IT10 bằng bài tự làm; không bỏ phần nghề nghiệp/đạo đức và không coi code AI tạo là chứng cứ đã nắm lab.

## Cách dùng mỗi tiết

5 phút ôn lỗi cũ → 10 phút khái niệm → 10 phút ví dụ có hướng dẫn → 15 phút tự luyện → 5 phút kiểm tra cuối tiết. Với nghe/đọc hoặc đề tổng hợp, dùng phân bổ riêng trong bảng. Nếu không đạt, dành lượt tiếp theo sửa lỗi trước khi chuyển phần phụ thuộc. Điều kiện đạt dưới đây là chuẩn tự luyện đề xuất, không phải quy định đánh giá của trường.

| Tiết | Chuyên đề | Mục tiêu | Tự luyện trong tiết | Điều kiện chuyển bài |
|---|---|---|---|---|
| IT01 | Chẩn đoán và tổng quan | CNTT/CS/AI; phần cứng/phần mềm | 10 câu và sơ đồ hệ thống | ≥8/10; tách rõ hệ điều hành/ứng dụng |
| IT02 | Bit, byte, hệ đếm | Nhị phân, hệ 16, dung lượng | 15 bài đổi cơ số/dung lượng | ≥13/15 |
| IT03 | Mã hóa dữ liệu | Số, ký tự, Unicode, ảnh/âm thanh | 8 bài dung lượng ảnh và biểu diễn ký tự | ≥7/8; phân biệt dữ liệu với cách mã hóa |
| IT04 | CPU và bộ nhớ | CPU/cache/RAM/ROM/SSD; thực thi chương trình | Sơ đồ đường đi dữ liệu từ file đến CPU | Giải thích đúng vai trò từng phần |
| IT05 | Hệ điều hành và file | File, đường dẫn, process, quyền | Tổ chức thư mục tài liệu và giải thích process | Tự làm lại, không mất dữ liệu |
| IT06 | Mạng và Internet | IP, DNS, client/server, LAN | Vẽ luồng truy cập một website | Phân biệt IP, domain, URL |
| IT07 | Web và dịch vụ số | HTTP/HTTPS, trình duyệt, dữ liệu cá nhân | 5 tình huống web và quyền truy cập | ≥4/5; hiểu HTTPS không bảo đảm mọi nội dung đáng tin |
| IT08 | An toàn số | Phishing, MFA, sao lưu, quyền tối thiểu | 8 tình huống nhận diện và xử lý | ≥7/8; không lưu mật khẩu vào repo |
| IT09 | Nghề nghiệp, đạo đức và xã hội | Bản quyền, quyền riêng tư, AI, trách nhiệm nghề nghiệp | 3 tình huống với lập luận, không chỉ chọn đáp án | Nêu ảnh hưởng, trách nhiệm và cách xử lý |
| IT10 | Thuật toán và lưu đồ | Tuần tự/rẽ nhánh/lặp, input/output | 3 lưu đồ: max, tổng chẵn, kiểm tra nguyên tố | Chạy tay được với dữ liệu biên |
| IT11 | Linux: đường dẫn và file | Nhánh dự phòng: pwd, ls, cd, mkdir, cp, mv | Bài tổ chức thư mục trong vùng thử nghiệm riêng | Tự làm lại; không dùng lệnh xóa rộng |
| IT12 | Linux: quyền và quy trình | Nhánh dự phòng: quyền, process, đọc trợ giúp | 5 tình huống đường dẫn/quyền | ≥4/5 và giải thích thay đổi |
| IT13 | Python: biến và dữ liệu | Nhánh dự phòng: nhập/xuất, kiểu và toán tử | 3 chương trình đổi đơn vị/tính trung bình | Tự viết và giải thích từng dòng |
| IT14 | Python: điều kiện | Nhánh dự phòng: if/elif, toán tử so sánh | 3 bài phân loại và kiểm tra dữ liệu | Đúng ca biên; không nhầm =/== |
| IT15 | Python: vòng lặp | Nhánh dự phòng: for/while, tích lũy | 3 bài tổng, đếm, tìm max | Không lệch chỉ số hoặc lặp vô hạn |
| IT16 | Python: hàm và danh sách | Nhánh dự phòng: hàm, list, tham số | 2 bài xử lý danh sách | Tự viết, kiểm tra rỗng và 1 phần tử |
| IT17 | Dữ liệu file/CSV | Nhánh dự phòng: đọc dữ liệu nhỏ, thống kê | Một file 10 dòng, xuất kết quả tổng hợp | Không lộ dữ liệu cá nhân; giải thích quy trình |
| IT18 | Lab theo đề lớp | Thay bằng công cụ và bài chính thức đã được giao | Làm lại 1 lab từ đầu, lưu sản phẩm | Đủ rubric chính thức; chưa có rubric thì chỉ tự luyện |
| IT19 | Chuyển đổi số và xu hướng công nghệ | Chủ đề có trong phần xem trước bài giảng cũ đúng mã năm 2024; phân biệt số hóa và chuyển đổi quy trình | Chọn đăng ký môn học: vẽ trước/sau, đề xuất công cụ, lợi ích, rủi ro và chỉ số hiệu quả | Giải thích được thay đổi quy trình; chưa xác nhận câu thi hoặc yêu cầu bài nhóm |
| IT20 | Ôn nền + thực hành | Lý thuyết trộn và tái hiện thao tác | 20 câu nền, làm lại 1 lab không xem hướng dẫn | ≥18/20; tự thao tác, chưa khẳng định dạng thi |

## Ghi lại sau tiết

- Ngày học và thời lượng thực tế.
- Số bài tự làm đúng/tổng; kỹ năng hoặc dạng bài.
- Lỗi chính, nguyên nhân và bài sửa.
- Kết quả ôn lại sau 1, 3, 7 ngày.
- Khi có slide/đề cương chính thức: mã môn, năm áp dụng, số trang và nội dung cần chỉnh.

Nguồn và mức xác minh: [nhật ký tìm đề cương/thi](../nguon-de-cuong-va-thi-2026-10-07.md). Kế hoạch ưu tiên: [README](README.md).

Cập nhật từ tài liệu cũ: [Bài 14 năm 2024 và mức đã đọc](../tai-lieu-cu-cung-ma-2026-10-07.md). IT19 đã bổ sung chủ đề chuyển đổi số; nhánh Linux/Python vẫn là dự phòng, chưa được xác nhận từ bài này.
