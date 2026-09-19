from manim import *

config.pixel_width = 720
config.pixel_height = 1280
config.frame_width = 9
config.frame_height = 16

class TestScene(Scene):
    def construct(self):
        title = Text("PHENIKAA K20 AI", font_size=36, color=BLUE).to_edge(UP)
        box = Rectangle(width=6, height=3, color=PINK).shift(UP * 2)
        text = Text("int main()", font_size=28, color=WHITE).move_to(box)
        self.play(Write(title))
        self.play(Create(box), Write(text))
        self.wait(1)
