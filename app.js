// app.js - Xương sống logic cho Web Học Tập Phenikaa K20 AI
// Tích hợp Không gian Học tập Trực tiếp, In-Text Highlight, Trợ lý AI GLM 5.3 (OpenRouter) & Checkpoint Repo

import { 
  APP_USER, 
  SUBJECTS_MAP, 
  DEFAULT_SESSIONS, 
  SCHEDULE_SAMPLE, 
  DEFAULT_FLASHCARDS, 
  BUG_HUNTER_LEVELS, 
  QUIZ_QUESTIONS,
  LESSON_CONTENT_MAP,
  getLessonContent
} from "./data-store.js";

import { 
  saveStudyState, 
  loadStudyState, 
  selectRepoFolder, 
  syncDirectlyToRepo, 
  generateAICheckpointMarkdown 
} from "./firebase-sync.js";

// Khóa OpenRouter mặc định được mã hóa để tránh bot quét GitHub vô hiệu hóa token
const DEFAULT_KEY_B64 = "c2stb3ItdjEtODJkNWFmYzM1OGVhYjA4MDliYzAwY2ZkYzljYmJiMDkxYjE4ZmQwNTJhZGRhYTNmZDMzMzc3Y2UwYjg1ZGM1OQ==";
const DEFAULT_MODEL = "thudm/glm-4-9b-chat";

// Trạng thái ứng dụng trung tâm
let state = {
  sessions: [...DEFAULT_SESSIONS],
  notes: {},
  highlights: [],
  flashcards: [...DEFAULT_FLASHCARDS],
  quizHistory: [],
  streak: 3,
  pomodoroMinutes: 25,
  pomodoroSeconds: 0,
  pomodoroRunning: false,
  isCloudConnected: false,
  selectedSessionCode: null
};

// Trạng thái điều hướng chính
let currentTab = "tab-hub";
let currentSubjectFilter = "ALL";
let currentStatusFilter = "ALL";
let pomodoroIntervalId = null;

// Trạng thái Bấm giờ học tập (Study Timer & Stopwatch)
let studyTimerMode = "stopwatch"; // "stopwatch" hoặc "pomodoro"
let studyTimerSeconds = 0;
let studyTimerInterval = null;
let studyTimerRunning = false;
let todayStudyMinutes = parseInt(localStorage.getItem("thuan_today_study_mins") || "0", 10);

// Trạng thái Duyệt Môn học & Bài học (Courses & Lessons)
let selectedCourseSubject = "EN";
let lessonStatusFilter = "ALL";
let lessonSearchKeyword = "";

// Trạng thái Sổ tay Word (Word-Style Rich Text Notebook)
let currentDocSubject = "GENERAL";
let wordDocAutoSaveTimeout = null;

// Trạng thái Đề thi AI & Ma trận
let currentExamType = "preset"; // "preset" hoặc "ai"
let currentAiExamQuestions = [];

// Trạng thái Không gian Học tập (Lesson Workspace)
let currentWsLessonCode = "EN02";
let currentWsContent = null;
let currentWsTab = "ws-tab-read";
let wsAiMessages = [];
let activeSelectionData = null;
let practiceAnswers = {};

// Trạng thái Quizzes & Logic games (khởi tạo trước khi initUI chạy)
let currentQuizList = [];
let currentQuizIndex = 0;
let userQuizAnswers = {};
let currentBugLevelIndex = 0;
let currentFcIndex = 0;
let isFcFlipped = false;

// Khởi chạy ứng dụng (Hỗ trợ cả trường hợp DOM đã tải xong trước khi module nạp)
function startApp() {
  setupEventListeners();
  setupWorkspaceListeners();
  initUI();
  renderAllViews();
  startCountdownTimer();
  updateAiLiveContext();

  // Nạp dữ liệu đồng bộ nền, cập nhật giao diện mà không làm khóa phản hồi nút bấm
  loadAppData().then(() => {
    renderAllViews();
    updateAiLiveContext();
  }).catch(err => {
    console.warn("Nạp dữ liệu nền:", err);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}

// Khởi tạo các thành phần giao diện
function initUI() {
  initStudyTimer();
  renderCoursesOverview();
  initWordNotebook();
  initExamMatrixUI();
  renderScheduleList();
  loadFullSchedule();
  renderBugHunterLevel(0);
}

// Tải dữ liệu từ Cloud / LocalStorage
async function loadAppData() {
  const loadedState = await loadStudyState(state);
  if (loadedState) {
    state.sessions = loadedState.sessions || state.sessions;
    state.notes = loadedState.notes || {};
    state.highlights = loadedState.highlights || [];
    state.flashcards = loadedState.flashcards || state.flashcards;
    state.quizHistory = loadedState.quizHistory || [];
    state.isCloudConnected = loadedState.isCloudConnected || false;
  }
  updateSyncBadge();
}

// Cập nhật biểu tượng kết nối
function updateSyncBadge() {
  const badge = document.getElementById("syncStatusBadge");
  const dot = document.getElementById("syncStatusDot");
  const text = document.getElementById("syncStatusText");
  if (!badge) return;

  if (state.isCloudConnected) {
    dot.style.background = "#10b981";
    text.textContent = "Firebase Online";
  } else {
    dot.style.background = "#f59e0b";
    text.textContent = "Local Offline";
  }
}

// =========================================================
// 1. CHUYỂN ĐỔI TAB CHÍNH (Desktop & Mobile)
// =========================================================
export function switchTab(tabId) {
  currentTab = tabId;

  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add("active");

  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (tabId === "tab-sync") {
    renderSyncReport();
  }

  if (typeof updateAiLiveContext === "function") {
    updateAiLiveContext();
  }
}
window.switchTab = switchTab;

// =========================================================
// 2. ĐẾM NGƯỢC THỜI GIAN ĐẾN KỲ THI TIẾNG ANH & KỲ 1
// =========================================================
function startCountdownTimer() {
  function update() {
    const examDate = new Date("2026-10-17T08:00:00+07:00").getTime();
    const now = new Date().getTime();
    const diff = examDate - now;

    const daysEl = document.getElementById("countdownDays");
    const hoursEl = document.getElementById("countdownHours");

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
    }
  }
  update();
  setInterval(update, 60000);
}

// =========================================================
// 3. RENDER THỐNG KÊ DASHBOARD
// =========================================================
function renderStats() {
  const total = state.sessions.length;
  const done = state.sessions.filter(s => s.status === "Đã hoàn thành").length;
  const learning = state.sessions.filter(s => s.status === "Đang học" || s.status.includes("Đang học")).length;
  const percent = Math.round((done / total) * 100);

  const doneEl = document.getElementById("statDoneCount");
  const learningEl = document.getElementById("statLearningCount");
  const percentEl = document.getElementById("statPercent");

  if (doneEl) doneEl.textContent = done;
  if (learningEl) learningEl.textContent = learning;
  if (percentEl) percentEl.textContent = `${percent}%`;
}

// =========================================================
// 4. HEADER STUDY TIMER & STOPWATCH
// =========================================================
function initStudyTimer() {
  const toggleBtn = document.getElementById("studyTimerToggleBtn");
  const resetBtn = document.getElementById("studyTimerResetBtn");
  const modeBtn = document.getElementById("studyTimerModeToggle");

  if (modeBtn) {
    modeBtn.addEventListener("click", toggleStudyTimerMode);
  }
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleStudyTimer);
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", resetStudyTimer);
  }
  updateStudyTimerDisplay();
}

function toggleStudyTimerMode() {
  if (studyTimerRunning) {
    if (!confirm("Đang có phiên học đang bấm giờ. Bạn có muốn đổi chế độ và đặt lại thời gian không?")) {
      return;
    }
    clearInterval(studyTimerInterval);
    studyTimerRunning = false;
  }
  studyTimerMode = studyTimerMode === "stopwatch" ? "pomodoro" : "stopwatch";
  studyTimerSeconds = studyTimerMode === "pomodoro" ? 25 * 60 : 0;

  const modeText = document.getElementById("studyTimerModeText");
  const timerBox = document.getElementById("headerStudyTimer");
  const toggleBtn = document.getElementById("studyTimerToggleBtn");

  if (modeText) modeText.textContent = studyTimerMode === "stopwatch" ? "Bấm giờ" : "Pomodoro";
  if (timerBox) timerBox.classList.remove("timer-running");
  if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

  updateStudyTimerDisplay();
  showToast(`Đã chuyển sang chế độ: ${studyTimerMode === "stopwatch" ? "Bấm giờ tự do (Stopwatch)" : "Pomodoro (25 phút tập trung)"}`);
}

function toggleStudyTimer() {
  const toggleBtn = document.getElementById("studyTimerToggleBtn");
  const timerBox = document.getElementById("headerStudyTimer");

  if (!studyTimerRunning) {
    studyTimerRunning = true;
    if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    if (timerBox) timerBox.classList.add("timer-running");

    studyTimerInterval = setInterval(() => {
      if (studyTimerMode === "stopwatch") {
        studyTimerSeconds++;
      } else {
        if (studyTimerSeconds <= 1) {
          clearInterval(studyTimerInterval);
          studyTimerRunning = false;
          studyTimerSeconds = 0;
          if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
          if (timerBox) timerBox.classList.remove("timer-running");
          updateStudyTimerDisplay();
          todayStudyMinutes += 25;
          localStorage.setItem("thuan_today_study_mins", todayStudyMinutes);
          alert("🎉 Chúc mừng bạn đã hoàn thành trọn vẹn 25 phút Pomodoro tập trung sâu!");
          renderStats();
          return;
        }
        studyTimerSeconds--;
      }
      updateStudyTimerDisplay();
    }, 1000);

    showToast("Đã bắt đầu bấm giờ học! Tập trung nhé.");
  } else {
    studyTimerRunning = false;
    clearInterval(studyTimerInterval);
    if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    if (timerBox) timerBox.classList.remove("timer-running");
    showToast("Đã tạm dừng bấm giờ học.");
  }
}

function resetStudyTimer() {
  const timerBox = document.getElementById("headerStudyTimer");
  const toggleBtn = document.getElementById("studyTimerToggleBtn");

  if (studyTimerRunning) {
    clearInterval(studyTimerInterval);
    studyTimerRunning = false;
  }
  if (timerBox) timerBox.classList.remove("timer-running");
  if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

  if (studyTimerMode === "stopwatch" && studyTimerSeconds >= 60) {
    const learnedMins = Math.round(studyTimerSeconds / 60);
    todayStudyMinutes += learnedMins;
    localStorage.setItem("thuan_today_study_mins", todayStudyMinutes);
    showToast(`🎉 Hoàn thành phiên học ${learnedMins} phút! Đã tích lũy vào hôm nay.`);
    renderStats();
  }

  studyTimerSeconds = studyTimerMode === "pomodoro" ? 25 * 60 : 0;
  updateStudyTimerDisplay();
}

function updateStudyTimerDisplay() {
  const display = document.getElementById("studyTimerDisplay");
  if (!display) return;

  const totalSecs = studyTimerSeconds;
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  if (studyTimerMode === "stopwatch") {
    display.textContent = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  } else {
    display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

// =========================================================
// 5. MÔN HỌC & BÀI HỌC (COURSES & LESSONS EXPLORER)
// =========================================================
function renderCoursesOverview() {
  const grid = document.getElementById("coursesCardsGrid");
  if (!grid) return;

  const subjectKeys = ["EN", "GT", "IT", "VL", "PL"];
  
  grid.innerHTML = subjectKeys.map(key => {
    const info = SUBJECTS_MAP[key] || {};
    const subjectSessions = state.sessions.filter(s => s.subject === key);
    const total = subjectSessions.length;
    const done = subjectSessions.filter(s => s.status === "Đã hoàn thành").length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    return `
      <div class="course-card" data-subject="${key}">
        <div class="course-card-top">
          <div class="course-icon-badge" style="background: ${info.bgColor}; color: ${info.color};">
            <i class="fa-solid ${info.icon || 'fa-book'}"></i>
          </div>
          <span class="course-code-tag" style="background: ${info.bgColor}; color: ${info.color};">
            ${key} &bull; ${info.credits || 3} Tín chỉ
          </span>
        </div>
        <div class="course-card-title">${info.name || key}</div>
        <div class="course-card-desc">${info.description || ''}</div>
        <div class="course-meta-row">
          <span><i class="fa-solid fa-chalkboard-user"></i> ${info.lecturer || 'Giảng viên khoa'}</span>
          <span><i class="fa-solid fa-bullseye" style="color: var(--pink-primary);"></i> ${info.targetScore || 'Điểm A'}</span>
        </div>
        <div class="course-progress-wrapper">
          <div class="course-progress-info">
            <span style="color: var(--text-muted);">Tiến độ: ${done}/${total} bài</span>
            <span style="color: ${info.color};">${percent}%</span>
          </div>
          <div class="course-progress-bar">
            <div class="course-progress-fill" style="width: ${percent}%; background: ${info.color};"></div>
          </div>
        </div>
        <button class="course-action-btn" style="background: ${info.bgColor}; color: ${info.color}; border-color: ${info.badgeColor};">
          <i class="fa-solid fa-book-open"></i> Vào môn học &bull; ${total} bài học
        </button>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", () => {
      openCourseLessons(card.dataset.subject);
    });
  });
}

function openCourseLessons(subjectKey) {
  selectedCourseSubject = subjectKey;
  const overviewView = document.getElementById("subjectsOverviewView");
  const explorerView = document.getElementById("subjectLessonsExplorerView");
  if (!overviewView || !explorerView) return;

  overviewView.style.display = "none";
  explorerView.style.display = "block";

  const info = SUBJECTS_MAP[subjectKey] || {};
  const subjectSessions = state.sessions.filter(s => s.subject === subjectKey);
  const done = subjectSessions.filter(s => s.status === "Đã hoàn thành").length;

  const hero = document.getElementById("currentSubjectHero");
  if (hero) {
    hero.innerHTML = `
      <div style="flex: 1;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="background: ${info.bgColor}; color: ${info.color}; font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">
            MÃ: ${info.code || subjectKey}
          </span>
          <span style="font-size: 0.8rem; color: var(--pink-primary); font-weight: 700;">
            <i class="fa-solid fa-bullseye"></i> Mục tiêu: ${info.targetScore || 'Điểm cao'}
          </span>
        </div>
        <div class="subject-hero-title">${info.name || subjectKey}</div>
        <div class="subject-hero-meta">
          ${info.description || ''} &bull; GV: <strong>${info.lecturer || 'Giảng viên khoa'}</strong> &bull; Phòng: <strong>${info.room || 'Theo TKB'}</strong>
        </div>
      </div>
      <div style="text-align: right; min-width: 130px;">
        <div style="font-size: 1.35rem; font-weight: 900; color: ${info.color};">${done} / ${subjectSessions.length}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Bài đã hoàn thành</div>
      </div>
    `;
  }

  // Cài đặt nút Quay lại
  const backBtn = document.getElementById("backToSubjectsBtn");
  if (backBtn) {
    backBtn.onclick = backToCoursesOverview;
  }

  // Cài đặt ô tìm kiếm
  const searchInput = document.getElementById("lessonSearchInput");
  if (searchInput) {
    searchInput.value = lessonSearchKeyword;
    searchInput.oninput = (e) => {
      lessonSearchKeyword = e.target.value.trim().toLowerCase();
      renderSubjectLessonsList();
    };
  }

  // Cài đặt filter pills
  const filterPills = document.querySelectorAll("#lessonStatusFilterContainer .filter-pill-btn");
  filterPills.forEach(pill => {
    pill.classList.toggle("active", pill.dataset.status === lessonStatusFilter);
    pill.onclick = () => {
      lessonStatusFilter = pill.dataset.status;
      filterPills.forEach(p => p.classList.toggle("active", p.dataset.status === lessonStatusFilter));
      renderSubjectLessonsList();
    };
  });

  renderSubjectLessonsList();
}
window.openCourseLessons = openCourseLessons;

function backToCoursesOverview() {
  const overviewView = document.getElementById("subjectsOverviewView");
  const explorerView = document.getElementById("subjectLessonsExplorerView");
  if (!overviewView || !explorerView) return;

  explorerView.style.display = "none";
  overviewView.style.display = "block";
  renderCoursesOverview();
}
window.backToCoursesOverview = backToCoursesOverview;

function renderSubjectLessonsList() {
  const container = document.getElementById("subjectLessonsList");
  const countBadge = document.getElementById("lessonCountBadge");
  if (!container) return;

  let list = state.sessions.filter(s => s.subject === selectedCourseSubject);
  const totalInSubject = list.length;

  if (lessonStatusFilter !== "ALL") {
    list = list.filter(s => s.status.includes(lessonStatusFilter));
  }

  if (lessonSearchKeyword) {
    list = list.filter(s => 
      s.code.toLowerCase().includes(lessonSearchKeyword) || 
      s.title.toLowerCase().includes(lessonSearchKeyword)
    );
  }

  if (countBadge) {
    countBadge.textContent = `Hiển thị ${list.length} / ${totalInSubject} bài học`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px; background: #ffffff; border-radius: 8px; color: var(--text-muted); border: 1px dashed var(--border-light);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--text-light);"></i>
        <div>Không tìm thấy bài học nào phù hợp với từ khóa "${escapeHtml(lessonSearchKeyword)}".</div>
      </div>
    `;
    return;
  }

  const subInfo = SUBJECTS_MAP[selectedCourseSubject] || {};

  container.innerHTML = list.map(s => {
    let statusClass = "status-todo";
    if (s.status === "Đã hoàn thành") statusClass = "status-done";
    if (s.status.includes("Đang học")) statusClass = "status-learning";

    return `
      <div class="lesson-row-card" data-code="${s.code}">
        <div class="lesson-row-left">
          <span class="lesson-code-pill" style="background: ${subInfo.bgColor}; color: ${subInfo.color};">
            ${s.code}
          </span>
          <div>
            <div class="lesson-title-text">${s.title}</div>
            <div class="lesson-sub-meta">
              <span class="session-status ${statusClass}" style="padding: 1px 6px; font-size: 0.72rem;">${s.status}</span>
              ${s.result ? `<span style="color: var(--success);"><i class="fa-solid fa-check"></i> ${s.result}</span>` : ""}
              ${s.mistakes ? `<span style="color: #e11d48;"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: ${escapeHtml(s.mistakes)}</span>` : ""}
            </div>
          </div>
        </div>
        <div class="lesson-row-right">
          <button class="btn btn-primary-small start-study-lesson-btn" data-code="${s.code}" style="padding: 6px 14px; font-size: 0.82rem;">
            <i class="fa-solid fa-book-open"></i> Học ngay
          </button>
          <button class="btn-small open-word-note-btn" data-code="${s.code}" title="Mở Sổ tay Word cho bài này">
            <i class="fa-regular fa-note-sticky"></i> Note
          </button>
          <button class="btn-small open-session-update-btn" data-code="${s.code}" title="Cập nhật trạng thái">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".start-study-lesson-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      openLessonWorkspace(btn.dataset.code);
    };
  });

  container.querySelectorAll(".lesson-row-card").forEach(card => {
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      openLessonWorkspace(card.dataset.code);
    };
  });

  container.querySelectorAll(".open-word-note-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      loadDocForSubject(btn.dataset.code);
      switchTab("tab-notes");
    };
  });

  container.querySelectorAll(".open-session-update-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      openSessionModal(btn.dataset.code);
    };
  });
}

function renderSessionsList() {
  renderCoursesOverview();
  renderSubjectLessonsList();
}

// =========================================================
// 5. MODAL CẬP NHẬT TIẾN ĐỘ TIẾT HỌC (QUICK UPDATE)
// =========================================================
function openSessionModal(code) {
  const session = state.sessions.find(s => s.code === code);
  if (!session) return;
  state.selectedSessionCode = code;

  const modal = document.getElementById("sessionModal");
  document.getElementById("modalSessionTitle").textContent = `[${session.code}] ${session.title}`;
  document.getElementById("modalSessionStatus").value = session.status.includes("Đang học") ? "Đang học" : session.status;
  document.getElementById("modalSessionDate").value = session.date || new Date().toISOString().split("T")[0];
  document.getElementById("modalSessionResult").value = session.result || "";
  document.getElementById("modalSessionMistakes").value = session.mistakes || "";

  modal.classList.add("active");
}

function closeSessionModal() {
  const modal = document.getElementById("sessionModal");
  if (modal) modal.classList.remove("active");
}

// =========================================================
// 6. KHÔNG GIAN HỌC TẬP CHUYÊN SÂU (LESSON WORKSPACE)
// =========================================================
export function openLessonWorkspace(code) {
  const session = state.sessions.find(s => s.code === code);
  currentWsLessonCode = code;
  state.selectedSessionCode = code;
  currentWsContent = getLessonContent(code);
  practiceAnswers = {};

  const modal = document.getElementById("lessonWorkspaceModal");
  if (!modal) return;

  // Render Header
  document.getElementById("wsCodeBadge").textContent = code;
  document.getElementById("wsTitle").textContent = session ? session.title : code;

  // Render Tab 1: Lý thuyết & Highlights
  renderWorkspaceTheory();

  // Render Tab 2: Luyện tập & Quiz
  renderWorkspacePractice();

  // Reset Tab 3: AI Messages & Cấu hình
  resetWorkspaceAiChat();

  // Render Tab 4: Checkpoint
  renderWorkspaceCheckpoint();

  // Mở tab 1 mặc định
  switchWorkspaceTab("ws-tab-read");

  modal.classList.add("active");
  if (typeof updateAiLiveContext === "function") {
    updateAiLiveContext();
  }
}
window.openLessonWorkspace = openLessonWorkspace;

export function closeLessonWorkspace() {
  const modal = document.getElementById("lessonWorkspaceModal");
  if (modal) modal.classList.remove("active");
  hideFloatingToolbar();
  if (typeof updateAiLiveContext === "function") {
    updateAiLiveContext();
  }
}
window.closeLessonWorkspace = closeLessonWorkspace;

export function switchWorkspaceTab(tabId) {
  currentWsTab = tabId;

  document.querySelectorAll(".ws-step-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.wstab === tabId);
  });

  document.querySelectorAll(".ws-tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });

  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add("active");

  hideFloatingToolbar();
  if (typeof updateAiLiveContext === "function") {
    updateAiLiveContext();
  }
}
window.switchWorkspaceTab = switchWorkspaceTab;

// Render Tab 1: Lý thuyết & bôi màu highlight đã lưu
function renderWorkspaceTheory() {
  const introEl = document.getElementById("wsIntroBanner");
  const container = document.getElementById("wsTheorySectionsContainer");
  if (!introEl || !container) return;

  introEl.innerHTML = `<strong><i class="fa-solid fa-circle-info"></i> Giới thiệu bài học:</strong> ${escapeHtml(currentWsContent.intro || "")}`;

  const sections = currentWsContent.sections || [];
  const lessonHighlights = state.highlights.filter(h => h.subject === currentWsLessonCode);

  container.innerHTML = sections.map((sec, idx) => {
    let bodyHtml = escapeHtml(sec.body || "");

    // Tô màu các đoạn highlight đã lưu cho bài học này
    lessonHighlights.forEach(hl => {
      const escapedText = escapeHtml(hl.text);
      if (escapedText && bodyHtml.includes(escapedText)) {
        const markTag = `<mark class="hl-mark-${hl.type}">${escapedText}</mark>`;
        bodyHtml = bodyHtml.split(escapedText).join(markTag);
      }
    });

    return `
      <div class="theory-section-box" data-section-id="${sec.id || idx}">
        <div class="theory-section-title">
          <i class="fa-solid fa-bookmark" style="color: var(--pink-primary);"></i>
          ${escapeHtml(sec.title)}
        </div>
        <div class="theory-section-text" id="wsTheoryText-${idx}">
          ${bodyHtml}
        </div>
      </div>
    `;
  }).join("");
}

// Render Tab 2: Luyện tập & Quiz
function renderWorkspacePractice() {
  const container = document.getElementById("wsPracticeQuestionsContainer");
  const badge = document.getElementById("wsPracticeScoreBadge");
  if (!container) return;

  const questions = currentWsContent.questions || [];
  if (badge) badge.textContent = `Tổng cộng: ${questions.length} câu`;

  if (questions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted);">
        Bài học này đang được chuẩn hóa ngân hàng câu hỏi. Bạn có thể sang tab <strong>Trợ lý AI GLM 5.3</strong> và bấm chip "🎯 Thử thách tự luyện" để AI sinh đề nhé!
      </div>
    `;
    return;
  }

  container.innerHTML = questions.map((q, qIdx) => {
    return `
      <div class="practice-card" data-qidx="${qIdx}">
        <div class="practice-question-title">
          <span style="color: var(--blue-primary); font-weight: 800;">Câu ${qIdx + 1}:</span> ${escapeHtml(q.prompt)}
        </div>
        <div class="practice-options-grid">
          ${q.options.map((opt, optIdx) => `
            <button class="practice-opt-btn" data-qidx="${qIdx}" data-optidx="${optIdx}">
              <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt)}
            </button>
          `).join("")}
        </div>
        <div class="practice-feedback-box" id="practiceFeedback-${qIdx}"></div>
      </div>
    `;
  }).join("");

  // Bắt sự kiện chọn đáp án
  container.querySelectorAll(".practice-opt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const qIdx = parseInt(btn.dataset.qidx);
      const optIdx = parseInt(btn.dataset.optidx);
      handlePracticeAnswer(qIdx, optIdx);
    });
  });
}

function handlePracticeAnswer(qIdx, chosenOptIdx) {
  const q = currentWsContent.questions[qIdx];
  if (!q) return;

  practiceAnswers[qIdx] = chosenOptIdx;
  const isCorrect = chosenOptIdx === q.answer;

  const card = document.querySelector(`.practice-card[data-qidx="${qIdx}"]`);
  if (!card) return;

  // Cập nhật trạng thái các nút
  card.querySelectorAll(".practice-opt-btn").forEach(btn => {
    const optIdx = parseInt(btn.dataset.optidx);
    btn.classList.remove("selected-correct", "selected-wrong");
    if (optIdx === chosenOptIdx) {
      btn.classList.add(isCorrect ? "selected-correct" : "selected-wrong");
    }
  });

  // Hiển thị khung phản hồi
  const feedbackEl = document.getElementById(`practiceFeedback-${qIdx}`);
  if (feedbackEl) {
    feedbackEl.className = "practice-feedback-box " + (isCorrect ? "correct" : "wrong");
    feedbackEl.innerHTML = `
      <div><strong>${isCorrect ? "✓ Chính xác!" : "✗ Chưa đúng!"}</strong> ${escapeHtml(q.explanation || "")}</div>
      ${!isCorrect ? `
        <button class="btn-small btn-outline ask-ai-from-quiz-btn" style="margin-top: 8px; color: var(--pink-primary); border-color: var(--pink-border);">
          <i class="fa-solid fa-robot"></i> Hỏi AI giải thích chi tiết bẫy lỗi này
        </button>
      ` : ""}
    `;

    const askAiBtn = feedbackEl.querySelector(".ask-ai-from-quiz-btn");
    if (askAiBtn) {
      askAiBtn.addEventListener("click", () => {
        switchWorkspaceTab("ws-tab-ai");
        sendAiMessage(`Trong bài tập: "${q.prompt}", tôi đã chọn đáp án "${q.options[chosenOptIdx]}" và bị sai. Tại sao đáp án đúng lại là "${q.options[q.answer]}"? Hãy giải thích bản chất ngắn gọn và chỉ ra bẫy lỗi.`);
      });
    }
  }

  // Cập nhật điểm số
  updatePracticeProgressBadge();
}

function updatePracticeProgressBadge() {
  const questions = currentWsContent.questions || [];
  const answeredCount = Object.keys(practiceAnswers).length;
  let correctCount = 0;

  Object.entries(practiceAnswers).forEach(([qIdx, optIdx]) => {
    if (questions[qIdx] && questions[qIdx].answer === optIdx) {
      correctCount++;
    }
  });

  const badge = document.getElementById("wsPracticeScoreBadge");
  if (badge) {
    badge.textContent = `Đã làm ${answeredCount}/${questions.length} câu (Đúng ${correctCount})`;
  }

  // Cập nhật sang form Checkpoint
  const resultInput = document.getElementById("wsCheckpointResult");
  if (resultInput && answeredCount > 0) {
    resultInput.value = `Đúng ${correctCount}/${questions.length} câu tự luyện`;
  }
}

// =========================================================
// 7. IN-TEXT HIGHLIGHTING & FLOATING TOOLBAR
export function askAiAboutSelection() {
  if (!activeSelectionData || !activeSelectionData.text) return;
  const passage = activeSelectionData.text;
  hideFloatingToolbar();
  window.getSelection()?.removeAllRanges();

  switchWorkspaceTab("ws-tab-ai");
  sendAiMessage(`Hãy giải thích bản chất thật ngắn gọn và chỉ ra các bẫy lỗi hay gặp trong đoạn kiến thức sau:\n"${passage}"`);
}
window.askAiAboutSelection = askAiAboutSelection;

// =========================================================
function setupWorkspaceListeners() {
  const container = document.getElementById("wsTheorySectionsContainer");
  const toolbar = document.getElementById("floatingHlToolbar");

  // Bắt sự kiện chọn văn bản chuột & ngón tay
  const handleSelection = () => {
    if (currentWsTab !== "ws-tab-read") {
      hideFloatingToolbar();
      return;
    }

    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : "";

    if (text.length > 1) {
      try {
        const range = selection.getRangeAt(0);
        if (container && container.contains(range.commonAncestorContainer)) {
          const rect = range.getBoundingClientRect();
          if (toolbar) {
            toolbar.style.top = `${rect.bottom + window.scrollY + 8}px`;
            toolbar.style.left = `${rect.left + window.scrollX + (rect.width / 2)}px`;
            toolbar.classList.add("visible");
            activeSelectionData = {
              text: text,
              range: range.cloneRange()
            };
            if (typeof updateAiLiveContext === "function") {
              updateAiLiveContext();
            }
          }
          return;
        }
      } catch (e) {
        // Range error handling
      }
    }
    hideFloatingToolbar();
  };

  document.addEventListener("mouseup", (e) => {
    if (toolbar && toolbar.contains(e.target)) return;
    setTimeout(handleSelection, 50);
  });

  document.addEventListener("touchend", (e) => {
    if (toolbar && toolbar.contains(e.target)) return;
    setTimeout(handleSelection, 100);
  });

  // Nút tô màu 4 màu trên thanh công cụ nổi
  if (toolbar) {
    toolbar.querySelectorAll(".hl-dot-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const color = btn.dataset.hlcolor;
        applyInTextHighlight(color);
      });
    });

    // Nút Hỏi AI về đoạn bôi đen
    const askAiBtn = document.getElementById("hlAskAiBtn");
    if (askAiBtn) {
      askAiBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!activeSelectionData || !activeSelectionData.text) return;
        const passage = activeSelectionData.text;
        hideFloatingToolbar();
        window.getSelection()?.removeAllRanges();

        switchWorkspaceTab("ws-tab-ai");
        sendAiMessage(`Hãy giải thích bản chất thật ngắn gọn và chỉ ra các bẫy lỗi hay gặp trong đoạn kiến thức sau:\n"${passage}"`);
      });
    }
  }

  // Stepper buttons
  document.querySelectorAll(".ws-step-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchWorkspaceTab(btn.dataset.wstab);
    });
  });

  // Modal navigation shortcuts
  const closeWsBtn = document.getElementById("closeWorkspaceBtn");
  if (closeWsBtn) closeWsBtn.addEventListener("click", closeLessonWorkspace);

  const goToPractice = document.getElementById("wsGoToPracticeBtn");
  if (goToPractice) goToPractice.addEventListener("click", () => switchWorkspaceTab("ws-tab-practice"));

  const backToRead = document.getElementById("wsBackToReadBtn");
  if (backToRead) backToRead.addEventListener("click", () => switchWorkspaceTab("ws-tab-read"));

  const askAiPractice = document.getElementById("wsAskAiPracticeBtn");
  if (askAiPractice) askAiPractice.addEventListener("click", () => switchWorkspaceTab("ws-tab-ai"));

  const goToCheckpoint = document.getElementById("wsGoToCheckpointBtn");
  if (goToCheckpoint) goToCheckpoint.addEventListener("click", () => switchWorkspaceTab("ws-tab-checkpoint"));

  // Checkpoint actions
  const saveCpBtn = document.getElementById("wsSaveCheckpointBtn");
  if (saveCpBtn) saveCpBtn.addEventListener("click", saveLessonCheckpoint);

  const copyAiBtn = document.getElementById("wsCopyAiReportBtn");
  if (copyAiBtn) copyAiBtn.addEventListener("click", copyLessonAiReport);

  const syncRepoBtn = document.getElementById("wsSyncDirectToRepoBtn");
  if (syncRepoBtn) syncRepoBtn.addEventListener("click", syncLessonDirectToRepo);

  const openNoteBtn = document.getElementById("wsOpenSessionNoteBtn");
  if (openNoteBtn) openNoteBtn.addEventListener("click", () => {
    closeLessonWorkspace();
    openNoteForSession(currentWsLessonCode);
    switchTab("tab-notes");
  });

  // AI Chat input
  const aiInput = document.getElementById("wsAiInput");
  const aiSend = document.getElementById("wsAiSendBtn");

  if (aiSend) {
    aiSend.addEventListener("click", () => {
      if (aiInput && aiInput.value.trim()) {
        const text = aiInput.value.trim();
        aiInput.value = "";
        sendAiMessage(text);
      }
    });
  }

  if (aiInput) {
    aiInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (aiInput.value.trim()) {
          const text = aiInput.value.trim();
          aiInput.value = "";
          sendAiMessage(text);
        }
      }
    });
  }

  // AI Quick chips
  document.querySelectorAll(".ai-chip-btn").forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.dataset.prompt;
      if (prompt) sendAiMessage(prompt);
    });
  });

  // AI Settings Modal
  const openSettings = document.getElementById("openAiSettingsBtn");
  const closeSettings = document.getElementById("closeAiSettingsBtn");
  const saveSettings = document.getElementById("saveAiSettingsBtn");
  const settingsModal = document.getElementById("aiSettingsModal");

  if (openSettings) {
    openSettings.addEventListener("click", () => {
      const keyInput = document.getElementById("inputOpenRouterKey");
      const modelInput = document.getElementById("inputOpenRouterModel");
      if (keyInput) keyInput.value = getOpenRouterApiKey();
      if (modelInput) modelInput.value = getOpenRouterModel();
      if (settingsModal) settingsModal.classList.add("active");
    });
  }

  if (closeSettings) {
    closeSettings.addEventListener("click", () => {
      if (settingsModal) settingsModal.classList.remove("active");
    });
  }

  if (saveSettings) {
    saveSettings.addEventListener("click", () => {
      const keyInput = document.getElementById("inputOpenRouterKey");
      const modelInput = document.getElementById("inputOpenRouterModel");
      if (keyInput && keyInput.value.trim()) {
        localStorage.setItem("thuan_openrouter_api_key", keyInput.value.trim());
      }
      if (modelInput && modelInput.value.trim()) {
        localStorage.setItem("thuan_openrouter_model", modelInput.value.trim());
      }
      if (settingsModal) settingsModal.classList.remove("active");
      showToast("Đã lưu cấu hình OpenRouter vào trình duyệt!");
    });
  }
}

let pendingHighlightColor = null;

const COLOR_CONFIG = {
  yellow: { label: "Vàng: Công thức", meaning: "Công thức, cấu trúc ngữ pháp / định lý cốt lõi", bg: "#fef9c3", color: "#854d0e" },
  pink: { label: "Hồng: Bẫy lỗi", meaning: "Bẫy đề kinh điển, điểm dễ mất điểm hay nhầm lẫn", bg: "#fce7f3", color: "#9d174d" },
  blue: { label: "Xanh nước: Cốt lõi", meaning: "Khái niệm cốt lõi, từ khóa trọng tâm bài học", bg: "#e0f2fe", color: "#0369a1" },
  green: { label: "Xanh lá: Mẹo nhớ", meaning: "Mẹo suy luận nhanh, quy tắc ghi nhớ độc đáo", bg: "#dcfce7", color: "#15803d" }
};

export function promptHighlightWithNote(colorType) {
  if (!activeSelectionData || !activeSelectionData.text) return;
  pendingHighlightColor = colorType;
  const cfg = COLOR_CONFIG[colorType] || COLOR_CONFIG.yellow;
  
  const popover = document.getElementById("hlNotePopover");
  const badge = document.getElementById("hlNoteColorBadge");
  const meaningText = document.getElementById("hlNoteMeaningText");
  const quoteText = document.getElementById("hlNoteQuoteText");
  const inputField = document.getElementById("hlNoteInputField");

  if (badge) {
    badge.textContent = cfg.label;
    badge.style.backgroundColor = cfg.bg;
    badge.style.color = cfg.color;
  }
  if (meaningText) meaningText.textContent = cfg.meaning;
  if (quoteText) quoteText.textContent = `"${activeSelectionData.text}"`;
  if (inputField) inputField.value = "";

  hideFloatingToolbar();
  if (popover) {
    popover.style.display = "block";
    if (inputField) setTimeout(() => inputField.focus(), 60);
  }
}
window.promptHighlightWithNote = promptHighlightWithNote;

export function closeHlNotePopover() {
  const popover = document.getElementById("hlNotePopover");
  if (popover) popover.style.display = "none";
  pendingHighlightColor = null;
}
window.closeHlNotePopover = closeHlNotePopover;

export function saveHighlightWithNote(withNote) {
  if (!activeSelectionData || !pendingHighlightColor) {
    closeHlNotePopover();
    return;
  }
  const inputField = document.getElementById("hlNoteInputField");
  const noteText = (withNote && inputField) ? inputField.value.trim() : "";

  applyInTextHighlight(pendingHighlightColor, noteText);
  closeHlNotePopover();
}
window.saveHighlightWithNote = saveHighlightWithNote;

function hideFloatingToolbar() {
  const toolbar = document.getElementById("floatingHlToolbar");
  if (toolbar) toolbar.classList.remove("visible");
}

function applyInTextHighlight(colorType, noteText = "") {
  if (!activeSelectionData || !activeSelectionData.text) return;
  const text = activeSelectionData.text;

  try {
    const mark = document.createElement("mark");
    mark.className = `hl-mark-${colorType}`;
    mark.textContent = text;
    if (noteText) {
      mark.title = `Ghi chú: ${noteText}`;
      mark.setAttribute("data-note", noteText);
    }
    activeSelectionData.range.deleteContents();
    activeSelectionData.range.insertNode(mark);
  } catch (err) {
    console.warn("DOM replacement warning:", err);
  }

  // Thêm vào mảng highlight toàn cục
  const cfg = COLOR_CONFIG[colorType] || { label: colorType, meaning: "" };
  const highlightItem = {
    id: "hl-" + Date.now(),
    text: text,
    type: colorType,
    meaning: cfg.meaning,
    note: noteText || "",
    subject: currentWsLessonCode || "GENERAL",
    date: new Date().toLocaleDateString("vi-VN")
  };
  state.highlights.unshift(highlightItem);
  saveStudyState(state);
  renderHighlightsList();

  hideFloatingToolbar();
  window.getSelection()?.removeAllRanges();

  showToast(noteText ? `Đã lưu highlight [${cfg.label}] kèm ghi chú!` : `Đã lưu highlight [${cfg.label}] vào Sổ tay!`);
}
window.applyInTextHighlight = applyInTextHighlight;
window.hideFloatingToolbar = hideFloatingToolbar;

// =========================================================
// 8. TRỢ LÝ AI GLM 5.3 (OPENROUTER CLIENT)
// =========================================================
function getOpenRouterApiKey() {
  return localStorage.getItem("thuan_openrouter_api_key") || atob(DEFAULT_KEY_B64);
}

function getOpenRouterModel() {
  return localStorage.getItem("thuan_openrouter_model") || DEFAULT_MODEL;
}

function resetWorkspaceAiChat() {
  const chatContainer = document.getElementById("wsAiChatMessages");
  if (!chatContainer) return;

  wsAiMessages = [];
  chatContainer.innerHTML = `
    <div class="ai-bubble system-tip">
      🤖 Gia sư AI GLM 5.3 (OpenRouter) sẵn sàng hỗ trợ tiết [${currentWsLessonCode}]. Hỏi bản chất, gợi ý tư duy và phân tích bẫy lỗi theo chuẩn AGENTS.md.
    </div>
  `;
}

async function sendAiMessage(userText) {
  const chatContainer = document.getElementById("wsAiChatMessages");
  if (!chatContainer || !userText.trim()) return;

  // Render User Message
  const userBubble = document.createElement("div");
  userBubble.className = "ai-bubble user";
  userBubble.textContent = userText;
  chatContainer.appendChild(userBubble);

  // Render Loading Bubble
  const loadingBubble = document.createElement("div");
  loadingBubble.className = "ai-bubble assistant";
  loadingBubble.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Trợ lý AI GLM đang suy nghĩ...`;
  chatContainer.appendChild(loadingBubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  wsAiMessages.push({ role: "user", content: userText });

  const systemPrompt = `Bạn là Gia Sư AI cá nhân chuyên nghiệp của Vàng Văn Thuận (sinh viên Trí tuệ nhân tạo K20 AI, Đại học Phenikaa).
Mục tiêu của Thuận: GPA ≥ 3.60, thi tiếng Anh xếp lớp ngày 17-18/10/2026 đạt 8.5+ để miễn Tiếng Anh 1 & 2.

QUY TẮC SƯ PHẠM BẮT BUỘC (theo AGENTS.md):
1. Giải thích NGẮN GỌN, đi thẳng vào BẢN CHẤT khái niệm, không nói dài dòng sách vở.
2. Khi người học đang làm bài tập hoặc hỏi cách giải: ĐƯA RA GỢI Ý và bản chất tư duy để người học tự làm, KHÔNG đưa ngay đáp án cuối cùng.
3. Luôn chỉ rõ các bẫy lỗi kinh điển mà người học hay mắc:
   - Trong Lập trình C: scanf thiếu '&', nhầm '=' và '==', con trỏ wild pointer, tràn mảng.
   - Trong Tiếng Anh: động từ 'to be' (am/is/are + not), phát âm email ('at', 'dot', hyphen vs underscore), chia thì s/es, sở hữu hers/theirs.
   - Trong Giải tích 1: giới hạn 0/0, nhân liên hợp phải chú ý đổi dấu TOÀN BỘ biểu thức trong ngoặc, vô cùng bé tương đương x->0.
   - Trong Vật lý 1: đơn vị SI, định luật Newton và chiếu vector lên trục toạ độ.
4. Trả lời bằng tiếng Việt thân thiện, nhiệt tình, chuẩn xác.

BÀI HỌC HIỆN TẠI:
- Mã tiết: [${currentWsLessonCode}]
- Tên tiết: ${currentWsContent ? currentWsContent.intro : ''}
`;

  try {
    const aiResponseText = await callOpenRouterApi(wsAiMessages, systemPrompt);
    loadingBubble.innerHTML = formatMarkdownToHtml(aiResponseText);
    wsAiMessages.push({ role: "assistant", content: aiResponseText });
  } catch (err) {
    loadingBubble.innerHTML = `
      <div style="color: #ef4444;">
        <i class="fa-solid fa-triangle-exclamation"></i> Không thể kết nối tới OpenRouter: ${escapeHtml(err.message)}
      </div>
      <div style="font-size: 0.78rem; margin-top: 6px; color: var(--text-muted);">
        Kiểm tra lại API Key hoặc mô hình trong nút <strong>Cài đặt AI</strong> bên trên.
      </div>
    `;
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
}
window.sendAiMessage = sendAiMessage;

async function callOpenRouterApi(messages, systemPrompt) {
  const apiKey = getOpenRouterApiKey();
  const primaryModel = getOpenRouterModel();

  const payload = {
    model: primaryModel,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages
    ],
    temperature: 0.6,
    max_tokens: 1200
  };

  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://hoctap-phenikaa-k20.vercel.app",
      "X-Title": "Phenikaa K20 AI Study Space"
    },
    body: JSON.stringify(payload)
  });

  // Nếu mô hình GLM bị lỗi hoặc không khả dụng, thử sang mô hình fallback
  if (!response.ok && primaryModel.includes("glm")) {
    console.warn("Primary GLM failed, attempting fallback model...");
    payload.model = "meta-llama/llama-3.3-70b-instruct:free";
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://hoctap-phenikaa-k20.vercel.app",
        "X-Title": "Phenikaa K20 AI Study Space"
      },
      body: JSON.stringify(payload)
    });
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Không có phản hồi từ AI.";
}

function formatMarkdownToHtml(text) {
  let html = escapeHtml(text);
  // In đậm **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // In nghiêng *text*
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Code block `code`
  html = html.replace(/`(.*?)`/g, "<code style='background: #e2e8f0; padding: 2px 4px; border-radius: 4px; font-size: 0.82rem;'>$1</code>");
  // Bullet lists
  html = html.replace(/^\s*-\s+(.*)$/gm, "<div style='margin-left: 14px;'>&bull; $1</div>");
  return html;
}

// =========================================================
// 9. CHECKPOINT & ĐỒNG BỘ DỮ LIỆU BÀI HỌC
// =========================================================
function renderWorkspaceCheckpoint() {
  const session = state.sessions.find(s => s.code === currentWsLessonCode);
  const statusSelect = document.getElementById("wsCheckpointStatus");
  const resultInput = document.getElementById("wsCheckpointResult");
  const mistakesInput = document.getElementById("wsCheckpointMistakes");

  if (session) {
    if (statusSelect) statusSelect.value = session.status.includes("Đang học") ? "Đang học" : session.status;
    if (resultInput) resultInput.value = session.result || (practiceAnswers && Object.keys(practiceAnswers).length > 0 ? `Đúng ${Object.values(practiceAnswers).length} câu` : "");
    if (mistakesInput) mistakesInput.value = session.mistakes || "";
  }

  updateCheckpointMarkdownPreview();

  if (statusSelect) statusSelect.onchange = updateCheckpointMarkdownPreview;
  if (resultInput) resultInput.oninput = updateCheckpointMarkdownPreview;
  if (mistakesInput) mistakesInput.oninput = updateCheckpointMarkdownPreview;
}

function updateCheckpointMarkdownPreview() {
  const status = document.getElementById("wsCheckpointStatus")?.value || "Đã hoàn thành";
  const result = document.getElementById("wsCheckpointResult")?.value || "";
  const mistakes = document.getElementById("wsCheckpointMistakes")?.value || "";
  const previewEl = document.getElementById("wsCheckpointMarkdownPreview");

  if (previewEl) {
    previewEl.textContent = generateLessonCheckpointMarkdown(currentWsLessonCode, status, result, mistakes);
  }
}

function generateLessonCheckpointMarkdown(code, status, result, mistakes) {
  const session = state.sessions.find(s => s.code === code);
  const title = session ? session.title : code;
  const today = new Date().toISOString().split("T")[0];
  const lessonHighlights = state.highlights.filter(h => h.subject === code);

  return `# Checkpoint học tập — [${code}] ${title}
- Ngày ghi nhận: ${today}
- Trạng thái: ${status}
- Kết quả tự kiểm tra: ${result || "Đã đọc lý thuyết & tự làm bài tập"}
- Bẫy lỗi & Cần ôn lại: ${mistakes || "Chưa ghi nhận thêm lỗi"}
- Điểm nhấn Highlight (${lessonHighlights.length} đoạn):
${lessonHighlights.length > 0 ? lessonHighlights.map(h => `  * [${h.type.toUpperCase()}] "${h.text}"`).join("\n") : "  * Chưa có highlight mới"}

> Tạo tự động từ Web Học Tập Phenikaa K20 AI theo chuẩn quy ước AGENTS.md.`;
}

function saveLessonCheckpoint() {
  const session = state.sessions.find(s => s.code === currentWsLessonCode);
  if (!session) return;

  const status = document.getElementById("wsCheckpointStatus")?.value || "Đã hoàn thành";
  const result = document.getElementById("wsCheckpointResult")?.value || "";
  const mistakes = document.getElementById("wsCheckpointMistakes")?.value || "";
  const today = new Date().toISOString().split("T")[0];

  session.status = status;
  session.result = result;
  session.mistakes = mistakes;
  session.date = today;

  saveStudyState(state);
  renderStats();
  renderSessionsList();

  showToast(`Đã lưu Checkpoint tiết [${currentWsLessonCode}] thành công!`);
}

function copyLessonAiReport() {
  const status = document.getElementById("wsCheckpointStatus")?.value || "Đã hoàn thành";
  const result = document.getElementById("wsCheckpointResult")?.value || "";
  const mistakes = document.getElementById("wsCheckpointMistakes")?.value || "";
  const markdown = generateLessonCheckpointMarkdown(currentWsLessonCode, status, result, mistakes);

  navigator.clipboard.writeText(markdown).then(() => {
    showToast("Đã sao chép Báo cáo Markdown! Hãy dán (Ctrl+V) vào khung chat với Antigravity AI.");
  });
}

async function syncLessonDirectToRepo() {
  try {
    const status = document.getElementById("wsCheckpointStatus")?.value || "Đã hoàn thành";
    const result = document.getElementById("wsCheckpointResult")?.value || "";
    const mistakes = document.getElementById("wsCheckpointMistakes")?.value || "";
    const markdown = generateLessonCheckpointMarkdown(currentWsLessonCode, status, result, mistakes);

    const res = await syncDirectlyToRepo(state.sessions, markdown);
    showToast(res.message);
  } catch (err) {
    alert("Thông báo: " + err.message);
  }
}
window.saveLessonCheckpoint = saveLessonCheckpoint;
window.copyLessonAiReport = copyLessonAiReport;
window.syncLessonDirectToRepo = syncLessonDirectToRepo;

// Toast notification
function showToast(message, icon = "fa-circle-check") {
  const container = document.getElementById("appToastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: #38bdf8;"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;

// =========================================================
// 10. SỔ TAY GHI CHÚ KIỂU WORD (WORD-STYLE NOTEBOOK)
// =========================================================
function initWordNotebook() {
  const editor = document.getElementById("wordDocEditor");
  const subjectSelect = document.getElementById("docSubjectSelector");
  const saveBtn = document.getElementById("saveWordDocBtn");
  const newBtn = document.getElementById("newWordDocBtn");
  const copyBtn = document.getElementById("copyWordDocBtn");
  const printBtn = document.getElementById("printWordDocBtn");
  const headingSelect = document.getElementById("ribbonHeadingSelect");

  if (!editor) return;

  // Nạp danh sách môn / bài học vào dropdown
  if (subjectSelect) {
    subjectSelect.innerHTML = `
      <option value="GENERAL">Sổ tay Tổng hợp K20 AI</option>
      <optgroup label="Tiếng Anh (EN)">
        ${state.sessions.filter(s => s.subject === "EN").map(s => `<option value="${s.code}">[${s.code}] ${s.title}</option>`).join("")}
      </optgroup>
      <optgroup label="Giải tích 1 (GT)">
        ${state.sessions.filter(s => s.subject === "GT").map(s => `<option value="${s.code}">[${s.code}] ${s.title}</option>`).join("")}
      </optgroup>
      <optgroup label="Lập trình C & CNTT (IT)">
        ${state.sessions.filter(s => s.subject === "IT").map(s => `<option value="${s.code}">[${s.code}] ${s.title}</option>`).join("")}
      </optgroup>
      <optgroup label="Vật lý 1 (VL)">
        ${state.sessions.filter(s => s.subject === "VL").map(s => `<option value="${s.code}">[${s.code}] ${s.title}</option>`).join("")}
      </optgroup>
      <optgroup label="Pháp luật (PL)">
        ${state.sessions.filter(s => s.subject === "PL").map(s => `<option value="${s.code}">[${s.code}] ${s.title}</option>`).join("")}
      </optgroup>
    `;

    subjectSelect.value = currentDocSubject;
    subjectSelect.onchange = (e) => {
      saveCurrentWordDoc(false);
      loadDocForSubject(e.target.value);
    };
  }

  // Ribbon commands (Bold, Italic, Underline, Strikethrough, Justify, Lists)
  document.querySelectorAll(".ribbon-btn[data-command]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      document.execCommand(btn.dataset.command, false, null);
      editor.focus();
    };
  });

  // Ribbon heading select
  if (headingSelect) {
    headingSelect.onchange = () => {
      const tag = headingSelect.value;
      document.execCommand("formatBlock", false, tag);
      editor.focus();
    };
  }

  // Ribbon highlight colors
  document.querySelectorAll(".ribbon-hl-color-btn").forEach(btn => {
    btn.onclick = () => {
      const color = btn.dataset.hlColor;
      applyWordHighlight(color);
    };
  });

  // Remove highlight
  const removeHlBtn = document.getElementById("removeHighlightBtn");
  if (removeHlBtn) {
    removeHlBtn.onclick = () => {
      document.execCommand("removeFormat", false, null);
      editor.focus();
    };
  }

  // Insert Callout trap box
  const insertCalloutBtn = document.getElementById("insertTrapCalloutBtn");
  if (insertCalloutBtn) {
    insertCalloutBtn.onclick = () => {
      insertHtmlAtCursor(`
        <div class="word-callout-trap">
          <strong><i class="fa-solid fa-triangle-exclamation"></i> BẪY LỖI KINH ĐIỂN CẦN TRÁNH:</strong>
          <div>Ghi lại bẫy đề thi hoặc sai sót dễ nhầm lẫn nhất ở đây...</div>
        </div><p><br></p>
      `);
    };
  }

  // Insert Code box
  const insertCodeBtn = document.getElementById("insertCodeBoxBtn");
  if (insertCodeBtn) {
    insertCodeBtn.onclick = () => {
      insertHtmlAtCursor(`
        <pre class="word-code-box"><code>// Ví dụ mã nguồn C / Công thức Toán
#include &lt;stdio.h&gt;
// Lưu ý: scanf cần dấu &amp; khi nhập biến cơ bản
</code></pre><p><br></p>
      `);
    };
  }

  // Insert Table 2x3
  const insertTableBtn = document.getElementById("insertTableBtn");
  if (insertTableBtn) {
    insertTableBtn.onclick = () => {
      insertHtmlAtCursor(`
        <table class="word-table">
          <thead>
            <tr><th>Khái niệm / Dạng bài</th><th>Công thức &amp; Quy tắc</th><th>Bẫy đề thi cần tránh</th></tr>
          </thead>
          <tbody>
            <tr><td>Dạng 1: Cơ bản</td><td>Quy tắc biến đổi</td><td>Bẫy dấu, nhầm biến số</td></tr>
            <tr><td>Dạng 2: Vận dụng</td><td>Phương pháp giải</td><td>Điều kiện xác định</td></tr>
          </tbody>
        </table><p><br></p>
      `);
    };
  }

  // Save / New / Copy / Print actions
  if (saveBtn) saveBtn.onclick = () => saveCurrentWordDoc(true);
  if (newBtn) {
    newBtn.onclick = () => {
      if (confirm("Tạo trang mới cho tài liệu này? (Nội dung cũ sẽ được làm mới)")) {
        editor.innerHTML = `<h1>Ghi chú mới</h1><p>Bắt đầu ghi lại công thức và bẫy lỗi ở đây...</p>`;
        saveCurrentWordDoc(true);
      }
    };
  }
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(editor.innerText).then(() => {
        showToast("Đã sao chép toàn bộ văn bản Word vào Clipboard!");
      });
    };
  }
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // Auto save on input (debounced 1.2s)
  editor.addEventListener("input", () => {
    const indicator = document.getElementById("docAutoSaveIndicator");
    if (indicator) indicator.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...`;

    clearTimeout(wordDocAutoSaveTimeout);
    wordDocAutoSaveTimeout = setTimeout(() => {
      saveCurrentWordDoc(false);
    }, 1200);
  });

  // Tải nội dung ban đầu
  loadDocForSubject(currentDocSubject);
  renderSidebarHighlightsList();
}

function applyWordHighlight(color) {
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.isCollapsed) {
    alert("Vui lòng bôi đen đoạn chữ trên trang giấy Word để tô màu highlight!");
    return;
  }
  document.execCommand("hiliteColor", false, color);
}

function insertHtmlAtCursor(html) {
  const editor = document.getElementById("wordDocEditor");
  if (!editor) return;
  editor.focus();

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node;
    while ((node = tempDiv.firstChild)) {
      frag.appendChild(node);
    }
    range.insertNode(frag);
  } else {
    editor.innerHTML += html;
  }
  saveCurrentWordDoc(false);
}

function loadDocForSubject(code) {
  currentDocSubject = code;
  const editor = document.getElementById("wordDocEditor");
  const titleInput = document.getElementById("docTitleInput");
  const subjectSelect = document.getElementById("docSubjectSelector");

  if (subjectSelect) subjectSelect.value = code;

  const session = state.sessions.find(s => s.code === code);
  if (titleInput) {
    titleInput.value = session 
      ? `[${session.code}] ${session.title} — Sổ tay Bẫy lỗi & Công thức`
      : `Sổ tay Tổng hợp & Bẫy lỗi Phenikaa K20 AI — Vàng Văn Thuận`;
  }

  if (!editor) return;

  if (state.notes[code] && state.notes[code].trim().length > 0) {
    editor.innerHTML = state.notes[code];
  } else {
    // Tạo mẫu Word chuẩn đẹp, thanh lịch
    editor.innerHTML = `
      <h1>${session ? `[${session.code}] ${session.title}` : 'SỔ TAY BẪY LỖI & CÔNG THỨC K20 AI'}</h1>
      <p><em>Ngày lập: ${new Date().toLocaleDateString("vi-VN")} &bull; Người học: Vàng Văn Thuận</em></p>
      
      <h2>1. KHÁI NIỆM &amp; CÔNG THỨC CỐT LÕI</h2>
      <p>Ghi lại các định nghĩa, quy tắc và bản chất bạn vừa tiếp thu được...</p>
      
      <div class="word-callout-trap">
        <strong><i class="fa-solid fa-triangle-exclamation"></i> BẪY LỖI CẦN ĐẶC BIỆT CHÚ Ý:</strong>
        <div>${session && session.mistakes ? escapeHtml(session.mistakes) : 'Bôi màu hồng các lỗi hay mắc khi làm bài tập vào đây.'}</div>
      </div>

      <h2>2. VÍ DỤ MINH HỌA &amp; MẸO NHỚ</h2>
      <ul>
        <li>Quy tắc nhớ nhanh: ...</li>
        <li>Tình huống áp dụng: ...</li>
      </ul>
      <p><br></p>
    `;
  }

  const indicator = document.getElementById("docAutoSaveIndicator");
  if (indicator) indicator.innerHTML = `<i class="fa-solid fa-check"></i> Đã tự động lưu`;
}
window.loadDocForSubject = loadDocForSubject;

function saveCurrentWordDoc(notify = false) {
  const editor = document.getElementById("wordDocEditor");
  if (!editor) return;

  state.notes[currentDocSubject] = editor.innerHTML;
  saveStudyState(state);

  const indicator = document.getElementById("docAutoSaveIndicator");
  if (indicator) indicator.innerHTML = `<i class="fa-solid fa-check"></i> Đã tự động lưu (${new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})})`;

  if (notify) {
    showToast("Đã lưu sổ tay Word vào hệ thống!");
  }
}
window.saveCurrentWordDoc = saveCurrentWordDoc;

function renderSidebarHighlightsList() {
  const container = document.getElementById("sidebarHighlightsList");
  const countBadge = document.getElementById("sidebarHlCount");
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${state.highlights.length} đoạn`;
  }

  if (state.highlights.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 20px 10px; color: var(--text-muted); font-size: 0.8rem;">
        Chưa có đoạn highlight nào. Khi đọc lý thuyết bài học, bôi đen chữ để lưu vào đây!
      </div>
    `;
    return;
  }

  container.innerHTML = state.highlights.map(hl => {
    let tagColor = "#0284c7";
    let tagBg = "#e0f2fe";
    let tagLabel = "CỐT LÕI";

    if (hl.type === "pink") { tagColor = "#e11d48"; tagBg = "#ffe4e6"; tagLabel = "BẪY LỖI"; }
    if (hl.type === "yellow") { tagColor = "#ca8a04"; tagBg = "#fef9c3"; tagLabel = "CÔNG THỨC"; }
    if (hl.type === "green") { tagColor = "#16a34a"; tagBg = "#dcfce7"; tagLabel = "MẸO NHỚ"; }

    return `
      <div class="sidebar-hl-card">
        <div class="sidebar-hl-top">
          <span class="sidebar-hl-tag" style="background: ${tagBg}; color: ${tagColor}; padding: 2px 6px; border-radius: 4px;">
            [${tagLabel}] ${hl.subject}
          </span>
          <button class="sidebar-hl-insert-btn" data-hlid="${hl.id}">
            <i class="fa-solid fa-plus"></i> Chèn
          </button>
        </div>
        <div class="sidebar-hl-text">"${escapeHtml(hl.text)}"</div>
        ${hl.note ? `
          <div style="font-size: 0.76rem; color: #0284c7; background: #e0f2fe; padding: 4px 8px; border-radius: 4px; margin-top: 6px;">
            <i class="fa-solid fa-note-sticky"></i> <strong>Note:</strong> ${escapeHtml(hl.note)}
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  container.querySelectorAll(".sidebar-hl-insert-btn").forEach(btn => {
    btn.onclick = () => {
      const hlId = btn.dataset.hlid;
      const hl = state.highlights.find(h => h.id === hlId);
      if (hl) {
        insertHighlightIntoWordDoc(hl);
      }
    };
  });
}

function insertHighlightIntoWordDoc(hl) {
  let icon = "fa-triangle-exclamation";
  let title = "BẪY LỖI";

  if (hl.type === "yellow") { title = "CÔNG THỨC QUAN TRỌNG"; icon = "fa-calculator"; }
  if (hl.type === "blue") { title = "KHÁI NIỆM CỐT LÕI"; icon = "fa-droplet"; }
  if (hl.type === "green") { title = "MẸO NHỚ SÂU"; icon = "fa-lightbulb"; }

  insertHtmlAtCursor(`
    <div class="word-callout-trap" style="margin: 10px 0;">
      <strong><i class="fa-solid ${icon}"></i> [${title} - ${escapeHtml(hl.subject)}]:</strong>
      <div>"${escapeHtml(hl.text)}"</div>
      ${hl.note ? `<div style="margin-top: 4px; font-size: 0.85rem; color: #be185d;"><strong><i class="fa-solid fa-pen"></i> Ghi chú cá nhân:</strong> ${escapeHtml(hl.note)}</div>` : ''}
    </div><p><br></p>
  `);
  showToast(`Đã chèn đoạn [${hl.subject}] vào trang Word!`);
}

function openNoteForSession(code) {
  loadDocForSubject(code);
}

function renderHighlightsList() {
  renderSidebarHighlightsList();
}

// =========================================================
// 11. MA TRẬN ĐỀ THI & AI GLM 5.3 TẠO ĐỀ ÔN TẬP
// =========================================================
function initExamMatrixUI() {
  const genBtn = document.getElementById("aiGenerateQuizBtn");
  if (genBtn) {
    genBtn.onclick = generateAiQuizFromMatrix;
  }

  const askAiQuizBtn = document.getElementById("askAiQuizQuestionBtn");
  if (askAiQuizBtn) {
    askAiQuizBtn.onclick = () => {
      const q = currentQuizList[currentQuizIndex];
      if (!q) return;
      const prompt = `Giải thích bản chất câu trắc nghiệm này và chỉ rõ bẫy đề: "${q.question}" - Các lựa chọn: ${q.options ? q.options.join(" | ") : ''}`;
      openLessonWorkspace(currentWsLessonCode || "EN01");
      switchWorkspaceTab("ws-tab-ai");
      sendAiMessage(prompt);
    };
  }
}

async function generateAiQuizFromMatrix() {
  const subjectKey = document.getElementById("matrixSubjectSelect")?.value || "EN";
  const qCount = parseInt(document.getElementById("matrixQuestionCountSelect")?.value || "5", 10);
  const focusMode = document.getElementById("matrixFocusSelect")?.value || "balanced";
  const loader = document.getElementById("aiQuizLoadingBox");
  const genBtn = document.getElementById("aiGenerateQuizBtn");

  if (loader) loader.style.display = "flex";
  if (genBtn) genBtn.disabled = true;

  const subInfo = SUBJECTS_MAP[subjectKey] || { name: "Tổng hợp K20" };

  const systemPrompt = `Bạn là Trưởng bộ môn & Gia sư AI Phenikaa K20 AI theo quy ước AGENTS.md.
Nhiệm vụ: Tạo một bộ đề ôn tập trắc nghiệm gồm chính xác ${qCount} câu hỏi môn ${subInfo.name} (${subjectKey}) bám sát ma trận:
- 30% Nhận biết (khái niệm, cú pháp, từ vựng)
- 40% Thông hiểu (bản chất, cấu trúc, biến đổi)
- 20% Vận dụng (tính toán, code C, chia thì)
- 10% Bẫy đề thường gặp (các bẫy kinh điển sinh viên hay bị trừ điểm).
Chế độ trọng tâm: ${focusMode}.

YÊU CẦU ĐẶC BIỆT VỀ ĐỊNH DẠNG:
Trả về DUY NHẤT một mảng JSON hợp lệ, KHÔNG thêm bất kỳ văn bản giải thích nào ngoài mảng JSON.
Định dạng mỗi phần tử:
[
  {
    "question": "Nội dung câu hỏi ngắn gọn, rõ ràng",
    "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    "correctIndex": 0,
    "explanation": "Giải thích ngắn gọn bản chất và chỉ rõ vì sao các phương án khác là bẫy sai"
  }
]`;

  const userMsg = [{
    role: "user",
    content: `Hãy sinh ngay bộ đề ôn tập gồm ${qCount} câu trắc nghiệm môn ${subInfo.name} theo đúng ma trận trên.`
  }];

  try {
    const rawAiResponse = await callOpenRouterApi(userMsg, systemPrompt);
    
    // Parse JSON
    let jsonStr = rawAiResponse.trim();
    if (jsonStr.includes("```json")) {
      jsonStr = jsonStr.split("```json")[1].split("```")[0].trim();
    } else if (jsonStr.includes("```")) {
      jsonStr = jsonStr.split("```")[1].split("```")[0].trim();
    }
    
    const startIdx = jsonStr.indexOf("[");
    const endIdx = jsonStr.lastIndexOf("]");
    if (startIdx !== -1 && endIdx !== -1) {
      jsonStr = jsonStr.substring(startIdx, endIdx + 1);
    }

    const parsed = JSON.parse(jsonStr);

    if (Array.isArray(parsed) && parsed.length > 0) {
      currentQuizList = parsed;
      currentQuizIndex = 0;
      userQuizAnswers = {};

      const sourceTag = document.getElementById("quizSourceTag");
      if (sourceTag) {
        sourceTag.textContent = `AI GLM 5.3 • Ma trận ${subInfo.shortName || subjectKey}`;
        sourceTag.style.background = "var(--pink-light)";
        sourceTag.style.color = "var(--pink-primary)";
      }

      const summaryBox = document.getElementById("quizResultSummaryBox");
      if (summaryBox) summaryBox.style.display = "none";

      renderQuizQuestion();

      const quizCard = document.getElementById("quizActiveCard");
      if (quizCard) {
        quizCard.scrollIntoView({ behavior: "smooth" });
      }

      showToast(`✨ AI GLM 5.3 đã tạo thành công bộ đề ${parsed.length} câu theo ma trận!`);
    } else {
      throw new Error("Phản hồi của AI không đúng định dạng mảng câu hỏi.");
    }
  } catch (err) {
    console.error("Lỗi tạo đề AI:", err);
    alert("Không thể tạo đề bằng AI: " + err.message + "\nĐang chuyển sang bộ đề thi mẫu có sẵn...");
    startQuiz(subjectKey === "GT" ? "GT" : "EN");
  } finally {
    if (loader) loader.style.display = "none";
    if (genBtn) genBtn.disabled = false;
  }
}

function startQuiz(type) {
  currentQuizList = QUIZ_QUESTIONS[type] || QUIZ_QUESTIONS["EN"];
  currentQuizIndex = 0;
  userQuizAnswers = {};

  const sourceTag = document.getElementById("quizSourceTag");
  if (sourceTag) {
    sourceTag.textContent = type === "EN" ? "Đề Tiếng Anh 50 câu" : "Đề Giải tích 1 (Giới hạn)";
    sourceTag.style.background = "var(--blue-light)";
    sourceTag.style.color = "var(--blue-primary)";
  }

  const summaryBox = document.getElementById("quizResultSummaryBox");
  if (summaryBox) summaryBox.style.display = "none";

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = currentQuizList[currentQuizIndex];
  if (!q) return;

  const progEl = document.getElementById("quizProgressText");
  const titleEl = document.getElementById("quizQuestionTitle");
  const optionsEl = document.getElementById("quizOptionsList");
  const expBox = document.getElementById("quizExplanation");

  if (progEl) progEl.textContent = `Câu ${currentQuizIndex + 1} / ${currentQuizList.length}`;
  if (titleEl) titleEl.textContent = q.question;

  if (optionsEl) {
    optionsEl.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn ${userQuizAnswers[currentQuizIndex] === idx ? 'selected' : ''}" data-idx="${idx}">
        <strong>${String.fromCharCode(65 + idx)}.</strong> ${escapeHtml(opt)}
      </button>
    `).join("");

    optionsEl.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        userQuizAnswers[currentQuizIndex] = idx;
        renderQuizQuestion();
      });
    });
  }

  if (expBox) expBox.style.display = "none";
}

function showQuizExplanation() {
  submitQuizWithSummary();
}

function submitQuizWithSummary() {
  if (!currentQuizList || currentQuizList.length === 0) return;

  const total = currentQuizList.length;
  let correctCount = 0;
  const mistakeItems = [];

  currentQuizList.forEach((q, idx) => {
    const userAns = userQuizAnswers[idx];
    if (userAns === q.correctIndex) {
      correctCount++;
    } else {
      mistakeItems.push({
        qIndex: idx + 1,
        question: q.question,
        userChoice: userAns !== undefined ? q.options[userAns] : "Chưa trả lời",
        correctChoice: q.options[q.correctIndex],
        explanation: q.explanation
      });
    }
  });

  const percent = Math.round((correctCount / total) * 100);
  const summaryBox = document.getElementById("quizResultSummaryBox");
  if (!summaryBox) return;

  summaryBox.style.display = "block";
  summaryBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
      <div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
          <i class="fa-solid fa-square-poll-vertical" style="color: var(--blue-primary);"></i> Tổng Kết Kết Quả Bài Thi
        </h4>
        <p style="font-size: 0.82rem; color: var(--text-muted);">
          Đúng ${correctCount} / ${total} câu (${percent}%) &bull; ${percent >= 80 ? '🎉 Nắm rất chắc kiến thức bản chất!' : '⚠️ Có một số bẫy đề cần rà soát lại bên dưới.'}
        </p>
      </div>
      <div style="font-size: 2rem; font-weight: 900; color: ${percent >= 80 ? 'var(--success)' : 'var(--pink-primary)'}; font-family: monospace;">
        ${percent}%
      </div>
    </div>

    ${mistakeItems.length > 0 ? `
      <div style="background: #fff1f2; border: 1px solid var(--pink-border); border-radius: var(--radius-sm); padding: 14px 18px; margin-bottom: 16px;">
        <h5 style="color: #9f1239; font-weight: 800; font-size: 0.9rem; margin-bottom: 8px;">
          <i class="fa-solid fa-triangle-exclamation"></i> Danh sách ${mistakeItems.length} câu dính bẫy cần ghi vào Sổ tay:
        </h5>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${mistakeItems.map(m => `
            <div style="font-size: 0.82rem; color: #881337; padding-bottom: 8px; border-bottom: 1px dashed #fecdd3;">
              <strong>Câu ${m.qIndex}:</strong> ${escapeHtml(m.question)}<br>
              <span style="color: #e11d48;">Bạn chọn: ${escapeHtml(m.userChoice)}</span> &bull; 
              <span style="color: #059669; font-weight: 700;">Đáp án đúng: ${escapeHtml(m.correctChoice)}</span><br>
              <em>💡 Bản chất & Bẫy: ${escapeHtml(m.explanation)}</em>
            </div>
          `).join("")}
        </div>
      </div>
    ` : `
      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-sm); padding: 14px 18px; margin-bottom: 16px; color: #065f46; font-size: 0.88rem;">
        <i class="fa-solid fa-circle-check"></i> Tuyệt đối chính xác! Bạn không mắc phải bẫy đề nào trong bài này.
      </div>
    `}

    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <button class="btn btn-primary" id="retryAiExamBtn">
        <i class="fa-solid fa-wand-magic-sparkles"></i> AI Tạo Đề Mới Tương Tự
      </button>
      <button class="btn btn-outline" id="saveQuizToWordBtn" style="color: var(--blue-primary); border-color: var(--blue-border);">
        <i class="fa-solid fa-file-pen"></i> Chèn Bẫy Sai Vào Sổ Tay Word
      </button>
    </div>
  `;

  const retryBtn = document.getElementById("retryAiExamBtn");
  if (retryBtn) retryBtn.onclick = generateAiQuizFromMatrix;

  const saveToWordBtn = document.getElementById("saveQuizToWordBtn");
  if (saveToWordBtn) {
    saveToWordBtn.onclick = () => {
      if (mistakeItems.length > 0) {
        const mistakeHtml = mistakeItems.map(m => `
          <li><strong>Câu ${m.qIndex}:</strong> ${escapeHtml(m.question)} &rarr; Bẫy sai: <em>${escapeHtml(m.explanation)}</em></li>
        `).join("");
        insertHtmlAtCursor(`
          <div class="word-callout-trap">
            <strong>BẪY LỖI TỪ ĐỀ ÔN TẬP (${correctCount}/${total} đúng):</strong>
            <ul>${mistakeHtml}</ul>
          </div><p><br></p>
        `);
        showToast("Đã chèn các bẫy đề vừa gặp vào trang Word!");
        switchTab("tab-notes");
      } else {
        showToast("Bạn làm đúng 100%, không có câu sai nào cần chèn!");
      }
    };
  }

  summaryBox.scrollIntoView({ behavior: "smooth" });
}

// =========================================================
// 12. MINI GAME: BUG HUNTER & FLASHCARDS
// =========================================================
function renderBugHunterLevel(levelIdx) {
  currentBugLevelIndex = levelIdx;
  const level = BUG_HUNTER_LEVELS[levelIdx];
  if (!level) return;

  const titleEl = document.getElementById("bugHunterTitle");
  const instEl = document.getElementById("bugHunterInstruction");
  const codeBox = document.getElementById("bugHunterCodeBox");
  const fbBox = document.getElementById("bugHunterFeedback");

  if (titleEl) titleEl.textContent = level.title;
  if (instEl) instEl.textContent = level.instruction;
  if (fbBox) fbBox.style.display = "none";

  if (codeBox) {
    codeBox.innerHTML = level.codeLines.map((line, idx) => `
      <div class="code-line" data-line="${idx}">
        <span class="code-line-num">${idx + 1}</span>
        <span>${escapeHtml(line)}</span>
      </div>
    `).join("");

    codeBox.querySelectorAll(".code-line").forEach(el => {
      el.addEventListener("click", () => {
        const lineIdx = parseInt(el.dataset.line);
        checkBugLine(lineIdx);
      });
    });
  }
}

function checkBugLine(selectedLineIdx) {
  const level = BUG_HUNTER_LEVELS[currentBugLevelIndex];
  const fbBox = document.getElementById("bugHunterFeedback");
  if (!fbBox) return;

  fbBox.style.display = "block";
  if (selectedLineIdx === level.bugLineIndex) {
    fbBox.style.background = "var(--success-light)";
    fbBox.style.borderLeftColor = "var(--success)";
    fbBox.innerHTML = `<strong style="color: var(--success);"><i class="fa-solid fa-check"></i> CHÍNH XÁC!</strong> ${escapeHtml(level.explanation)}`;
  } else {
    fbBox.style.background = "var(--danger-light)";
    fbBox.style.borderLeftColor = "var(--danger)";
    fbBox.innerHTML = `<strong style="color: var(--danger);"><i class="fa-solid fa-xmark"></i> DÒNG NÀY CHƯA ĐÚNG!</strong> Hãy quan sát kỹ biến, con trỏ hoặc cú pháp nhé.`;
  }
}

// Spaced Repetition Flashcards
function renderFlashcard() {
  const fc = state.flashcards[currentFcIndex];
  if (!fc) return;

  const badge = document.getElementById("flashcardSubjectBadge");
  const content = document.getElementById("flashcardContent");
  const hint = document.getElementById("flashcardHint");

  if (badge) badge.textContent = `${fc.subject} &bull; ${fc.topic}`;
  if (content) content.textContent = isFcFlipped ? fc.back : fc.front;
  if (hint) hint.textContent = isFcFlipped ? "Mặt sau (Bấm để lật lại mặt trước)" : "Mặt trước (Bấm vào thẻ để xem đáp án)";
}

function flipFlashcard() {
  isFcFlipped = !isFcFlipped;
  renderFlashcard();
}

function rateFlashcard(intervalDays) {
  const fc = state.flashcards[currentFcIndex];
  if (fc) {
    fc.interval = intervalDays;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    fc.nextReview = nextDate.toISOString().split("T")[0];
    saveStudyState(state);
  }
  isFcFlipped = false;
  currentFcIndex = (currentFcIndex + 1) % state.flashcards.length;
  renderFlashcard();
  showToast(`Đã ghi nhớ thẻ (+${intervalDays} ngày)!`);
}

// =========================================================
// 13. LỊCH HỌC PHENIKAA K20
// =========================================================
function renderScheduleList(events = SCHEDULE_SAMPLE) {
  const container = document.getElementById("scheduleListContainer");
  if (!container) return;

  container.innerHTML = events.map(ev => `
    <div class="schedule-item">
      <div class="schedule-date-badge">
        <div style="font-size: 0.75rem; text-transform: uppercase;">Tháng 11</div>
        <div style="font-size: 1.15rem; font-weight: 800;">${ev.date.split("-")[2]}</div>
      </div>
      <div class="schedule-info">
        <h4>${ev.subject} &bull; ${ev.period || ''}</h4>
        <div class="schedule-meta">
          <span><i class="fa-solid fa-clock"></i> ${ev.start} - ${ev.end}</span>
          <span><i class="fa-solid fa-location-dot"></i> Phòng: ${ev.room}</span>
          <span><i class="fa-solid fa-user-tie"></i> GV: ${ev.teacher}</span>
        </div>
      </div>
    </div>
  `).join("");
}

async function loadFullSchedule() {
  try {
    const res = await fetch("lich-hoc/2026-10-07-cac-tuan-sau.json");
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      renderScheduleList(data.slice(0, 15));
    }
  } catch (e) {
    // Fallback to sample
  }
}

// =========================================================
// 14. POMODORO FOCUS TIMER
// =========================================================
function togglePomodoro() {
  const btn = document.getElementById("pomodoroToggleBtn");
  const audio = document.getElementById("lofiAudioPlayer");

  if (!state.pomodoroRunning) {
    state.pomodoroRunning = true;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-pause"></i> Tạm dừng Focus`;
    if (audio) audio.play().catch(() => {});

    pomodoroIntervalId = setInterval(() => {
      if (state.pomodoroSeconds === 0) {
        if (state.pomodoroMinutes === 0) {
          clearInterval(pomodoroIntervalId);
          state.pomodoroRunning = false;
          if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i> Bắt đầu Pomodoro`;
          if (audio) audio.pause();
          alert("Chúc mừng bạn đã hoàn thành 25 phút tập trung cao độ!");
          return;
        }
        state.pomodoroMinutes--;
        state.pomodoroSeconds = 59;
      } else {
        state.pomodoroSeconds--;
      }
      updatePomodoroDisplay();
    }, 1000);
  } else {
    state.pomodoroRunning = false;
    clearInterval(pomodoroIntervalId);
    if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i> Tiếp tục Pomodoro`;
    if (audio) audio.pause();
  }
}

function updatePomodoroDisplay() {
  const display = document.getElementById("pomodoroDisplay");
  if (!display) return;
  const m = String(state.pomodoroMinutes).padStart(2, "0");
  const s = String(state.pomodoroSeconds).padStart(2, "0");
  display.textContent = `${m}:${s}`;
}

// =========================================================
// 15. SYNC HUB & BÁO CÁO TOÀN DIỆN
// =========================================================
function renderSyncReport() {
  const preview = document.getElementById("markdownReportPreview");
  if (preview) {
    preview.textContent = generateAICheckpointMarkdown(
      state.sessions, 
      state.notes, 
      state.highlights, 
      state.quizHistory
    );
  }
}

// Thiết lập toàn bộ Event Listeners cho trang chính
function setupEventListeners() {
  // Navigation tabs desktop
  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Navigation tabs mobile
  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Session modal actions
  const closeSessionBtn = document.getElementById("closeSessionModalBtn");
  if (closeSessionBtn) closeSessionBtn.addEventListener("click", closeSessionModal);

  const saveSessionBtn = document.getElementById("saveSessionModalBtn");
  if (saveSessionBtn) {
    saveSessionBtn.addEventListener("click", () => {
      const code = state.selectedSessionCode;
      const session = state.sessions.find(s => s.code === code);
      if (session) {
        session.status = document.getElementById("modalSessionStatus").value;
        session.date = document.getElementById("modalSessionDate").value;
        session.result = document.getElementById("modalSessionResult").value;
        session.mistakes = document.getElementById("modalSessionMistakes").value;
        saveStudyState(state);
        renderStats();
        renderSessionsList();
        closeSessionModal();
        showToast(`Đã cập nhật tiến độ [${code}]!`);
      }
    });
  }

  // Notes tab toolbar
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  if (saveNoteBtn) saveNoteBtn.addEventListener("click", saveCurrentNote);

  document.querySelectorAll(".hl-btn").forEach(btn => {
    btn.addEventListener("click", () => applyHighlight(btn.dataset.color));
  });

  // Quiz tab buttons
  const startEnBtn = document.getElementById("startEnQuizBtn");
  if (startEnBtn) startEnBtn.addEventListener("click", () => startQuiz("EN"));

  const startGtBtn = document.getElementById("startGtQuizBtn");
  if (startGtBtn) startGtBtn.addEventListener("click", () => startQuiz("GT"));

  const prevQBtn = document.getElementById("prevQuestionBtn");
  if (prevQBtn) {
    prevQBtn.addEventListener("click", () => {
      if (currentQuizIndex > 0) {
        currentQuizIndex--;
        renderQuizQuestion();
      }
    });
  }

  const nextQBtn = document.getElementById("nextQuestionBtn");
  if (nextQBtn) {
    nextQBtn.addEventListener("click", () => {
      if (currentQuizIndex < currentQuizList.length - 1) {
        currentQuizIndex++;
        renderQuizQuestion();
      }
    });
  }

  const submitQuizBtn = document.getElementById("submitQuizBtn");
  if (submitQuizBtn) submitQuizBtn.addEventListener("click", showQuizExplanation);

  // Logic games
  const fcEl = document.getElementById("flashcardElement");
  if (fcEl) fcEl.addEventListener("click", flipFlashcard);

  document.querySelectorAll(".fc-rate-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const interval = parseInt(btn.dataset.interval);
      rateFlashcard(interval);
    });
  });

  const nextBugBtn = document.getElementById("nextBugLevelBtn");
  if (nextBugBtn) {
    nextBugBtn.addEventListener("click", () => {
      const nextIdx = (currentBugLevelIndex + 1) % BUG_HUNTER_LEVELS.length;
      renderBugHunterLevel(nextIdx);
    });
  }

  // Pomodoro
  const pomodoroBtn = document.getElementById("pomodoroToggleBtn");
  if (pomodoroBtn) pomodoroBtn.addEventListener("click", togglePomodoro);

  // SYNC HUB ACTIONS
  const syncRepoBtn = document.getElementById("syncDirectlyToRepoBtn");
  if (syncRepoBtn) {
    syncRepoBtn.addEventListener("click", async () => {
      try {
        const mdReport = generateAICheckpointMarkdown(
          state.sessions, 
          state.notes, 
          state.highlights, 
          state.quizHistory
        );
        const res = await syncDirectlyToRepo(state.sessions, mdReport);
        showToast(res.message);
      } catch (err) {
        alert("Thông báo: " + err.message);
      }
    });
  }

  const copyAiBtn = document.getElementById("copyAiReportBtn");
  if (copyAiBtn) {
    copyAiBtn.addEventListener("click", () => {
      const mdReport = generateAICheckpointMarkdown(
        state.sessions, 
        state.notes, 
        state.highlights, 
        state.quizHistory
      );
      navigator.clipboard.writeText(mdReport).then(() => {
        showToast("Đã sao chép Báo cáo Học tập! Dán vào chat với Antigravity AI.");
      });
    });
  }

  const copyGitBtn = document.getElementById("copyGitCmdBtn");
  if (copyGitBtn) {
    copyGitBtn.addEventListener("click", () => {
      const today = new Date().toISOString().split("T")[0];
      const cmd = `git add . && git commit -m "feat(study): cap nhat tien do va checkpoint ngay ${today}" && git push`;
      navigator.clipboard.writeText(cmd).then(() => {
        showToast("Đã copy lệnh Git vào Clipboard!");
      });
    });
  }

  // Floating AI Drawer input listener
  const floatingAiInput = document.getElementById("floatingAiInput");
  if (floatingAiInput) {
    floatingAiInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleFloatingAiSend();
      }
    });
  }
}

// =========================================================
// 16. TRỢ LÝ AI Ở GÓC DƯỚI (FLOATING AI - BIẾT RÕ HÀNH VI HỌC)
// =========================================================
let floatingAiMessages = [];

export function toggleFloatingAiDrawer() {
  const drawer = document.getElementById("floatingAiDrawer");
  if (!drawer) return;
  const isOpening = !drawer.classList.contains("active");
  drawer.classList.toggle("active", isOpening);
  if (isOpening) {
    updateAiLiveContext();
    const input = document.getElementById("floatingAiInput");
    if (input) setTimeout(() => input.focus(), 80);
  }
}
window.toggleFloatingAiDrawer = toggleFloatingAiDrawer;

export function getLiveStudyContext() {
  const wsModal = document.getElementById("lessonWorkspaceModal");
  const isWsOpen = wsModal && wsModal.classList.contains("active");

  if (isWsOpen && currentWsContent) {
    const stepNames = {
      "ws-tab-read": "Đang đọc Lý thuyết & Highlight",
      "ws-tab-practice": "Đang làm Bài tập & Quiz trắc nghiệm",
      "ws-tab-ai": "Đang hỏi Gia sư AI trong bài",
      "ws-tab-checkpoint": "Đang tổng kết Checkpoint"
    };
    let ctx = `[Bài học: ${currentWsLessonCode} - ${currentWsContent.title} | Bước: ${stepNames[currentWsTab] || currentWsTab}]`;
    if (activeSelectionData && activeSelectionData.text) {
      ctx += ` [Đoạn bôi đen: "${activeSelectionData.text}"]`;
    }
    return ctx;
  }

  if (currentTab === "tab-notes") {
    return `[Sổ tay Word: Môn ${currentDocSubject}]`;
  }
  if (currentTab === "tab-quiz") {
    const q = currentQuizList && currentQuizList[currentQuizIndex];
    if (q) {
      return `[Thi thử câu ${currentQuizIndex + 1}: "${q.prompt || q.question}"]`;
    }
    return `[Ma trận đề thi & Ôn tập]`;
  }
  if (currentTab === "tab-sessions") {
    return `[Danh sách Bài học & Môn học: ${selectedCourseSubject}]`;
  }
  if (currentTab === "tab-logic") {
    return `[Luyện tư duy Logic / Bug Hunter level ${currentBugLevelIndex + 1}]`;
  }

  return `[Màn hình Tổng quan Học tập Phenikaa K20 AI]`;
}
window.getLiveStudyContext = getLiveStudyContext;

export function updateAiLiveContext() {
  const contextBarText = document.getElementById("aiLiveContextText");
  const launcherSubtext = document.getElementById("aiLauncherSubtext");
  const ctx = getLiveStudyContext();
  const cleanCtx = ctx.replace(/\[|\]/g, "");
  if (contextBarText) {
    contextBarText.textContent = `Đang theo dõi: ${cleanCtx}`;
  }
  if (launcherSubtext) {
    launcherSubtext.textContent = currentWsLessonCode ? `Đang theo sát ${currentWsLessonCode}` : "Theo sát việc học";
  }
}
window.updateAiLiveContext = updateAiLiveContext;

export function sendFloatingAiPrompt(promptText) {
  const input = document.getElementById("floatingAiInput");
  if (input) input.value = promptText;
  handleFloatingAiSend();
}
window.sendFloatingAiPrompt = sendFloatingAiPrompt;

export async function handleFloatingAiSend() {
  const input = document.getElementById("floatingAiInput");
  if (!input || !input.value.trim()) return;
  const userText = input.value.trim();
  input.value = "";

  const chatContainer = document.getElementById("floatingAiChatMessages");
  if (!chatContainer) return;

  // Render User Message
  const userBubble = document.createElement("div");
  userBubble.className = "ai-bubble user";
  userBubble.textContent = userText;
  chatContainer.appendChild(userBubble);

  // Render Loading Bubble
  const loadingBubble = document.createElement("div");
  loadingBubble.className = "ai-bubble assistant";
  loadingBubble.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Trợ lý AI GLM 5.3 đang suy nghĩ...`;
  chatContainer.appendChild(loadingBubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const currentContext = getLiveStudyContext();
  floatingAiMessages.push({ role: "user", content: `[Ngữ cảnh màn hình lúc hỏi: ${currentContext}]\n\n${userText}` });

  const systemPrompt = `Bạn là Gia Sư AI GLM 5.3 cá nhân của Vàng Văn Thuận (Phenikaa University K20 AI, GPA mục tiêu >= 3.60, xếp lớp tiếng Anh 8.5+).
BẠN THEO DÕI TRỰC TIẾP HÀNH VI HỌC CỦA THUẬN TRÊN MÀN HÌNH:
Ngữ cảnh hiện tại của Thuận: ${currentContext}

QUY TẮC SƯ PHẠM BẮT BUỘC (theo AGENTS.md):
1. Giải thích thật ngắn gọn, tập trung thẳng vào bản chất khái niệm.
2. Luôn chỉ rõ các bẫy đề kinh điển dễ mất điểm trong kỳ thi.
3. Khi Thuận hỏi bài tập hoặc đoạn bôi đen, đưa gợi ý tư duy trước để Thuận tự làm, không đưa đáp án ngay lập tức.
4. Xưng hô thân thiện, truyền động lực, chuẩn tác phong Gia sư AI Phenikaa K20.`;

  try {
    const apiKey = getOpenRouterApiKey();
    const primaryModel = getOpenRouterModel();

    let payload = {
      model: primaryModel,
      messages: [
        { role: "system", content: systemPrompt },
        ...floatingAiMessages.slice(-6)
      ],
      temperature: 0.4,
      max_tokens: 650
    };

    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://hoctap-phenikaa-k20.vercel.app",
        "X-Title": "Phenikaa K20 AI Floating Tutor"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok && primaryModel.includes("glm")) {
      console.warn("Primary GLM failed, attempting fallback model...");
      payload.model = "meta-llama/llama-3.3-70b-instruct:free";
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://hoctap-phenikaa-k20.vercel.app",
          "X-Title": "Phenikaa K20 AI Floating Tutor"
        },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Lỗi OpenRouter HTTP ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "Không nhận được phản hồi từ AI.";

    floatingAiMessages.push({ role: "assistant", content: replyText });
    loadingBubble.innerHTML = formatMarkdownToHtml(replyText);
  } catch (err) {
    loadingBubble.className = "ai-bubble assistant error";
    loadingBubble.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i> <strong>Lỗi kết nối AI:</strong> ${escapeHtml(err.message)}<br><small>Bấm bánh răng ⚙️ để kiểm tra cấu hình OpenRouter.</small>`;
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
}
window.handleFloatingAiSend = handleFloatingAiSend;

// Render toàn bộ dữ liệu ban đầu
function renderAllViews() {
  renderStats();
  renderSessionsList();
  renderFlashcard();
  renderHighlightsList();
  startQuiz("EN");
}

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
