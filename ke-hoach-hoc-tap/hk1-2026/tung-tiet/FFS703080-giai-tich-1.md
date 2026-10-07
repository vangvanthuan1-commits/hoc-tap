# FFS703080 — Giải tích 1: 32 tiết tự học

Cập nhật 07/10/2026 theo yêu cầu người dùng. **Một tiết trong tài liệu này là 45 phút tự học**, không phải bảng phân bố tiết chính thức của trường. Tất cả tiết mặc định chưa hoàn thành.

Đề xuất nền giải tích một biến; chưa có đề cương đúng mã FFS703080. Không dùng phạm vi FFS703008 (mã khác) để suy ra phải thi tích phân bội hoặc ODE. GT18–19, GT29 và phần mở rộng chỉ học sâu khi slide xác nhận.

Bạn đang học giới hạn. Làm GT01 để kiểm tra; nếu đạt, có thể đi thẳng GT09, rồi GT10–13. Không tự đánh dấu GT02–08 đã hoàn thành.

## Cách dùng mỗi tiết

5 phút ôn lỗi cũ → 10 phút khái niệm → 10 phút ví dụ có hướng dẫn → 15 phút tự luyện → 5 phút kiểm tra cuối tiết. Với nghe/đọc hoặc đề tổng hợp, dùng phân bổ riêng trong bảng. Nếu không đạt, dành lượt tiếp theo sửa lỗi trước khi chuyển phần phụ thuộc. Điều kiện đạt dưới đây là chuẩn tự luyện đề xuất, không phải quy định đánh giá của trường.

| Tiết | Chuyên đề | Mục tiêu | Tự luyện trong tiết | Điều kiện chuyển bài |
|---|---|---|---|---|
| GT01 | Chẩn đoán nền | Tìm lỗ hổng đại số và giới hạn | 10 câu: đổi dấu, nhân tử, phân thức, 0/0, sin; ghi lỗi từng câu | ≥8/10; yếu nhóm nào học lại nhóm đó |
| GT02 | Ngoặc và phân thức | Đổi dấu toàn bộ; quy đồng; rút gọn có điều kiện | 8 biểu thức, gồm -(1-x), (x²-1)/(x-1) | ≥7/8 và ghi điều kiện xác định |
| GT03 | Lượng giác cần dùng | Sin/cos/tan, đẳng thức, radian | 8 bài đổi radian và rút gọn lượng giác | ≥7/8; biết tan=sin/cos |
| GT04 | Hàm, đồ thị, dãy | Miền xác định, hàm hợp, hàm cơ bản, giới hạn dãy | 6 miền xác định và 2 ví dụ dãy hội tụ | ≥7/8; phân biệt dãy với hàm |
| GT05 | Giới hạn trực tiếp | Thế trực tiếp; giới hạn hữu hạn; nhận dạng vô định | 10 giới hạn, phân loại trước khi giải | ≥8/10; không coi 0/0 là 0 |
| GT06 | 0/0 bằng nhân tử | Tách nhân tử và khử nhân tử trên miền phù hợp | 8 bài đa thức/phân thức | ≥7/8; không thay x=a trước khi khử |
| GT07 | 0/0 bằng liên hợp | Căn và biểu thức liên hợp | 6 giới hạn có căn | ≥5/6 và giải thích cách chọn liên hợp |
| GT08 | Vô cực và một phía | So bậc; giới hạn trái/phải; dấu của vô cực | 8 bài gồm mẫu tiến về 0 | ≥7/8; phân biệt ±∞ |
| GT09 | Giới hạn sin | sin(u)/u với u→0; thay biến | 8 bài sin(kx)/(mx), sin²(x)/x² | ≥7/8; chỉ rõ u→0 |
| GT10 | Giới hạn tan và cos | tan(x)=sin(x)/cos(x); 1-cos(x)=2sin²(x/2) | 8 bài tan(3x)/x và (1-cos(2x))/x² cùng biến thể | ≥7/8; giải thích từng phép đổi |
| GT11 | Giới hạn mũ và log | e^u-1; ln(1+u); cơ số a | 8 bài cơ bản và biến đổi đối số | ≥7/8; kiểm tra miền log |
| GT12 | Vô cùng bé tương đương | Điều kiện thay tương đương; tích/thương và bẫy tổng/hiệu | 6 bài hợp lệ và 2 phản ví dụ | ≥7/8; không thay máy móc |
| GT13 | Test giới hạn | Chọn đúng phương pháp, không nhầm dấu | 12 câu trộn, 35 phút; 10 phút sửa lỗi | ≥10/12; lỗi cũ không lặp |
| GT14 | Liên tục và tham số | Giới hạn trái/phải bằng giá trị hàm | 6 hàm từng đoạn cần tìm tham số | ≥5/6, đủ ba điều kiện |
| GT15 | Định nghĩa đạo hàm | Tỉ số sai phân; ý nghĩa độ dốc và tiếp tuyến | Tính từ định nghĩa cho x²; 4 bài tiếp tuyến đơn giản | ≥4/5; hiểu đạo hàm tại điểm |
| GT16 | Quy tắc đạo hàm | Tổng/tích/thương; đạo hàm cơ bản | 12 đạo hàm, gồm lượng giác/mũ/log | ≥10/12; không bỏ mẫu bình phương |
| GT17 | Đạo hàm hàm hợp | Quy tắc dây chuyền; nhiều lớp | 10 biểu thức hợp, nêu hàm ngoài/trong | ≥9/10; nhân đủ đạo hàm trong |
| GT18 | Đạo hàm cấp cao và hàm ẩn | Đạo hàm cấp 2; đạo hàm ẩn khi đề cương có | 6 bài theo mức đã học | ≥5/6; bỏ phần hàm ẩn nếu không thuộc phạm vi |
| GT19 | L’Hôpital có điều kiện | Chỉ dùng cho dạng phù hợp và đủ giả thiết | 6 giới hạn, giải bằng cách nền trước rồi đối chiếu | ≥5/6; nêu dạng 0/0 hoặc ∞/∞ hợp lệ |
| GT20 | Định lý giá trị trung bình | Rolle, Lagrange và điều kiện áp dụng | 4 bài kiểm tra giả thiết, 2 ứng dụng | ≥5/6; không bỏ điều kiện trên đoạn |
| GT21 | Đơn điệu | Dấu đạo hàm; các khoảng xác định | 3 bảng dấu và khoảng tăng/giảm | Đúng cả miền và khoảng của 3 bài |
| GT22 | Cực trị và GTLN/GTNN | Điểm tới hạn; biên đoạn; điều kiện miền | 6 bài cực trị và cực trị trên đoạn | ≥5/6; xét đủ biên |
| GT23 | Lồi lõm và khảo sát | Đạo hàm cấp 2, tiệm cận, bảng biến thiên | Khảo sát 2 hàm với checklist | Không thiếu miền, dấu đạo hàm và giới hạn |
| GT24 | Bài toán tối ưu | Mô hình, ràng buộc, chọn biến và kiểm tra biên | 3 bài diện tích/chi phí/hình học | ≥2/3; giải thích nghiệm phù hợp |
| GT25 | Nguyên hàm | Nhận dạng mẫu; hằng số C | 12 nguyên hàm cơ bản | ≥10/12; kiểm tra bằng đạo hàm |
| GT26 | Tích phân xác định | Newton–Leibniz; cận và dấu | 8 bài có đổi thứ tự cận hoặc hàm đổi dấu | ≥7/8; phân biệt diện tích với tích phân có dấu |
| GT27 | Đổi biến | Chọn u, đổi vi phân và cận | 8 tích phân | ≥7/8; đổi cận hoặc quay về biến cũ đúng |
| GT28 | Từng phần | Chọn u/dv; công thức và dấu | 6 tích phân kiểu x·e^x, x·sin(x), ln(x) | ≥5/6; kiểm tra bằng đạo hàm |
| GT29 | Tích phân hữu tỉ và lượng giác | Phân tích mẫu; nhận dạng mẫu đặc biệt | 6 bài đúng mức slide; không mở rộng nếu chưa cần | ≥5/6; ghi điều kiện và phương pháp |
| GT30 | Ứng dụng tích phân | Diện tích giữa các đồ thị; tách khoảng | 4 bài giao điểm và diện tích | ≥3/4; không cộng diện tích âm |
| GT31 | Đề tự luyện tổng hợp 1 | Giới hạn–liên tục–đạo hàm | Bài trộn 35 phút rồi chấm lỗi theo dạng | ≥85%; đây không phải đề thi chính thức |
| GT32 | Đề tự luyện tổng hợp 2 | Tích phân và bài tổng hợp | Bài trộn 35 phút; chốt 5 lỗi hay mắc | ≥85% ở hai lượt và tự giải thích được |

## Ghi lại sau tiết

- Ngày học và thời lượng thực tế.
- Số bài tự làm đúng/tổng; kỹ năng hoặc dạng bài.
- Lỗi chính, nguyên nhân và bài sửa.
- Kết quả ôn lại sau 1, 3, 7 ngày.
- Khi có slide/đề cương chính thức: mã môn, năm áp dụng, số trang và nội dung cần chỉnh.

Nguồn và mức xác minh: [nhật ký tìm đề cương/thi](../nguon-de-cuong-va-thi-2026-10-07.md). Kế hoạch ưu tiên: [README](README.md).
