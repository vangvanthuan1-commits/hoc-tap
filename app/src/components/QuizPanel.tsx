import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import {
  patchLessonProgress,
  recordQuizAttempt,
  upsertReviewCard,
  useLearningState,
} from "../lib/store";
import type { QuizQuestion, SubjectId } from "../types";
import "./learning.css";

interface QuizPanelProps {
  lessonId: string;
  subjectId: SubjectId;
  questions: QuizQuestion[];
  title?: string;
  timed?: boolean;
  durationMinutes?: number;
}
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

export default function QuizPanel({
  lessonId,
  subjectId,
  questions,
  title = "Thử sức một chút",
  timed = false,
  durationMinutes = 10,
}: QuizPanelProps) {
  const state = useLearningState();
  const [mode, setMode] = useState<"practice" | "test">(
    timed ? "test" : "practice",
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [resultSaved, setResultSaved] = useState(false);
  const saved = useRef(false);
  const attemptRecorded = useRef(false);
  const question = questions[index];
  const elapsed = startedAt
    ? Math.max(0, Math.floor((now - startedAt) / 1000))
    : 0;
  const remaining = Math.max(0, durationMinutes * 60 - elapsed);
  const answeredCount = questions.filter(
    (item) => answers[item.id] !== undefined,
  ).length;
  const correctCount = questions.filter(
    (item) => answers[item.id] === item.answer,
  ).length;

  const finish = useCallback(() => {
    if (saved.current || !questions.length) return;
    try {
      const completedAt = new Date().toISOString();
      const wrong = questions.filter(
        (item) => answers[item.id] !== item.answer,
      );
      if (!attemptRecorded.current) {
        recordQuizAttempt({
          lessonId,
          subjectId,
          title,
          answers: questions.map((item) => ({
            questionId: item.id,
            selectedAnswer: answers[item.id] ?? null,
            correct: answers[item.id] === item.answer,
          })),
          correctCount: questions.length - wrong.length,
          totalQuestions: questions.length,
          durationSeconds: startedAt
            ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
            : 0,
          completedAt,
        });
        attemptRecorded.current = true;
      }
      wrong.forEach((item) =>
        upsertReviewCard({
          id: `${lessonId}:question:${item.id}`,
          lessonId,
          subjectId,
          front: `${item.prompt}\n\n${item.options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`).join("\n")}`,
          back: `${String.fromCharCode(65 + item.answer)}. ${item.options[item.answer]}\n\n${item.explanation}`,
          dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          intervalDays: 1,
          repetitions: 0,
          lastReviewedAt: null,
        }),
      );
      const prior = state.progress[lessonId];
      patchLessonProgress(lessonId, {
        status: prior?.status === "completed" ? "completed" : "in_progress",
        result: `${questions.length - wrong.length}/${questions.length} câu ${mode === "test" ? "kiểm tra" : "luyện tập"}`,
        errors: [
          ...new Set([
            ...(prior?.errors || []),
            ...wrong.map((item) => item.prompt),
          ]),
        ],
      });
      saved.current = true;
      setResultSaved(true);
      setSaveError("");
    } catch (caught) {
      setSaveError(
        caught instanceof Error
          ? caught.message
          : "Không lưu được kết quả. Giữ trang này và thử lưu lại.",
      );
    }
    setFinished(true);
  }, [
    answers,
    lessonId,
    mode,
    questions,
    startedAt,
    state.progress,
    subjectId,
    title,
  ]);

  useEffect(() => {
    if (!startedAt || finished) return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [startedAt, finished]);
  useEffect(() => {
    if (mode === "test" && startedAt && remaining === 0 && !finished) finish();
  }, [mode, startedAt, remaining, finished, finish]);

  function restart(nextMode = mode) {
    setMode(nextMode);
    setIndex(0);
    setAnswers({});
    setChecked({});
    setStartedAt(null);
    setNow(Date.now());
    setFinished(false);
    setSaveError("");
    setResultSaved(false);
    saved.current = false;
    attemptRecorded.current = false;
  }
  function selectAnswer(optionIndex: number) {
    if (finished || (mode === "practice" && checked[question.id])) return;
    if (!startedAt) setStartedAt(Date.now());
    setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
  }

  if (!questions.length)
    return (
      <div className="learning-empty">
        <Lightbulb size={30} />
        <h3>Bài này chưa có câu hỏi trong app</h3>
        <p>
          Hãy dùng bài tự luyện trong đề cương và ghi lại kết quả thực tế vào sổ
          tay.
        </p>
      </div>
    );

  if (finished)
    return (
      <section
        className="learning-quiz learning-quiz-finished"
        aria-label="Kết quả luyện tập"
      >
        <div className="learning-result-top">
          <span className="learning-result-icon">
            <Trophy size={30} />
          </span>
          <span className="learning-eyebrow">MỘT BƯỚC TIẾN THẬT</span>
          <h2>
            {correctCount}/{questions.length} câu đúng
          </h2>
          <p>
            {correctCount === questions.length
              ? "Bạn đã làm tốt lượt này. Hẹn gặp lại trong một lượt ôn để kiểm tra nhớ lâu."
              : resultSaved
                ? `${questions.length - correctCount} câu chưa đúng đã vào sổ lỗi, hẹn ôn ngày mai.`
                : "Xem lại những câu chưa đúng bên dưới. Kết quả chưa được lưu đầy đủ."}
          </p>
        </div>
        <div className="learning-result-stats">
          <span>
            <Clock3 size={16} /> {clock(elapsed)}
          </span>
          <span>
            <CheckCircle2 size={16} />{" "}
            {resultSaved ? "Đã lưu kết quả" : "Chưa lưu đầy đủ"}
          </span>
          <span>Chưa tự đánh dấu hoàn thành bài</span>
        </div>
        {saveError && (
          <div
            className="learning-inline-message learning-error-message"
            role="alert"
          >
            {saveError}
            <button onClick={finish}>Thử lưu lại</button>
          </div>
        )}
        <div className="learning-answer-review">
          {questions.map((item, itemIndex) => (
            <details
              key={item.id}
              className={
                answers[item.id] === item.answer
                  ? "learning-answer-correct"
                  : "learning-answer-wrong"
              }
            >
              <summary>
                <span className="learning-question-status">
                  {answers[item.id] === item.answer ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}
                </span>
                <span>
                  {itemIndex + 1}. {item.prompt}
                </span>
              </summary>
              <div>
                <p>
                  Bạn chọn:{" "}
                  <strong>
                    {answers[item.id] === undefined
                      ? "Chưa trả lời"
                      : item.options[answers[item.id]]}
                  </strong>
                </p>
                <p>
                  Đáp án: <strong>{item.options[item.answer]}</strong>
                </p>
                <p>{item.explanation}</p>
              </div>
            </details>
          ))}
        </div>
        <button
          className="learning-button learning-button-primary"
          onClick={() => restart()}
        >
          <RotateCcw size={17} /> Làm một lượt mới
        </button>
      </section>
    );

  return (
    <section className="learning-quiz" aria-label="Bài luyện tập">
      <div className="learning-section-heading">
        <div>
          <span className="learning-eyebrow">HỌC QUA VIỆC LÀM</span>
          <h2>
            <Sparkles size={22} /> {title}
          </h2>
        </div>
        <span
          className={`learning-quiz-clock ${mode === "test" && remaining < 60 ? "learning-danger" : ""}`}
        >
          <Clock3 size={16} />{" "}
          {mode === "test" ? clock(remaining) : clock(elapsed)}
        </span>
      </div>
      <div
        className="learning-quiz-mode"
        role="group"
        aria-label="Chế độ bài tập"
      >
        <button
          className={mode === "practice" ? "active" : ""}
          onClick={() => restart("practice")}
        >
          Luyện + chữa từng câu
        </button>
        <button
          className={mode === "test" ? "active" : ""}
          onClick={() => restart("test")}
        >
          Kiểm tra {durationMinutes} phút
        </button>
      </div>
      {mode === "test" && !startedAt ? (
        <div className="learning-test-start">
          <Clock3 size={32} />
          <h3>
            {questions.length} câu · {durationMinutes} phút
          </h3>
          <p>
            Đáp án chỉ mở sau khi nộp. Bài này do app soạn để tự luyện, không
            phải đề thi trường.
          </p>
          <button
            className="learning-button learning-button-primary"
            onClick={() => {
              setStartedAt(Date.now());
              setNow(Date.now());
            }}
          >
            Bắt đầu kiểm tra <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <>
          <div className="learning-quiz-progress">
            <span>
              Câu {index + 1} / {questions.length}
            </span>
            <span>{answeredCount} đã chọn</span>
            <div>
              <i
                style={{
                  width: `${(answeredCount / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <h3 className="learning-question-prompt">{question.prompt}</h3>
          <div
            className="learning-answer-options"
            role="radiogroup"
            aria-label={question.prompt}
          >
            {question.options.map((option, optionIndex) => {
              const revealed = mode === "practice" && checked[question.id];
              const selected = answers[question.id] === optionIndex;
              const optionState =
                revealed && optionIndex === question.answer
                  ? "correct"
                  : revealed && selected
                    ? "wrong"
                    : selected
                      ? "selected"
                      : "";
              return (
                <button
                  key={optionIndex}
                  className={`learning-answer-option ${optionState}`}
                  role="radio"
                  aria-checked={selected}
                  disabled={revealed}
                  onClick={() => selectAnswer(optionIndex)}
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  <b>{option}</b>
                  {revealed && optionIndex === question.answer ? (
                    <CheckCircle2 size={19} />
                  ) : revealed && selected ? (
                    <X size={19} />
                  ) : null}
                </button>
              );
            })}
          </div>
          {mode === "practice" && checked[question.id] && (
            <div
              className={`learning-question-feedback ${answers[question.id] === question.answer ? "correct" : "wrong"}`}
              role="status"
            >
              <strong>
                {answers[question.id] === question.answer
                  ? "Đúng rồi!"
                  : "Cùng sửa chỗ này nhé."}
              </strong>
              <p>{question.explanation}</p>
            </div>
          )}
          <div className="learning-question-navigation">
            <button
              className="learning-button"
              onClick={() => setIndex((current) => current - 1)}
              disabled={index === 0}
            >
              Câu trước
            </button>
            {mode === "practice" && !checked[question.id] ? (
              <button
                className="learning-button learning-button-primary"
                disabled={answers[question.id] === undefined}
                onClick={() =>
                  setChecked((current) => ({ ...current, [question.id]: true }))
                }
              >
                Kiểm tra đáp án <Check size={16} />
              </button>
            ) : index < questions.length - 1 ? (
              <button
                className="learning-button learning-button-primary"
                onClick={() => setIndex((current) => current + 1)}
              >
                Câu tiếp <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="learning-button learning-button-primary"
                onClick={finish}
              >
                Nộp và lưu kết quả <Check size={16} />
              </button>
            )}
          </div>
          {mode === "test" && (
            <div className="learning-question-dots" aria-label="Chọn câu hỏi">
              {questions.map((item, itemIndex) => (
                <button
                  aria-label={`Đến câu ${itemIndex + 1}`}
                  aria-current={index === itemIndex ? "step" : undefined}
                  className={`${index === itemIndex ? "current" : ""} ${answers[item.id] !== undefined ? "answered" : ""}`}
                  key={item.id}
                  onClick={() => setIndex(itemIndex)}
                >
                  {itemIndex + 1}
                </button>
              ))}
            </div>
          )}
          <p className="learning-small-print">
            Chỉ kết quả bạn nộp được ghi vào tiến độ. Đọc bài hoặc chọn đáp án
            chưa làm bài thành “đã học”.
          </p>
        </>
      )}
    </section>
  );
}

export { QuizPanel };
