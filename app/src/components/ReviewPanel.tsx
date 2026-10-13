import { useMemo, useState } from "react";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { upsertReviewCard, useLearningState } from "../lib/store";
import type { ReviewCard, SubjectId } from "../types";
import "./learning.css";

interface ReviewPanelProps {
  onOpenLesson?: (lessonId: string) => void;
}
const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "numeric" }).format(
    new Date(date),
  );

export default function ReviewPanel({ onOpenLesson }: ReviewPanelProps) {
  const state = useLearningState();
  const [showFuture, setShowFuture] = useState(false);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkSubject, setBulkSubject] = useState<SubjectId>("EN");
  const now = Date.now();
  const cards = useMemo(
    () => [...state.reviewCards].sort((a, b) => a.dueAt.localeCompare(b.dueAt)),
    [state.reviewCards],
  );
  const dueCards = cards.filter(
    (card) => new Date(card.dueAt).getTime() <= now,
  );
  const visible = showFuture ? cards : dueCards;
  const activeCard = visible[0];
  const rememberedToday = cards.filter(
    (card) =>
      card.lastReviewedAt &&
      new Date(card.lastReviewedAt).toLocaleDateString("vi-VN") ===
        new Date().toLocaleDateString("vi-VN"),
  ).length;

  function addCards() {
    const lines = bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const parsed = lines.map((line) => {
      const at = line.indexOf("|");
      return at < 0
        ? null
        : [line.slice(0, at).trim(), line.slice(at + 1).trim()];
    });
    if (!parsed.length || parsed.some((pair) => !pair || !pair[0] || !pair[1])) {
      setError("Mỗi dòng cần dạng: mặt trước | mặt sau.");
      return;
    }
    try {
      const nowIso = new Date().toISOString();
      for (const pair of parsed as string[][]) {
        upsertReviewCard({
          lessonId: "flashcard",
          subjectId: bulkSubject,
          front: pair[0],
          back: pair[1],
          dueAt: nowIso,
          intervalDays: 1,
          repetitions: 0,
          lastReviewedAt: null,
        });
      }
      setBulkText("");
      setShowAdd(false);
      setShowFuture(false);
      setError("");
      setMessage(`Đã thêm ${parsed.length} thẻ, ôn ngay hôm nay.`);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Không lưu được thẻ.",
      );
    }
  }

  function review(card: ReviewCard, remembered: boolean) {
    try {
      const repetitions = remembered ? card.repetitions + 1 : 0;
      const intervalDays = remembered ? (repetitions === 1 ? 3 : 7) : 1;
      upsertReviewCard({
        ...card,
        dueAt: new Date(
          Date.now() + intervalDays * 24 * 60 * 60 * 1000,
        ).toISOString(),
        intervalDays,
        repetitions,
        lastReviewedAt: new Date().toISOString(),
      });
      setRevealedId(null);
      setMessage(
        `${remembered ? "Đã nhớ" : "Cần luyện thêm"} · hẹn lại sau ${intervalDays} ngày.`,
      );
      if (showFuture) setShowFuture(false);
      setError("");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Không lưu được lượt ôn. Hãy thử lại.",
      );
    }
  }

  return (
    <section className="learning-review" aria-label="Ôn lại kiến thức">
      <div className="learning-review-hero">
        <div>
          <span className="learning-eyebrow">
            NHỚ LÂU, KHÔNG HỌC LẠI TỪ ĐẦU
          </span>
          <h2>Đến hẹn, ôn một chút.</h2>
          <p>Câu sai và checkpoint đã học được hẹn lại sau 1 → 3 → 7 ngày.</p>
        </div>
        <span className="learning-review-hero-icon">
          <Brain size={43} />
        </span>
      </div>
      <div className="learning-review-summary">
        <div>
          <span className="learning-review-stat-icon">
            <Clock3 size={20} />
          </span>
          <strong>{dueCards.length}</strong>
          <span>đến hạn</span>
        </div>
        <div>
          <span className="learning-review-stat-icon pink">
            <Check size={20} />
          </span>
          <strong>{rememberedToday}</strong>
          <span>đã ôn hôm nay</span>
        </div>
        <div>
          <span className="learning-review-stat-icon purple">
            <CalendarDays size={20} />
          </span>
          <strong>{cards.length - dueCards.length}</strong>
          <span>hẹn sắp tới</span>
        </div>
      </div>
      <div className="learning-section-heading">
        <div>
          <h3>{showFuture ? "Tất cả thẻ ôn" : "Thẻ ôn hôm nay"}</h3>
        </div>
        <button
          className="learning-text-button"
          onClick={() => {
            setShowFuture((current) => !current);
            setRevealedId(null);
          }}
        >
          {showFuture ? "Chỉ hiện đến hạn" : "Xem cả lịch sắp tới"}
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="learning-review-add">
        <button
          className="learning-button"
          onClick={() => setShowAdd((current) => !current)}
        >
          {showAdd ? "Đóng" : "+ Thêm thẻ nhớ"}
        </button>
        {showAdd && (
          <div>
            <label>
              Môn{" "}
              <select
                value={bulkSubject}
                onChange={(event) =>
                  setBulkSubject(event.target.value as SubjectId)
                }
              >
                <option value="EN">Tiếng Anh</option>
                <option value="GT">Giải tích</option>
                <option value="VL">Vật lý</option>
                <option value="IT">Nhập môn CNTT</option>
                <option value="PL">Pháp luật</option>
              </select>
            </label>
            <textarea
              rows={6}
              value={bulkText}
              onChange={(event) => setBulkText(event.target.value)}
              placeholder={"Mỗi dòng một thẻ: mặt trước | mặt sau\nborrow | mượn (borrow from)\nlend | cho mượn"}
              style={{ width: "100%" }}
            />
            <button
              className="learning-button learning-button-primary"
              onClick={addCards}
            >
              Thêm các thẻ
            </button>
          </div>
        )}
      </div>
      {message && (
        <p className="learning-inline-message" role="status">
          <Check size={17} /> {message}
        </p>
      )}
      {error && (
        <p
          className="learning-inline-message learning-error-message"
          role="alert"
        >
          {error}
        </p>
      )}
      {!activeCard ? (
        <div className="learning-empty learning-review-empty">
          <Sparkles size={38} />
          <h3>
            {cards.length
              ? "Bạn đã ôn hết các thẻ đến hạn"
              : "Sổ ôn đang chờ bài học đầu tiên"}
          </h3>
          <p>
            {cards.length
              ? `Thẻ tiếp theo hẹn ngày ${dateLabel(cards[0].dueAt)}. Bạn vẫn có thể mở lịch sắp tới để ôn sớm.`
              : "Làm bài tập hoặc lưu checkpoint hoàn thành để tạo thẻ ôn từ chính những gì bạn đã học."}
          </p>
        </div>
      ) : (
        <>
          <article className="learning-flashcard">
            <div className="learning-flashcard-top">
              <span>{activeCard.lessonId}</span>
              <span>
                {new Date(activeCard.dueAt).getTime() > now
                  ? `Hẹn ${dateLabel(activeCard.dueAt)}`
                  : "Đến hạn hôm nay"}
              </span>
            </div>
            <span className="learning-eyebrow">NHỚ TRƯỚC · MỞ ĐÁP ÁN SAU</span>
            <h3>{activeCard.front}</h3>
            {revealedId === activeCard.id ? (
              <>
                <div className="learning-flashcard-answer">
                  <span>ĐỐI CHIẾU</span>
                  <p>{activeCard.back}</p>
                </div>
                <p className="learning-self-check">
                  Bạn có tự trả lời được trước khi mở không?
                </p>
                <div className="learning-flashcard-actions">
                  <button
                    className="learning-button"
                    onClick={() => review(activeCard, false)}
                  >
                    <RotateCcw size={17} /> Chưa nhớ
                  </button>
                  <button
                    className="learning-button learning-button-primary"
                    onClick={() => review(activeCard, true)}
                  >
                    <Check size={17} /> Nhớ được
                  </button>
                </div>
              </>
            ) : (
              <button
                className="learning-button learning-button-primary"
                onClick={() => setRevealedId(activeCard.id)}
              >
                <Eye size={18} /> Mở đáp án để đối chiếu
              </button>
            )}
            {onOpenLesson && activeCard.lessonId !== "flashcard" && (
              <button
                className="learning-text-button learning-open-lesson"
                onClick={() => onOpenLesson(activeCard.lessonId)}
              >
                Quay lại bài học <ArrowRight size={16} />
              </button>
            )}
          </article>
          {visible.length > 1 && (
            <div className="learning-review-queue">
              <h3>Còn {visible.length - 1} thẻ trong lượt này</h3>
              {visible.slice(1, 5).map((card) => (
                <div key={card.id}>
                  <span className="learning-queue-dot" />
                  <span>{card.front.split("\n")[0]}</span>
                  <small>{card.lessonId}</small>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <p className="learning-small-print">
        “Nhớ được” là tự đánh giá của bạn, được lưu riêng với điểm bài kiểm tra.
      </p>
    </section>
  );
}

export { ReviewPanel };
