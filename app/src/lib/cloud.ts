import { useSyncExternalStore } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  doc,
  onSnapshot,
  runTransaction,
  type Unsubscribe,
} from "firebase/firestore";
import { firebaseAuth, firestore } from "./firebase";
import {
  acceptRemoteState,
  activateLearningOwner,
  getLearningState,
  getPersistenceError,
  learningStateFingerprint,
  mergeLearningStates,
  subscribeLearningState,
  validateLearningState,
} from "./store";
import type { CloudStatus, LearningState } from "../types";

const REPOSITORY = "vangvanthuan1-commits/hoc-tap";
const subscribers = new Set<() => void>();
let status: CloudStatus = {
  user: null,
  state: "local",
  message: "Tiến độ đang lưu trên thiết bị này.",
  lastSyncedAt: null,
  githubConnected: false,
  githubBusy: false,
  lastGithubAt: null,
};
let githubToken: string | null = null;
let started = false;
let stopSnapshot: Unsubscribe | undefined;
let activeUid: string | null = null;
let serverReady = false;
let remoteFingerprint = "";
let timer: ReturnType<typeof setTimeout> | undefined;
let flushing = false;
let pendingFlush = false;
const now = () => new Date().toISOString();
const setStatus = (patch: Partial<CloudStatus>) => {
  status = { ...status, ...patch };
  subscribers.forEach((listener) => listener());
};
export function getCloudStatus() {
  return status;
}
export function subscribeCloudStatus(listener: () => void) {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
}
export function useCloudStatus() {
  return useSyncExternalStore(
    subscribeCloudStatus,
    getCloudStatus,
    getCloudStatus,
  );
}
function messageFor(error: unknown): string {
  const code =
    error && typeof error === "object" && "code" in error
      ? String(error.code)
      : "";
  const messages: Record<string, string> = {
    "auth/configuration-not-found":
      "Dự án Firebase chưa khởi tạo Authentication. Mở Firebase Console → Authentication → Get started, rồi bật Google hoặc GitHub.",
    "auth/invalid-api-key":
      "Cấu hình Firebase chưa hợp lệ. Đối chiếu cấu hình web app trong Firebase Console.",
    "auth/unauthorized-domain":
      "Tên miền này chưa được cho phép trong Firebase Authentication → Authorized domains.",
    "auth/operation-not-allowed":
      "Nhà cung cấp đăng nhập chưa bật trong Firebase Authentication → Sign-in method.",
    "auth/popup-blocked":
      "Trình duyệt chặn cửa sổ đăng nhập. Cho phép popup rồi thử lại.",
    "auth/popup-closed-by-user":
      "Cửa sổ đăng nhập đã đóng. Dữ liệu trên thiết bị vẫn được giữ.",
    "auth/cancelled-popup-request": "Một lượt đăng nhập khác đang mở.",
    "auth/account-exists-with-different-credential":
      "Email đã dùng một cách đăng nhập khác. Đăng nhập theo cách đó trước, rồi kết nối GitHub.",
    "auth/user-mismatch":
      "Tài khoản vừa chọn khác tài khoản học tập hiện tại. Đăng xuất trước nếu muốn đổi tài khoản.",
    "auth/credential-already-in-use":
      "GitHub này đã liên kết với tài khoản Firebase khác. Hãy dùng đúng tài khoản để tránh tách tiến độ.",
    "auth/provider-already-linked":
      "GitHub đã liên kết; đăng nhập lại GitHub để cấp quyền đồng bộ cho phiên này.",
    "auth/network-request-failed":
      "Không kết nối được dịch vụ đăng nhập. Tiến độ vẫn lưu trên thiết bị.",
    "permission-denied":
      "Firestore chưa cho phép truy cập. Kiểm tra cơ sở dữ liệu và triển khai rules dành riêng cho từng UID.",
    unavailable:
      "Chưa kết nối được Firestore. Thay đổi vẫn lưu trên thiết bị và sẽ thử lại khi có mạng.",
  };
  return (
    messages[code] ??
    (error instanceof Error
      ? error.message
      : "Không hoàn thành được kết nối. Tiến độ trên thiết bị vẫn được giữ.")
  );
}
function scheduleSync() {
  if (!activeUid || !serverReady) return;
  if (getPersistenceError()) {
    setStatus({ state: "error", message: getPersistenceError() });
    return;
  }
  if (learningStateFingerprint(getLearningState()) === remoteFingerprint)
    return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    void flushSync();
  }, 700);
}
async function flushSync() {
  if (!activeUid || !serverReady) return;
  if (flushing) {
    pendingFlush = true;
    return;
  }
  const uid = activeUid;
  const candidate = getLearningState();
  if (candidate.ownerUid !== uid) return;
  if (
    new TextEncoder().encode(JSON.stringify(candidate)).byteLength > 850_000
  ) {
    setStatus({
      state: "error",
      message:
        "Lịch sử vượt dung lượng đồng bộ hiện tại (850 KB). Hãy tải bản sao; dữ liệu vẫn lưu trên thiết bị.",
    });
    return;
  }
  flushing = true;
  setStatus({ state: "syncing", message: "Đang đồng bộ tiến độ riêng tư…" });
  try {
    const reference = doc(firestore, "users", uid, "learning", "state");
    const merged = await runTransaction(firestore, async (transaction) => {
      const snapshot = await transaction.get(reference);
      const combined = snapshot.exists()
        ? mergeLearningStates(candidate, validateLearningState(snapshot.data()))
        : candidate;
      if (combined.ownerUid !== uid)
        throw new Error("Dữ liệu đám mây không thuộc tài khoản hiện tại.");
      if (
        !snapshot.exists() ||
        learningStateFingerprint(combined) !==
          learningStateFingerprint(validateLearningState(snapshot.data()))
      )
        transaction.set(reference, combined);
      return combined;
    });
    if (activeUid !== uid) return;
    remoteFingerprint = learningStateFingerprint(merged);
    acceptRemoteState(merged);
    setStatus({
      state: "synced",
      lastSyncedAt: now(),
      message: "Tiến độ đã đồng bộ với Firebase.",
    });
  } catch (error) {
    if (activeUid === uid)
      setStatus({ state: "error", message: messageFor(error) });
  } finally {
    flushing = false;
    if (pendingFlush) {
      pendingFlush = false;
      scheduleSync();
    }
  }
}
/** Start once at app mount. Cloud writes wait for a server snapshot, then merge in a transaction. */
export function startCloudSync() {
  if (started) return;
  started = true;
  subscribeLearningState(scheduleSync);
  onAuthStateChanged(
    firebaseAuth,
    (user) => {
      if (timer) clearTimeout(timer);
      stopSnapshot?.();
      serverReady = false;
      remoteFingerprint = "";
      const nextUid = user?.uid ?? null;
      if (activeUid && activeUid !== nextUid) {
        githubToken = null;
        setStatus({ githubConnected: false });
      }
      activeUid = nextUid;
      try {
        activateLearningOwner(activeUid);
      } catch (error) {
        setStatus({ state: "error", message: messageFor(error) });
        return;
      }
      if (!user) {
        githubToken = null;
        setStatus({
          user: null,
          state: "local",
          githubConnected: false,
          lastSyncedAt: null,
          lastGithubAt: null,
          message: "Chưa đăng nhập. Tiến độ đang lưu trên thiết bị này.",
        });
        return;
      }
      setStatus({
        user: {
          uid: user.uid,
          displayName: user.displayName ?? "Tài khoản học tập",
          email: user.email,
          photoURL: user.photoURL,
        },
        state: "connecting",
        message: "Đang đọc bản lưu Firebase trước khi đồng bộ…",
      });
      const uid = user.uid;
      stopSnapshot = onSnapshot(
        doc(firestore, "users", uid, "learning", "state"),
        { includeMetadataChanges: true },
        (snapshot) => {
          if (activeUid !== uid) return;
          // A missing offline cache cannot establish that the cloud document is empty.
          if (snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites)
            return;
          try {
            serverReady = true;
            if (snapshot.exists()) {
              const remote = validateLearningState(snapshot.data());
              if (remote.ownerUid !== uid)
                throw new Error("Bản lưu Firebase sai chủ sở hữu.");
              remoteFingerprint = learningStateFingerprint(remote);
              acceptRemoteState(remote);
            }
            if (
              snapshot.exists() &&
              learningStateFingerprint(getLearningState()) === remoteFingerprint
            )
              setStatus({
                state: "synced",
                message: "Tiến độ đã đồng bộ với Firebase.",
                lastSyncedAt: now(),
              });
            else scheduleSync();
          } catch (error) {
            serverReady = false;
            setStatus({ state: "error", message: messageFor(error) });
          }
        },
        (error) => {
          serverReady = false;
          setStatus({ state: "error", message: messageFor(error) });
        },
      );
    },
    (error) => setStatus({ state: "error", message: messageFor(error) }),
  );
  if (typeof window !== "undefined")
    window.addEventListener("online", () => {
      if (activeUid && serverReady) scheduleSync();
    });
}
export async function signInGoogle() {
  startCloudSync();
  setStatus({ state: "connecting", message: "Đang mở đăng nhập Google…" });
  try {
    const provider = new GoogleAuthProvider();
    const current = firebaseAuth.currentUser;
    const linked = current?.providerData.some(
      (item) => item.providerId === "google.com",
    );
    if (current && !linked) await linkWithPopup(current, provider);
    else if (current) await reauthenticateWithPopup(current, provider);
    else await signInWithPopup(firebaseAuth, provider);
  } catch (error) {
    setStatus({ state: "error", message: messageFor(error) });
    throw new Error(messageFor(error));
  }
}
export async function signInGithub() {
  startCloudSync();
  const provider = new GithubAuthProvider();
  // This repository is public; request write access to public repos only.
  provider.addScope("public_repo");
  if (!firebaseAuth.currentUser)
    setStatus({
      state: "connecting",
      message: "Đang kết nối GitHub; token chỉ giữ trong phiên hiện tại…",
    });
  try {
    const current = firebaseAuth.currentUser;
    const linked = current?.providerData.some(
      (item) => item.providerId === "github.com",
    );
    const result = current
      ? linked
        ? await reauthenticateWithPopup(current, provider)
        : await linkWithPopup(current, provider)
      : await signInWithPopup(firebaseAuth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken)
      throw new Error("GitHub chưa cấp token. Tiến độ chưa gửi lên repo.");
    githubToken = credential.accessToken;
    setStatus({ githubConnected: true });
  } catch (error) {
    setStatus({
      state: "error",
      message: messageFor(error),
      githubConnected: false,
    });
    throw new Error(messageFor(error));
  }
}
export async function signOut() {
  await firebaseSignOut(firebaseAuth);
  githubToken = null;
  setStatus({ githubConnected: false });
}
export function retryCloudSync() {
  if (activeUid && serverReady) {
    remoteFingerprint = "";
    scheduleSync();
  } else
    setStatus({
      state: "error",
      message:
        "Chưa có kết nối Firebase hợp lệ. Kiểm tra cấu hình rồi đăng nhập lại.",
    });
}

async function githubRequest(
  path: string,
  options: RequestInit = {},
): Promise<Record<string, unknown>> {
  if (!githubToken)
    throw new Error(
      "Kết nối GitHub trước khi gửi bản lưu. Token không lưu giữa các lần mở app.",
    );
  const response = await fetch(
    `https://api.github.com/repos/${REPOSITORY}/${path}`,
    {
      ...options,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );
  if (!response.ok) {
    if (response.status === 401) {
      githubToken = null;
      setStatus({ githubConnected: false });
      throw new Error("Phiên GitHub hết hạn. Hãy kết nối lại.");
    }
    if (response.status === 403 || response.status === 404)
      throw new Error(
        "Tài khoản GitHub chưa có quyền ghi repo hoc-tap, repo chưa được cấp quyền OAuth hoặc đang bị giới hạn API.",
      );
    if (response.status === 409 || response.status === 422)
      throw new Error(
        "Nhánh GitHub vừa thay đổi. Bản lưu chưa được ghi; hãy thử lại để không ghi đè thay đổi khác.",
      );
    throw new Error(
      `GitHub trả lỗi ${response.status}. Dữ liệu trên thiết bị vẫn được giữ.`,
    );
  }
  return (await response.json()) as Record<string, unknown>;
}
const markdownText = (text: string) =>
  text.replace(/\r/g, "").replace(/[\\`*_{}\[\]()<>#+.!|~-]/g, "\\$&");
const singleLine = (text: string) => markdownText(text).replace(/\n/g, " ");
function markdownSnapshot(data: LearningState): string {
  const lines = [
    "# Tiến độ học từ ứng dụng cá nhân",
    "",
    `- Xuất lúc: ${now()}`,
    "- Nguồn: thao tác, bài làm và ghi chú trong ứng dụng; trạng thái hoàn thành do người học xác nhận.",
    "- Tệp JSON cùng tên chứa dữ liệu đầy đủ. Đây là bản chụp lịch sử, không thay thế hồ sơ hoặc snapshot cũ.",
    "",
    "## Tiến độ",
    "",
    "| Tiết | Trạng thái | Ngày học | Kết quả |",
    "|---|---|---|---|",
  ];
  const labels = {
    not_started: "Chưa học",
    in_progress: "Đang học",
    completed: "Đã hoàn thành",
  };
  for (const [id, item] of Object.entries(data.progress).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    if (item.status === "not_started" && !item.result) continue;
    lines.push(
      `| ${singleLine(id)} | ${labels[item.status]} | ${singleLine(item.studiedAt ?? "")} | ${singleLine(item.result)} |`,
    );
  }
  lines.push("", "## Lỗi cần ôn", "");
  for (const [id, item] of Object.entries(data.progress))
    if (item.errors.length)
      lines.push(
        `- ${singleLine(id)}: ${item.errors.map(singleLine).join("; ")}.`,
      );
  lines.push("", "## Bài kiểm tra", "");
  for (const attempt of data.quizAttempts)
    lines.push(
      `- ${attempt.completedAt}: ${singleLine(attempt.lessonId)} — ${attempt.correctCount}/${attempt.totalQuestions} câu đúng; ${Math.round(attempt.durationSeconds)} giây.`,
    );
  if (!data.quizAttempts.length)
    lines.push("Chưa có bài kiểm tra được nộp trong ứng dụng.");
  lines.push("", "## Ghi chú", "");
  for (const note of data.notes)
    lines.push(
      `### ${singleLine(note.lessonId)} — ${note.updatedAt}`,
      "",
      ...note.text.split("\n").map((line) => `> ${markdownText(line)}`),
      "",
    );
  if (!data.notes.length) lines.push("Chưa có ghi chú.");
  lines.push("", "## Đoạn đánh dấu", "");
  for (const mark of data.highlights)
    lines.push(
      `- ${singleLine(mark.lessonId)}/${singleLine(mark.sectionId)} (${mark.color}): ${singleLine(mark.text)}`,
    );
  lines.push("", "## Thẻ ôn tập", "");
  for (const card of data.reviewCards)
    lines.push(
      `- ${singleLine(card.lessonId)}: ${singleLine(card.front)} — đến hạn ${card.dueAt}, đã ôn ${card.repetitions} lượt.`,
    );
  lines.push(
    "",
    "## Phiên học",
    "",
    `Tổng thời gian ghi nhận: ${Math.round(data.sessions.reduce((total, item) => total + item.durationSeconds, 0) / 60)} phút trong ${data.sessions.length} phiên.`,
  );
  return lines.join("\n") + "\n";
}
/** Atomically adds two new files in the dedicated app directory. Never force-pushes or edits the profile. */
export async function syncToGithub(): Promise<{
  url: string;
  jsonPath: string;
  markdownPath: string;
}> {
  const persistenceError = getPersistenceError();
  if (persistenceError) throw new Error(persistenceError);
  if (!githubToken) throw new Error("Hãy kết nối GitHub trước.");
  if (status.githubBusy) throw new Error("Đang gửi một bản lưu GitHub.");
  const data: LearningState = { ...getLearningState(), ownerUid: null };
  setStatus({ githubBusy: true });
  try {
    const repository = await githubRequest("");
    if (!(repository.permissions as { push?: boolean } | undefined)?.push)
      throw new Error("Tài khoản GitHub không có quyền ghi repo hoc-tap.");
    const branch = String(repository.default_branch ?? "master");
    const reference = await githubRequest(
      `git/ref/heads/${encodeURIComponent(branch)}`,
    );
    const baseSha = String((reference.object as { sha: string }).sha);
    const commit = await githubRequest(`git/commits/${baseSha}`);
    const baseTree = String((commit.tree as { sha: string }).sha);
    const suffix =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10);
    const filename = `${now().replace(/[:.]/g, "-")}-${suffix}`;
    const jsonPath = `ho-so/tu-app/${filename}.json`;
    const markdownPath = `ho-so/tu-app/${filename}.md`;
    const files = [
      { path: jsonPath, content: JSON.stringify(data, null, 2) + "\n" },
      { path: markdownPath, content: markdownSnapshot(data) },
    ];
    const blobs = await Promise.all(
      files.map((file) =>
        githubRequest("git/blobs", {
          method: "POST",
          body: JSON.stringify({ content: file.content, encoding: "utf-8" }),
        }),
      ),
    );
    const tree = await githubRequest("git/trees", {
      method: "POST",
      body: JSON.stringify({
        base_tree: baseTree,
        tree: files.map((file, index) => ({
          path: file.path,
          mode: "100644",
          type: "blob",
          sha: blobs[index].sha,
        })),
      }),
    });
    const newCommit = await githubRequest("git/commits", {
      method: "POST",
      body: JSON.stringify({
        message: "Lưu tiến độ học từ ứng dụng cá nhân",
        tree: tree.sha,
        parents: [baseSha],
      }),
    });
    await githubRequest(`git/refs/heads/${encodeURIComponent(branch)}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: newCommit.sha, force: false }),
    });
    setStatus({ lastGithubAt: now(), githubBusy: false });
    return {
      url: `https://github.com/${REPOSITORY}/commit/${newCommit.sha}`,
      jsonPath,
      markdownPath,
    };
  } catch (error) {
    setStatus({ githubBusy: false });
    throw new Error(messageFor(error));
  }
}

export { downloadLearningBackup } from "./store";
