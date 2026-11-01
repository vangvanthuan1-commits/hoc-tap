# GIẢI TÍCH 1 — GIÁO TRÌNH HỌC CÁ NHÂN (2026–2027)

> **Bản 1.0 • 01/11/2026 • Ưu tiên tài liệu của giảng viên Nguyễn Đức Ngà**
>
> Mục đích: tự học thật, bám bài trên lớp, có bài tập cụ thể, bài kiểm tra và ôn lại; KHÔNG đánh dấu tiến độ chỉ vì đã đọc tài liệu hoặc AI đã giải hộ.

## 1. Ba tài liệu chính và nguồn bổ trợ

**Tài liệu giảng viên (đã đối chiếu trực tiếp bản PDF người học gửi):**

1. `Giao_trinh_GT.pdf` — 388 trang, 4 chương: vi phân, tích phân, chuỗi, phương trình vi phân. Là tài liệu **lý thuyết chính** (dẫn theo mục §).
2. `Ch1_GT1.pdf` — 85 trang, **14 bài Chương I** với mục tiêu, kiến thức chuẩn bị, ví dụ và câu hỏi tự kiểm tra. Là tài liệu **học từng buổi trong giai đoạn đầu**.
3. `Bai_tap_Giai_tich_Sinh_vien.pdf` — 95 trang, **800 bài**, mỗi chương 20 dạng × 10 bài; trong mỗi dạng: 3 nhận biết, 5 trung bình, 2 vận dụng. **Là ngân hàng đề chính**, mã Bài 1.1...1.200 ở Chương I.

Các file gốc hiện người dùng đã gửi trong hội thoại, dự kiến lưu tại `tai-lieu/giai-tich-1/`; xem danh mục nguồn ở [đây](../../../tai-lieu/giai-tich-1/README.md). Nếu chưa thấy PDF trong thư mục GitHub, dùng lại file đính kèm hội thoại; **không hiểu liên kết chưa có là đã upload**.

**Tham khảo bổ sung**, để giải thích bằng góc nhìn khác, không thay thế trình tự của giảng viên:

- OpenStax, *Calculus Volume 1* (Functions, Limits, Derivatives, Applications, Integration): https://openstax.org/books/calculus-volume-1/pages/1-introduction
- OpenStax, *Calculus Volume 2* (Techniques of Integration, Sequences/Series): https://openstax.org/books/calculus-volume-2/pages/1-introduction
- MIT OpenCourseWare, 18.01SC Single Variable Calculus — bài giảng, ví dụ, problem sets, exams: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/
- 3Blue1Brown, *Essence of Calculus* — hình dung trực giác về giới hạn, đạo hàm, tích phân: https://www.3blue1brown.com/lessons/essence-of-calculus/
- Paul's Online Notes, Calculus I: https://tutorial.math.lamar.edu/classes/calci/calci.aspx

**Phạm vi:** Bộ sách gốc có 4 chương, nhưng **chưa có đề cương chính thức xác nhận tất cả 4 chương thuộc học phần Giải tích 1 trong kỳ này**. Chương I ưu tiên trước; Chương II học tiếp khi lớp đi tới; Chương III–IV đánh dấu **mở rộng/chờ xác nhận**, không mặc định là nội dung thi HK1. Bài tập và lịch trong file này là **chương trình gia sư đề xuất**, không phải lịch nộp bài do trường ban hành.

**Danh sách chi tiết 62 chủ đề, mã 130 buổi lý thuyết/luyện tập/kiểm tra:** [DANH-SACH-130-BUOI.md](DANH-SACH-130-BUOI.md). Đây là tổng thể tự học cả 4 chương, **không đồng nhất với 45 tiết chính khóa** và không buộc hoàn thành trong học kỳ này.

## 2. Quy tắc dạy và luyện tập (mỗi buổi 45–60 phút)

1. **5–10 phút khởi động:** ôn ngắn nền đại số/lượng giác hoặc bài lần trước. Bài tự làm, không nhận lời giải ngay.
2. **15 phút khái niệm:** trực giác → định nghĩa và điều kiện → 1 ví dụ nhận biết + 1 phản ví dụ/điều kiện sai.
3. **10 phút ví dụ hướng dẫn:** che lời giải PDF, tự nêu bước đầu, sau đó mới so sánh cách làm.
4. **15–20 phút luyện độc lập:** 2 câu nhận biết, 2 câu trung bình; sau khi làm tốt mới mở câu vận dụng. Ghi rõ miền, điều kiện và bước biến đổi.
5. **5 phút checkpoint:** tự nói được “vì sao cách này dùng được”; lưu mã bài, đúng/sai và lỗi, hẹn ôn +1, +3, +7 ngày.

**Quy tắc qua bài:** tối thiểu 80% trên ít nhất 5 câu chưa xem lời giải, gồm ít nhất 2 câu trung bình; phải giải thích được điều kiện áp dụng. Nếu chưa đạt: ôn đúng lỗi, làm bài cùng dạng khác thay vì đọc lại toàn chương. Với bài lý thuyết/chứng minh, đánh giá lập luận thay vì chỉ đáp số.

**Lưu ý về mã bài tập:** Dạng `1.k` chứa bài `1.(10k−9)` đến `1.(10k)`; thông thường 3 bài đầu nhận biết, 5 tiếp theo trung bình, 2 cuối vận dụng. Chọn mẫu 5 bài `đầu dạng, +1, +3, +5, +8` khi cần luyện đầy đủ. Mã giao bài dưới đây là **bài trong PDF của thầy**, không chép lại đề hoặc lời giải.

## 3. Bài mở đầu — đánh giá nền (GT0)

**Chỉ làm một lần trước Bài 1; không tính điểm học phần.**

- GT0-A: Tìm miền xác định của `sqrt(3-x)/(x-1)`.
- GT0-B: Rút gọn `(x²−9)/(x−3)` và giải thích tại sao x=3 vẫn bị loại khỏi biểu thức gốc.
- GT0-C: Tính `lim(x→2) (x²−4)/(x−2)`, ghi rõ lý do phép rút gọn hợp lệ khi tính giới hạn.
- GT0-D: Nếu nhớ, tính `lim(x→0) sin(3x)/x` (góc radian).
- GT0-E: Giải thích bằng lời sự khác nhau giữa `f(2)` và `lim(x→2) f(x)`.

**Phân nhánh:** sai quá 2/5 hoặc không giải thích được điều kiện → 1–2 buổi vá nền đại số, phân thức, hàm số; nếu khá → vào Bài 1, có thể học nhanh phần quen.

## 4. Chương I — 14 bài chính (bám sát Ch1_GT1.pdf)

PDF Chương I có trang bìa/mục lục; cột “Trang PDF” dưới đây là **số trang trong trình xem PDF**, không phải số trang in sách. Các mã trong “Giao bài” tra trực tiếp trong `Bai_tap_Giai_tich_Sinh_vien.pdf`.

| Bài | Nội dung & đầu ra cần đạt | Đọc | Giao bài từ sách bài tập |
|---|---|---|---|
| **I.01** | Hàm một biến: miền xác định, tập giá trị, hàm hợp/ngược; viết đầy đủ điều kiện xác định | Ch1 PDF tr.5–9; giáo trình §1.1 | **1.1, 1.2, 1.4, 1.11, 1.14**, nâng cao **1.19** |
| **I.02** | Giới hạn tại điểm, giới hạn trái/phải; phân biệt giá trị hàm và giới hạn | Ch1 tr.10–14; §1.2 | **1.31, 1.32, 1.34, 1.36**, nâng cao **1.39** |
| **I.03** | Giới hạn đại số/căn/vô cực, cơ bản lượng giác–mũ–log; lựa chọn phép biến đổi | Ch1 tr.15–20; §1.3 | **1.21, 1.24, 1.26, 1.41, 1.44**, nâng cao **1.49** |
| **I.04** | Vô cùng bé, vô cùng lớn; tương đương và giới hạn của phép thay | Ch1 tr.21–26; §1.4 | **1.51, 1.52, 1.54, 1.56**, nâng cao **1.59** |
| **I.05** | Liên tục và hàm từng đoạn; điều kiện tại điểm ghép, định lý giá trị trung gian | Ch1 tr.27–31; §1.5 | **1.61, 1.62, 1.64, 1.66**, nâng cao **1.69** |
| **I.06** | Đạo hàm bằng giới hạn thương sai phân, khả vi–liên tục, tiếp tuyến | Ch1 tr.32–36; §1.6 | **1.71, 1.74, 1.81, 1.84**, nâng cao **1.89** |
| **I.07** | Công thức đạo hàm, hàm hợp/ngược, vi phân, gần đúng tuyến tính | Ch1 tr.37–42; §1.7 | **1.91, 1.94, 1.101, 1.104, 1.111, 1.114** |
| **I.08** | Định lý Rolle, Lagrange, Cauchy; phát biểu **giả thiết trước** khi áp dụng | Ch1 tr.43–47; §1.8 | **1.121, 1.122, 1.124, 1.126**, nâng cao **1.129** |
| **I.09** | Đạo hàm cấp cao; dựng đa thức Taylor hữu hạn tại một tâm | Ch1 tr.48–53; §1.9 | **1.131, 1.132, 1.134, 1.136**, nâng cao **1.139** |
| **I.10** | Taylor/Maclaurin có phần dư, bậc khai triển và chặn sai số | Ch1 tr.54–58; §1.10 | **1.141, 1.142, 1.144, 1.146**, nâng cao **1.149** |
| **I.11** | Quy tắc L’Hospital: nhận dạng dạng vô định và kiểm tra điều kiện | Ch1 tr.59–64; §1.11 | **1.151, 1.152, 1.154, 1.156**, nâng cao **1.159** |
| **I.12** | Dấu đạo hàm, khoảng đơn điệu, điểm tới hạn, cực trị địa phương | Ch1 tr.65–69; §1.12 | **1.161, 1.162, 1.164, 1.166**, nâng cao **1.169** |
| **I.13** | GTLN/GTNN, bài toán tối ưu, tính gần đúng và điều kiện biên | Ch1 tr.70–74; §1.13 | **1.171, 1.174, 1.181, 1.184, 1.191, 1.194** |
| **I.14** | Tổng hợp phương pháp, chọn lời giải và phát hiện lập luận sai | Ch1 tr.75–81; §1.14 | **Đề tổng hợp Chương I** trong [file bài tập](BAI-TAP-VA-KIEM-TRA.md) |

**Nhịp đề xuất:** học 2 bài/tuần, thêm 1 khối luyện/ôn; 14 bài ≈ 7 tuần nếu giữ nhịp này. Đây là nhịp **tự học**, thay đổi theo tốc độ giảng viên. Chưa học tới đâu thì không đánh dấu xong.

## 5. Chương II — Tích phân (đọc khi chương trình lớp chuyển tới)

Giáo trình đầy đủ chứa **18 mục §2.1–§2.18**. Phân thành 4 cụm, có bài tương ứng từ ngân hàng Chương II:

| Cụm | Phần giáo trình | Năng lực | Dạng bài tập tương ứng |
|---|---|---|---|
| **II-A** | §2.1–§2.6 | Nguyên hàm, công thức, đổi biến, từng phần, hữu tỉ/lượng giác/căn | **2.1–2.6** |
| **II-B** | §2.7–§2.12 | Tổng Riemann/Darboux, khả tích, tính chất, định lý cơ bản, cận biến thiên | **2.7–2.12** |
| **II-C** | §2.13–§2.14 | Tích phân xác định: đổi biến, từng phần, đối xứng, gần đúng | **2.13–2.15** |
| **II-D** | §2.15–§2.18 | Tích phân suy rộng, hội tụ, so sánh, giá trị tuyệt đối | **2.16–2.20** |

**Cách giao bài cho từng dạng 2.k:** nhận biết `2.(10k−9)`, `2.(10k−8)`; trung bình `2.(10k−6)`, `2.(10k−4)`; vận dụng khi sẵn sàng `2.(10k−1)`. Chỉ mở rộng sau khi đã hoàn thành Chương I và khớp với lớp thực tế.

## 6. Chương III–IV — Lộ trình mở rộng, CHƯA xác nhận là nội dung thi Giải tích 1

- **III — Lý thuyết chuỗi:** §3.1–3.18 (dãy/chuỗi số → tiêu chuẩn hội tụ → chuỗi hàm/lũy thừa → Taylor/Maclaurin → Fourier). Gắn **20 dạng 3.1–3.20** trong sách bài tập, chọn bài theo công thức ở trên.
- **IV — Phương trình vi phân:** §4.1–4.12 (bài toán Cauchy; tách biến, tuyến tính cấp 1; cấp 2 hệ số hằng; biến thiên hằng số; kiểm tra nghiệm). Gắn **20 dạng 4.1–4.20**, chọn bài theo công thức trên.

**Nguyên tắc:** nếu giảng viên/syllabus chính thức xác nhận có phần nào thuộc Giải tích 1 thì đưa vào lịch học kỳ; nếu không, giữ để học tiếp, không nhồi 800 bài vào một học kỳ.

## 7. Nhịp học 15 tuần dự kiến (điều chỉnh theo lớp)

| Tuần tự học | Ưu tiên | Kiểm tra |
|---|---|---|
| 1 | GT0 + I.01–I.02 | Quiz 5 câu nền; chốt lỗi miền xác định/giới hạn một phía |
| 2 | I.03–I.04 | Quiz giới hạn có điều kiện; ôn 1/3/7 |
| 3 | I.05–I.06 | Quiz liên tục/đạo hàm định nghĩa |
| 4 | I.07–I.08 | Quiz đạo hàm và định lý |
| 5 | I.09–I.10 | Quiz Taylor, phần dư |
| 6 | I.11–I.12 | Quiz L’Hospital, đơn điệu |
| 7 | I.13–I.14 | **Đề Chương I** 60–75 phút, chữa lỗi |
| 8–10 | II-A (nếu lớp đã dạy) | 1 quiz/tuần về nguyên hàm/phương pháp |
| 11–12 | II-B (nếu lớp đã dạy) | Kiểm tra định nghĩa và điều kiện |
| 13 | II-C (nếu lớp đã dạy) | Quiz tích phân xác định |
| 14 | II-D (nếu lớp đã dạy) | Quiz suy rộng/hội tụ |
| 15 | Ôn đúng **phạm vi thầy xác nhận** | Đề tổng hợp + danh sách lỗi còn tồn |

Không coi đây là lịch chính thức. Nếu chương trình thực tế của lớp phân bổ khác, điều chỉnh theo slide/giáo viên.

## 8. Bài kiểm tra và quản lý tiến độ

- Bài tập/đề chẩn đoán + đề tổng hợp: [BAI-TAP-VA-KIEM-TRA.md](BAI-TAP-VA-KIEM-TRA.md).
- File ghi lại *đã học / chưa học / điểm thực tế / lỗi cần ôn*: [TIEN-DO.md](TIEN-DO.md).
- Cuối mỗi tuần: chọn ngẫu nhiên 5 câu đã sai, 5 câu dạng mới, ưu tiên khả năng tự giải.
- Khi nhắn “học Giải tích”: mở **bài đang học gần nhất trong TIEN-DO**, không tự nhảy chương; hỏi/kiểm tra rồi mới dạy tiếp.

## 9. Bắt đầu ngay

Buổi đầu tiên: **GT0 chẩn đoán 5 câu** ở mục 3. Nếu câu nền còn quên, ôn các phép biến đổi và giới hạn bằng trực giác; sau đó vào **I.01** với miền xác định, hàm hợp và hàm ngược. Không giải hộ trước khi người học thử.
