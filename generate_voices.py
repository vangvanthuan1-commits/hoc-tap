import asyncio
import edge_tts
import os

VOICE = "vi-VN-HoaiMyNeural" # Giọng nữ tiếng Việt truyền cảm, rõ ràng
OUTPUT_DIR = "/home/user/hoc-tap/web-on-tap/voices"
os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    (
        "voice_0.mp3",
        "Bài một: Cấu trúc chương trình C và Hello World. Mọi chương trình C đều bắt đầu từ hàm main, nơi CPU nhảy vào thực thi đầu tiên. Lệnh return không báo hiệu chương trình kết thúc thành công. Hãy cẩn thận bẫy quên dấu chấm phẩy ở cuối dòng lệnh!"
    ),
    (
        "voice_1.mp3",
        "Bài hai: Biến, kiểu dữ liệu và bẫy chia nguyên. Trong C, năm chia hai bằng hai vì bị mất phần thập phân. Muốn ra hai phẩy năm, bạn bắt buộc phải ép kiểu số thực. Phép chia dư phần trăm chỉ áp dụng cho số nguyên. Và nhớ rằng, x cộng cộng lấy giá trị cũ tính trước rồi mới tăng x."
    ),
    (
        "voice_2.mp3",
        "Bài ba: Nhập xuất dữ liệu chuẩn với printf và scanf. Khi in dữ liệu bằng printf, ta chỉ cần truyền giá trị của biến. Nhưng khi nhập dữ liệu bằng scanf, bắt buộc phải có dấu và để đưa địa chỉ ô nhớ trong RAM. Quên dấu và sẽ khiến chương trình sập ngay lập tức."
    ),
    (
        "voice_3.mp3",
        "Bài bốn: Cấu trúc rẽ nhánh if else và switch case. Đừng bao giờ viết nhầm một dấu bằng gán giá trị thay vì hai dấu bằng so sánh. Trong cấu trúc switch case, quên lệnh break sẽ làm code chạy tuột xuống tất cả các nhánh bên dưới."
    ),
    (
        "voice_4.mp3",
        "Bài năm: Vòng lặp for, while và các lệnh điều khiển. Vòng lặp for dùng khi biết trước số lần lặp, while kiểm tra điều kiện trước, còn do while luôn chạy ít nhất một lần. Lệnh break giúp thoát ngay khỏi vòng lặp, còn continue bỏ qua lượt hiện tại để sang lượt kế tiếp."
    ),
    (
        "voice_5.mp3",
        "Bài sáu: Hàm và cơ chế truyền tham trị. Khi bạn truyền một biến thường vào hàm, hệ thống chỉ copy giá trị sang một vùng nhớ mới. Mọi thao tác bên trong hàm chỉ làm thay đổi bản sao, biến gốc ngoài main hoàn toàn không thay đổi."
    ),
    (
        "voice_6.mp3",
        "Bài bảy: Mảng một chiều và chỉ số bộ nhớ. Mảng là tập hợp các ô nhớ liên tiếp trong RAM. Quy tắc sống còn: chỉ số mảng luôn bắt đầu từ số không đến n trừ một. Truy cập ngoài chỉ số này sẽ đọc trúng vùng nhớ rác nguy hiểm."
    ),
    (
        "voice_7.mp3",
        "Bài tám: Chuỗi ký tự và ký tự kết thúc đặc biệt. Chuỗi trong C thực chất là mảng ký tự kết thúc bằng ký tự rỗng xuyệt không. Để lưu chuỗi năm chữ cái, bạn cần mảng tối thiểu sáu ô nhớ. Để nhập chuỗi có khoảng trắng, hãy luôn dùng hàm fgets thay vì scanf."
    )
]

async def main():
    print("Bắt đầu sinh giọng đọc AI tiếng Việt...")
    for filename, text in scripts:
        out_path = os.path.join(OUTPUT_DIR, filename)
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(out_path)
        print(f"Đã tạo: {out_path}")
    print("Hoàn tất sinh 8 file giọng đọc!")

if __name__ == "__main__":
    asyncio.run(main())
