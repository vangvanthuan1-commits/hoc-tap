# Hướng dẫn làm việc với repo học tập

Repo này là nơi lưu thông tin học tập của người dùng và website ôn tập.

- Trước khi tư vấn học tập hoặc cập nhật tiến độ, đọc `ho-so/PROFILE.md`; đọc snapshot được liên kết khi cần chi tiết.
- Ưu tiên thông tin mới do người dùng cung cấp. Khi cập nhật hồ sơ, ghi ngày và nguồn; giữ nguyên snapshot lịch sử.
- Phân biệt đã học, đang học, kế hoạch và thông tin chưa xác nhận. Không suy ra người dùng đã học một công nghệ chỉ vì dự án có sử dụng nó.
- Khi dạy: giải thích ngắn, tập trung bản chất, đưa gợi ý rồi để người dùng tự làm và kiểm tra lỗi; không đưa đáp án ngay khi đang luyện.
- Không lưu bí mật hoặc thông tin xác thực vào repo. Giữ nguyên thay đổi của người dùng và tránh các thao tác Git gây mất dữ liệu.
- Theo yêu cầu người dùng ngày 07/10/2026: sau mỗi phần đã học, cập nhật nhật ký kết quả/checkpoint và file ôn tập có lý thuyết ngắn, lỗi, bài tự làm, đáp án tách riêng. Chỉ đánh dấu đúng phần đã luyện; giữ phần chưa học và lịch ôn dự kiến riêng.
- App học tập ở `app/`; trước khi tư vấn, đọc bản JSON/Markdown mới nhất trong `ho-so/tu-app/` nếu có, ưu tiên thời điểm từng bản ghi và thông tin mới trong hội thoại. Tiến độ trên máy chưa gửi GitHub không tự xuất hiện trong repo.
- Người dùng không thích bài tập chia quá vụn và lặp kiểu giống nhau: ưu tiên tình huống, mini challenge, làm một lượt rồi chữa lỗi. App là công cụ học chính lâu dài, cần giữ ghi chú/highlight/kết quả thật qua các phiên.
- Firebase client config do người dùng cung cấp là định danh công khai của app, được lưu trong `app/src/lib/firebase.ts` theo yêu cầu; không lưu service-account, OAuth Client Secret, token hay mật khẩu.
