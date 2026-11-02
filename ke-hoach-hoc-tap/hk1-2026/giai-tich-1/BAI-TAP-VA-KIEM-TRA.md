# GIẢI TÍCH 1 — BÀI TẬP, KIỂM TRA VÀ CHỮA LỖI

Cập nhật 01/11/2026. Đồng hành cùng [giáo trình học cá nhân](README.md). Nguồn bài tập **chính**: PDF `Bai_tap_Giai_tich_Sinh_vien.pdf` do giảng viên Nguyễn Đức Ngà cung cấp. Dùng **mã bài** để tra đề gốc; nội dung tự soạn dưới đây là bài bổ trợ, KHÔNG phải chép đề từ PDF.

## Cách giao bài

- Với mỗi dạng trong sách bài tập: 3 câu nhận biết, 5 câu trung bình, 2 câu vận dụng; không cần hoàn thành cả 10 nếu đã nắm chắc.
- Một buổi: 2 nhận biết + 2 trung bình; thêm 1 vận dụng khi đã đúng tối thiểu 4/4. Khi gặp khó, AI gợi ý từng bước; không đưa đáp án trước.
- **Chấm 4 tiêu chí**: xác định miền/giả thiết; chọn phương pháp; biến đổi hợp lệ; trình bày và kiểm tra.
- **Đạt**: ≥80% của ít nhất 5 bài chưa xem giải, gồm ≥2 câu trung bình; giải thích được phương pháp. **Chưa đạt**: luyện lại lỗi bằng mã bài khác cùng dạng.
- Các câu AI tự soạn có thể đổi số, nhưng nếu mã bài PDF đã giao thì giữ nguyên mã để đối chiếu.

### Quy tắc mới sau phản hồi 02/11/2026

- **Buổi P phải dùng bài tập gốc từ `Bai_tap_Giai_tich_Sinh_vien.pdf`, ghi rõ mã bài và mức độ**, không dùng câu tự soạn chỉ thay số của ví dụ đã giảng. Nếu không có bản PDF trong phiên đó, nói rõ thiếu nguồn và chỉ dùng bài tự soạn khi người học đồng ý.
- **Ví dụ L không được trùng bài P**. Chọn bài vận dụng biến thể, kiểm tra điều kiện/biện luận, tránh lặp vô ích.
- **Không gửi đáp án hoặc gợi ý quá sớm**: cho người học thử, chữa theo ảnh, chỉ gợi ý khi bế tắc; người học muốn nhận cả đề một lượt thì gửi cả đề.
- **I.01-P được giao theo sách thầy:** Bài **1.6** (hàm hợp có phân thức/căn, mức trung bình), Bài **1.14** (hàm ngược của phân thức, mức trung bình). Khi làm vững mới mở **1.17** (trung bình) hoặc **1.9** (vận dụng có tham số). Bài tự luyện 5 câu cũ (9/10) chỉ là checkpoint L, không thay bài P.

## GT0 — Chẩn đoán nền (20–25 phút, không tính điểm)

Tự làm cả 5 câu; giải thích bằng lời tại sao thực hiện từng bước.

1. Tìm miền xác định của `f(x) = sqrt(3-x)/(x-1)`.
2. Rút gọn `(x²-9)/(x-3)`, nêu điều kiện của biểu thức ban đầu.
3. Tính `lim(x→2) (x²-4)/(x-2)`.
4. Tính `lim(x→0) sin(3x)/x` với góc radian, nếu chưa học có thể ghi “chưa học”.
5. Hàm số có thể không xác định tại x=a nhưng vẫn có `lim(x→a) f(x)` không? Tự giải thích hoặc cho ví dụ.

**Phân nhánh:** 4–5 câu làm tốt → I.01; 2–3 câu → ôn 1 buổi đại số/phân thức, miền xác định; 0–1 câu → ôn 2 buổi nền hàm số trước khi vào giới hạn. Không suy trình độ chỉ từ việc đã đọc lời giải.

## Bộ tự luyện bổ trợ Chương I

### Cụm A — Hàm số, giới hạn, liên tục

- A1. Tìm miền xác định `sqrt(5-2x)/ln(x+2)`. Ghi từng điều kiện và giao của chúng.
- A2. Cho `f(t)=sqrt(t+1)`, `g(x)=x²-2`. Tìm `f∘g` và miền xác định.
- A3. Tính `lim(x→3) (x²-9)/(x-3)`. Nêu lý do không được thay trực tiếp khi ra 0/0.
- A4. Tính `lim(x→0) (sqrt(1+x)-1)/x` bằng nhân liên hợp.
- A5. Tính hai giới hạn một phía của `|x|/x` khi x→0; kết luận giới hạn hai phía.
- A6. Tính `lim(x→0) sin(4x)/(2x)`, không dùng L’Hospital.
- A7. Tìm a để `f(x)=(x²-4)/(x-2)` khi x≠2 và `f(2)=a` liên tục tại x=2.

**Liên hệ sách thầy**: Dạng 1.1–1.7, mã Bài 1.1–1.70. Giao ưu tiên 1.1, 1.4; 1.21, 1.24; 1.31, 1.34; 1.41, 1.44; 1.51, 1.54; 1.61, 1.64.

### Cụm B — Đạo hàm, vi phân, các định lý

- B1. Tính đạo hàm `f(x)=x²+3x` tại x=1 bằng định nghĩa thương sai phân.
- B2. Đạo hàm `(x²+1)^3` theo quy tắc hàm hợp; nêu hàm trong/ngoài.
- B3. Viết tiếp tuyến của `y=x²` tại x=2.
- B4. Kiểm tra Rolle trên `f(x)=x²-4x+3` ở [1,3]; nêu đủ các giả thiết.
- B5. Xét cực trị của `f(x)=x³-3x`, dùng dấu f'(x).

**Liên hệ sách thầy**: Dạng 1.8–1.14, 1.17–1.18 (Bài 1.71–1.140, 1.161–1.180). Giao mã thực tế từ bảng I.06–I.13 ở README.

### Cụm C — Taylor, L’Hospital, tối ưu

- C1. Viết đa thức Maclaurin bậc 2 của `e^x`; giải thích ý nghĩa gần đúng quanh x=0.
- C2. Tính `lim(x→0) (e^x-1)/x` theo hai cách phù hợp sau khi học.
- C3. Dùng `f(x)=x(6-x)` trên [0,6] để xác định GTLN và nơi đạt.
- C4. Chỉ ra vì sao áp dụng L’Hospital cho giới hạn chưa phải dạng 0/0 hoặc ∞/∞ có thể sai.

**Liên hệ sách thầy**: Dạng 1.15–1.16, 1.19–1.20 (Bài 1.141–1.160, 1.181–1.200).

## Kiểm tra định kỳ (không xem tài liệu)

| Mốc | Thời lượng | Cấu trúc | Tiêu chí |
|---|---|---|---|
| Quiz A sau I.04 | 25 phút | 2 miền xác định/hàm hợp + 3 giới hạn + 1 câu lý luận | ≥5/6, không sai điều kiện miền |
| Quiz B sau I.08 | 30 phút | 2 liên tục + 3 đạo hàm + 1 câu định lý | ≥5/6, nêu giả thiết chính xác |
| Quiz C sau I.11 | 30 phút | 2 Taylor/vi phân + 2 L’Hospital + 1 câu phát hiện lỗi | ≥4/5 |
| **Thi thử Chương I sau I.14** | 75 phút | 2 hàm số/giới hạn, 2 liên tục/đạo hàm, 2 định lý/Taylor, 2 ứng dụng/biện luận | ≥6.5/10 để xác định phần yếu; mục tiêu tiếp theo ≥8/10 |
| Thi thử cuối học kỳ | 75–90 phút (dự kiến) | Chọn theo **phạm vi và cấu trúc đề thầy xác nhận**, không tự đoán | Chấm theo rubric đề thực tế |

**Đề thi thử Chương I số 1 (tự biên soạn; 10 điểm, 75 phút)**

1. (1 điểm) Tìm miền xác định `f(x)=sqrt(4-x)/(x²-1)`.
2. (1 điểm) Tìm `f∘g` và miền xác định khi `f(t)=ln(t)`, `g(x)=x²-4`.
3. (1 điểm) Tính `lim(x→1) (x²-1)/(x-1)`.
4. (1 điểm) Tính `lim(x→0) sin(5x)/(3x)`.
5. (1 điểm) Tìm a để `h(x)=(x²-9)/(x-3)` (x≠3), h(3)=a liên tục tại x=3.
6. (1.5 điểm) Tính đạo hàm `y=(x²+1)^4` và tiếp tuyến tại x=1.
7. (1 điểm) Phát biểu điều kiện Rolle; áp dụng cho `x²-4` trên [-2,2].
8. (1.5 điểm) Tìm cực trị địa phương của `f(x)=x³-3x²`.
9. (1 điểm) Viết Maclaurin bậc 2 của `e^x` và ước tính `e^{0.1}`.

**Chữa đề:** Không công bố đáp án trước. Khi nộp, chấm từng câu, đánh dấu lỗi kiểu: điều kiện, biến đổi, chọn kỹ thuật, dấu/số học, lập luận. Chỉ tạo đề 2 bằng các mã bài PDF tương đương nếu đề 1 chưa đạt.

## Nhật ký lỗi

Sau mỗi buổi, ghi theo mẫu:

```text
Ngày:
Bài / mã bài PDF:
Tự làm đúng: / ; đã xem hướng dẫn: / ;
Lỗi thực tế:
Bước sai / vì sao:
1 câu tự sửa:
Ôn lại +1: ; +3: ; +7:
Mức tự tin (1–5):
```

Tiến độ chính tại [TIEN-DO.md](TIEN-DO.md). Chỉ giáo viên/AI cập nhật “đã học” khi có bài làm thực tế, không tự suy ra.
