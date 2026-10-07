import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Highlighter,
  Lightbulb,
  Pause,
  Play,
  Plus,
  Sparkles,
  Target,
  Trash2,
  X,
} from "lucide-react";
import {
  addHighlight,
  addNote,
  deleteHighlight,
  patchLessonProgress,
  recordStudySession,
  upsertReviewCard,
  useLearningState,
} from "../lib/store";
import type {
  Highlight,
  HighlightColor,
  Lesson,
  LessonContent,
} from "../types";
import NotesPanel from "./NotesPanel";
import QuizPanel from "./QuizPanel";
import "./learning.css";

interface LessonWorkspaceProps {
  lesson: Lesson;
  content?: LessonContent;
  onBack?: () => void;
}
interface SelectedPassage {
  text: string;
  sectionId: string;
  startOffset: number;
  endOffset: number;
  top: number;
  left: number;
}

function markedText(text: string, highlights: Highlight[]) {
  const segments = highlights
    .map((highlight) => {
      let start = highlight.startOffset ?? -1;
      if (
        start < 0 ||
        text.slice(start, start + highlight.text.length) !== highlight.text
      )
        start = text.indexOf(highlight.text);
      return { highlight, start, end: start + highlight.text.length };
    })
    .filter((item) => item.start >= 0)
    .sort((a, b) => a.start - b.start);
  const result = [];
  let cursor = 0;
  for (const { highlight, start, end } of segments) {
    if (start < cursor) continue;
    if (start > cursor) result.push(text.slice(cursor, start));
    result.push(
      <mark
        key={highlight.id}
        className={`learning-highlight-${highlight.color}`}
      >
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  }
  result.push(text.slice(cursor));
  return result;
}

export default function LessonWorkspace({
  lesson,
  content,
  onBack,
}: LessonWorkspaceProps) {
  const state = useLearningState();
  const progress = state.progress[lesson.id];
  const [tab, setTab] = useState<"read" | "practice" | "notes">("read");
  const [selection, setSelection] = useState<SelectedPassage | null>(null);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");
  const [focusStart, setFocusStart] = useState<number | null>(null);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const runningStart = useRef<number | null>(null);
  const [checkpointOpen, setCheckpointOpen] = useState(false);
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);
  const focusReturnRef = useRef<HTMLElement | null>(null);
  const highlights = state.highlights.filter(
    (item) => item.lessonId === lesson.id,
  );
  const hasContent = !!content?.sections.length;

  useEffect(() => {
    if (!focusStart) return;
    const timer = window.setInterval(
      () =>
        setFocusSeconds(
          Math.max(0, Math.floor((Date.now() - focusStart) / 1000)),
        ),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [focusStart]);
  useEffect(
    () => () => {
      const start = runningStart.current;
      if (start !== null) {
        try {
          recordStudySession({
            lessonId: lesson.id,
            subjectId: lesson.subjectId,
            startedAt: new Date(start).toISOString(),
            endedAt: new Date().toISOString(),
            durationSeconds: Math.max(
              0,
              Math.floor((Date.now() - start) / 1000),
            ),
          });
        } catch {
          /* The store exposes the persistent error to the app-wide banner. */
        }
      }
    },
    [lesson.id, lesson.subjectId],
  );
  useEffect(() => {
    if (!checkpointOpen) return;
    const modal = modalRef.current;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setCheckpointOpen(false);
      }
      if (event.key !== "Tab" || !modal) return;
      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not(:disabled),textarea,input,a[href],[tabindex="0"]',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = priorOverflow;
      focusReturnRef.current?.focus();
    };
  }, [checkpointOpen]);

  function safeAction(action: () => void) {
    try {
      action();
      setActionError("");
      return true;
    } catch (caught) {
      setActionError(
        caught instanceof Error
          ? caught.message
          : "Không lưu được thay đổi. Hãy giữ lại nội dung và thử lại.",
      );
      return false;
    }
  }

  function stopFocus() {
    const start = runningStart.current;
    if (start === null) return;
    safeAction(() => {
      recordStudySession({
        lessonId: lesson.id,
        subjectId: lesson.subjectId,
        startedAt: new Date(start).toISOString(),
        endedAt: new Date().toISOString(),
        durationSeconds: Math.max(0, Math.floor((Date.now() - start) / 1000)),
      });
      runningStart.current = null;
      setFocusStart(null);
      setNotice(
        "Đã lưu thời gian phiên học. Bạn vẫn cần ghi kết quả đã luyện.",
      );
    });
  }
  function startFocus() {
    safeAction(() => {
      if (!progress || progress.status === "not_started")
        patchLessonProgress(lesson.id, { status: "in_progress" });
      const now = Date.now();
      runningStart.current = now;
      setFocusStart(now);
      setFocusSeconds(0);
    });
  }
  function getSelection() {
    const selected = window.getSelection();
    if (!selected || selected.isCollapsed || !selected.rangeCount) {
      setSelection(null);
      return;
    }
    const range = selected.getRangeAt(0);
    const anchor =
      range.startContainer instanceof Element
        ? range.startContainer
        : range.startContainer.parentElement;
    const focus =
      range.endContainer instanceof Element
        ? range.endContainer
        : range.endContainer.parentElement;
    const body = anchor?.closest<HTMLElement>("[data-highlight-body]");
    if (!body || focus?.closest("[data-highlight-body]") !== body) {
      setSelection(null);
      return;
    }
    const raw = selected.toString();
    const text = raw.trim();
    if (!text || text.length > 3000) {
      setSelection(null);
      return;
    }
    const preceding = range.cloneRange();
    preceding.selectNodeContents(body);
    preceding.setEnd(range.startContainer, range.startOffset);
    const startOffset = preceding.toString().length + raw.indexOf(text);
    const rect = range.getBoundingClientRect();
    setSelection({
      text,
      sectionId: body.dataset.sectionId || "",
      startOffset,
      endOffset: startOffset + text.length,
      top: Math.min(
        window.innerHeight - 75,
        rect.top > 75 ? rect.top - 58 : rect.bottom + 10,
      ),
      left: Math.max(12, Math.min(window.innerWidth - 240, rect.left)),
    });
  }
  function saveHighlight(color: HighlightColor) {
    if (!selection) return;
    safeAction(() => {
      addHighlight({
        lessonId: lesson.id,
        sectionId: selection.sectionId,
        text: selection.text,
        color,
        startOffset: selection.startOffset,
        endOffset: selection.endOffset,
      });
      setSelection(null);
      window.getSelection()?.removeAllRanges();
      setNotice("Đã lưu đoạn đánh dấu.");
    });
  }
  function completeLesson() {
    if (!confirmed || !result.trim()) return;
    safeAction(() => {
      const studiedAt = new Date().toISOString();
      patchLessonProgress(lesson.id, {
        status: "completed",
        studiedAt,
        result: result.trim(),
        errors: [
          ...new Set([
            ...(progress?.errors || []),
            ...errors
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          ]),
        ],
      });
      addNote({
        lessonId: lesson.id,
        subjectId: lesson.subjectId,
        text: `Checkpoint ${lesson.id}\n${result.trim()}${errors.trim() ? `\n\nCần ôn:\n${errors.trim()}` : ""}`,
      });
      upsertReviewCard({
        id: `${lesson.id}:checkpoint`,
        lessonId: lesson.id,
        subjectId: lesson.subjectId,
        front: `${lesson.title}\n\nHãy tự nói lại: ${lesson.objective}`,
        back: `Kết quả bạn đã ghi:\n${result.trim()}\n\nTiêu chí đối chiếu:\n${lesson.criteria}${errors.trim() ? `\n\nChỗ cần ôn:\n${errors.trim()}` : ""}`,
        dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        intervalDays: 1,
        repetitions: 0,
        lastReviewedAt: null,
      });
      if (focusStart) stopFocus();
      setCheckpointOpen(false);
      setNotice("Đã lưu checkpoint và hẹn ôn sau 1 ngày.");
    });
  }

  return (
    <section className="learning-workspace">
      <div className="learning-workspace-topbar">
        <button
          className="learning-text-button"
          onClick={() => {
            if (focusStart) stopFocus();
            onBack?.();
          }}
        >
          <ArrowLeft size={17} /> Tất cả bài học
        </button>
        <span>
          {lesson.id} · Tiết tự học {lesson.order}
        </span>
      </div>
      <header className="learning-lesson-header">
        <div className="learning-lesson-kicker">
          <span className="learning-subject-badge">
            {lesson.subjectId === "EN"
              ? "Tiếng Anh đầu vào"
              : lesson.subjectId === "GT"
                ? "Giải tích 1"
                : lesson.subjectId === "VL"
                  ? "Vật lý 1"
                  : lesson.subjectId === "IT"
                    ? "Nhập môn CNTT"
                    : "Pháp luật đại cương"}
          </span>
          <span>
            <Clock3 size={15} /> {lesson.durationMinutes} phút gợi ý
          </span>
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.objective}</p>
        <div className="learning-lesson-bottom">
          <span
            className={`learning-status ${progress?.status === "completed" ? "completed" : ""}`}
          >
            {progress?.status === "completed" ? (
              <CheckCircle2 size={16} />
            ) : (
              <span className="learning-status-dot" />
            )}
            {progress?.status === "completed"
              ? "Đã lưu checkpoint hoàn thành"
              : progress?.status === "in_progress"
                ? "Đang học · chưa hoàn thành"
                : "Chưa bắt đầu"}
          </span>
          <button
            className="learning-button learning-focus-button"
            onClick={focusStart ? stopFocus : startFocus}
          >
            {focusStart ? <Pause size={16} /> : <Play size={16} />}
            {focusStart
              ? `${Math.floor(focusSeconds / 60)
                  .toString()
                  .padStart(
                    2,
                    "0",
                  )}:${(focusSeconds % 60).toString().padStart(2, "0")} · Dừng phiên`
              : "Bắt đầu phiên học"}
          </button>
        </div>
      </header>
      <div
        className="learning-tabs"
        role="tablist"
        aria-label="Nội dung bài học"
      >
        {(
          [
            { id: "read", icon: BookOpen, label: "Bài học" },
            { id: "practice", icon: Sparkles, label: "Thử sức" },
            { id: "notes", icon: FileText, label: "Ghi chú" },
          ] as const
        ).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "active" : ""}
            onClick={() => {
              setTab(id);
              setSelection(null);
            }}
          >
            <Icon size={18} /> {label}
            {id === "notes" &&
              state.notes.filter((note) => note.lessonId === lesson.id).length >
                0 && (
                <span>
                  {
                    state.notes.filter((note) => note.lessonId === lesson.id)
                      .length
                  }
                </span>
              )}
          </button>
        ))}
      </div>
      {notice && (
        <div className="learning-inline-message" role="status">
          <Check size={16} />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Đóng thông báo">
            <X size={16} />
          </button>
        </div>
      )}
      {actionError && (
        <div
          className="learning-inline-message learning-error-message"
          role="alert"
        >
          {actionError}
        </div>
      )}
      <div role="tabpanel">
        {tab === "notes" ? (
          <NotesPanel lessonId={lesson.id} subjectId={lesson.subjectId} />
        ) : tab === "practice" ? (
          <>
            <div className="learning-small-print">{content?.quizScope}</div>
            <QuizPanel
              key={lesson.id}
              lessonId={lesson.id}
              subjectId={lesson.subjectId}
              questions={content?.questions || []}
              title={content?.quizLabel || "Một thử thách ngắn"}
              durationMinutes={Math.max(
                5,
                Math.ceil((content?.questions.length || 5) * 1.2),
              )}
            />
            <div className="learning-independent-challenge">
              <span>
                <Target size={21} />
              </span>
              <div>
                <h3>Tự làm thêm, bằng lời của bạn</h3>
                <p>{content?.challenge || lesson.exercises}</p>
                <button
                  className="learning-text-button"
                  onClick={() => setTab("notes")}
                >
                  Ghi lại bài làm / chỗ vướng <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="learning-reader-layout">
            <main
              className="learning-reader"
              onMouseUp={getSelection}
              onTouchEnd={() => window.setTimeout(getSelection, 80)}
            >
              {hasContent ? (
                <>
                  <div className="learning-reading-intro">
                    <Lightbulb size={23} />
                    <p>{content!.intro}</p>
                  </div>
                  <p className="learning-highlight-hint">
                    <Highlighter size={15} /> Chọn một đoạn chữ để đánh dấu màu
                    hoặc lưu thành ghi chú.
                  </p>
                  {content!.sections.map((section, sectionIndex) => (
                    <section
                      className="learning-reading-section"
                      id={`section-${section.id}`}
                      key={section.id}
                    >
                      <div className="learning-reading-section-title">
                        <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                        <h2>{section.title}</h2>
                      </div>
                      <div
                        className="learning-reading-body"
                        data-highlight-body
                        data-section-id={section.id}
                      >
                        {markedText(
                          section.body,
                          highlights.filter(
                            (item) => item.sectionId === section.id,
                          ),
                        )}
                      </div>
                    </section>
                  ))}
                  <button
                    className="learning-button learning-button-primary learning-reader-cta"
                    onClick={() => setTab("practice")}
                  >
                    Đến lượt bạn thử <ArrowRight size={17} />
                  </button>
                </>
              ) : (
                <div className="learning-outline">
                  <span className="learning-eyebrow">ĐỀ CƯƠNG TỰ HỌC</span>
                  <h2>Mục tiêu rõ ràng, học từng bước.</h2>
                  <p>
                    Bài này hiện có đề cương và tài liệu tham khảo. Nội dung
                    giảng đầy đủ và câu hỏi trong app chưa được biên soạn.
                  </p>
                  <div>
                    <h3>
                      <Target size={18} /> Mục tiêu
                    </h3>
                    <p>{lesson.objective}</p>
                    <h3>
                      <BookOpen size={18} /> Việc tự luyện
                    </h3>
                    <p>{lesson.exercises}</p>
                    <h3>
                      <CheckCircle2 size={18} /> Tự đối chiếu
                    </h3>
                    <p>{lesson.criteria}</p>
                  </div>
                  <button
                    className="learning-button learning-button-primary"
                    onClick={() => setTab("notes")}
                  >
                    <Plus size={17} /> Ghi kết quả đã tự luyện
                  </button>
                </div>
              )}
            </main>
            <aside className="learning-reader-sidebar">
              <div className="learning-sidebar-card">
                <span className="learning-eyebrow">ĐÍCH ĐẾN CỦA BÀI</span>
                <h3>
                  <Target size={19} /> Tự kiểm tra
                </h3>
                <p>{lesson.criteria}</p>
                <button
                  className="learning-button learning-button-primary"
                  onClick={(event) => {
                    focusReturnRef.current = event.currentTarget;
                    setResult(progress?.result || "");
                    setErrors("");
                    setConfirmed(false);
                    setCheckpointOpen(true);
                  }}
                >
                  <CheckCircle2 size={17} />{" "}
                  {progress?.status === "completed"
                    ? "Cập nhật checkpoint"
                    : "Ghi checkpoint hoàn thành"}
                </button>
                <small>Chỉ hoàn thành khi bạn tự xác nhận đã luyện.</small>
              </div>
              <div className="learning-sidebar-card">
                <h3>
                  <ExternalLink size={18} /> Tài liệu
                </h3>
                {lesson.resources?.map((resource) => (
                  <a
                    className="learning-resource-link"
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.title}
                    <ExternalLink size={14} />
                  </a>
                ))}
                <a
                  className="learning-resource-link"
                  href={`https://github.com/vangvanthuan1-commits/hoc-tap/blob/master/${lesson.sourcePath.split("/").map(encodeURIComponent).join("/")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Đề cương trong repo
                  <ExternalLink size={14} />
                </a>
              </div>
              {highlights.length > 0 && (
                <div className="learning-sidebar-card learning-saved-highlights">
                  <h3>
                    <Highlighter size={18} /> Đã đánh dấu · {highlights.length}
                  </h3>
                  {highlights.map((item) => (
                    <div key={item.id}>
                      <p className={`learning-highlight-${item.color}`}>
                        {item.text}
                      </p>
                      <button
                        className="learning-icon-button"
                        aria-label="Xóa đoạn đánh dấu"
                        onClick={() =>
                          safeAction(() => deleteHighlight(item.id))
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
      {selection && (
        <div
          className="learning-selection-toolbar"
          style={{ top: selection.top, left: selection.left }}
          onMouseDown={(event) => event.preventDefault()}
        >
          <button
            className="learning-color-dot pink"
            aria-label="Đánh dấu màu hồng"
            onClick={() => saveHighlight("pink")}
          />
          <button
            className="learning-color-dot blue"
            aria-label="Đánh dấu màu xanh"
            onClick={() => saveHighlight("blue")}
          />
          <button
            className="learning-color-dot yellow"
            aria-label="Đánh dấu màu vàng"
            onClick={() => saveHighlight("yellow")}
          />
          <span />
          <button
            aria-label="Lưu đoạn chọn thành ghi chú"
            onClick={() =>
              safeAction(() => {
                addNote({
                  lessonId: lesson.id,
                  subjectId: lesson.subjectId,
                  sectionId: selection.sectionId,
                  text: selection.text,
                });
                setSelection(null);
                window.getSelection()?.removeAllRanges();
                setNotice("Đã lưu đoạn chọn vào ghi chú của bài.");
              })
            }
          >
            <FileText size={17} />
          </button>
          <button
            aria-label="Đóng công cụ đánh dấu"
            onClick={() => setSelection(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}
      {checkpointOpen && (
        <div
          className="learning-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setCheckpointOpen(false);
          }}
        >
          <section
            ref={modalRef}
            className="learning-checkpoint-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkpoint-title"
          >
            <button
              className="learning-icon-button learning-modal-close"
              onClick={() => setCheckpointOpen(false)}
              aria-label="Đóng checkpoint"
            >
              <X size={21} />
            </button>
            <span className="learning-eyebrow">
              CHỈ GHI NHỮNG GÌ BẠN ĐÃ LÀM
            </span>
            <h2 id="checkpoint-title">Một checkpoint thật.</h2>
            <p>{lesson.criteria}</p>
            <label>
              Kết quả đã luyện
              <textarea
                aria-label="Kết quả đã luyện"
                autoFocus
                rows={3}
                value={result}
                onChange={(event) => setResult(event.target.value)}
                placeholder="Ví dụ: Tự làm đúng 4/5 câu, phân biệt được am / is / are."
              />
            </label>
            <label>
              Chỗ cần ôn lại — mỗi lỗi một dòng
              <textarea
                aria-label="Chỗ cần ôn lại"
                rows={2}
                value={errors}
                onChange={(event) => setErrors(event.target.value)}
                placeholder="Ví dụ: Còn quên đảo to be khi hỏi."
              />
            </label>
            <label className="learning-checkbox">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
              />
              <span>Tôi đã tự luyện và ghi đúng kết quả của mình.</span>
            </label>
            {actionError && (
              <div
                className="learning-inline-message learning-error-message"
                role="alert"
              >
                {actionError}
              </div>
            )}
            <button
              className="learning-button learning-button-primary"
              disabled={!confirmed || !result.trim()}
              onClick={completeLesson}
            >
              <Check size={17} /> Lưu và hẹn ôn
            </button>
          </section>
        </div>
      )}
    </section>
  );
}

export { LessonWorkspace };
