import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initialProgress } from "./data";
import { initializeLearningState } from "./lib/store";
import { startCloudSync } from "./lib/cloud";
const seedTime = "2026-10-07T00:00:00.000Z";
try {
  initializeLearningState(initialProgress, {
    notes: [
      {
        id: "repo-EN02-to-be",
        lessonId: "EN02",
        subjectId: "EN",
        text: "Đã luyện trong hội thoại 07/10: I am; he/she/it is; you/we/they are. Khẳng định đúng 4/4. Phủ định: thêm not ngay sau am/is/are, đúng 2/2. Câu hỏi và sở hữu chưa luyện. Chưa kiểm tra nhớ lâu.",
        createdAt: seedTime,
        updatedAt: seedTime,
      },
      {
        id: "repo-EN01-email",
        lessonId: "EN17",
        subjectId: "EN",
        text: "Ký hiệu email: dot (.), at (@), hyphen/dash (-), underscore (_). Đã viết đúng hai dấu từ hướng dẫn bằng chữ; một lượt gõ nguyet thay nguyen. Chưa kiểm tra nghe audio mới. EN01 nghe đạt 2/4 sau 2 lượt.",
        createdAt: seedTime,
        updatedAt: seedTime,
      },
    ],
    reviewCards: [
      {
        id: "repo-EN02-to-be-review",
        lessonId: "EN02",
        subjectId: "EN",
        front:
          "The books ___ on the table. Điền am/is/are. Sau đó chuyển câu sang phủ định.",
        back: "The books are on the table. → The books are not on the table. Chủ ngữ số nhiều dùng are; phủ định đặt not sau are.",
        dueAt: "2026-10-08T01:00:00.000Z",
        intervalDays: 1,
        repetitions: 0,
        lastReviewedAt: null,
        createdAt: seedTime,
        updatedAt: seedTime,
      },
      {
        id: "repo-EN17-email-review",
        lessonId: "EN17",
        subjectId: "EN",
        front:
          "Viết ký hiệu ứng với dot, at, hyphen và underscore. Đây là kiểm tra nhớ từ bằng chữ.",
        back: "dot = .; at = @; hyphen/dash = -; underscore = _. Bài này không đo khả năng nghe audio.",
        dueAt: "2026-10-08T01:00:00.000Z",
        intervalDays: 1,
        repetitions: 0,
        lastReviewedAt: null,
        createdAt: seedTime,
        updatedAt: seedTime,
      },
    ],
  });
} catch {
  // The persistence banner exposes blocked/full storage without preventing the app from opening.
}
startCloudSync();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
if (import.meta.env.PROD && "serviceWorker" in navigator)
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
