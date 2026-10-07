import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  MessageSquare,
  RefreshCw,
  Send,
  Settings,
  Sparkles,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { askOpenRouter, getAiConfig, saveAiConfig } from "../lib/openrouter";
import type { AiChatMessage, AiConfig, Lesson } from "../types";
import "./learning.css";

interface AiTutorPanelProps {
  lesson: Lesson;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

const QUICK_PROMPTS = [
  {
    icon: Lightbulb,
    label: "Giải thích bản chất",
    text: "Hãy giải thích ngắn gọn, đi thẳng vào bản chất khái niệm của bài này để tôi nắm vững.",
  },
  {
    icon: AlertCircle,
    label: "Chỉ ra bẫy lỗi",
    text: "Những bẫy lỗi hay mắc nhất trong bài này khi thi hoặc làm bài tập là gì? Hãy chỉ rõ để tôi phòng tránh.",
  },
  {
    icon: Zap,
    label: "Tạo 1 câu tương tự",
    text: "Hãy cho tôi một bài tập ngắn tương tự (chưa đưa đáp án ngay) để tôi tự luyện và kiểm tra kiến thức.",
  },
  {
    icon: Sparkles,
    label: "Tóm tắt ôn nhanh",
    text: "Tóm tắt 3 ý quan trọng nhất của bài học này theo dạng gạch đầu dòng để tôi ghi vào sổ tay.",
  },
];

export function AiTutorPanel({
  lesson,
  initialPrompt,
  onClearInitialPrompt,
}: AiTutorPanelProps) {
  const [messages, setMessages] = useState<AiChatMessage[]>(() => {
    // Nạp lịch sử chat của tiết học từ sessionStorage nếu có
    try {
      const saved = sessionStorage.getItem(`ai_chat_${lesson.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return [
      {
        id: "msg-welcome",
        role: "assistant",
        content: `Xin chào Thuận! Tôi là **Gia Sư AI GLM** đồng hành cùng bạn trong tiết học **[${lesson.id}] ${lesson.title}**.\n\nMục tiêu của bạn trong bài này: *${lesson.objective}*.\n\nBạn có thắc mắc gì về lý thuyết, muốn phân tích bẫy lỗi hay cần bài tập gợi mở? Hãy chọn các gợi ý bên dưới hoặc hỏi tôi bất cứ lúc nào!`,
        timestamp: new Date().toLocaleTimeString("vi-VN"),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [config, setConfig] = useState<AiConfig>(getAiConfig);
  const [keySavedNotice, setKeySavedNotice] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Lưu lịch sử chat tạm thời theo tiết học
  useEffect(() => {
    try {
      sessionStorage.setItem(`ai_chat_${lesson.id}`, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages, lesson.id]);

  // Nhận prompt truyền từ ngoài (ví dụ bấm "Hỏi AI về đoạn văn này")
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  async function handleSend(textToSend?: string) {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: AiChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("vi-VN"),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setError("");
    setLoading(true);

    try {
      const chatPayload = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await askOpenRouter({
        messages: chatPayload,
        lessonContext: {
          id: lesson.id,
          title: lesson.title,
          objective: lesson.objective,
          criteria: lesson.criteria,
        },
      });

      const aiMsg: AiChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString("vi-VN"),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi khi gọi AI.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleSaveSettings() {
    saveAiConfig(config);
    setKeySavedNotice(true);
    setTimeout(() => setKeySavedNotice(false), 2500);
    setSettingsOpen(false);
  }

  function handleClearHistory() {
    if (window.confirm("Bạn có chắc muốn xóa lịch sử trò chuyện trong bài này?")) {
      sessionStorage.removeItem(`ai_chat_${lesson.id}`);
      setMessages([
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: `Lịch sử đã được làm mới. Hãy đặt câu hỏi bất kỳ cho bài học **[${lesson.id}]** nhé!`,
          timestamp: new Date().toLocaleTimeString("vi-VN"),
        },
      ]);
    }
  }

  return (
    <div className="learning-ai-container">
      {/* Header của Khung AI */}
      <div className="learning-ai-header">
        <div className="learning-ai-header-info">
          <div className="learning-ai-avatar">
            <Bot size={20} />
          </div>
          <div>
            <div className="learning-ai-title">
              Trợ lý Gia sư AI &bull; GLM
              <span className="learning-ai-model-tag">{config.model}</span>
            </div>
            <div className="learning-ai-subtitle">
              Sư phạm theo bản chất &bull; Bám sát đề cương Phenikaa K20
            </div>
          </div>
        </div>

        <div className="learning-ai-header-actions">
          <button
            type="button"
            className="learning-ai-btn-icon"
            title="Cài đặt API Key & Model"
            onClick={() => setSettingsOpen((prev) => !prev)}
          >
            <Settings size={17} />
          </button>
          <button
            type="button"
            className="learning-ai-btn-icon"
            title="Làm mới đoạn chat"
            onClick={handleClearHistory}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {/* Cài đặt cấu hình API Key & Model (Thu gọn/Mở rộng) */}
      {settingsOpen && (
        <div className="learning-ai-settings-card">
          <div className="learning-ai-settings-title">
            <Settings size={16} /> Cấu hình OpenRouter AI
          </div>
          <div className="learning-ai-settings-field">
            <label>API Key OpenRouter:</label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              placeholder="sk-or-v1-..."
            />
          </div>
          <div className="learning-ai-settings-field">
            <label>Mô hình (Model ID):</label>
            <input
              type="text"
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              placeholder="thudm/glm-4-9b-chat hoặc zhipu/glm-4"
            />
          </div>
          <div className="learning-ai-settings-actions">
            <button
              type="button"
              className="learning-button learning-button-primary"
              onClick={handleSaveSettings}
            >
              <Check size={15} /> Lưu cấu hình
            </button>
            <button
              type="button"
              className="learning-button"
              onClick={() => setSettingsOpen(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {keySavedNotice && (
        <div className="learning-ai-notice-banner">
          <Check size={16} /> Đã cập nhật cấu hình OpenRouter thành công!
        </div>
      )}

      {/* Danh sách câu hỏi gợi ý nhanh (Quick Prompts) */}
      <div className="learning-ai-quick-prompts">
        {QUICK_PROMPTS.map((qp, idx) => {
          const Icon = qp.icon;
          return (
            <button
              key={idx}
              type="button"
              className="learning-ai-prompt-chip"
              disabled={loading}
              onClick={() => handleSend(qp.text)}
            >
              <Icon size={14} />
              <span>{qp.label}</span>
            </button>
          );
        })}
      </div>

      {/* Vùng tin nhắn chat */}
      <div className="learning-ai-messages-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`learning-ai-msg-row ${
              msg.role === "user" ? "learning-ai-msg-user" : "learning-ai-msg-assistant"
            }`}
          >
            <div className="learning-ai-msg-bubble">
              <div className="learning-ai-msg-header">
                {msg.role === "user" ? (
                  <>
                    <User size={13} /> Bạn
                  </>
                ) : (
                  <>
                    <Bot size={13} /> Gia sư AI GLM
                  </>
                )}
                <span className="learning-ai-msg-time">{msg.timestamp}</span>
              </div>
              <div className="learning-ai-msg-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="learning-ai-msg-row learning-ai-msg-assistant">
            <div className="learning-ai-msg-bubble learning-ai-loading-bubble">
              <RefreshCw size={15} className="learning-spin" />
              <span>Gia sư AI đang suy luận bản chất bài học...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="learning-ai-error-banner">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Ô nhập tin nhắn */}
      <div className="learning-ai-input-bar">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={`Hỏi AI về bài học ${lesson.id} (nhấn Enter để gửi)...`}
          rows={1}
          disabled={loading}
        />
        <button
          type="button"
          className="learning-button learning-button-primary learning-ai-send-btn"
          disabled={loading || !input.trim()}
          onClick={() => handleSend()}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default AiTutorPanel;
