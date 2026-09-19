import asyncio
import edge_tts
import os

VOICE = "vi-VN-NamMinhNeural" # Giọng nam trẻ trung, năng động, dứt khoát
OUTPUT_DIR = "/home/user/hoc-tap/web-on-tap/voices_lively"
os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    (
        "voice_0.mp3",
        "Ê Phenikaa ơi, hôm nay cùng tổng ôn tám bài C trong hai phút nha! Bài một: Mọi thứ bắt đầu từ hàm main. CPU luôn nhảy vào đây đầu tiên. Nhớ kỹ: quên dấu chấm phẩy cuối lệnh là ăn ngay quả lỗi to tướng nhé!"
    ),
    (
        "voice_1.mp3",
        "Bài hai: Bẫy chia nguyên siêu lừa! Năm chia hai trong C bằng hai chứ không phải hai phẩy năm đâu, vì nó vứt phần thập phân! Muốn ra chuẩn phải ép kiểu float. Còn x cộng cộng thì cứ lấy giá trị cũ tính trước rồi mới tăng nha!"
    ),
    (
        "voice_2.mp3",
        "Bài ba: Bí mật hàm scanf. Tại sao printf chỉ cần x, mà scanf bắt buộc phải có dấu và? Vì dấu và là địa chỉ ô nhớ trong RAM để nạp dữ liệu vào! Quên dấu và là ăn ngay quả crash sập chương trình!"
    ),
    (
        "voice_3.mp3",
        "Bài bốn: Bẫy trắc nghiệm hay toang nhất: if x bằng 5. Nhớ kỹ: một dấu bằng là phép gán luôn đúng, muốn so sánh phải gõ hai dấu bằng! Trong switch case nhớ gõ break, không là code chạy tuột xuống đáy đấy!"
    ),
    (
        "voice_4.mp3",
        "Bài năm: Vòng lặp. for chạy theo số lần, while kiểm tra trước, còn do while lì đòn chạy trước một lần rồi mới tính! Gặp break là đập vỡ chạy ra ngoài, gặp continue là bỏ qua lượt này để sang lượt kế!"
    ),
    (
        "voice_5.mp3",
        "Bài sáu: Hàm và trò lừa tham trị. Bạn truyền biến thường vào hàm thì hàm chỉ nhận bản sao thôi! Trong hàm có tăng giảm thế nào thì biến x ở ngoài main vẫn trơ trơ không đổi nhé!"
    ),
    (
        "voice_6.mp3",
        "Bài bảy: Mảng một chiều. Quy tắc thép: mảng n phần tử chỉ chạy từ không đến n trừ một! Gõ a phần tử thứ n là bạn đang chọc thẳng vào vùng nhớ rác cực kỳ nguy hiểm!"
    ),
    (
        "voice_7.mp3",
        "Bài tám: Chuỗi ký tự. Chuỗi thực chất là mảng chữ cái nhưng luôn giấu một ký tự đặc biệt ở cuối là xuyệt không! Muốn lưu chuỗi năm chữ phải khai báo tối thiểu sáu ô nhớ. Nhập chuỗi có khoảng trắng nhớ dùng fgets nhé!"
    )
]

async def main():
    print("Bắt đầu sinh giọng đọc Nam Minh (energetic, rate=+15%, pitch=+2Hz)...")
    for filename, text in scripts:
        out_path = os.path.join(OUTPUT_DIR, filename)
        # rate +15% cho nhịp đọc nhanh dứt khoát chuẩn shorts, pitch +2Hz cho giọng sáng và năng lượng
        communicate = edge_tts.Communicate(text, VOICE, rate="+15%", pitch="+2Hz")
        await communicate.save(out_path)
        print(f"Đã tạo: {out_path}")
    print("Hoàn tất sinh 8 file giọng đọc mới!")

if __name__ == "__main__":
    asyncio.run(main())
