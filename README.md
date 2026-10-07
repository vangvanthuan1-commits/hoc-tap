# Học tập

Repo này lưu thông tin học tập, tiến độ, mục tiêu, tài liệu và công cụ ôn tập của tôi.

## App học tập chính

[**Mở Thuận · Study Space**](https://vangvanthuan1-commits.github.io/hoc-tap/) — học các môn, ghi chú/highlight, luyện tập/kiểm tra, ôn lỗi và xem lịch. Giao diện xanh nước biển/hồng cho điện thoại và máy tính.

Mã nguồn, cách chạy và phạm vi bài học: [app/README.md](app/README.md). Kết nối Firebase/GitHub: [app/FIREBASE-AND-SYNC.md](app/FIREBASE-AND-SYNC.md). Bản tiến độ gửi từ app nằm ở [ho-so/tu-app/](ho-so/tu-app/README.md).

```sh
npm ci --prefix app
npm run dev --prefix app
```

## Hồ sơ và tiến độ

- [File ôn tập sau buổi học](ke-hoach-hoc-tap/hk1-2026/on-tap/README.md).
- [Hồ sơ hiện tại](ho-so/PROFILE.md): mục tiêu, checkpoint kiến thức, cách học và dự án.
- [Snapshot ngày 07/10/2026](ho-so/snapshots/2026-10-07.md): bản thông tin đầy đủ do tôi cung cấp.

Khi có thông tin mới, cập nhật hồ sơ hiện tại và ghi rõ ngày, nguồn. Giữ snapshot cũ làm lịch sử; phân biệt đã học, đang học, kế hoạch và thông tin chưa xác nhận. Không lưu mật khẩu, token hoặc khóa quản trị vào repo. Firebase client config công khai được lưu theo yêu cầu để app kết nối đúng dự án.

## Lịch học từ cổng sinh viên

- [Kết quả kiểm tra ngày 07/10/2026](lich-hoc/2026-10-07.md): ghi nhận ban đầu tuần 05–11/10; xem bản các tuần sau bên dưới để có phạm vi mới nhất.
- Khi cập nhật lịch, lưu ngày kiểm tra và phạm vi; không lưu thông tin xác thực hoặc phiên đăng nhập vào repo.

## Dữ liệu chương trình và lịch các tuần sau

- [Chương trình AI K20 đầy đủ](chuong-trinh-hoc/ai-k20-2026-10-07.md), kèm bản CSV cùng thư mục.
- [Lịch 12/10/2026–31/01/2027 theo tuần](lich-hoc/2026-10-07-cac-tuan-sau.md), kèm dữ liệu JSON cùng thư mục.
- Cập nhật từ cổng ngày 07/10/2026; ưu tiên dữ liệu mới hơn khi cổng thay đổi.

## Kế hoạch học kỳ 1

- [122 tiết tự học, thứ tự ưu tiên và ôn tiếng Anh đầu vào](ke-hoach-hoc-tap/hk1-2026/tung-tiet/README.md).
- [Mục tiêu GPA 3.6 và chuyên đề từng mã học phần](ke-hoach-hoc-tap/hk1-2026/README.md).
- Quy chế quy đổi điểm đã kiểm chứng; chuyên đề tự học được đánh dấu đề xuất, chờ đề cương lớp.

## Web Học Tập Cá Nhân (Chính thức)

Ứng dụng web học tập cá nhân toàn diện tại `index.html` (giao diện nền trắng hiện đại, tông Xanh nước & Hồng Rose, tối ưu cho cả điện thoại và máy tính):
- **122 Tiết tự học**: Đồng bộ trực tiếp với `ke-hoach-hoc-tap/hk1-2026/tung-tiet/tien-do.csv` (Tiếng Anh, Giải tích 1, Nhập môn CNTT & C, Vật lý 1, Pháp luật).
- **Ghi chú & Smart Highlighter**: Bôi đen note và highlight 4 màu (Xanh nước cốt lõi, Hồng bẫy lỗi, Vàng công thức, Xanh lá mẹo nhớ), tự động tổng hợp sổ tay bẫy lỗi.
- **Luyện tập & Thi thử**: Mô phỏng kỳ thi Tiếng Anh xếp lớp Phenikaa (50 câu / 60 phút), Mini test Giới hạn và Lập trình C kèm giải thích bản chất ngắn gọn.
- **Tư duy Logic & Trò chơi Mini**: Bắt bọ Code C (C Bug Hunter) và Spaced Repetition Flashcards (chu kỳ 1 / 3 / 7 ngày).
- **Thời khóa biểu Phenikaa**: Đầy đủ 64 buổi học kỳ 1 (từ 02/11/2026), phòng học, giảng viên, ca học và đồng hồ đếm ngược thi 17/10.
- **Cầu nối Firebase & GitHub Repo**: Đồng bộ đám mây Firebase Firestore (`hoc-tap-8c6f7`), LocalStorage offline-first, hỗ trợ File System Access API ghi thẳng vào repo `d:\Hoctap` và 1-click xuất báo cáo Markdown gửi cho Antigravity AI.

Chạy web từ thư mục repo:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```
Truy cập tại: `http://127.0.0.1:8000` (hoặc mở trực tiếp file `index.html` trên trình duyệt). Bản giao diện cũ được lưu an toàn tại `index-backup-dark.html`.
