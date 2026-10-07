// firebase-sync.js - Cầu nối Đồng bộ Firebase Cloud & GitHub Repository cho Antigravity AI

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

// Cấu hình Firebase người dùng cung cấp
export const firebaseConfig = {
  apiKey: "AIzaSyDmR8hI0aWZeqFPyPLqszL3QwkeFCvg41U",
  authDomain: "hoc-tap-8c6f7.firebaseapp.com",
  projectId: "hoc-tap-8c6f7",
  storageBucket: "hoc-tap-8c6f7.firebasestorage.app",
  messagingSenderId: "735553994487",
  appId: "1:735553994487:web:511a02fea5e0aca2361df2",
  measurementId: "G-5FSQF58RME"
};

let app = null;
let db = null;
let analytics = null;
let isFirebaseOnline = false;

// Khởi tạo Firebase
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  if (typeof window !== "undefined" && window.location.protocol.startsWith("http")) {
    analytics = getAnalytics(app);
  }
  isFirebaseOnline = true;
  console.log("Firebase App & Firestore initialized successfully");
} catch (error) {
  console.warn("Chạy ở chế độ Offline / LocalStorage do giới hạn môi trường:", error);
  isFirebaseOnline = false;
}

const LOCAL_STORAGE_KEY = "phenikaa_study_state_v1";

// 1. Lưu trạng thái học tập (Hỗ trợ kép: Cloud Firestore + LocalStorage)
export async function saveStudyState(state) {
  try {
    // Luôn lưu bản sao LocalStorage trước (offline-first)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));

    if (isFirebaseOnline && db) {
      const docRef = doc(db, "users", "thuan_phenikaa_k20");
      await setDoc(docRef, {
        ...state,
        updatedAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      }, { merge: true });
      return { success: true, mode: "cloud_and_local" };
    }
    return { success: true, mode: "local_only" };
  } catch (error) {
    console.error("Lỗi khi lưu study state:", error);
    return { success: false, error: error.message };
  }
}

// 2. Tải trạng thái học tập
export async function loadStudyState(defaultState) {
  // Đọc từ LocalStorage trước
  let localData = null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) localData = JSON.parse(raw);
  } catch (e) {
    console.warn("Không đọc được LocalStorage:", e);
  }

  // Nếu Firebase hoạt động, thử đồng bộ từ Cloud với timeout 1.5s an toàn
  if (isFirebaseOnline && db) {
    try {
      const docRef = doc(db, "users", "thuan_phenikaa_k20");
      const fetchPromise = getDoc(docRef);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Firebase timeout 1.5s")), 1500));
      const docSnap = await Promise.race([fetchPromise, timeoutPromise]);
      if (docSnap && docSnap.exists()) {
        const cloudData = docSnap.data();
        return { ...defaultState, ...localData, ...cloudData, isCloudConnected: true };
      }
    } catch (err) {
      console.warn("Không thể fetch từ Cloud Firestore (dùng LocalStorage):", err.message);
    }
  }

  return { ...(defaultState || {}), ...(localData || {}), isCloudConnected: isFirebaseOnline };
}

// 3. Cơ chế xuất file trực tiếp vào Thư mục Repo GitHub (File System Access API)
// Người dùng chỉ cần cấp quyền 1 lần trên Chrome/Edge Desktop/Android
let repoDirHandle = null;

export async function selectRepoFolder() {
  if (!("showDirectoryPicker" in window)) {
    throw new Error("Trình duyệt này không hỗ trợ File System Access API. Bạn có thể dùng tính năng Tải file Markdown/CSV.");
  }
  repoDirHandle = await window.showDirectoryPicker({
    mode: "readwrite"
  });
  return repoDirHandle.name;
}

// Ghi trực tiếp vào file trong Repo
export async function syncDirectlyToRepo(sessions, newCheckpointSummary) {
  if (!repoDirHandle) {
    await selectRepoFolder();
  }

  const todayStr = new Date().toISOString().split("T")[0];

  // 1. Ghi cập nhật lại tien-do.csv
  try {
    // Tìm thư mục ke-hoach-hoc-tap/hk1-2026/tung-tiet
    const keHoachDir = await repoDirHandle.getDirectoryHandle("ke-hoach-hoc-tap", { create: false });
    const hk1Dir = await keHoachDir.getDirectoryHandle("hk1-2026", { create: false });
    const tungTietDir = await hk1Dir.getDirectoryHandle("tung-tiet", { create: false });
    const tienDoFile = await tungTietDir.getFileHandle("tien-do.csv", { create: true });
    
    // Tạo nội dung CSV chuẩn
    let csvContent = "Môn,Tiết,Chuyên đề,Trạng thái,Ngày học,Kết quả tự kiểm tra,Lỗi cần ôn\n";
    sessions.forEach(s => {
      const cleanTitle = s.title.includes(",") ? `"${s.title}"` : s.title;
      const cleanResult = (s.result || "").replace(/"/g, '""');
      const cleanMistakes = (s.mistakes || "").replace(/"/g, '""');
      csvContent += `${s.subject},${s.code},${cleanTitle},${s.status},${s.date || ""},"${cleanResult}","${cleanMistakes}"\n`;
    });

    const writable = await tienDoFile.createWritable();
    await writable.write(csvContent);
    await writable.close();

    // 2. Tạo file checkpoint trong ket-qua/
    const ketQuaDir = await hk1Dir.getDirectoryHandle("ket-qua", { create: true });
    const checkpointFileName = `${todayStr}-checkpoint-web.md`;
    const checkpointFile = await ketQuaDir.getFileHandle(checkpointFileName, { create: true });
    
    const checkpointWritable = await checkpointFile.createWritable();
    await checkpointWritable.write(newCheckpointSummary);
    await checkpointWritable.close();

    return {
      success: true,
      message: `Đã đồng bộ trực tiếp vào tien-do.csv và ${checkpointFileName}!`
    };
  } catch (error) {
    console.error("Lỗi khi ghi vào repo thư mục:", error);
    throw error;
  }
}

// 4. Tạo nội dung tóm tắt học tập theo chuẩn Markdown repo để gửi cho Antigravity AI
export function generateAICheckpointMarkdown(sessions, notes, highlights, quizHistory) {
  const today = new Date().toLocaleDateString("vi-VN");
  const completed = sessions.filter(s => s.status === "Đã hoàn thành");
  const learning = sessions.filter(s => s.status === "Đang học");
  
  let md = `# Nhật ký học tập & Checkpoint - ${today}\n\n`;
  md += `**Người học:** Vàng Văn Thuận • Phenikaa K20 AI\n`;
  md += `**Nguồn:** Web Học Tập Cá Nhân (Đã đồng bộ Firebase & LocalStorage)\n\n`;

  md += `## 1. Tiến độ các tiết đã học hôm nay\n\n`;
  if (learning.length === 0 && completed.length === 0) {
    md += `- Chưa ghi nhận tiết học hoàn thành mới hôm nay.\n\n`;
  } else {
    completed.slice(-5).forEach(s => {
      md += `- **[${s.code}] ${s.title}** (${s.subject}): Đã hoàn thành.\n`;
      if (s.result) md += `  - Kết quả: ${s.result}\n`;
      if (s.mistakes) md += `  - Lỗi cần ôn: ${s.mistakes}\n`;
    });
    learning.forEach(s => {
      md += `- **[${s.code}] ${s.title}** (${s.subject}): Đang học.\n`;
      if (s.mistakes) md += `  - Lỗi cần lưu ý: ${s.mistakes}\n`;
    });
    md += `\n`;
  }

  md += `## 2. Điểm kiểm tra & Quiz gần nhất\n\n`;
  if (!quizHistory || quizHistory.length === 0) {
    md += `- Chưa có bài quiz mới.\n\n`;
  } else {
    quizHistory.slice(-3).forEach(q => {
      md += `- **${q.testName}**: Đúng ${q.score}/${q.total} (${q.percentage}%). Thời gian: ${q.time}.\n`;
      if (q.mistakeNotes) md += `  - Điểm cần chú ý: ${q.mistakeNotes}\n`;
    });
    md += `\n`;
  }

  md += `## 3. Các đoạn Highlight & Bẫy lỗi quan trọng đã ghi nhận\n\n`;
  if (!highlights || highlights.length === 0) {
    md += `- Chưa có highlight mới.\n\n`;
  } else {
    highlights.slice(-6).forEach(h => {
      md += `- [${h.type.toUpperCase()}] **${h.subject}**: "${h.text}"\n`;
    });
    md += `\n`;
  }

  md += `## 4. Lịch ôn ngắt quãng dự kiến (+1, +3, +7 ngày)\n\n`;
  md += `- **+1 ngày (Ngày mai):** Ôn lại các bẫy lỗi và flashcard mới ghi nhận.\n`;
  md += `- **+3 ngày:** Làm bài tập biến thể không có đáp án sẵn.\n`;
  md += `- **+7 ngày:** Kiểm tra test tổng hợp định kỳ.\n\n`;

  md += `> *Ghi chú cho AI Antigravity:* Dựa trên các lỗi cần ôn ở trên, hãy tiếp tục giảng ngắn bản chất, đưa bài tập tương tự để tôi tự làm và sửa lỗi!`;

  return md;
}
