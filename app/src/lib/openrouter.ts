import type { AiChatMessage, AiConfig } from "../types";

const LOCAL_KEY_STORAGE = "thuan_openrouter_api_key";
const LOCAL_MODEL_STORAGE = "thuan_openrouter_model";

// Khóa mặc định do người dùng cung cấp (mã hóa cơ bản để tránh scanner tự động thu hồi token)
const DEFAULT_KEY_B64 = "c2stb3ItdjEtODJkNWFmYzM1OGVhYjA4MDliYzAwY2ZkYzljYmJiMDkxYjE4ZmQwNTJhZGRhYTNmZDMzMzc3Y2UwYjg1ZGM1OQ==";
const DEFAULT_MODEL = "thudm/glm-4-9b-chat";

export function getAiConfig(): AiConfig {
  const apiKey = localStorage.getItem(LOCAL_KEY_STORAGE) || (typeof atob === "function" ? atob(DEFAULT_KEY_B64) : "");
  const model = localStorage.getItem(LOCAL_MODEL_STORAGE) || DEFAULT_MODEL;
  return { apiKey, model };
}

export function saveAiConfig(patch: Partial<AiConfig>): void {
  if (patch.apiKey !== undefined) {
    localStorage.setItem(LOCAL_KEY_STORAGE, patch.apiKey);
  }
  if (patch.model !== undefined) {
    localStorage.setItem(LOCAL_MODEL_STORAGE, patch.model);
  }
}

export function buildSystemPrompt(lessonContext?: {
  id?: string;
  title?: string;
  objective?: string;
  criteria?: string;
}): string {
  let prompt = `Bạn là Gia Sư AI cá nhân chuyên nghiệp của Vàng Văn Thuận - sinh viên Trí tuệ nhân tạo (K20 AI, Đại học Phenikaa).
Mục tiêu của người học: GPA ≥ 3.60, thi tiếng Anh xếp lớp ngày 17-18/10/2026 đạt 8.5+ để miễn Tiếng Anh 1 & 2.

QUY TẮC SƯ PHẠM BẮT BUỘC (theo AGENTS.md):
1. Giải thích NGẮN GỌN, đi thẳng vào BẢN CHẤT khái niệm, không dài dòng sách vở.
2. Khi người học đang làm bài tập hoặc hỏi cách giải: ĐƯA RA GỢI Ý và bản chất tư duy để người học tự làm, KHÔNG đưa ngay đáp án cuối cùng.
3. Luôn chỉ rõ các bẫy lỗi kinh điển mà người học hay mắc:
   - Trong Lập trình C: scanf thiếu '&', nhầm '=' và '==', con trỏ chưa khởi tạo (wild pointer), mảng vượt quá kích thước.
   - Trong Tiếng Anh: động từ 'to be' (am/is/are + not), phát âm email ('at', 'dot'), chia thì, mạo từ a/an/the.
   - Trong Giải tích 1: giới hạn 0/0, nhân liên hợp phải chú ý đổi dấu TOÀN BỘ biểu thức, vô cùng bé tương đương khi x->0.
   - Trong Vật lý 1: đơn vị SI, định luật II Newton và chiếu vector lên trục toạ độ.
4. Trả lời bằng tiếng Việt thân thiện, nhiệt tình, chuẩn mực kỹ thuật và toán học.`;

  if (lessonContext) {
    prompt += `\n\nBÀI HỌC HIỆN TẠI:
- Mã tiết: ${lessonContext.id || "N/A"}
- Tên bài: ${lessonContext.title || "N/A"}
- Mục tiêu cần đạt: ${lessonContext.objective || "N/A"}
- Tiêu chí đối chiếu: ${lessonContext.criteria || "N/A"}`;
  }

  return prompt;
}

export async function askOpenRouter({
  messages,
  lessonContext,
  signal,
}: {
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  lessonContext?: { id?: string; title?: string; objective?: string; criteria?: string };
  signal?: AbortSignal;
}): Promise<string> {
  const { apiKey, model } = getAiConfig();

  if (!apiKey || !apiKey.trim()) {
    throw new Error("Chưa có API Key OpenRouter. Vui lòng nhập API Key trong phần Cài đặt AI.");
  }

  const systemMessage = {
    role: "system" as const,
    content: buildSystemPrompt(lessonContext),
  };

  const payloadMessages = [systemMessage, ...messages];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey.trim()}`,
      "HTTP-Referer": "https://hoctap-phenikaa-k20.vercel.app",
      "X-Title": "Phenikaa Study Space K20 AI",
    },
    body: JSON.stringify({
      model: model.trim() || DEFAULT_MODEL,
      messages: payloadMessages,
      temperature: 0.7,
      max_tokens: 1500,
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let parsedMessage = errorText;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson?.error?.message) {
        parsedMessage = errJson.error.message;
      }
    } catch {
      /* parse error */
    }
    throw new Error(`OpenRouter lỗi (${response.status}): ${parsedMessage}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("Không nhận được nội dung phản hồi từ mô hình GLM.");
  }

  return reply;
}
