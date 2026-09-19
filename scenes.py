from manim import *

# Cấu hình chuẩn 9:16 dọc điện thoại (720x1280)
config.pixel_width = 720
config.pixel_height = 1280
config.frame_width = 9
config.frame_height = 16
config.background_color = "#070a13"

CYAN = "#38bdf8"
PINK = "#ec4899"
YELLOW = "#fbbf24"
GREEN = "#34d399"
RED = "#f87171"
DARK_CARD = "#12182b"

# --- BÀI 1: CẤU TRÚC C ---
class Scene1(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 1/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("CẤU TRÚC C & HELLO WORLD", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)
        
        cpu_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=2.2, color=CYAN, fill_color=DARK_CARD, fill_opacity=0.9).next_to(line, DOWN, buff=0.6)
        cpu_label = Text("CPU Luôn Nạp main() Đầu Tiên!", font_size=24, color=YELLOW, weight=BOLD).move_to(cpu_box.get_top() + DOWN * 0.4)
        cpu_sub = Text("#include <stdio.h> cung cấp printf()", font_size=20, color=WHITE).next_to(cpu_label, DOWN, buff=0.3)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=4.5, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(cpu_box, DOWN, buff=0.6)
        code_str = (
            '#include <stdio.h>\n\n'
            'int main() {\n'
            '    printf("Hello Phenikaa!\\n");\n'
            '    return 0; // Ket thuc thanh cong\n'
            '}'
        )
        code = Text(code_str, font="monospace", font_size=20, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=RED, fill_color="#261018", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.6)
        trap_text = Text("BẪY: Quên dấu chấm phẩy ; cuối lệnh!", font_size=20, color=RED, weight=BOLD).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(cpu_box), Write(cpu_label), Write(cpu_sub), run_time=1.5)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.5)
        self.wait(10.0)

# --- BÀI 2: TOÁN TỬ & CHIA NGUYÊN ---
class Scene2(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 2/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("BIẾN & BẪY CHIA NGUYÊN", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        box1 = RoundedRectangle(corner_radius=0.2, width=3.4, height=2.0, color=RED, fill_color=DARK_CARD, fill_opacity=0.9).shift(UP * 2.2 + LEFT * 2.0)
        txt1 = Text("5 / 2 = 2\n(Mất .5)", font_size=22, color=RED, weight=BOLD).move_to(box1)

        box2 = RoundedRectangle(corner_radius=0.2, width=3.4, height=2.0, color=GREEN, fill_color=DARK_CARD, fill_opacity=0.9).shift(UP * 2.2 + RIGHT * 2.0)
        txt2 = Text("(float)5 / 2\n= 2.5 (Chuẩn)", font_size=22, color=GREEN, weight=BOLD).move_to(box2)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=4.2, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(box1, DOWN, buff=0.8).shift(RIGHT * 2.0)
        code_str = (
            'int a = 5, b = 2;\n'
            'float thuong = (float)a / b; // = 2.5\n'
            'int du = a % b;               // = 1\n'
            'int x = 10;\n'
            'int y = x++; // y = 10, x = 11'
        )
        code = Text(code_str, font="monospace", font_size=19, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=2.0, color=YELLOW, fill_color="#261e10", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.6)
        trap_text = Text("x++: Lấy giá trị cũ tính trước rồi mới tăng\n++x: Tăng x trước rồi mới tính toán!", font_size=19, color=YELLOW).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(box1), Write(txt1), Create(box2), Write(txt2), run_time=2.0)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.5)
        self.wait(13.0)

# --- BÀI 3: NHẬP XUẤT & DẤU & ---
class Scene3(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 3/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("NHẬP / XUẤT: BÍ MẬT DẤU &", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        mem_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=2.4, color=CYAN, fill_color=DARK_CARD, fill_opacity=0.9).next_to(line, DOWN, buff=0.6)
        mem_title = Text("Ô nhớ 'tuoi' tại địa chỉ: 0x7ffee4", font_size=20, color=CYAN).move_to(mem_box.get_top() + DOWN * 0.4)
        mem_val = Text("[  Giá trị: 20  ]", font_size=24, color=WHITE, weight=BOLD).next_to(mem_title, DOWN, buff=0.3)

        arrow = Arrow(UP * 0.5, DOWN * 0.5, color=YELLOW).next_to(mem_box, DOWN, buff=0.2)
        arrow_lbl = Text("scanf(\"%d\", &tuoi) đưa địa chỉ &tuoi", font_size=18, color=YELLOW).next_to(arrow, RIGHT, buff=0.2)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=3.8, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(arrow, DOWN, buff=0.3)
        code_str = (
            'int tuoi;\n'
            'printf("Nhap tuoi: ");\n'
            'scanf("%d", &tuoi); // CẦN DẤU &\n'
            'printf("Tuoi: %d\\n", tuoi);'
        )
        code = Text(code_str, font="monospace", font_size=20, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=RED, fill_color="#261018", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.5)
        trap_text = Text("BẪY: scanf quên dấu & làm sập chương trình!", font_size=19, color=RED, weight=BOLD).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(mem_box), Write(mem_title), Write(mem_val), run_time=1.8)
        self.play(GrowArrow(arrow), Write(arrow_lbl), run_time=1.0)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.5)
        self.wait(9.5)

# --- BÀI 4: RẼ NHÁNH ---
class Scene4(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 4/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("RẼ NHÁNH & 2 BẪY KINH ĐIỂN", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        box_wrong = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=RED, fill_color="#261018", fill_opacity=0.9).next_to(line, DOWN, buff=0.6)
        txt_wrong = Text("❌ if (x = 5): Phép GÁN -> LUÔN ĐÚNG!", font_size=21, color=RED, weight=BOLD).move_to(box_wrong)

        box_right = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=GREEN, fill_color="#102618", fill_opacity=0.9).next_to(box_wrong, DOWN, buff=0.4)
        txt_right = Text("✅ if (x == 5): So sánh bằng chuẩn xác", font_size=21, color=GREEN, weight=BOLD).move_to(box_right)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=3.8, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(box_right, DOWN, buff=0.5)
        code_str = (
            'switch(chon) {\n'
            '    case 1: printf("A"); break;\n'
            '    case 2: printf("B"); break;\n'
            '    default: printf("Khac");\n'
            '}'
        )
        code = Text(code_str, font="monospace", font_size=20, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=YELLOW, fill_color="#261e10", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.4)
        trap_text = Text("Quên break trong switch: Chạy tuột xuống dưới!", font_size=19, color=YELLOW).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(box_wrong), Write(txt_wrong), run_time=1.2)
        self.play(Create(box_right), Write(txt_right), run_time=1.2)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.2)
        self.wait(7.5)

# --- BÀI 5: VÒNG LẶP ---
class Scene5(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 5/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("VÒNG LẶP (for, while, do-while)", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        info_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=2.4, color=CYAN, fill_color=DARK_CARD, fill_opacity=0.9).next_to(line, DOWN, buff=0.6)
        info_text = (
            "• for: Biết trước số lần lặp\n"
            "• while: Kiểm tra trước, đúng mới làm\n"
            "• break: Đập vỡ vòng lặp ngay lập tức\n"
            "• continue: Bỏ qua lượt hiện tại"
        )
        t_info = Text(info_text, font_size=19, color=WHITE).move_to(info_box)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=4.2, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(info_box, DOWN, buff=0.5)
        code_str = (
            'int tong = 0;\n'
            'for (int i = 1; i <= 5; i++) {\n'
            '    if (i == 3) continue; // Bo qua i = 3\n'
            '    tong += i;\n'
            '}'
        )
        code = Text(code_str, font="monospace", font_size=20, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=RED, fill_color="#261018", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.5)
        trap_text = Text("BẪY: Thừa dấu ; sau for: for (int i=0; i<5; i++);", font_size=19, color=RED, weight=BOLD).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(info_box), Write(t_info), run_time=2.0)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.5)
        self.wait(9.5)

# --- BÀI 6: HÀM & THAM TRỊ ---
class Scene6(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 6/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("HÀM & BẢN SAO THAM TRỊ", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        frame_main = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=CYAN, fill_color=DARK_CARD, fill_opacity=0.9).next_to(line, DOWN, buff=0.6)
        txt_main = Text("Stack Frame main(): x = 5 (KHÔNG ĐỔI!)", font_size=21, color=CYAN, weight=BOLD).move_to(frame_main)

        frame_tang = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=PINK, fill_color="#261020", fill_opacity=0.9).next_to(frame_main, DOWN, buff=0.4)
        txt_tang = Text("Stack Frame tang(): a = 5 -> 6 (BỊ XÓA!)", font_size=21, color=PINK, weight=BOLD).move_to(frame_tang)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=4.2, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(frame_tang, DOWN, buff=0.5)
        code_str = (
            'void tang(int a) {\n'
            '    a = a + 1; // Chi doi ban sao a!\n'
            '}\n'
            'int main() {\n'
            '    int x = 5; tang(x);\n'
            '    // x o main VAN LA 5!\n'
            '}'
        )
        code = Text(code_str, font="monospace", font_size=20, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=YELLOW, fill_color="#261e10", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.4)
        trap_text = Text("Bản sao: Hàm chỉ thao tác trên bản sao tạm thời!", font_size=19, color=YELLOW).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(frame_main), Write(txt_main), run_time=1.2)
        self.play(Create(frame_tang), Write(txt_tang), run_time=1.2)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.2)
        self.wait(7.5)

# --- BÀI 7: MẢNG 1 CHIỀU ---
class Scene7(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 7/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("MẢNG 1 CHIỀU: CHỈ SỐ TỪ 0", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        arr_group = VGroup()
        vals = ["10", "20", "30", "40"]
        for i in range(4):
            b = RoundedRectangle(corner_radius=0.15, width=1.6, height=1.8, color=CYAN, fill_color=DARK_CARD, fill_opacity=0.9)
            val = Text(vals[i], font_size=24, color=WHITE, weight=BOLD).move_to(b.get_center() + UP * 0.2)
            idx = Text(f"a[{i}]", font_size=16, color=YELLOW).move_to(b.get_center() + DOWN * 0.4)
            cell = VGroup(b, val, idx)
            arr_group.add(cell)
        arr_group.arrange(RIGHT, buff=0.2).next_to(line, DOWN, buff=0.8)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=4.2, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(arr_group, DOWN, buff=0.6)
        code_str = (
            'int a[4] = {10, 20, 30, 40};\n'
            'for (int i = 0; i < 4; i++) {\n'
            '    printf("%d ", a[i]);\n'
            '}\n'
            '// Chi so tu 0 den N - 1 (a[0] den a[3])'
        )
        code = Text(code_str, font="monospace", font_size=19, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=RED, fill_color="#261018", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.5)
        trap_text = Text("BẪY: a[4] là TRÀN MẢNG (Vùng nhớ rác)!", font_size=19, color=RED, weight=BOLD).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(arr_group), run_time=2.0)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.5)
        self.wait(9.5)

# --- BÀI 8: CHUỖI KÝ TỰ ---
class Scene8(Scene):
    def construct(self):
        badge = Text("PHENIKAA K20 AI  •  BÀI 8/8", font_size=22, color=CYAN).to_edge(UP, buff=1.0)
        title = Text("CHUỖI & KÝ TỰ '\\0' BÍ MẬT", font_size=32, color=WHITE, weight=BOLD).next_to(badge, DOWN, buff=0.4)
        line = Line(LEFT * 4, RIGHT * 4, color=CYAN).next_to(title, DOWN, buff=0.3)

        str_group = VGroup()
        letters = ["'A'", "'I'", "'\\0'"]
        cols = [CYAN, CYAN, GREEN]
        for i in range(3):
            b = RoundedRectangle(corner_radius=0.15, width=2.0, height=1.8, color=cols[i], fill_color=DARK_CARD, fill_opacity=0.9)
            val = Text(letters[i], font_size=26, color=cols[i], weight=BOLD).move_to(b.get_center() + UP * 0.2)
            idx = Text(f"s[{i}]", font_size=16, color=WHITE).move_to(b.get_center() + DOWN * 0.4)
            cell = VGroup(b, val, idx)
            str_group.add(cell)
        str_group.arrange(RIGHT, buff=0.3).next_to(line, DOWN, buff=0.8)

        code_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=4.2, color=GREY_A, fill_color="#0b1120", fill_opacity=0.95).next_to(str_group, DOWN, buff=0.6)
        code_str = (
            '#include <string.h>\n'
            'char s[10] = "AI";\n'
            'printf("Len: %zu\\n", strlen(s)); // = 2\n'
            '// Nhap chuoi co khoang trang dung fgets():\n'
            'fgets(s, sizeof(s), stdin);'
        )
        code = Text(code_str, font="monospace", font_size=19, color=WHITE).move_to(code_box)

        trap_box = RoundedRectangle(corner_radius=0.2, width=7.5, height=1.8, color=YELLOW, fill_color="#261e10", fill_opacity=0.9).next_to(code_box, DOWN, buff=0.5)
        trap_text = Text("BẪY: Chuỗi 5 chữ cần mảng tối thiểu 6 ô (cho '\\0')!", font_size=19, color=YELLOW).move_to(trap_box)

        self.play(FadeIn(badge), Write(title), Create(line), run_time=1.2)
        self.play(Create(str_group), run_time=2.0)
        self.play(Create(code_box), Write(code), run_time=2.0)
        self.play(Create(trap_box), Write(trap_text), run_time=1.5)
        self.wait(10.5)
