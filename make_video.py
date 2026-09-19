import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

W, H = 720, 1280
FONT_PATH_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_PATH_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

font_title = ImageFont.truetype(FONT_PATH_BOLD, 36)
font_sub = ImageFont.truetype(FONT_PATH_BOLD, 24)
font_text = ImageFont.truetype(FONT_PATH_REG, 22)
font_code = ImageFont.truetype(FONT_PATH_BOLD, 22)
font_small = ImageFont.truetype(FONT_PATH_REG, 18)

slides_data = [
    {
        "lesson": "BÀI 1/8",
        "title": "Cấu Trúc C & Điểm Bắt Đầu",
        "icon": "🚀",
        "graphic_text": ["CPU Luôn Nạp Hàm main() Đầu Tiên!", "#include <stdio.h> cung cấp printf()"],
        "code": [
            '#include <stdio.h>',
            '',
            'int main() {',
            '    printf("Hello Phenikaa AI!\\n");',
            '    return 0;',
            '}'
        ],
        "trap": "⚠️ BẪY: Quên dấu chấm phẩy ; cuối lệnh hoặc viết sai chữ 'main'!"
    },
    {
        "lesson": "BÀI 2/8",
        "title": "Biến & Bẫy Chia Nguyên",
        "icon": "🔢",
        "graphic_text": ["5 / 2 = 2 (Bị mất phần lẻ .5)", "Ép kiểu: (float)5 / 2 = 2.5", "Chia dư: 7 % 3 = 1 (chỉ số nguyên)"],
        "code": [
            'int a = 5, b = 2;',
            'float thuong = (float)a / b; // = 2.5',
            'int du = a % b;               // = 1',
            'int x = 10; int y = x++;      // y=10, x=11'
        ],
        "trap": "⚠️ BẪY: x++ lấy giá trị cũ tính trước rồi mới tăng; ++x tăng trước!"
    },
    {
        "lesson": "BÀI 3/8",
        "title": "Nhập / Xuất: Bí Mật Dấu &",
        "icon": "📥",
        "graphic_text": ["printf(\"%d\", x) -> Chỉ đọc giá trị", "scanf(\"%d\", &x) -> Bắt buộc có & lấy địa chỉ ô nhớ"],
        "code": [
            'int tuoi;',
            'printf("Nhap tuoi: ");',
            'scanf("%d", &tuoi); // CẦN ĐỊA CHỈ &tuoi',
            'printf("Tuoi ban la: %d\\n", tuoi);'
        ],
        "trap": "⚠️ BẪY: scanf quên dấu & sẽ làm sập chương trình (Crash / Segfault)!"
    },
    {
        "lesson": "BÀI 4/8",
        "title": "Rẽ Nhánh & 2 Bẫy Trắc Nghiệm",
        "icon": "🔀",
        "graphic_text": ["So sánh: ==, !=, >, <, >=, <=", "Logic: && (VÀ), || (HOẶC), ! (PHỦ ĐỊNH)"],
        "code": [
            'if (x == 5) { // Dùng == chứ KHÔNG dùng =',
            '    printf("Dung\\n");',
            '}',
            'switch(chon) {',
            '    case 1: printf("A"); break; // Cần break!',
            '}'
        ],
        "trap": "⚠️ BẪY: if (x = 5) là phép gán luôn ĐÚNG! switch quên break sẽ chạy tuột!"
    },
    {
        "lesson": "BÀI 5/8",
        "title": "Vòng Lặp (for, while, do-while)",
        "icon": "🔄",
        "graphic_text": ["for: Biết trước số lần lặp", "while: Kiểm tra điều kiện trước", "break: Đập vỡ vòng lặp | continue: Nhảy vòng kế"],
        "code": [
            'int tong = 0;',
            'for (int i = 1; i <= 5; i++) {',
            '    if (i == 3) continue; // Bỏ qua i=3',
            '    tong += i;',
            '}'
        ],
        "trap": "⚠️ BẪY: Viết thừa dấu chấm phẩy: for (int i=0; i<5; i++);"
    },
    {
        "lesson": "BÀI 6/8",
        "title": "Hàm & Bản Sao Tham Trị",
        "icon": "⚙️",
        "graphic_text": ["void: Hàm không trả về giá trị", "return: Trả giá trị và kết thúc hàm", "Truyền tham trị: Hàm chỉ nhận BẢN SAO!"],
        "code": [
            'void tang(int a) {',
            '    a = a + 1; // Chỉ đổi bản sao a!',
            '}',
            'int main() {',
            '    int x = 5; tang(x); // x ở main VẪN LÀ 5!',
            '}'
        ],
        "trap": "⚠️ BẪY: Đổi biến a trong hàm KHÔNG làm đổi biến x ở main!"
    },
    {
        "lesson": "BÀI 7/8",
        "title": "Mảng 1 Chiều: Chỉ Số Từ 0",
        "icon": "📊",
        "graphic_text": ["Mảng int a[4] có các ô: a[0], a[1], a[2], a[3]", "Chỉ số luôn chạy từ 0 đến N - 1"],
        "code": [
            'int a[4] = {10, 20, 30, 40};',
            'for (int i = 0; i < 4; i++) {',
            '    printf("%d ", a[i]);',
            '}',
            '// a[4] là TRÀN MẢNG (vùng nhớ rác nguy hiểm)'
        ],
        "trap": "⚠️ BẪY: Mảng có N phần tử thì chỉ số cao nhất chỉ là N - 1!"
    },
    {
        "lesson": "BÀI 8/8",
        "title": "Chuỗi: Ký Tự '\\0' Bí Mật",
        "icon": "🔤",
        "graphic_text": ["Chuỗi là mảng ký tự kết thúc bằng '\\0'", "strlen(s): Đếm ký tự (không đếm '\\0')", "fgets(): Nhập chuỗi có khoảng trắng"],
        "code": [
            '#include <string.h>',
            'char ten[20] = "AI K20";',
            'printf("Do dai: %zu\\n", strlen(ten)); // = 6',
            'fgets(ten, sizeof(ten), stdin); // Nhập dấu cách'
        ],
        "trap": "⚠️ BẪY: Muốn lưu chuỗi 5 chữ cái cần mảng tối thiểu 6 ô (cho '\\0')!"
    }
]

output_dir = "/home/user/hoc-tap/web-on-tap/frames"
os.makedirs(output_dir, exist_ok=True)

for idx, item in enumerate(slides_data):
    img = Image.new("RGB", (W, H), color=(7, 10, 19))
    draw = ImageDraw.Draw(img)

    # Background gradient / decorative circle
    for r in range(250, 0, -5):
        alpha = int(25 * (1 - r / 250))
        draw.ellipse([W - 100 - r, 100 - r, W - 100 + r, 100 + r], fill=(236, 72, 153, alpha))
        draw.ellipse([100 - r, H - 200 - r, 100 + r, H - 200 + r], fill=(56, 189, 248, alpha))

    # Top Header
    draw.rectangle([0, 0, W, 80], fill=(15, 23, 42))
    draw.text((24, 25), f"✨ PHENIKAA K20 AI  •  {item['lesson']}", font=font_sub, fill=(56, 189, 248))

    # Progress bar at top
    bar_w = (W - 48) // len(slides_data)
    for bi in range(len(slides_data)):
        x_start = 24 + bi * bar_w
        color = (236, 72, 153) if bi <= idx else (50, 60, 80)
        draw.rounded_rectangle([x_start, 72, x_start + bar_w - 4, 76], radius=2, fill=color)

    # Title
    draw.text((24, 110), f"{item['icon']} {item['title']}", font=font_title, fill=(255, 255, 255))
    draw.line([(24, 165), (W - 24, 165)], fill=(56, 189, 248), width=2)

    # Graphic Box
    draw.rounded_rectangle([24, 185, W - 24, 380], radius=16, fill=(18, 24, 43), outline=(56, 189, 248), width=2)
    draw.text((45, 205), "📌 MINH HỌA BẢN CHẤT:", font=font_sub, fill=(251, 191, 36))
    y_g = 250
    for gt in item["graphic_text"]:
        draw.text((50, y_g), f"• {gt}", font=font_text, fill=(226, 232, 240))
        y_g += 40

    # Code Box (Terminal)
    draw.rounded_rectangle([24, 405, W - 24, 820], radius=16, fill=(11, 17, 32), outline=(100, 116, 139), width=1)
    # Terminal dots
    draw.ellipse([45, 425, 57, 437], fill=(239, 68, 68))
    draw.ellipse([65, 425, 77, 437], fill=(245, 158, 11))
    draw.ellipse([85, 425, 97, 437], fill=(16, 185, 129))
    draw.text((120, 422), "code.c", font=font_small, fill=(148, 163, 184))

    # Code lines
    y_c = 465
    for cline in item["code"]:
        draw.text((45, y_c), cline, font=font_code, fill=(56, 189, 248) if "int main" in cline or "for" in cline or "printf" in cline else (203, 213, 225))
        y_c += 44

    # Trap Box
    draw.rounded_rectangle([24, 845, W - 24, 1020], radius=16, fill=(35, 18, 24), outline=(236, 72, 153), width=2)
    draw.text((40, 865), item["trap"][:35], font=font_sub, fill=(248, 113, 113))
    draw.text((40, 915), item["trap"][35:], font=font_text, fill=(254, 205, 211))

    # Footer
    draw.text((24, 1180), "Gia Sư AI Phenikaa  •  Vuốt / Chạm để sang bài tiếp", font=font_small, fill=(148, 163, 184))

    frame_path = os.path.join(output_dir, f"slide_{idx:02d}.png")
    img.save(frame_path)
    print(f"Saved {frame_path}")

print("All frames rendered successfully.")
