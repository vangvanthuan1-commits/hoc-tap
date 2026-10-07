# Kiểm tra bản đầu — 07/10/2026

- TypeScript và Vite production build thành công; đường dẫn tương đối hỗ trợ GitHub Pages `/hoc-tap/`.
- 20 unit tests: hợp nhất offline/cloud, giữ ghi chú khác thiết bị và hai tab ghi đồng thời qua tải lại, tránh vòng lặp ghi, giữ bản sửa mới nhất, dấu xóa, cách ly tài khoản, kiểm tra backup/điểm, lỗi quota và dữ liệu hỏng, seed ghi chú không hồi sinh sau xóa, quy đổi/ trọng số GPA.
- Chromium/Playwright: thêm/sửa/xóa ghi chú, tải lại giữ nội dung; chọn chữ/highlight và lưu; chữa chỉ sau chọn đáp án; nộp bài tạo kết quả/thẻ ôn; checkpoint cần xác nhận; tải JSON; lịch tuần đầu tháng 11 có A4-102; mô phỏng GPA 3.76/3.72.
- Kiểm tra bố cục 375, 390, 768, 1024 và 1440 px: không tràn ngang ở các luồng chính. Không có JavaScript page error trong các lượt học/ghi chú/lịch/quiz đã kiểm tra.
- Bản production dưới `/hoc-tap/`: service worker sẵn sàng; mất mạng vẫn mở app, tải lại ghi chú và xem lịch. Mỗi bản build dùng tên cache theo hash để nhận phiên bản mới.
- Chặn localStorage ngay lần mở đầu: app vẫn mở và hiển thị lỗi lưu; không báo lưu thành công và không có JavaScript exception.
- Firebase Google login thực tế trả `auth/configuration-not-found`: chưa có cấu hình Authentication hoạt động. App giữ dữ liệu local và báo lỗi; chưa coi cloud/GitHub OAuth đã được xác minh end-to-end. Cần thiết lập theo FIREBASE-AND-SYNC.md.

Mọi bài làm/ghi chú tạo bởi kiểm tra tự động chỉ nằm trong browser context thử nghiệm và /tmp, không ghi thành tiến độ của Thuận hoặc đưa lên GitHub.
