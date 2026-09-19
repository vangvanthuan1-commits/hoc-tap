import os
import subprocess
import glob

SCENES = [
    ("Scene1", "voice_0.mp3", "part_lively_1.mp4"),
    ("Scene2", "voice_1.mp3", "part_lively_2.mp4"),
    ("Scene3", "voice_2.mp3", "part_lively_3.mp4"),
    ("Scene4", "voice_3.mp3", "part_lively_4.mp4"),
    ("Scene5", "voice_4.mp3", "part_lively_5.mp4"),
    ("Scene6", "voice_5.mp3", "part_lively_6.mp4"),
    ("Scene7", "voice_6.mp3", "part_lively_7.mp4"),
    ("Scene8", "voice_7.mp3", "part_lively_8.mp4"),
]

BASE_DIR = "/home/user/hoc-tap/web-on-tap"
VOICES_DIR = os.path.join(BASE_DIR, "voices_lively")
BGM_FILE = os.path.join(BASE_DIR, "bgm.wav")
OUTPUT_PARTS_DIR = os.path.join(BASE_DIR, "video_parts")
os.makedirs(OUTPUT_PARTS_DIR, exist_ok=True)

print("=== BẮT ĐẦU GHÉP VIDEO MANIM + GIỌNG NAM MINH + NHẠC NỀN LO-FI ===")
bgm_offset = 0.0

for scene_name, voice_file, out_part in SCENES:
    manim_files = glob.glob(f"{BASE_DIR}/media/videos/scenes/*/{scene_name}.mp4")
    if not manim_files:
        raise RuntimeError(f"Không tìm thấy video render của {scene_name}")
    raw_video = manim_files[0]

    voice_path = os.path.join(VOICES_DIR, voice_file)
    out_path = os.path.join(OUTPUT_PARTS_DIR, out_part)

    # Đo thời lượng voice
    cmd_dur = f"ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {voice_path}"
    dur = float(subprocess.check_output(cmd_dur, shell=True).strip())
    print(f"Phân cảnh {scene_name}: audio {dur:.2f}s")

    # Mix giọng + nhạc nền lo-fi (nhạc nền ở mức 10% âm lượng để không đè giọng)
    # Cắt video đúng thời lượng dur
    cmd_mux = (
        f"ffmpeg -y -i {raw_video} -i {voice_path} -ss {bgm_offset} -i {BGM_FILE} "
        f"-filter_complex \"[1:a]volume=1.0[v];[2:a]volume=0.10[b];[v][b]amix=inputs=2:duration=first[a]\" "
        f"-map 0:v -map \"[a]\" -c:v libx264 -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k "
        f"-t {dur} {out_path}"
    )
    subprocess.run(cmd_mux, shell=True, check=True)
    bgm_offset += dur
    print(f"-> Đã ghép xong: {out_part}")

# Ghép toàn bộ thành master video
concat_list_path = os.path.join(OUTPUT_PARTS_DIR, "concat_lively.txt")
with open(concat_list_path, "w") as f:
    for _, _, out_part in SCENES:
        f.write(f"file '{os.path.join(OUTPUT_PARTS_DIR, out_part)}'\n")

final_output = os.path.join(BASE_DIR, "tong-on-c-full.mp4")
cmd_final = (
    f"ffmpeg -y -f concat -safe 0 -i {concat_list_path} "
    f"-c copy -movflags +faststart {final_output}"
)
subprocess.run(cmd_final, shell=True, check=True)
print(f"\n🎉 HOÀN TẤT VIDEO MASTER NÂNG CẤP: {final_output}")
subprocess.run(f"ls -lh {final_output}", shell=True)
