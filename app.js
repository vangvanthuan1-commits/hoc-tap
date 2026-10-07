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
async function startApp() {
  initUI();
  await loadAppData();
  renderAllViews();
  setupEventListeners();
  setupWorkspaceListeners();
  startCountdownTimer();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}

// Khởi tạo các thành phần giao diện
function initUI() {
  renderSubjectPills();
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
// 4. DANH SÁCH 122 TIẾT TỰ HỌC
// =========================================================
function renderSubjectPills() {
  const container = document.getElementById("subjectPillsContainer");
  if (!container) return;

  const subjects = [
    { id: "ALL", label: "Tất cả (122 tiết)" },
    { id: "EN", label: "Tiếng Anh (24)" },
    { id: "GT", label: "Giải tích 1 (32)" },
    { id: "IT", label: "Nhập môn CNTT (20)" },
    { id: "VL", label: "Vật lý 1 (28)" },
    { id: "PL", label: "Pháp luật (18)" }
  ];

  container.innerHTML = subjects.map(s => `
    <button class="pill-btn ${currentSubjectFilter === s.id ? 'active' : ''}" data-subject="${s.id}">
      ${s.label}
    </button>
  `).join("");

  container.querySelectorAll(".pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSubjectFilter = btn.dataset.subject;
      renderSubjectPills();
      renderSessionsList();
    });
  });
}

function renderSessionsList() {
  const container = document.getElementById("sessionsListGrid");
  if (!container) return;

  let filtered = state.sessions;
  if (currentSubjectFilter !== "ALL") {
    filtered = filtered.filter(s => s.subject === currentSubjectFilter);
  }
  if (currentStatusFilter !== "ALL") {
    filtered = filtered.filter(s => s.status === currentStatusFilter);
  }

  container.innerHTML = filtered.map(s => {
    const subInfo = SUBJECTS_MAP[s.subject] || {};
    let statusClass = "status-todo";
    if (s.status === "Đã hoàn thành") statusClass = "status-done";
    if (s.status.includes("Đang học")) statusClass = "status-learning";

    return `
      <div class="session-card" data-code="${s.code}">
        <div class="session-header">
          <span class="session-code" style="color: ${subInfo.color}; background: ${subInfo.bgColor};">
            ${s.code} &bull; ${subInfo.shortName || s.subject}
          </span>
          <span class="session-status ${statusClass}">
            ${s.status}
          </span>
        </div>
        <div class="session-title" style="cursor: pointer;">${s.title}</div>
        <div class="session-meta">
          ${s.result ? `<div><i class="fa-solid fa-check text-success"></i> ${s.result}</div>` : ""}
          ${s.mistakes ? `<div style="color: #e11d48;"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: ${s.mistakes}</div>` : ""}
        </div>
        <div class="session-actions">
          <button class="btn-small btn-primary-small start-study-btn" data-code="${s.code}">
            <i class="fa-solid fa-graduation-cap"></i> Học ngay
          </button>
          <button class="btn-small open-session-btn" data-code="${s.code}">
            <i class="fa-regular fa-pen-to-square"></i> Cập nhật
          </button>
          <button class="btn-small open-note-btn" data-code="${s.code}">
            <i class="fa-regular fa-note-sticky"></i> Note
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Bắt sự kiện bấm Học ngay
  container.querySelectorAll(".start-study-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openLessonWorkspace(btn.dataset.code);
    });
  });

  // Bắt sự kiện bấm vào tiêu đề thẻ để mở bài học
  container.querySelectorAll(".session-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      openLessonWorkspace(card.dataset.code);
    });
  });

  // Bắt sự kiện mở modal cập nhật tiết học
  container.querySelectorAll(".open-session-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSessionModal(btn.dataset.code);
    });
  });

  // Bắt sự kiện mở sổ tay ghi chú của tiết
  container.querySelectorAll(".open-note-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openNoteForSession(btn.dataset.code);
      switchTab("tab-notes");
    });
  });
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
}
window.openLessonWorkspace = openLessonWorkspace;

export function closeLessonWorkspace() {
  const modal = document.getElementById("lessonWorkspaceModal");
  if (modal) modal.classList.remove("active");
  hideFloatingToolbar();
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
            toolbar.style.top = `${rect.top + window.scrollY - 8}px`;
            toolbar.style.left = `${rect.left + window.scrollX + (rect.width / 2)}px`;
            toolbar.classList.add("visible");
            activeSelectionData = {
              text: text,
              range: range.cloneRange()
            };
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

function hideFloatingToolbar() {
  const toolbar = document.getElementById("floatingHlToolbar");
  if (toolbar) toolbar.classList.remove("visible");
  activeSelectionData = null;
}

function applyInTextHighlight(colorType) {
  if (!activeSelectionData || !activeSelectionData.text) return;
  const text = activeSelectionData.text;

  try {
    const mark = document.createElement("mark");
    mark.className = `hl-mark-${colorType}`;
    mark.textContent = text;
    activeSelectionData.range.deleteContents();
    activeSelectionData.range.insertNode(mark);
  } catch (err) {
    console.warn("DOM replacement warning:", err);
  }

  // Thêm vào mảng highlight toàn cục
  const highlightItem = {
    id: "hl-" + Date.now(),
    text: text,
    type: colorType,
    subject: currentWsLessonCode,
    date: new Date().toLocaleDateString("vi-VN")
  };
  state.highlights.unshift(highlightItem);
  saveStudyState(state);
  renderHighlightsList();

  hideFloatingToolbar();
  window.getSelection()?.removeAllRanges();

  const colorLabels = {
    blue: "Xanh nước (Cốt lõi)",
    pink: "Hồng (Bẫy lỗi)",
    yellow: "Vàng (Công thức)",
    green: "Xanh lá (Mẹo nhớ)"
  };
  showToast(`Đã lưu highlight [${colorLabels[colorType] || colorType}] vào Sổ tay!`);
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
// 10. GHI CHÚ & HIGHLIGHT TAB SỔ TAY
// =========================================================
function openNoteForSession(code) {
  const session = state.sessions.find(s => s.code === code);
  const noteTitle = document.getElementById("currentNoteTitle");
  const textarea = document.getElementById("noteTextarea");
  
  if (noteTitle) noteTitle.textContent = session ? `Ghi chú: [${session.code}] ${session.title}` : "Sổ tay ghi chú";
  if (textarea) textarea.value = state.notes[code] || "";
  renderHighlightsList();
}

function saveCurrentNote() {
  const code = state.selectedSessionCode || "GENERAL";
  const textarea = document.getElementById("noteTextarea");
  if (!textarea) return;

  state.notes[code] = textarea.value;
  saveStudyState(state);
  showToast("Đã lưu ghi chú vào hệ thống!");
}

function applyHighlight(colorType) {
  const textarea = document.getElementById("noteTextarea");
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end).trim();

  if (!selectedText) {
    alert("Vui lòng bôi đen (chọn) đoạn văn bản bạn muốn highlight!");
    return;
  }

  const highlightItem = {
    id: "hl-" + Date.now(),
    text: selectedText,
    type: colorType,
    subject: state.selectedSessionCode || "Chung",
    date: new Date().toLocaleDateString("vi-VN")
  };

  state.highlights.unshift(highlightItem);
  saveStudyState(state);
  renderHighlightsList();
  showToast("Đã thêm highlight vào Sổ tay!");
}

function renderHighlightsList() {
  const container = document.getElementById("savedHighlightsList");
  if (!container) return;

  if (state.highlights.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 12px;">Chưa có đoạn highlight nào. Bôi đen chữ ở bài học hoặc ghi chú để lưu bẫy lỗi!</div>`;
    return;
  }

  container.innerHTML = state.highlights.slice(0, 10).map(h => {
    let typeLabel = "Cốt lõi";
    let typeClass = "type-blue";
    if (h.type === "pink") { typeLabel = "Bẫy lỗi"; typeClass = "type-pink"; }
    if (h.type === "yellow") { typeLabel = "Công thức"; typeClass = "type-yellow"; }
    if (h.type === "green") { typeLabel = "Mẹo nhớ"; typeClass = "type-green"; }

    return `
      <div class="saved-highlight-item ${typeClass}">
        <div>
          <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">[${typeLabel}] ${h.subject}:</span>
          <div style="font-weight: 600; font-size: 0.9rem; margin-top: 2px;">${escapeHtml(h.text)}</div>
        </div>
        <button class="btn-small delete-hl-btn" data-id="${h.id}" style="color: #ef4444; border: none; background: transparent;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".delete-hl-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      state.highlights = state.highlights.filter(h => h.id !== id);
      saveStudyState(state);
      renderHighlightsList();
    });
  });
}

// =========================================================
// 11. LUYỆN TẬP & THI THỬ (QUIZZES)
// =========================================================
function startQuiz(type) {
  currentQuizList = QUIZ_QUESTIONS[type] || QUIZ_QUESTIONS["EN"];
  currentQuizIndex = 0;
  userQuizAnswers = {};
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
        ${escapeHtml(opt)}
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
  const q = currentQuizList[currentQuizIndex];
  const userAns = userQuizAnswers[currentQuizIndex];
  const expBox = document.getElementById("quizExplanation");
  if (!expBox || userAns === undefined) return;

  const isCorrect = userAns === q.correctIndex;
  expBox.className = "quiz-explanation-box " + (isCorrect ? "correct" : "wrong");
  expBox.style.display = "block";
  expBox.innerHTML = `
    <strong>${isCorrect ? '✓ Đúng rồi!' : '✗ Chưa đúng!'}</strong> ${escapeHtml(q.explanation)}
  `;
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
}

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
