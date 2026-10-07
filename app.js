// app.js - Xương sống logic cho Web Học Tập Phenikaa K20 AI
// Tích hợp Firebase, LocalStorage, File System Access API và Ngân hàng học tập

import { 
  APP_USER, 
  SUBJECTS_MAP, 
  DEFAULT_SESSIONS, 
  SCHEDULE_SAMPLE, 
  DEFAULT_FLASHCARDS, 
  BUG_HUNTER_LEVELS, 
  QUIZ_QUESTIONS 
} from "./data-store.js";

import { 
  saveStudyState, 
  loadStudyState, 
  selectRepoFolder, 
  syncDirectlyToRepo, 
  generateAICheckpointMarkdown 
} from "./firebase-sync.js";

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

let currentTab = "tab-hub";
let currentSubjectFilter = "ALL";
let currentStatusFilter = "ALL";
let pomodoroIntervalId = null;

// Khởi chạy khi tài liệu sẵn sàng
document.addEventListener("DOMContentLoaded", async () => {
  initUI();
  await loadAppData();
  renderAllViews();
  setupEventListeners();
  startCountdownTimer();
});

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

// 1. CHUYỂN ĐỔI TAB (Hỗ trợ cả Mobile và Desktop)
export function switchTab(tabId) {
  currentTab = tabId;

  // Cập nhật tab pane
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add("active");

  // Cập nhật Desktop Nav
  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  // Cập nhật Mobile Bottom Nav
  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (tabId === "tab-sync") {
    renderSyncReport();
  }
}
window.switchTab = switchTab;

// 2. ĐẾM NGƯỢC THỜI GIAN ĐẾN KỲ THI TIẾNG ANH & KỲ 1
function startCountdownTimer() {
  function update() {
    const examDate = new Date("2026-10-17T08:00:00+07:00").getTime();
    const now = new Date().getTime();
    const diff = examDate - now;

    const daysEl = document.getElementById("countdownDays");
    const hoursEl = document.getElementById("countdownHours");
    const minsEl = document.getElementById("countdownMins");

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minsEl) minsEl.textContent = mins;
    }
  }
  update();
  setInterval(update, 60000);
}

// 3. RENDER THỐNG KÊ DASHBOARD
function renderStats() {
  const total = state.sessions.length;
  const done = state.sessions.filter(s => s.status === "Đã hoàn thành").length;
  const learning = state.sessions.filter(s => s.status === "Đang học").length;
  const percent = Math.round((done / total) * 100);

  const doneEl = document.getElementById("statDoneCount");
  const learningEl = document.getElementById("statLearningCount");
  const percentEl = document.getElementById("statPercent");

  if (doneEl) doneEl.textContent = done;
  if (learningEl) learningEl.textContent = learning;
  if (percentEl) percentEl.textContent = `${percent}%`;
}

// 4. DANH SÁCH 122 TIẾT TỰ HỌC
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
        <div class="session-title">${s.title}</div>
        <div class="session-meta">
          ${s.result ? `<div><i class="fa-solid fa-check text-success"></i> ${s.result}</div>` : ""}
          ${s.mistakes ? `<div style="color: #e11d48;"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: ${s.mistakes}</div>` : ""}
        </div>
        <div class="session-actions">
          <button class="btn-small btn-primary-small open-session-btn" data-code="${s.code}">
            <i class="fa-regular fa-pen-to-square"></i> Cập nhật
          </button>
          <button class="btn-small open-note-btn" data-code="${s.code}">
            <i class="fa-regular fa-note-sticky"></i> Note
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Bắt sự kiện mở modal cập nhật tiết học
  container.querySelectorAll(".open-session-btn").forEach(btn => {
    btn.addEventListener("click", () => openSessionModal(btn.dataset.code));
  });

  // Bắt sự kiện mở sổ tay ghi chú của tiết
  container.querySelectorAll(".open-note-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openNoteForSession(btn.dataset.code);
      switchTab("tab-notes");
    });
  });
}

// Modal Cập nhật tiến độ tiết học
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

// 5. GHI CHÚ & HIGHLIGHT THÔNG MINH
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
  alert("Đã lưu ghi chú vào hệ thống!");
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
    type: colorType, // 'blue' (cốt lõi), 'pink' (bẫy lỗi), 'yellow' (công thức), 'green' (ví dụ)
    subject: state.selectedSessionCode || "Chung",
    date: new Date().toLocaleDateString("vi-VN")
  };

  state.highlights.unshift(highlightItem);
  saveStudyState(state);
  renderHighlightsList();
}

function renderHighlightsList() {
  const container = document.getElementById("savedHighlightsList");
  if (!container) return;

  if (state.highlights.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 12px;">Chưa có đoạn highlight nào. Bôi đen chữ ở khung ghi chú và bấm màu để lưu bẫy lỗi!</div>`;
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
          <div style="font-weight: 600; font-size: 0.9rem; margin-top: 2px;">${h.text}</div>
        </div>
        <button class="btn-small delete-hl-btn" data-id="${h.id}" style="color: #ef4444; border: none; background: transparent;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".delete-hl-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.highlights = state.highlights.filter(h => h.id !== btn.dataset.id);
      saveStudyState(state);
      renderHighlightsList();
    });
  });
}

// 6. THI THỬ & BÀI KIỂM TRA QUIZ
let currentQuizList = QUIZ_QUESTIONS.EN_ENTRANCE;
let currentQuestionIndex = 0;
let userAnswers = {};
let quizTimerSeconds = 60 * 60; // 60 phút
let quizInterval = null;

function startQuiz(type) {
  if (type === "EN") currentQuizList = QUIZ_QUESTIONS.EN_ENTRANCE;
  else if (type === "GT") currentQuizList = QUIZ_QUESTIONS.GT_LIMITS;
  else if (type === "IT") currentQuizList = QUIZ_QUESTIONS.IT_C;

  currentQuestionIndex = 0;
  userAnswers = {};
  renderQuizQuestion();

  // Bắt đầu đồng hồ đếm ngược 60 phút
  if (quizInterval) clearInterval(quizInterval);
  quizTimerSeconds = 60 * 60;
  quizInterval = setInterval(() => {
    quizTimerSeconds--;
    const mins = Math.floor(quizTimerSeconds / 60);
    const secs = quizTimerSeconds % 60;
    const timerEl = document.getElementById("quizTimerDisplay");
    if (timerEl) timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (quizTimerSeconds <= 0) {
      clearInterval(quizInterval);
      submitQuiz();
    }
  }, 1000);
}

function renderQuizQuestion() {
  const q = currentQuizList[currentQuestionIndex];
  if (!q) return;

  const titleEl = document.getElementById("quizQuestionTitle");
  const listEl = document.getElementById("quizOptionsList");
  const explanationEl = document.getElementById("quizExplanation");
  const progressEl = document.getElementById("quizProgressText");

  if (progressEl) progressEl.textContent = `Câu ${currentQuestionIndex + 1} / ${currentQuizList.length}`;
  if (titleEl) titleEl.textContent = q.question;
  if (explanationEl) explanationEl.style.display = "none";

  const selectedAnswer = userAnswers[q.id];

  if (listEl) {
    listEl.innerHTML = q.options.map((opt, idx) => {
      let optClass = "option-item";
      if (selectedAnswer !== undefined) {
        if (idx === q.correctIndex) optClass += " correct";
        else if (selectedAnswer === idx) optClass += " wrong";
      }

      return `
        <div class="${optClass}" data-idx="${idx}">
          ${opt}
        </div>
      `;
    }).join("");

    listEl.querySelectorAll(".option-item").forEach(item => {
      item.addEventListener("click", () => {
        if (userAnswers[q.id] !== undefined) return; // Đã trả lời rồi
        const chosenIdx = parseInt(item.dataset.idx, 10);
        userAnswers[q.id] = chosenIdx;

        // Hiển thị giải thích bản chất
        if (explanationEl) {
          explanationEl.innerHTML = `<strong>Giải thích bản chất:</strong> ${q.explanation}`;
          explanationEl.style.display = "block";
        }
        renderQuizQuestion();
      });
    });
  }

  // Nếu câu này đã trả lời, hiện lại giải thích
  if (selectedAnswer !== undefined && explanationEl) {
    explanationEl.innerHTML = `<strong>Giải thích bản chất:</strong> ${q.explanation}`;
    explanationEl.style.display = "block";
  }
}

function submitQuiz() {
  if (quizInterval) clearInterval(quizInterval);
  let correctCount = 0;
  currentQuizList.forEach(q => {
    if (userAnswers[q.id] === q.correctIndex) correctCount++;
  });

  const percentage = Math.round((correctCount / currentQuizList.length) * 100);
  const resultLog = {
    testName: "Đề thi Tiếng Anh 50 câu (mô phỏng A6)",
    score: correctCount,
    total: currentQuizList.length,
    percentage: percentage,
    time: new Date().toLocaleTimeString("vi-VN") + " - " + new Date().toLocaleDateString("vi-VN"),
    mistakeNotes: `Sai ${currentQuizList.length - correctCount} câu. Xem chi tiết trong ngân hàng đề.`
  };

  state.quizHistory.unshift(resultLog);
  saveStudyState(state);

  alert(`Hoàn thành bài kiểm tra!\nBạn đúng: ${correctCount}/${currentQuizList.length} câu (${percentage}%).\nKết quả đã được ghi vào hồ sơ ôn tập!`);
}

// 7. MINI-GAME: BẮT BỌ CODE C (C BUG HUNTER)
let currentBugLevelIndex = 0;

function renderBugHunterLevel(index) {
  currentBugLevelIndex = index;
  const level = BUG_HUNTER_LEVELS[index];
  if (!level) return;

  const titleEl = document.getElementById("bugHunterTitle");
  const instrEl = document.getElementById("bugHunterInstruction");
  const codeBox = document.getElementById("bugHunterCodeBox");
  const feedbackEl = document.getElementById("bugHunterFeedback");

  if (titleEl) titleEl.textContent = level.title;
  if (instrEl) instrEl.textContent = level.instruction;
  if (feedbackEl) feedbackEl.style.display = "none";

  if (codeBox) {
    codeBox.innerHTML = level.codeLines.map((line, idx) => `
      <div class="code-line-row" data-line="${idx}">
        <span class="code-line-num">${idx + 1}</span>
        <span class="code-line-text">${escapeHtml(line)}</span>
      </div>
    `).join("");

    codeBox.querySelectorAll(".code-line-row").forEach(row => {
      row.addEventListener("click", () => {
        const clickedLine = parseInt(row.dataset.line, 10);
        if (clickedLine === level.bugLineIndex) {
          row.classList.add("target-bug");
          feedbackEl.innerHTML = `<span style="color: #10b981; font-weight: 700;">CHÍNH XÁC!</span><br>${level.explanation}`;
          feedbackEl.style.display = "block";
        } else {
          feedbackEl.innerHTML = `<span style="color: #ef4444; font-weight: 700;">Chưa đúng!</span> Dòng này cú pháp hợp lệ. Hãy kiểm tra lại con trỏ, địa chỉ hoặc dấu phân cách!`;
          feedbackEl.style.display = "block";
        }
      });
    });
  }
}

// 8. SPACED REPETITION FLASHCARDS (LẶP LẠI NGẮT QUÃNG 1 / 3 / 7 NGÀY)
let currentCardIndex = 0;
let isFlipped = false;

function renderFlashcard() {
  const card = state.flashcards[currentCardIndex];
  if (!card) return;

  const textEl = document.getElementById("flashcardContent");
  const badgeEl = document.getElementById("flashcardSubjectBadge");
  const hintEl = document.getElementById("flashcardHint");

  if (badgeEl) badgeEl.textContent = `${card.subject} &bull; ${card.topic}`;
  if (hintEl) hintEl.textContent = isFlipped ? "Mặt sau (Bấm để lật lại)" : "Mặt trước (Bấm vào thẻ để xem đáp án)";
  if (textEl) textEl.textContent = isFlipped ? card.back : card.front;
}

function handleFlashcardAnswer(daysToAdd) {
  const card = state.flashcards[currentCardIndex];
  if (card) {
    card.interval = daysToAdd;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    card.nextReview = nextDate.toISOString().split("T")[0];
    saveStudyState(state);
  }

  currentCardIndex = (currentCardIndex + 1) % state.flashcards.length;
  isFlipped = false;
  renderFlashcard();
}

// 9. LỊCH HỌC TỪ CỔNG SINH VIÊN (64 BUỔI HỌC KỲ 1)
let allScheduleEvents = [...SCHEDULE_SAMPLE];

async function loadFullSchedule() {
  try {
    const res = await fetch("lich-hoc/2026-10-07-cac-tuan-sau.json");
    if (res.ok) {
      const data = await res.json();
      if (data && data.events && data.events.length > 0) {
        allScheduleEvents = data.events.map(ev => {
          const parts = ev.NGAYHOC.split("/");
          const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
          const startMin = ev.PHUTBATDAU.toString().padStart(2, "0");
          const endMin = ev.PHUTKETTHUC.toString().padStart(2, "0");
          return {
            date: isoDate,
            rawDate: ev.NGAYHOC,
            subject: ev.TENHOCPHAN,
            room: ev.TENPHONGHOC || "Sân thể thao / Trực tuyến",
            teacher: ev.GIANGVIEN || "Chưa phân công",
            start: `${ev.GIOBATDAU}:${startMin}`,
            end: `${ev.GIOKETTHUC}:${endMin}`,
            period: `Tiết ${ev.TIETBATDAU} - ${ev.TIETKETTHUC}`,
            classCode: ev.TENLOPHOCPHAN
          };
        });
        renderScheduleList();
      }
    }
  } catch (err) {
    console.log("Dùng dữ liệu lịch học mẫu:", err);
  }
}

function renderScheduleList() {
  const container = document.getElementById("scheduleListContainer");
  if (!container) return;

  container.innerHTML = allScheduleEvents.map(item => {
    const day = item.date ? item.date.split("-")[2] : item.rawDate.split("/")[0];
    const month = item.date ? item.date.split("-")[1] : item.rawDate.split("/")[1];

    return `
      <div class="schedule-item">
        <div class="schedule-date-box">
          <div class="schedule-day">${day}</div>
          <div class="schedule-month">Tháng ${month}</div>
        </div>
        <div class="schedule-details">
          <div class="schedule-title">${item.subject}</div>
          <div class="schedule-room">
            <span><i class="fa-solid fa-location-dot"></i> ${item.room}</span>
            <span><i class="fa-solid fa-clock"></i> ${item.start} - ${item.end} (${item.period})</span>
            <span><i class="fa-solid fa-chalkboard-user"></i> ${item.teacher}</span>
          </div>
        </div>
        <button class="btn-small btn-outline" title="Nhắc lịch"><i class="fa-regular fa-bell"></i></button>
      </div>
    `;
  }).join("");
}

// 10. POMODORO FOCUS TIMER (25 PHÚT)
function togglePomodoro() {
  const btn = document.getElementById("pomodoroToggleBtn");
  const bgmAudio = document.getElementById("lofiAudioPlayer");

  if (state.pomodoroRunning) {
    clearInterval(pomodoroIntervalId);
    state.pomodoroRunning = false;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i> Bắt đầu Pomodoro`;
    if (bgmAudio) bgmAudio.pause();
  } else {
    state.pomodoroRunning = true;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-pause"></i> Tạm dừng`;
    if (bgmAudio) bgmAudio.play().catch(e => console.log("Audio autoplay prevented"));

    pomodoroIntervalId = setInterval(() => {
      if (state.pomodoroSeconds === 0) {
        if (state.pomodoroMinutes === 0) {
          clearInterval(pomodoroIntervalId);
          state.pomodoroRunning = false;
          alert("Tuyệt vời! Hoàn thành chu kỳ tập trung 25 phút Pomodoro.");
          return;
        }
        state.pomodoroMinutes--;
        state.pomodoroSeconds = 59;
      } else {
        state.pomodoroSeconds--;
      }
      updatePomodoroDisplay();
    }, 1000);
  }
}

function updatePomodoroDisplay() {
  const display = document.getElementById("pomodoroDisplay");
  if (display) {
    const mins = state.pomodoroMinutes.toString().padStart(2, "0");
    const secs = state.pomodoroSeconds.toString().padStart(2, "0");
    display.textContent = `${mins}:${secs}`;
  }
}

// 11. ĐỒNG BỘ AI & GITHUB REPO (ANTIGRAVITY BRIDGE)
function renderSyncReport() {
  const preview = document.getElementById("markdownReportPreview");
  if (!preview) return;

  const markdown = generateAICheckpointMarkdown(
    state.sessions, 
    state.notes, 
    state.highlights, 
    state.quizHistory
  );
  preview.textContent = markdown;
}

// Cài đặt tất cả sự kiện lắng nghe
function setupEventListeners() {
  // Navigation tabs (desktop)
  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Navigation tabs (mobile)
  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Nút lưu trong modal tiết học
  const saveSessionBtn = document.getElementById("saveSessionModalBtn");
  if (saveSessionBtn) {
    saveSessionBtn.addEventListener("click", () => {
      const session = state.sessions.find(s => s.code === state.selectedSessionCode);
      if (session) {
        session.status = document.getElementById("modalSessionStatus").value;
        session.date = document.getElementById("modalSessionDate").value;
        session.result = document.getElementById("modalSessionResult").value;
        session.mistakes = document.getElementById("modalSessionMistakes").value;
        saveStudyState(state);
        renderSessionsList();
        renderStats();
        closeSessionModal();
      }
    });
  }

  // Đóng modal
  const closeModalBtn = document.getElementById("closeSessionModalBtn");
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeSessionModal);

  // Highlighter buttons
  document.querySelectorAll(".hl-btn").forEach(btn => {
    btn.addEventListener("click", () => applyHighlight(btn.dataset.color));
  });

  // Lưu note
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  if (saveNoteBtn) saveNoteBtn.addEventListener("click", saveCurrentNote);

  // Quiz buttons
  const startEnQuizBtn = document.getElementById("startEnQuizBtn");
  if (startEnQuizBtn) startEnQuizBtn.addEventListener("click", () => startQuiz("EN"));

  const startGtQuizBtn = document.getElementById("startGtQuizBtn");
  if (startGtQuizBtn) startGtQuizBtn.addEventListener("click", () => startQuiz("GT"));

  const prevQuestionBtn = document.getElementById("prevQuestionBtn");
  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuizQuestion();
      }
    });
  }

  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", () => {
      if (currentQuestionIndex < currentQuizList.length - 1) {
        currentQuestionIndex++;
        renderQuizQuestion();
      }
    });
  }

  const submitQuizBtn = document.getElementById("submitQuizBtn");
  if (submitQuizBtn) submitQuizBtn.addEventListener("click", submitQuiz);

  // Flashcards
  const flashcardEl = document.getElementById("flashcardElement");
  if (flashcardEl) {
    flashcardEl.addEventListener("click", () => {
      isFlipped = !isFlipped;
      renderFlashcard();
    });
  }

  document.querySelectorAll(".fc-rate-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      handleFlashcardAnswer(parseInt(btn.dataset.interval, 10));
    });
  });

  // Bug Hunter next level
  const nextBugLevelBtn = document.getElementById("nextBugLevelBtn");
  if (nextBugLevelBtn) {
    nextBugLevelBtn.addEventListener("click", () => {
      const nextIdx = (currentBugLevelIndex + 1) % BUG_HUNTER_LEVELS.length;
      renderBugHunterLevel(nextIdx);
    });
  }

  // Pomodoro
  const pomodoroBtn = document.getElementById("pomodoroToggleBtn");
  if (pomodoroBtn) pomodoroBtn.addEventListener("click", togglePomodoro);

  // SYNC HUB ACTIONS
  // 1. Đồng bộ trực tiếp vào Thư mục Repo (File System Access API)
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
        alert(res.message);
      } catch (err) {
        alert("Thông báo: " + err.message);
      }
    });
  }

  // 2. Copy báo cáo cho Antigravity AI
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
        alert("Đã sao chép Báo cáo Học tập vào bộ nhớ tạm! Bạn chỉ cần dán (Paste) vào khung chat với Antigravity.");
      });
    });
  }

  // 3. Copy Git Commit Command
  const copyGitBtn = document.getElementById("copyGitCmdBtn");
  if (copyGitBtn) {
    copyGitBtn.addEventListener("click", () => {
      const today = new Date().toISOString().split("T")[0];
      const cmd = `git add . && git commit -m "feat(study): cap nhat tien do va checkpoint ngay ${today}" && git push`;
      navigator.clipboard.writeText(cmd).then(() => {
        alert("Đã copy lệnh Git: " + cmd);
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
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
