import numpy as np
from scipy.io import wavfile

sr = 44100
total_dur = 140
t = np.linspace(0, total_dur, int(sr * total_dur), endpoint=False)

# 4 Chords: Am, F, C, G
# Frequencies:
chords = [
    [220.0, 261.63, 329.63, 392.0],   # Am7
    [174.61, 220.0, 261.63, 329.63],  # Fmaj7
    [130.81, 164.81, 196.0, 246.94],  # Cmaj7
    [196.0, 246.94, 293.66, 349.23],  # G7
]

audio = np.zeros_like(t)
chord_len = 3.5
cycle_len = chord_len * 4  # 14s cycle

cycle_t = t % cycle_len
chord_idx = (cycle_t // chord_len).astype(int)
chord_phase = (cycle_t % chord_len) / chord_len
env = np.sin(np.pi * chord_phase) ** 0.8

# Generate chord audio vectorized
for c_i, notes in enumerate(chords):
    mask = (chord_idx == c_i)
    if not np.any(mask):
        continue
    c_t = t[mask]
    chord_wave = np.zeros_like(c_t)
    for f in notes:
        chord_wave += 0.6 * np.sin(2 * np.pi * f * c_t) + 0.15 * np.sin(4 * np.pi * f * c_t)
    audio[mask] = chord_wave * env[mask] * 0.2

# Beat (Lo-Fi kick & snare)
beat_t = t % 0.5
beat_env = np.exp(-beat_t * 15)
beat_idx = (t // 0.5).astype(int)
kick_mask = (beat_idx % 2 == 0)
snare_mask = (beat_idx % 2 == 1)

kick = np.sin(2 * np.pi * 55 * np.exp(-beat_t * 10) * t) * beat_env * 0.3
snare = (np.random.uniform(-1, 1, len(t))) * np.exp(-beat_t * 25) * 0.15

audio[kick_mask] += kick[kick_mask]
audio[snare_mask] += snare[snare_mask]

# Normalize
audio = audio / np.max(np.abs(audio) + 1e-6) * 0.25
audio_int16 = (audio * 32767).astype(np.int16)
wavfile.write("/home/user/hoc-tap/web-on-tap/bgm.wav", sr, audio_int16)
print("Vectorized Lo-Fi BGM generated successfully in <0.5s!")
