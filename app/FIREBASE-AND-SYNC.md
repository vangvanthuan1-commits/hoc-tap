# Lưu tiến độ và kết nối repo

Ứng dụng dùng dự án Firebase `hoc-tap-8c6f7` do người dùng cung cấp. Cấu hình client nằm tại `src/lib/firebase.ts`; đây là thông tin định danh công khai, không phải mật khẩu. Analytics không tự bật. App không sử dụng tài khoản hoặc mật khẩu cổng sinh viên.

## Dữ liệu được lưu ở đâu?

- Chưa đăng nhập: trạng thái tiết học, ghi chú, highlight, bài kiểm tra, thẻ ôn và phiên học lưu trong localStorage của trình duyệt hiện tại. Tải JSON để có bản sao; xóa dữ liệu trình duyệt có thể mất bản cục bộ.
- Đăng nhập Google hoặc GitHub: app đọc bản lưu máy chủ trước, hợp nhất với tiến độ cục bộ rồi tự đồng bộ Firestore. Đường dẫn duy nhất: `users/{Firebase UID}/learning/state`. Đổi tài khoản dùng vùng lưu cục bộ riêng. Lần đầu đăng nhập nhận tiến độ khách trên thiết bị.
- Mất mạng: thao tác vẫn lưu cục bộ. App báo trạng thái thật; không ghi “đã đồng bộ” nếu dịch vụ trả lỗi. Kết nối trở lại sẽ thử đồng bộ sau khi nhận được bản máy chủ. Nếu cấu hình hoặc rules sai, sửa rồi đăng nhập lại.
- Xuất/nhập JSON: không cần Firebase hoặc GitHub. Nhập kiểm tra schema, điểm bài làm và mã bản ghi; hợp nhất theo ngày sửa mới nhất, giữ dấu xóa để không khôi phục ghi chú đã xóa trên thiết bị khác.

Đánh dấu hoàn thành do người học chủ động xác nhận. Điểm bài kiểm tra là điểm bài trong ứng dụng, không phải điểm thi của trường. EN01 đã có kết quả chẩn đoán; EN02 chỉ đã luyện khẳng định và phủ định, chưa được đánh dấu hoàn thành toàn bộ.

## Bật Firebase thực sự

Các tệp cấu hình đã chuẩn bị. Kiểm tra đăng nhập ngày 07/10/2026 trả `auth/configuration-not-found`: Authentication của dự án chưa có cấu hình hoạt động; chưa kiểm chứng Firestore/rules. App hiển thị lỗi và giữ bản cục bộ. Chỉ khi đăng nhập và đồng bộ thành công mới coi kết nối hoạt động.

1. Trong [Firebase Console](https://console.firebase.google.com/project/hoc-tap-8c6f7/authentication/providers), bấm Get started nếu chưa khởi tạo, rồi bật Google tại Authentication → Sign-in method; điền email hỗ trợ.
2. Authentication → Settings → Authorized domains: thêm tên miền sử dụng app, ví dụ `vangvanthuan1-commits.github.io` nếu dùng GitHub Pages. Thêm `localhost` cho phát triển nếu chưa có. Firebase Hosting dùng `hoc-tap-8c6f7.web.app`/`hoc-tap-8c6f7.firebaseapp.com`.
3. Firestore Database: tạo cơ sở dữ liệu `(default)` nếu chưa có. Dùng rules trong `firestore.rules`; không mở đọc/ghi cho mọi người. Rules cho phép mỗi tài khoản chỉ đọc/ghi `users/{UID}/learning/state` của mình và từ chối mọi đường dẫn khác.
4. Khi đã đăng nhập Firebase CLI bằng tài khoản quản lý dự án, có thể triển khai rules:

   ```sh
   cd app
   npx firebase-tools deploy --only firestore:rules --project hoc-tap-8c6f7
   ```

5. Mở app, đăng nhập rồi thêm ghi chú thử. Đợi thông báo đồng bộ thành công, mở cùng app trên thiết bị khác bằng cùng tài khoản và kiểm tra ghi chú. Thử tài khoản khác để xác minh bị tách dữ liệu.

Không có service-account key hoặc quyền quản trị nào được đưa vào frontend/repo. App chỉ làm việc với quyền tài khoản đã đăng nhập. Mã client không thể bảo đảm riêng tư nếu chủ dự án thay rules thành công khai; cần triển khai rules đi kèm.

## GitHub để Codex đọc tiến độ

Nút **Gửi tiến độ lên GitHub** tạo hai tệp mới trong repo cố định `vangvanthuan1-commits/hoc-tap`:

```text
ho-so/tu-app/<thời-gian>-<mã-ngẫu-nhiên>.json
ho-so/tu-app/<thời-gian>-<mã-ngẫu-nhiên>.md
```

JSON giữ đủ trạng thái. Markdown tóm tắt tiến độ, điểm, lỗi, ghi chú, highlight, thẻ ôn và thời gian học để Codex đọc. Snapshot bỏ Firebase UID; không xuất mật khẩu hoặc token. Hai tệp được thêm trong cùng commit, trên nhánh mặc định; cập nhật nhánh không dùng force. Nếu nhánh đổi đồng thời, app báo lỗi và cần thử lại. Không sửa `PROFILE.md`, snapshot lịch sử hoặc mã nguồn.

Nội dung ghi chú và kết quả học sẽ được ghi vào GitHub; repo hiện công khai nên những tệp này ai có đường dẫn cũng đọc được. Nếu chuyển repo riêng tư, cần đổi cấu hình OAuth tương ứng trước khi tiếp tục đồng bộ. App không tự gửi GitHub sau mỗi bài: nút đồng bộ là thao tác chủ động, sau đó app trả liên kết commit thật.

### Bật đăng nhập GitHub trong Firebase

1. Tạo OAuth App tại GitHub → Settings → Developer settings → OAuth Apps. Homepage URL là URL app.
2. Authorization callback URL: `https://hoc-tap-8c6f7.firebaseapp.com/__/auth/handler` (đối chiếu callback Firebase hiển thị).
3. Trong Firebase Authentication → Sign-in method → GitHub, điền Client ID và Client Secret từ OAuth App. **Client Secret chỉ nhập trong Firebase Console, không đưa vào repo hoặc frontend.**
4. Đăng nhập Google trước rồi bấm kết nối GitHub nếu muốn hai cách đăng nhập dùng chung một tài khoản Firebase. App liên kết provider thay vì tạo tài khoản riêng. Nếu email đã dùng provider khác, dùng provider đó trước.
5. GitHub OAuth yêu cầu scope `public_repo` vì repo hiện công khai. GitHub hiển thị quyền này khi xác nhận; scope OAuth này áp dụng các repo công khai, không riêng một repo. App chỉ gọi repo cố định nêu trên, kiểm tra quyền ghi và chỉ thêm tệp trong `ho-so/tu-app`.

GitHub access token chỉ ở bộ nhớ của tab, không lưu localStorage, Firestore, tệp xuất hoặc repo. Tải lại trang phải kết nối GitHub lại để gửi bản mới. Firebase có thể giữ phiên đăng nhập bằng SDK của Firebase; đó là phiên tài khoản, không phải việc app lưu GitHub OAuth token.

## Giới hạn hiện tại

Một tài liệu Firestore hiện lưu toàn bộ trạng thái; app dừng gửi khi JSON vượt 850 KB để không chạm giới hạn 1 MiB của Firestore, nhưng bản cục bộ và tải JSON vẫn hoạt động. Ghi chú riêng biệt và lịch sử bài làm từ nhiều thiết bị được hợp nhất. Nếu cùng sửa đúng một ghi chú/tiến độ, bản có `updatedAt` mới hơn thắng; đồng hồ thiết bị nên đúng. Đồng bộ GitHub hiện là bản sao một chiều từ app, không tự lấy thay đổi Markdown từ repo về app.

Để Codex biết phần vừa học: bấm gửi GitHub và đưa liên kết commit trong cuộc trò chuyện, hoặc tải JSON gửi vào chat. Nếu chưa gửi, Codex không thể tự đọc localStorage hoặc Firestore của trình duyệt.
