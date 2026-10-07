import { afterEach, describe, expect, it, vi } from "vitest";
import { mergeLearningStates, validateLearningState } from "./store";
import type { LearningState } from "../types";
const base = (): LearningState => ({
  schemaVersion: 1,
  ownerUid: "same-user",
  createdAt: "2026-10-07T00:00:00.000Z",
  updatedAt: "2026-10-07T00:00:00.000Z",
  progress: {},
  notes: [],
  highlights: [],
  quizAttempts: [],
  reviewCards: [],
  sessions: [],
  deleted: {},
});
const note = (id: string, text: string, updatedAt: string) => ({
  id,
  lessonId: "EN02",
  text,
  createdAt: "2026-10-07T00:00:00.000Z",
  updatedAt,
});

describe("durable cross-device progress merge", () => {
  it("keeps newer cloud progress while retaining a new offline note", () => {
    const local = base();
    const remote = base();
    local.progress.EN02 = {
      status: "in_progress",
      studiedAt: "2026-10-07",
      result: "Câu khẳng định 4/4",
      errors: [],
      updatedAt: "2026-10-07T01:00:00.000Z",
    };
    remote.progress.EN02 = {
      status: "completed",
      studiedAt: "2026-10-08",
      result: "Đã ôn và làm kiểm tra",
      errors: [],
      updatedAt: "2026-10-08T01:00:00.000Z",
    };
    local.notes.push(
      note("offline-note", "Ghi chú chưa lên mạng", "2026-10-08T02:00:00.000Z"),
    );
    const merged = mergeLearningStates(local, remote);
    expect(merged.progress.EN02.status).toBe("completed");
    expect(merged.notes).toHaveLength(1);
    expect(mergeLearningStates(merged, remote)).toEqual(merged);
  });
  it("combines independent notes and keeps the newest edit of the same note", () => {
    const local = base();
    const remote = base();
    local.notes = [
      note("shared", "Bản mới", "2026-10-08T00:00:00.000Z"),
      note("phone", "Điện thoại", "2026-10-07T00:00:00.000Z"),
    ];
    remote.notes = [
      note("shared", "Bản cũ", "2026-10-07T00:00:00.000Z"),
      note("laptop", "Máy tính", "2026-10-07T00:00:00.000Z"),
    ];
    const merged = mergeLearningStates(local, remote);
    expect(merged.notes).toHaveLength(3);
    expect(merged.notes.find((item) => item.id === "shared")?.text).toBe(
      "Bản mới",
    );
  });
  it("does not resurrect a note removed on another device", () => {
    const local = base();
    const remote = base();
    local.notes = [note("deleted", "Bản cũ", "2026-10-07T00:00:00.000Z")];
    remote.deleted["notes:deleted"] = "2026-10-08T00:00:00.000Z";
    expect(mergeLearningStates(local, remote).notes).toEqual([]);
  });
  it("blocks merging another account history", () => {
    const other = { ...base(), ownerUid: "another-user" };
    expect(() => mergeLearningStates(base(), other)).toThrow("tài khoản khác");
  });
});

describe("backup and cloud document validation", () => {
  it("accepts a complete current schema", () =>
    expect(validateLearningState(base())).toEqual(base()));
  it("rejects unknown schema and incorrect timestamps", () => {
    expect(() =>
      validateLearningState({ ...base(), schemaVersion: 2 }),
    ).toThrow("phiên bản");
    expect(() =>
      validateLearningState({ ...base(), updatedAt: "yesterday" }),
    ).toThrow("ngày cập nhật");
  });
  it("rejects a falsified quiz score inconsistent with the saved answers", () => {
    const state = base();
    state.quizAttempts = [
      {
        id: "test",
        lessonId: "EN02",
        subjectId: "EN",
        answers: [{ questionId: "q1", selectedAnswer: 0, correct: false }],
        correctCount: 1,
        totalQuestions: 1,
        durationSeconds: 20,
        completedAt: "2026-10-07T00:00:00.000Z",
        updatedAt: "2026-10-07T00:00:00.000Z",
      },
    ];
    expect(() => validateLearningState(state)).toThrow("tổng số câu đúng");
  });
  it("rejects malformed note collections instead of replacing good local history", () => {
    expect(() =>
      validateLearningState({ ...base(), notes: "invalid" }),
    ).toThrow("notes");
    expect(() =>
      validateLearningState({
        ...base(),
        notes: [
          note("x", "A", "2026-10-07T00:00:00.000Z"),
          note("x", "B", "2026-10-07T00:00:00.000Z"),
        ],
      }),
    ).toThrow("trùng");
  });
});

describe("validated backup imports", () => {
  it("imports an anonymous backup while preserving existing independent notes", async () => {
    const { addNote, getLearningState, importLearningData } = await import(
      "./store"
    );
    const id = addNote({ lessonId: "EN02", text: "Ghi chú cục bộ cần giữ" });
    const imported = {
      ...base(),
      ownerUid: null,
      notes: [
        note(
          "from-backup",
          "Ghi chú trong bản sao",
          "2026-10-07T00:00:00.000Z",
        ),
      ],
    };
    importLearningData(JSON.stringify(imported));
    expect(getLearningState().notes.find((item) => item.id === id)?.text).toBe(
      "Ghi chú cục bộ cần giữ",
    );
    expect(
      getLearningState().notes.find((item) => item.id === "from-backup")?.text,
    ).toBe("Ghi chú trong bản sao");
  });
  it("keeps current history intact when invalid JSON is imported", async () => {
    const { exportLearningData, importLearningData } = await import("./store");
    const before = exportLearningData();
    expect(() => importLearningData("{bad json")).toThrow("JSON");
    expect(exportLearningData()).toBe(before);
  });
});

describe("account isolation and storage failures", () => {
  afterEach(() => vi.unstubAllGlobals());
  async function isolatedStore(
    records = new Map<string, string>(),
    failWrite = false,
  ) {
    vi.resetModules();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => records.get(key) ?? null,
        setItem: (key: string, value: string) => {
          if (failWrite) throw new Error("quota");
          records.set(key, value);
        },
      },
      addEventListener: vi.fn(),
    });
    return await import("./store");
  }
  it("returns to guest data on sign-out and never adopts another account private notes", async () => {
    const store = await isolatedStore();
    const guestId = store.addNote({
      lessonId: "EN02",
      text: "Trước đăng nhập",
    });
    store.activateLearningOwner("private-user");
    const privateId = store.addNote({
      lessonId: "EN02",
      text: "Chỉ tài khoản thứ nhất",
    });
    store.activateLearningOwner(null);
    expect(
      store.getLearningState().notes.some((item) => item.id === guestId),
    ).toBe(true);
    expect(
      store.getLearningState().notes.some((item) => item.id === privateId),
    ).toBe(false);
    store.activateLearningOwner("second-user");
    expect(
      store.getLearningState().notes.some((item) => item.id === privateId),
    ).toBe(false);
    store.activateLearningOwner("private-user");
    expect(
      store.getLearningState().notes.some((item) => item.id === privateId),
    ).toBe(true);
  });
  it("does not import a backup owned by another signed-in account", async () => {
    const store = await isolatedStore();
    store.activateLearningOwner("private-user");
    const before = store.exportLearningData();
    expect(() => store.importLearningData(JSON.stringify(base()))).toThrow(
      "tài khoản khác",
    );
    expect(store.exportLearningData()).toBe(before);
  });
  it("does not report a successful save when localStorage is full", async () => {
    const store = await isolatedStore(new Map(), true);
    expect(() =>
      store.addNote({ lessonId: "EN02", text: "Chưa lưu được" }),
    ).toThrow("Không lưu được");
    expect(store.getLearningState().notes).toHaveLength(0);
    expect(store.getPersistenceError()).toContain("Không lưu được");
  });
  it("preserves corrupted storage raw bytes for download recovery and blocks overwrite", async () => {
    const raw = "{damaged JSON with irreplaceable notes";
    const records = new Map([["thuan-study.v1:local", raw]]);
    const store = await isolatedStore(records);
    expect(store.exportLearningData()).toBe(raw);
    expect(() => store.addNote({ lessonId: "EN02", text: "New note" })).toThrow(
      "Không đọc được",
    );
    expect(records.get("thuan-study.v1:local")).toBe(raw);
  });
});

describe("repository learning resources", () => {
  it("seeds known notes once and respects their deletion on the next launch", async () => {
    vi.resetModules();
    const records = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => records.get(key) ?? null,
        setItem: (key: string, value: string) => records.set(key, value),
      },
      addEventListener: vi.fn(),
    });
    const { initializeLearningState, getLearningState, deleteNote } =
      await import("./store");
    const resource = note(
      "repo-known-note",
      "Phần đã học trong hội thoại",
      "2026-10-07T00:00:00.000Z",
    );
    initializeLearningState({}, { notes: [resource], reviewCards: [] });
    initializeLearningState({}, { notes: [resource], reviewCards: [] });
    expect(
      getLearningState().notes.filter((item) => item.id === resource.id),
    ).toHaveLength(1);
    deleteNote(resource.id);
    initializeLearningState({}, { notes: [resource], reviewCards: [] });
    expect(
      getLearningState().notes.some((item) => item.id === resource.id),
    ).toBe(false);
    vi.unstubAllGlobals();
  });
});

describe("cross-tab persistence", () => {
  afterEach(() => vi.unstubAllGlobals());

  async function openTab(
    records: Map<string, string>,
    setItem: (key: string, value: string) => void,
  ) {
    vi.resetModules();
    let storageListener:
      | ((event: { key: string; newValue: string }) => void)
      | undefined;
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => records.get(key) ?? null,
        setItem,
      },
      addEventListener: (
        type: string,
        listener: (event: { key: string; newValue: string }) => void,
      ) => {
        if (type === "storage") storageListener = listener;
      },
    });
    const store = await import("./store");
    store.initializeLearningState({});
    return {
      store,
      receive: (key: string, newValue: string) => {
        if (!storageListener) throw new Error("Missing storage event listener");
        storageListener({ key, newValue });
      },
    };
  }

  it("persists concurrent notes after both tabs close without event ping-pong", async () => {
    const key = "thuan-study.v1:local";
    const records = new Map<string, string>();
    const setItem = vi.fn((key: string, value: string) =>
      records.set(key, value),
    );
    const a = await openTab(records, setItem);
    const b = await openTab(records, setItem);

    // Both modules have hydrated before either receives the other tab's write.
    a.store.addNote({ lessonId: "EN02", text: "Written in tab A" });
    const rawA = records.get(key)!;
    b.store.addNote({ lessonId: "EN02", text: "Written in tab B" });
    const rawB = records.get(key)!;
    a.receive(key, rawB);
    b.receive(key, rawA);

    const union = records.get(key)!;
    expect(JSON.parse(union).notes).toHaveLength(2);
    const writeCount = setItem.mock.calls.length;
    a.receive(key, union);
    b.receive(key, union);
    expect(setItem).toHaveBeenCalledTimes(writeCount);

    const reloaded = await openTab(records, setItem);
    expect(
      reloaded.store.getLearningState().notes.map((item) => item.text).sort(),
    ).toEqual(["Written in tab A", "Written in tab B"]);
  });

  it("rejects a storage event whose owner differs from its storage key", async () => {
    const records = new Map<string, string>();
    const setItem = vi.fn((key: string, value: string) =>
      records.set(key, value),
    );
    const tab = await openTab(records, setItem);
    tab.store.activateLearningOwner("private-user");
    tab.store.addNote({ lessonId: "EN02", text: "Keep my private note" });
    const before = tab.store.exportLearningData();
    const writeCount = setItem.mock.calls.length;

    tab.receive("thuan-study.v1:private-user", JSON.stringify(base()));

    expect(tab.store.exportLearningData()).toBe(before);
    expect(tab.store.getLearningState().ownerUid).toBe("private-user");
    expect(setItem).toHaveBeenCalledTimes(writeCount);
    expect(tab.store.getPersistenceError()).not.toBe("");
  });
});
