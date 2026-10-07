# Thuận · Study Space

Ứng dụng học tập cá nhân cho Vàng Văn Thuận, Phenikaa AI K20. React + TypeScript + Vite; xanh nước biển/hồng; responsive và có manifest/service worker để cài lên màn hình chính.

## Chạy và kiểm tra

```sh
npm ci --prefix app
npm run dev --prefix app
npm run build --prefix app
npm run test --prefix app
```

Lệnh dev/build sao chép các trang HTML gốc vào `app/public/legacy`; các file sinh ra này không commit. Để nhập lại dữ liệu repo sau khi thay đổi chương trình, lịch hoặc CSV tiến độ:

```sh
python3 scripts/build-study-data.py
```

Không đánh dấu một tiết đã học chỉ vì app có nội dung hoặc người dùng mở bài.

## Tính năng hiện có

- Dashboard giữ đúng EN01 hoàn thành, EN02 đang học; thống kê chỉ từ tiến độ/phiên học thật.
- 122 tiết thuộc năm môn: tiếng Anh đầu vào, Giải tích, Vật lý, CNTT, Pháp luật. **22 bài có nội dung và 141 câu tự luyện; 100 tiết còn lại có đề cương, mục tiêu, bài tự luyện dự kiến và tài nguyên, chưa có toàn bộ bài giảng trong app.**
- Bài đọc, tình huống và thử thách; chọn đoạn để highlight ba màu hoặc lưu thành note. Ghi chú thêm/sửa/xóa/hoàn tác, tìm kiếm, lưu qua tải lại.
- Luyện có chữa từng câu hoặc kiểm tra ngắn có giờ. Chỉ nộp bài mới ghi lượt làm; không tự coi điểm này là điểm trường. EN17 có bài ký hiệu bằng chữ và liên kết nghe thật, không gán điểm bài chữ thành điểm nghe.
- Sổ lỗi/thẻ ôn từ câu sai và checkpoint, lịch ôn 1 → 3 → 7 ngày; người học tự trả lời trước khi mở đáp án.
- Focus timer lưu thời gian thật; checkpoint hoàn thành cần tự ghi kết quả và xác nhận đã luyện.
- Lịch 64 buổi theo cổng, tuần/danh sách, đổi tuần, nhảy tới buổi lớp đầu. Có mốc đầu vào 17–18/10 **dự kiến** và ghi rõ chưa có ca cá nhân.
- Bảng tính GPA tương tác dùng thang điểm Quy chế 1528/2026; không lưu kịch bản thành điểm thật.
- Lưu offline trên máy; xuất/nhập JSON được kiểm tra và hợp nhất. Dữ liệu hỏng không bị âm thầm thay bằng dữ liệu trắng; có đường tải nguyên bản để cứu.
- Firebase Authentication/Firestore và GitHub OAuth đã có mã tích hợp. **Cần bật provider, authorized domain và Firestore rules trong dự án trước khi coi đăng nhập/đồng bộ thực sự hoạt động.** Xem [FIREBASE-AND-SYNC.md](FIREBASE-AND-SYNC.md).

## Tiến độ ↔ repo

Firestore đồng bộ riêng theo tài khoản giữa các thiết bị. Nút GitHub tạo bản JSON + Markdown mới trong `ho-so/tu-app/` của repo cố định; thêm hai file trong cùng commit và không force cập nhật nhánh. Codex đọc bản mới này khi khôi phục ngữ cảnh. Chưa bấm gửi thì tiến độ cục bộ chưa xuất hiện trên GitHub.

OAuth GitHub token chỉ giữ trong bộ nhớ tab. Firebase client config do người dùng cung cấp là thông tin định danh public; không có private key/service-account/secret OAuth trong mã. Repo hiện public nên ghi chú gửi lên repo cũng công khai. App không đăng nhập cổng trường hoặc lưu mật khẩu trường.

## Triển khai

GitHub Pages hiện có tại `https://vangvanthuan1-commits.github.io/hoc-tap/`. Workflow trong `.github/workflows/study-app.yml` build/test app và triển khai artifact. Cần Pages đặt nguồn GitHub Actions. Base đường dẫn tương đối hỗ trợ cả Pages `/hoc-tap/` và Firebase Hosting `/`.

Firebase Hosting cấu hình tại `app/firebase.json`; khi có quyền quản lý dự án có thể deploy qua Firebase CLI. Không đưa thông tin xác thực CLI vào repo.
