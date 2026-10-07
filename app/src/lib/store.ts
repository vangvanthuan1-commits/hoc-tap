import { useSyncExternalStore } from "react";
import type {
  Highlight,
  InitialLessonProgress,
  LearningNote,
  LearningState,
  LessonProgress,
  QuizAttempt,
  ReviewCard,
  StudySession,
} from "../types";

const STORAGE_PREFIX = "thuan-study.v1";
const MAX_IMPORT_BYTES = 4_000_000;
const listeners = new Set<() => void>();
let initialProgress: Record<string, InitialLessonProgress> = {};
interface RepositoryResources {
  notes: LearningNote[];
  reviewCards: ReviewCard[];
}
let initialResources: RepositoryResources = { notes: [], reviewCards: [] };
let activeOwner: string | null = null;
let persistenceError = "";
let rawRecoveryBackup: string | null = null;
const now = () => new Date().toISOString();
const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const storageKey = () => `${STORAGE_PREFIX}:${activeOwner ?? "local"}`;
const emptyState = (): LearningState => ({
  schemaVersion: 1,
  ownerUid: activeOwner,
  createdAt: now(),
  updatedAt: now(),
  progress: {},
  notes: [],
  highlights: [],
  quizAttempts: [],
  reviewCards: [],
  sessions: [],
  deleted: {},
});
let state: LearningState = emptyState();
let hydrated = false;
const notify = () => listeners.forEach((listener) => listener());
const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
function fail(message: string): never {
  throw new Error(`Dữ liệu không hợp lệ: ${message}`);
}
const string = (value: unknown, name: string, max = 100_000): string =>
  typeof value === "string" && value.length <= max ? value : fail(name);
const timestamp = (value: unknown, name: string): string => {
  const text = string(value, name, 64);
  return Number.isFinite(Date.parse(text)) ? text : fail(name);
};
const subject = (value: unknown) =>
  ["EN", "GT", "VL", "IT", "PL"].includes(String(value));
const arrays = [
  "notes",
  "highlights",
  "quizAttempts",
  "reviewCards",
  "sessions",
] as const;
const finite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

/** Validate imports and remote documents before they can affect local learning history. */
export function validateLearningState(value: unknown): LearningState {
  if (!isObject(value) || value.schemaVersion !== 1)
    fail("phiên bản tệp chưa được hỗ trợ");
  if (value.ownerUid !== null && typeof value.ownerUid !== "string")
    fail("chủ sở hữu");
  timestamp(value.createdAt, "ngày tạo");
  timestamp(value.updatedAt, "ngày cập nhật");
  if (!isObject(value.progress) || !isObject(value.deleted))
    fail("tiến độ hoặc lịch sử xóa");
  for (const [id, entry] of Object.entries(value.progress)) {
    string(id, "mã tiết", 128);
    if (!/^(EN|GT|VL|IT|PL)\d{2,4}$/.test(id)) fail("mã tiết không hợp lệ");
    if (
      !isObject(entry) ||
      !["not_started", "in_progress", "completed"].includes(
        String(entry.status),
      )
    )
      fail(`trạng thái ${id}`);
    if (entry.studiedAt !== null) timestamp(entry.studiedAt, `ngày học ${id}`);
    string(entry.result, `kết quả ${id}`, 20_000);
    timestamp(entry.updatedAt, `cập nhật ${id}`);
    if (
      !Array.isArray(entry.errors) ||
      entry.errors.length > 200 ||
      !entry.errors.every(
        (item) => typeof item === "string" && item.length < 10_000,
      )
    )
      fail(`lỗi ${id}`);
  }
  for (const [id, date] of Object.entries(value.deleted)) {
    string(id, "mã bản ghi đã xóa", 256);
    if (!/^(notes|highlights|quizAttempts|reviewCards|sessions):.+$/.test(id))
      fail("mã bản ghi đã xóa");
    timestamp(date, "ngày xóa");
  }
  for (const name of arrays) {
    const entries = value[name];
    if (!Array.isArray(entries) || entries.length > 20_000) fail(name);
    const ids = new Set<string>();
    for (const entry of entries) {
      if (!isObject(entry)) fail(name);
      const id = string(entry.id, "mã bản ghi", 128);
      if (ids.has(id)) fail("mã bản ghi trùng");
      ids.add(id);
      string(entry.lessonId, "mã tiết", 128);
      timestamp(entry.updatedAt, "ngày cập nhật");
      if (entry.subjectId !== undefined && !subject(entry.subjectId))
        fail("mã môn");
      if (name === "notes") {
        string(entry.text, "nội dung ghi chú");
        timestamp(entry.createdAt, "ngày ghi chú");
        if (entry.sectionId !== undefined) string(entry.sectionId, "mục", 128);
      }
      if (name === "highlights") {
        string(entry.sectionId, "mục", 128);
        string(entry.text, "đoạn đánh dấu");
        timestamp(entry.createdAt, "ngày đánh dấu");
        if (!["pink", "blue", "yellow"].includes(String(entry.color)))
          fail("màu đánh dấu");
        for (const offset of ["startOffset", "endOffset"])
          if (
            entry[offset] !== undefined &&
            (!finite(entry[offset]) || !Number.isInteger(entry[offset]))
          )
            fail("vị trí đánh dấu");
      }
      if (name === "quizAttempts") {
        if (
          !subject(entry.subjectId) ||
          !finite(entry.correctCount) ||
          !finite(entry.totalQuestions) ||
          !Number.isInteger(entry.correctCount) ||
          !Number.isInteger(entry.totalQuestions) ||
          entry.correctCount > entry.totalQuestions ||
          !finite(entry.durationSeconds)
        )
          fail("điểm bài kiểm tra");
        timestamp(entry.completedAt, "ngày kiểm tra");
        if (
          !Array.isArray(entry.answers) ||
          entry.answers.length !== entry.totalQuestions ||
          !entry.answers.every(
            (answer) =>
              isObject(answer) &&
              typeof answer.questionId === "string" &&
              typeof answer.correct === "boolean" &&
              (answer.selectedAnswer === null ||
                (finite(answer.selectedAnswer) &&
                  Number.isInteger(answer.selectedAnswer))),
          )
        )
          fail("câu trả lời");
        if (
          entry.correctCount !==
          entry.answers.filter((answer) => answer.correct).length
        )
          fail("tổng số câu đúng");
      }
      if (name === "reviewCards") {
        string(entry.front, "mặt trước thẻ", 20_000);
        string(entry.back, "mặt sau thẻ", 30_000);
        timestamp(entry.dueAt, "ngày ôn");
        timestamp(entry.createdAt, "ngày tạo thẻ");
        if (!finite(entry.intervalDays) || !finite(entry.repetitions))
          fail("lịch ôn");
        if (entry.lastReviewedAt !== null)
          timestamp(entry.lastReviewedAt, "lần ôn gần nhất");
      }
      if (name === "sessions") {
        if (!subject(entry.subjectId) || !finite(entry.durationSeconds))
          fail("phiên học");
        timestamp(entry.startedAt, "bắt đầu");
        timestamp(entry.endedAt, "kết thúc");
      }
    }
  }
  // Use a JSON clone to discard prototypes and keep the public store immutable.
  return JSON.parse(JSON.stringify(value)) as LearningState;
}
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  let raw: string | null = null;
  try {
    raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(storageKey())
        : null;
    if (raw) {
      const restored = validateLearningState(JSON.parse(raw));
      if (restored.ownerUid !== activeOwner)
        throw new Error("Vùng lưu không khớp tài khoản.");
      state = restored;
    }
  } catch {
    rawRecoveryBackup = raw;
    persistenceError =
      "Không đọc được dữ liệu đã lưu trên thiết bị. Tệp cũ được giữ nguyên; hãy xuất hoặc khôi phục bản sao trước khi sửa.";
  }
}
function save(next: LearningState) {
  next = validateLearningState(next);
  if (persistenceError) throw new Error(persistenceError);
  try {
    if (typeof window !== "undefined")
      window.localStorage.setItem(storageKey(), JSON.stringify(next));
  } catch {
    persistenceError =
      "Không lưu được trên thiết bị (bộ nhớ đầy hoặc bị chặn). Hãy tải bản sao và giải phóng bộ nhớ.";
    notify();
    throw new Error(persistenceError);
  }
  state = next;
  notify();
}
function mutate(change: (next: LearningState) => void) {
  hydrate();
  const next = JSON.parse(JSON.stringify(state)) as LearningState;
  change(next);
  next.updatedAt = now();
  save(next);
}
export function initializeLearningState(
  seed: Record<string, InitialLessonProgress>,
  resources: RepositoryResources = initialResources,
) {
  initialProgress = seed;
  initialResources = resources;
  hydrate();
  const missing = Object.entries(seed).filter(([id]) => !state.progress[id]);
  const notes = resources.notes.filter(
    (item) =>
      !state.notes.some((note) => note.id === item.id) &&
      !state.deleted[`notes:${item.id}`],
  );
  const cards = resources.reviewCards.filter(
    (item) =>
      !state.reviewCards.some((card) => card.id === item.id) &&
      !state.deleted[`reviewCards:${item.id}`],
  );
  if ((missing.length || notes.length || cards.length) && !persistenceError)
    mutate((next) => {
      missing.forEach(([id, item]) => {
        next.progress[id] = {
          ...item,
          updatedAt: item.studiedAt
            ? new Date(item.studiedAt).toISOString()
            : "1970-01-01T00:00:00.000Z",
        };
      });
      next.notes.push(...notes);
      next.reviewCards.push(...cards);
    });
}
export function getLearningState(): LearningState {
  hydrate();
  return state;
}
export function getPersistenceError(): string {
  hydrate();
  return persistenceError;
}
export function subscribeLearningState(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function useLearningState() {
  return useSyncExternalStore(
    subscribeLearningState,
    getLearningState,
    getLearningState,
  );
}
export function usePersistenceError() {
  return useSyncExternalStore(
    subscribeLearningState,
    getPersistenceError,
    getPersistenceError,
  );
}

/** Keep each authenticated account separate; a first sign-in adopts this device's guest work. */
export function activateLearningOwner(uid: string | null) {
  if (uid === activeOwner) return;
  hydrate();
  const previous = state;
  const previousOwner = activeOwner;
  activeOwner = uid;
  state = emptyState();
  hydrated = false;
  persistenceError = "";
  rawRecoveryBackup = null;
  hydrate();
  if (
    uid &&
    previousOwner === null &&
    Object.keys(state.progress).length === 0 &&
    !persistenceError
  )
    save({ ...previous, ownerUid: uid });
  initializeLearningState(initialProgress);
  notify();
}
export function patchLessonProgress(
  lessonId: string,
  patch: Partial<Omit<LessonProgress, "updatedAt">>,
) {
  mutate((next) => {
    const previous = next.progress[lessonId] ?? {
      status: "not_started",
      studiedAt: null,
      result: "",
      errors: [],
      updatedAt: now(),
    };
    next.progress[lessonId] = { ...previous, ...patch, updatedAt: now() };
  });
}
export function addNote(
  input: Omit<LearningNote, "id" | "createdAt" | "updatedAt">,
): string {
  const id = makeId();
  mutate((next) =>
    next.notes.push({ ...input, id, createdAt: now(), updatedAt: now() }),
  );
  return id;
}
export function updateNote(id: string, text: string) {
  mutate((next) => {
    const note = next.notes.find((item) => item.id === id);
    if (note) {
      note.text = text;
      note.updatedAt = now();
    }
  });
}
function deleteRecord(
  collection: "notes" | "highlights" | "reviewCards",
  id: string,
) {
  mutate((next) => {
    if (collection === "notes")
      next.notes = next.notes.filter((item) => item.id !== id);
    else if (collection === "highlights")
      next.highlights = next.highlights.filter((item) => item.id !== id);
    else next.reviewCards = next.reviewCards.filter((item) => item.id !== id);
    next.deleted[`${collection}:${id}`] = now();
  });
}
export const deleteNote = (id: string) => deleteRecord("notes", id);
export function addHighlight(
  input: Omit<Highlight, "id" | "createdAt" | "updatedAt">,
): string {
  const id = makeId();
  mutate((next) =>
    next.highlights.push({ ...input, id, createdAt: now(), updatedAt: now() }),
  );
  return id;
}
export const deleteHighlight = (id: string) => deleteRecord("highlights", id);
export function recordQuizAttempt(
  input: Omit<QuizAttempt, "id" | "updatedAt">,
): string {
  const id = makeId();
  mutate((next) => next.quizAttempts.push({ ...input, id, updatedAt: now() }));
  return id;
}
export function upsertReviewCard(
  input: Omit<ReviewCard, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
    createdAt?: string;
  },
): string {
  const id = input.id ?? makeId();
  mutate((next) => {
    const index = next.reviewCards.findIndex((item) => item.id === id);
    const previous = index < 0 ? null : next.reviewCards[index];
    const card: ReviewCard = {
      ...input,
      id,
      createdAt: previous?.createdAt ?? input.createdAt ?? now(),
      updatedAt: now(),
    };
    if (index < 0) next.reviewCards.push(card);
    else next.reviewCards[index] = card;
    delete next.deleted[`reviewCards:${id}`];
  });
  return id;
}
export const deleteReviewCard = (id: string) => deleteRecord("reviewCards", id);
export function recordStudySession(
  input: Omit<StudySession, "id" | "updatedAt">,
): string {
  const id = makeId();
  mutate((next) => next.sessions.push({ ...input, id, updatedAt: now() }));
  return id;
}
export function mergeLearningStates(
  local: LearningState,
  incoming: LearningState,
): LearningState {
  if (
    local.ownerUid &&
    incoming.ownerUid &&
    local.ownerUid !== incoming.ownerUid
  )
    throw new Error("Bản sao thuộc tài khoản khác.");
  const merged: LearningState = {
    ...local,
    ownerUid: local.ownerUid ?? incoming.ownerUid,
    createdAt:
      local.createdAt < incoming.createdAt
        ? local.createdAt
        : incoming.createdAt,
    updatedAt:
      local.updatedAt > incoming.updatedAt
        ? local.updatedAt
        : incoming.updatedAt,
    progress: { ...local.progress },
    deleted: { ...local.deleted },
    notes: [],
    highlights: [],
    quizAttempts: [],
    reviewCards: [],
    sessions: [],
  };
  for (const [id, date] of Object.entries(incoming.deleted))
    if (!merged.deleted[id] || date > merged.deleted[id])
      merged.deleted[id] = date;
  for (const [id, item] of Object.entries(incoming.progress))
    if (!merged.progress[id] || item.updatedAt > merged.progress[id].updatedAt)
      merged.progress[id] = item;
  for (const name of arrays) {
    const byId = new Map<string, { id: string; updatedAt: string }>();
    for (const entry of [...local[name], ...incoming[name]])
      if (
        !byId.has(entry.id) ||
        entry.updatedAt > byId.get(entry.id)!.updatedAt
      )
        byId.set(entry.id, entry);
    (merged[name] as { id: string; updatedAt: string }[]) = [...byId.values()]
      .filter(
        (entry) =>
          !merged.deleted[`${name}:${entry.id}`] ||
          entry.updatedAt > merged.deleted[`${name}:${entry.id}`],
      )
      .sort((a, b) => a.id.localeCompare(b.id));
  }
  return merged;
}
export function learningStateFingerprint(value: LearningState): string {
  const stable = (item: unknown): unknown => {
    if (Array.isArray(item)) return item.map(stable);
    if (isObject(item))
      return Object.fromEntries(
        Object.keys(item)
          .sort()
          .map((key) => [key, stable(item[key])]),
      );
    return item;
  };
  return JSON.stringify(stable(value));
}
export function acceptRemoteState(incoming: LearningState) {
  hydrate();
  const merged = mergeLearningStates(state, validateLearningState(incoming));
  if (learningStateFingerprint(merged) !== learningStateFingerprint(state))
    save(merged);
}
export function exportLearningData(): string {
  hydrate();
  // When an old file cannot be parsed, preserve its raw bytes for recovery rather than export an empty replacement.
  return rawRecoveryBackup ?? JSON.stringify(getLearningState(), null, 2);
}
export function importLearningData(raw: string): {
  notes: number;
  attempts: number;
  lessons: number;
} {
  if (raw.length > MAX_IMPORT_BYTES)
    throw new Error("Tệp quá lớn; giới hạn nhập là 4 MB.");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Tệp không phải JSON hợp lệ.");
  }
  const imported = validateLearningState(parsed);
  if (activeOwner && imported.ownerUid && imported.ownerUid !== activeOwner)
    throw new Error("Tệp thuộc tài khoản khác; hãy đăng nhập đúng tài khoản.");
  // Guest imports preserve work but do not impersonate the account stored in a backup.
  imported.ownerUid = activeOwner;
  persistenceError = "";
  rawRecoveryBackup = null;
  save(mergeLearningStates(getLearningState(), imported));
  return {
    notes: imported.notes.length,
    attempts: imported.quizAttempts.length,
    lessons: Object.keys(imported.progress).length,
  };
}
export function downloadLearningBackup() {
  const blob = new Blob([exportLearningData()], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `hoc-tap-${rawRecoveryBackup ? "recovery-" : ""}${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
if (typeof window !== "undefined")
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey() || !event.newValue) return;
    try {
      const incoming = validateLearningState(JSON.parse(event.newValue));
      if (incoming.ownerUid !== activeOwner)
        throw new Error("Vùng lưu không khớp tài khoản.");
      const merged = mergeLearningStates(getLearningState(), incoming);
      // Concurrent tab writes must converge on disk as well as in memory.
      // A union already received from another tab needs no write-back.
      if (learningStateFingerprint(merged) !== learningStateFingerprint(incoming)) {
        save(merged);
      } else {
        state = merged;
        notify();
      }
    } catch {
      if (!persistenceError)
        persistenceError =
          "Dữ liệu từ thẻ khác không hợp lệ; bản hiện tại được giữ nguyên.";
      notify();
    }
  });
