import os
import subprocess
import glob

SCENES = [
    ("Scene1", "voice_0.mp3", "part_1.mp4"),
    ("Scene2", "voice_1.mp3", "part_2.mp4"),
    ("Scene3", "voice_2.mp3", "part_3.mp4"),
    ("Scene4", "voice_3.mp3", "part_4.mp4"),
    ("Scene5", "voice_4.mp3", "part_5.mp4"),
    ("Scene6", "voice_5.mp3", "part_6.mp4"),
    ("Scene7", "voice_6.mp3", "part_7.mp4"),
    ("Scene8", "voice_7.mp3", "part_8.mp4"),
]

BASE_DIR = "/home/user/hoc-tap/web-on-tap"
VOICES_DIR = os.path.join(BASE_DIR, "voices")
OUTPUT_PARTS_DIR = os.path.join(BASE_DIR, "video_parts")
os.makedirs(OUTPUT_PARTS_DIR, exist_ok=True)

print("=== BẮT ĐẦU RENDER MANIM CẢ 8 SCENES ===")
for scene_name, voice_file, out_part in SCENES:
    print(f"\n--- Đang Render {scene_name} ---")
    cmd_manim = f"manim -ql {BASE_DIR}/scenes.py {scene_name}"
    subprocess.run(cmd_manim, shell=True, check=True, cwd=BASE_DIR)

    # Tìm file mp4 do manim tạo ra
    manim_files = glob.glob(f"{BASE_DIR}/media/videos/scenes/*/{scene_name}.mp4")
    if not manim_files:
        raise RuntimeError(f"Không tìm thấy video render của {scene_name}")
    raw_video = manim_files[0]

    voice_path = os.path.join(VOICES_DIR, voice_file)
    out_path = os.path.join(OUTPUT_PARTS_DIR, out_part)

    # Lấy thời lượng của audio
    cmd_dur = f"ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {voice_path}"
    dur = float(subprocess.check_output(cmd_dur, shell=True).strip())
    print(f"Thời lượng audio {voice_file}: {dur:.2f}s")

    # Ghép video Manim và audio Edge-TTS với độ dài khớp audio
    cmd_mux = (
        f"ffmpeg -y -i {raw_video} -i {voice_path} "
        f"-c:v libx264 -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k "
        f"-t {dur} {out_path}"
    )
    subprocess.run(cmd_mux, shell=True, check=True)
    print(f"-> Đã ghép xong: {out_path}")

print("\n=== GHÉP TẤT CẢ 8 PHÂN ĐOẠN THÀNH VIDEO HOÀN CHỈNH ===")
concat_list_path = os.path.join(OUTPUT_PARTS_DIR, "concat_all.txt")
with open(concat_list_path, "w") as f:
    for _, _, out_part in SCENES:
        f.write(f"file '{os.path.join(OUTPUT_PARTS_DIR, out_part)}'\n")

final_output = os.path.join(BASE_DIR, "tong-on-c-full.mp4")
cmd_final = (
    f"ffmpeg -y -f concat -safe 0 -i {concat_list_path} "
    f"-c copy -movflags +faststart {final_output}"
)
subprocess.run(cmd_final, shell=True, check=True)
print(f"\n🎉 HOÀN TẤT VIDEO MASTER: {final_output}")
subprocess.run(f"ls -lh {final_output}", shell=True)
