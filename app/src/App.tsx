import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Cloud,
  CloudOff,
  Coffee,
  ExternalLink,
  FileText,
  Flame,
  Github,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Link2,
  ListChecks,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  Timer,
  Upload,
  X,
  Zap,
} from "lucide-react";
import studyData from "./data/study-data.json";
import contentData from "./data/content.json";
import { useLearningState, usePersistenceError } from "./lib/store";
import {
  useCloudStatus,
  signInGoogle,
  signInGithub,
  signOut,
  syncToGithub,
} from "./lib/cloud";
import { importLearningData, downloadLearningBackup } from "./lib/store";
import type {
  Lesson,
  LessonContent,
  Subject,
  SubjectId,
  ScheduleEvent,
} from "./types";
import { LessonWorkspace } from "./components/LessonWorkspace";
import { QuizPanel } from "./components/QuizPanel";
import { NotesPanel } from "./components/NotesPanel";
import { ReviewPanel } from "./components/ReviewPanel";
import { weightedGpa, toGradePoint } from "./lib/grades";
import "./styles.css";

const lessons = studyData.lessons as Lesson[];
const subjects = studyData.subjects as Subject[];
const content = contentData as Record<string, LessonContent>;
const schedule = studyData.schedule as ScheduleEvent[];
const SUBJECT_NAMES: Record<SubjectId, string> = {
  EN: "Tiếng Anh đầu vào",
  GT: "Giải tích 1",
  VL: "Vật lý 1",
  IT: "Nhập môn CNTT",
  PL: "Pháp luật đại cương",
};
const subjectIcons = {
  EN: Headphones,
  GT: GraduationCap,
  VL: Zap,
  IT: BookMarked,
  PL: BookOpen,
};
const REPO = "https://github.com/vangvanthuan1-commits/hoc-tap";
const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
function addDays(date: string, n: number) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function monday(date: string) {
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  return addDays(date, -(day === 0 ? 6 : day - 1));
}
function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(
    "vi-VN",
    options || { day: "2-digit", month: "2-digit" },
  );
}
function IconSubject({ id, size = 22 }: { id: SubjectId; size?: number }) {
  const Icon = subjectIcons[id];
  return (
    <span className={`subject-icon tone-${id}`}>
      <Icon size={size} />
    </span>
  );
}
const navigation = [
  { id: "today", label: "Hôm nay", icon: LayoutDashboard },
  { id: "courses", label: "Môn học", icon: BookOpen },
  { id: "calendar", label: "Lịch học", icon: CalendarDays },
  { id: "review", label: "Ôn tập", icon: ListChecks },
  { id: "notes", label: "Sổ tay", icon: BookMarked },
];
function getRoute() {
  const path = location.hash.replace(/^#\/?/, "") || "today";
  const [page, id] = path.split("/");
  return { page, id };
}
function OrbitArt() {
  return (
    <div className="orbit-art" aria-hidden="true">
      <div className="orbit-circle one" />
      <div className="orbit-circle two" />
      <div className="art-book">
        <div className="art-book-left">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="art-book-right">
          <div className="pink-star">✦</div>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="art-pill pill-a">
        <CheckCircle2 size={17} /> Từng bước tiến bộ
      </div>
      <div className="art-pill pill-b">
        <Sparkles size={16} /> Mục tiêu 8.5+
      </div>
      <span className="orbit-dot d1" />
      <span className="orbit-dot d2" />
      <span className="orbit-dot d3" />
      <span className="art-cross">+</span>
    </div>
  );
}

export default function App() {
  const state = useLearningState();
  const cloud = useCloudStatus();
  const persistenceError = usePersistenceError();
  const [route, setRoute] = useState(getRoute);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [githubResult, setGithubResult] = useState<string>("");
  const [actionBusy, setActionBusy] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const change = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    const capture = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 6000);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const go = (page: string, id?: string) => {
    location.hash = `/${page}${id ? "/" + id : ""}`;
    setSearch("");
  };
  const openLesson = (id: string) => go("lesson", id);
  const run = async (fn: () => Promise<unknown>, success?: string) => {
    setActionBusy(true);
    try {
      await fn();
      if (success) setToast(success);
    } catch (e) {
      setToast(
        e instanceof Error
          ? e.message
          : "Chưa hoàn thành thao tác. Dữ liệu trên máy vẫn được giữ.",
      );
    } finally {
      setActionBusy(false);
    }
  };
  const sendGithub = async () => {
    const result = await syncToGithub();
    setGithubResult(result.url);
    return result;
  };
  const currentSubject =
    route.page === "subject"
      ? subjects.find((s) => s.id === route.id)
      : undefined;
  const currentLesson =
    route.page === "lesson"
      ? lessons.find((l) => l.id === route.id)
      : undefined;
  const headings: Record<string, string> = {
    today: "Không gian của bạn",
    courses: "Môn học của tôi",
    calendar: "Lịch học",
    review: "Ôn tập & sổ lỗi",
    notes: "Sổ tay học tập",
    tests: "Phòng luyện tập",
    settings: "Kết nối & dữ liệu",
    gpa: "Kế hoạch GPA",
    subject: currentSubject ? SUBJECT_NAMES[currentSubject.id] : "Môn học",
    lesson: currentLesson?.title || "Bài học",
  };
  const searchResults = search.trim()
    ? lessons
        .filter((l) =>
          `${l.title} ${l.id} ${SUBJECT_NAMES[l.subjectId]}`
            .toLocaleLowerCase("vi")
            .includes(search.toLocaleLowerCase("vi")),
        )
        .slice(0, 7)
    : [];
  const beforePlacement = today() <= "2026-10-18";
  const completeCount = Object.values(state.progress).filter(
    (p) => p.status === "completed",
  ).length;
  const nextLesson =
    (!beforePlacement &&
      lessons.find(
        (l) => l.id === "GT10" && state.progress[l.id]?.status !== "completed",
      )) ||
    lessons.find(
      (l) => state.progress[l.id]?.status === "in_progress" && content[l.id],
    ) ||
    lessons.find(
      (l) =>
        l.subjectId === "EN" &&
        state.progress[l.id]?.status !== "completed" &&
        content[l.id],
    ) ||
    lessons[0];
  const upcoming = schedule
    .filter((e) => e.date >= today())
    .sort((a, b) =>
      `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`),
    )
    .slice(0, 3);
  const studyTodayMinutes = Math.round(
    state.sessions
      .filter(
        (s) =>
          new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Ho_Chi_Minh",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(s.endedAt)) === today(),
      )
      .reduce((a, s) => a + s.durationSeconds, 0) / 60,
  );

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <button
          className="brand"
          onClick={() => go("today")}
          aria-label="Về trang hôm nay"
        >
          <span className="brand-mark">
            t<span />
          </span>
          <span>
            Thuận<span className="brand-sub">STUDY SPACE</span>
          </span>
        </button>
        <div className="workspace-label">KHÔNG GIAN HỌC TẬP</div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${route.page === item.id || (item.id === "courses" && ["lesson", "subject"].includes(route.page)) ? "active" : ""}`}
              onClick={() => go(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.id === "review" && state.reviewCards.length > 0 && (
                <span className="nav-count">{state.reviewCards.length}</span>
              )}
            </button>
          ))}
          <button
            className={`nav-item ${route.page === "tests" ? "active" : ""}`}
            onClick={() => go("tests")}
          >
            <Target size={20} />
            <span>Bài kiểm tra</span>
            <span className="new-tag">Luyện</span>
          </button>
        </nav>
        <button
          className={`nav-item gpa-nav ${route.page === "gpa" ? "active" : ""}`}
          onClick={() => go("gpa")}
        >
          <GraduationCap size={20} />
          <span>Kế hoạch GPA</span>
        </button>
        <div className="sidebar-focus">
          <div className="small-eyebrow">
            <Sparkles size={15} /> MỤC TIÊU HIỆN TẠI
          </div>
          <strong>
            {beforePlacement ? "Tiếng Anh đầu vào" : "Giải tích & Vật lý"}
          </strong>
          <p>
            Một chút mỗi ngày.
            <br />
            {beforePlacement
              ? "Tiến gần hơn đến 8.5+"
              : "Giữ mục tiêu GPA ≥3.6"}
          </p>
          <div className="focus-dots">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <button onClick={() => openLesson(nextLesson.id)}>
            Tiếp tục học <ArrowRight size={16} />
          </button>
        </div>
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${route.page === "settings" ? "active" : ""}`}
            onClick={() => go("settings")}
          >
            <Settings2 size={19} />
            <span>Kết nối & dữ liệu</span>
          </button>
          <div className="sidebar-profile">
            <div className="avatar">T</div>
            <div>
              <strong>Vàng Văn Thuận</strong>
              <span>Phenikaa · AI K20</span>
            </div>
            <span className="profile-dot" />
          </div>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            Học tập <ChevronRight size={15} />
            <strong>{headings[route.page] || "Hôm nay"}</strong>
          </div>
          <div className="topbar-actions">
            <div className="search-wrap">
              <Search size={17} />
              <input
                aria-label="Tìm bài học"
                placeholder="Tìm bài học, chuyên đề…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>/</kbd>
              {search && (
                <div className="search-results">
                  {searchResults.length ? (
                    searchResults.map((l) => (
                      <button key={l.id} onClick={() => openLesson(l.id)}>
                        <IconSubject id={l.subjectId} size={15} />
                        <span>
                          {l.title}
                          <small>
                            {l.id} · {SUBJECT_NAMES[l.subjectId]}
                          </small>
                        </span>
                        <ArrowUpRight size={15} />
                      </button>
                    ))
                  ) : (
                    <p>Chưa tìm thấy bài học phù hợp.</p>
                  )}
                </div>
              )}
            </div>
            <button
              className={`cloud-button ${cloud.state === "error" ? "cloud-error" : ""}`}
              onClick={() => go("settings")}
              title={persistenceError || cloud.message}
              aria-label="Trạng thái lưu dữ liệu"
            >
              {cloud.state === "synced" ? (
                <Cloud size={19} />
              ) : (
                <CloudOff size={19} />
              )}
              <span>
                {persistenceError
                  ? "Chưa lưu được"
                  : cloud.state === "synced"
                    ? "Đã đồng bộ"
                    : "Đã lưu trên máy"}
              </span>
            </button>
            <div className="avatar avatar-small">T</div>
          </div>
        </header>
        <main
          className={`page-content ${route.page === "lesson" ? "lesson-page" : ""}`}
        >
          {persistenceError && (
            <div className="info-banner storage-error" role="alert">
              <CloudOff size={20} />
              <div>
                <strong>Chưa lưu được dữ liệu trên máy</strong>
                <span>{persistenceError}</span>
                <button className="text-button" onClick={() => go("settings")}>
                  Mở sao lưu và khôi phục <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
          {route.page === "today" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">HỌC THEO CÁCH CỦA BẠN</div>
                  <h1>
                    Chào Thuận, bắt đầu thôi<span className="pink-dot">.</span>
                  </h1>
                  <p>Mỗi bài học nhỏ là một bước gần hơn đến mục tiêu.</p>
                </div>
                <div className="date-pill">
                  <CalendarDays size={17} />
                  {formatDate(today(), {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                  })}
                </div>
              </div>
              <div className="dashboard-columns">
                <div className="dashboard-primary">
                  <section className="hero-card">
                    <div className="hero-copy">
                      <span className="hero-label">
                        <span />{" "}
                        {beforePlacement
                          ? "ƯU TIÊN TRƯỚC KỲ THI ĐẦU VÀO"
                          : "ƯU TIÊN NỀN GIẢI TÍCH & VẬT LÝ"}
                      </span>
                      <h2>
                        Học một chút.
                        <br />
                        Hiểu thêm nhiều.
                      </h2>
                      <p>
                        {beforePlacement
                          ? "Tiếng Anh trước, Giải tích song song."
                          : "Giải tích và Vật lý, học đều từng tuần."}
                        <br />
                        Hôm nay, tiếp tục đúng chỗ bạn đang học.
                      </p>
                      <button
                        className="button button-white"
                        onClick={() => openLesson(nextLesson.id)}
                      >
                        Tiếp tục {nextLesson.id} <ArrowRight size={18} />
                      </button>
                      <span className="hero-footnote">
                        <Clock3 size={14} /> Một phiên ngắn, một bước tiến thật.
                      </span>
                    </div>
                    <OrbitArt />
                  </section>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-icon blue">
                        <CheckCircle2 size={20} />
                      </span>
                      <div>
                        <span>Bài đã hoàn thành</span>
                        <strong>
                          {completeCount}
                          <small> / {lessons.length}</small>
                        </strong>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon pink">
                        <Timer size={20} />
                      </span>
                      <div>
                        <span>Tập trung hôm nay</span>
                        <strong>
                          {studyTodayMinutes}
                          <small> phút</small>
                        </strong>
                      </div>
                    </div>
                    <button
                      className="stat-card stat-gpa"
                      onClick={() => go("gpa")}
                    >
                      <span className="stat-icon purple">
                        <Target size={20} />
                      </span>
                      <div>
                        <span>Mục tiêu GPA</span>
                        <strong>
                          3.6<small> / 4.0</small>
                        </strong>
                      </div>
                    </button>
                  </div>
                  <section className="section">
                    <div className="section-heading">
                      <div>
                        <h2>Tiếp nối hành trình</h2>
                        <p>Không học lại từ đầu. Tiếp tục phần còn dang dở.</p>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => go("courses")}
                      >
                        Tất cả môn <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="continue-card">
                      <IconSubject id={nextLesson.subjectId} size={27} />
                      <div className="continue-info">
                        <span className="mini-label">
                          {SUBJECT_NAMES[nextLesson.subjectId]}{" "}
                          <span>· {nextLesson.id}</span>
                        </span>
                        <h3>{nextLesson.title}</h3>
                        <p>{nextLesson.objective}</p>
                        <div className="continue-meta">
                          <span>
                            <Clock3 size={14} />
                            {nextLesson.durationMinutes} phút tự học
                          </span>
                          <span>
                            <BookOpen size={14} />
                            {content[nextLesson.id]?.sections.length || 0} phần
                            nội dung
                          </span>
                          <span className="status-in-progress">Đang học</span>
                        </div>
                      </div>
                      <button
                        className="round-arrow"
                        onClick={() => openLesson(nextLesson.id)}
                        aria-label={`Tiếp tục ${nextLesson.id}`}
                      >
                        <ArrowRight size={21} />
                      </button>
                    </div>
                  </section>
                  <section className="section">
                    <div className="section-heading">
                      <div>
                        <h2>Môn học của bạn</h2>
                        <p>Nền chắc, học đều, giữ mục tiêu GPA.</p>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => go("courses")}
                      >
                        Xem lộ trình <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="subjects-grid">
                      {subjects.map((s) => (
                        <SubjectCard
                          key={s.id}
                          subject={s}
                          progress={state.progress}
                          onClick={() => go("subject", s.id)}
                        />
                      ))}
                    </div>
                  </section>
                </div>
                <aside className="dashboard-secondary">
                  <section className="panel exam-panel">
                    <div className="panel-top">
                      <span className="pink-label">
                        <Target size={14} /> MỐC QUAN TRỌNG
                      </span>
                      <span className="mini-label">
                        {beforePlacement ? "Dự kiến" : "Mốc đã qua"}
                      </span>
                    </div>
                    <h3>Tiếng Anh đầu vào</h3>
                    <div className="exam-date">
                      17–18 <span>THÁNG 10 · 2026</span>
                    </div>
                    <p>50 câu · 60 phút · Tòa A6</p>
                    <div className="exam-parts">
                      <span>
                        Nghe <b>10</b>
                      </span>
                      <span>
                        Ngữ pháp <b>15</b>
                      </span>
                      <span>
                        Từ vựng <b>15</b>
                      </span>
                      <span>
                        Đọc <b>10</b>
                      </span>
                    </div>
                    <div className="exam-note">
                      8.5+ miễn Tiếng Anh 1 & 2.
                      <br />
                      <strong>Chỉ áp dụng lần thi đầu.</strong>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => go("subject", "EN")}
                    >
                      Mở lộ trình ôn thi <ArrowRight size={16} />
                    </button>
                  </section>
                  <section className="panel">
                    <div className="panel-heading">
                      <h3>Lịch học sắp tới</h3>
                      <button
                        className="icon-button"
                        onClick={() => go("calendar")}
                        aria-label="Xem lịch học"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                    {upcoming.map((e) => (
                      <div className="upcoming-item" key={e.id}>
                        <div
                          className={`schedule-date ${e.subjectId ? `tone-${e.subjectId}` : "tone-IT"}`}
                        >
                          <strong>
                            {new Date(`${e.date}T12:00:00Z`).getUTCDate()}
                          </strong>
                          <span>TH{e.date.slice(5, 7)}</span>
                        </div>
                        <div>
                          <strong>{e.title}</strong>
                          <span>
                            {e.startTime}–{e.endTime}
                          </span>
                          <small>{e.room || "Chưa có phòng trên cổng"}</small>
                        </div>
                      </div>
                    ))}
                    {!upcoming.length && (
                      <p className="muted">
                        Chưa có buổi học trong dữ liệu đã nhập.
                      </p>
                    )}
                    <div className="source-note">
                      Từ cổng sinh viên · cập nhật 07/10.
                      <br />
                      Lịch trống không có nghĩa được nghỉ.
                    </div>
                  </section>
                  <section className="panel study-insight">
                    <div className="panel-heading">
                      <h3>Hiểu mình để học tốt</h3>
                      <Sparkles size={18} />
                    </div>
                    <p>
                      EN01 cho thấy bạn nên ưu tiên{" "}
                      <strong>ngữ pháp nền</strong> và nghe chi tiết.
                    </p>
                    <div className="diagnostic-bars">
                      {[
                        ["Ngữ pháp", 3, 8],
                        ["Từ vựng", 3, 5],
                        ["Đọc hiểu", 4, 5],
                        ["Nghe", 2, 4],
                      ].map(([label, correct, total]) => (
                        <div key={label}>
                          <div>
                            <span>{label}</span>
                            <strong>
                              {correct}/{total}
                            </strong>
                          </div>
                          <span className="bar-track">
                            <span
                              style={{
                                width: `${(Number(correct) / Number(total)) * 100}%`,
                              }}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                    <small>
                      Chẩn đoán ngắn ngày 07/10, không quy đổi thành điểm thi.
                    </small>
                  </section>
                </aside>
              </div>
            </>
          )}
          {route.page === "courses" && (
            <>
              <PageHeading
                eyebrow="LỘ TRÌNH CÁ NHÂN"
                title="Học điều cần thiết, theo thứ tự."
                description="122 tiết tự học được nhập từ kế hoạch của bạn. Học song song giữa các môn, tuần tự trong mỗi môn."
              />
              <div className="info-banner">
                <Sparkles size={21} />
                <div>
                  <strong>Trước thi đầu vào: ưu tiên tiếng Anh.</strong>
                  <span>
                    Sau thi: Giải tích → Vật lý → CNTT → Pháp luật. Lộ trình tự
                    học, không phải đề cương chính thức.
                  </span>
                </div>
              </div>
              <div className="subjects-grid courses-full">
                {subjects.map((s) => (
                  <SubjectCard
                    key={s.id}
                    subject={s}
                    progress={state.progress}
                    onClick={() => go("subject", s.id)}
                  />
                ))}
              </div>
              <section className="panel resource-panel">
                <h3>Thư viện ôn tập có sẵn</h3>
                <p>
                  Các trang ôn C, kiến trúc máy tính và tài liệu cũ vẫn nằm
                  trong repo.
                </p>
                <div className="resource-links">
                  {[
                    ["Lập trình C", "c-programming.html"],
                    ["Tổng ôn C", "tong-on-c.html"],
                    ["Kiến trúc máy tính", "kien-truc-may-tinh.html"],
                    ["Giải tích", "giai-tich-1.html"],
                  ].map(([name, file]) => (
                    <a
                      key={file}
                      href={`./legacy/${file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name}
                      <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}
          {route.page === "subject" && currentSubject && (
            <SubjectView
              subject={currentSubject}
              onOpen={openLesson}
              onBack={() => go("courses")}
            />
          )}
          {route.page === "lesson" && currentLesson && (
            <LessonWorkspace
              key={currentLesson.id}
              lesson={currentLesson}
              content={content[currentLesson.id]}
              onBack={() => go("subject", currentLesson.subjectId)}
            />
          )}
          {route.page === "calendar" && <CalendarView />}
          {route.page === "notes" && (
            <>
              <div className="mobile-shortcuts">
                <button
                  className="button button-secondary"
                  onClick={() => go("settings")}
                >
                  <Settings2 size={17} /> Kết nối & dữ liệu
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => go("tests")}
                >
                  <Target size={17} /> Kiểm tra
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => go("gpa")}
                >
                  <GraduationCap size={17} /> GPA
                </button>
              </div>
              <PageHeading
                eyebrow="GHI LẠI ĐỂ HIỂU SÂU"
                title="Sổ tay của Thuận"
                description="Ghi chú, ý quan trọng và lỗi cần nhớ. Mọi thay đổi được giữ trên thiết bị này."
              />
              <NotesPanel />
              {state.highlights.length > 0 && (
                <section className="panel highlight-notebook">
                  <h3>Những dòng đã highlight</h3>
                  {state.highlights.map((h) => (
                    <button
                      key={h.id}
                      className={`highlight-entry highlight-${h.color}`}
                      onClick={() => openLesson(h.lessonId)}
                    >
                      <span>{h.text}</span>
                      <small>
                        {h.lessonId} <ArrowUpRight size={14} />
                      </small>
                    </button>
                  ))}
                </section>
              )}
            </>
          )}
          {route.page === "review" && (
            <>
              <PageHeading
                eyebrow="NHỚ LÂU HƠN MỖI NGÀY"
                title="Ôn tập & sổ lỗi"
                description="Những câu sai trở thành thẻ ôn. Nhắc lại sau 1, 3, 7 ngày và tiếp tục theo mức bạn nhớ."
              />
              <ReviewPanel onOpenLesson={openLesson} />
            </>
          )}
          {route.page === "tests" && <TestsView />}
          {route.page === "gpa" && <GpaView />}
          {route.page === "settings" && (
            <>
              <PageHeading
                eyebrow="DỮ LIỆU LÀ CỦA BẠN"
                title="Một hành trình, nhiều thiết bị."
                description="Lưu ngay trên máy, kết nối Firebase để học tiếp trên điện thoại và máy tính; đưa tiến độ về GitHub khi bạn muốn."
              />
              <div className="mobile-shortcuts">
                <button
                  className="button button-secondary"
                  onClick={() => go("tests")}
                >
                  <Target size={17} /> Bài kiểm tra
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => go("gpa")}
                >
                  <GraduationCap size={17} /> Kế hoạch GPA
                </button>
              </div>
              <div className="settings-grid">
                <section className="panel settings-panel">
                  <div className="settings-icon">
                    <Cloud size={25} />
                  </div>
                  <h2>Đồng bộ giữa các thiết bị</h2>
                  <p>{cloud.message}</p>
                  <div className={`connection-state ${cloud.state}`}>
                    <span />
                    {cloud.user
                      ? `${cloud.user.displayName || cloud.user.email || "Đã đăng nhập"}`
                      : "Đang dùng trên thiết bị này"}
                  </div>
                  {cloud.user ? (
                    <>
                      <p className="small-copy">
                        Ghi chú, kết quả và tiến độ sẽ được đồng bộ khi kết nối
                        thành công. Bản trên máy vẫn được giữ khi mất mạng.
                      </p>
                      <button
                        className="button button-secondary"
                        disabled={actionBusy}
                        onClick={() => run(signOut)}
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="button button-primary"
                        disabled={actionBusy}
                        onClick={() => run(signInGoogle)}
                      >
                        Đăng nhập Google <ArrowRight size={17} />
                      </button>
                      <button
                        className="button button-secondary"
                        disabled={actionBusy}
                        onClick={() => run(signInGithub)}
                      >
                        <Github size={17} /> Đăng nhập GitHub
                      </button>
                    </>
                  )}
                  <div className="source-note">
                    Nếu nhà cung cấp đăng nhập chưa được bật, app sẽ báo lỗi và
                    bạn vẫn học được trên máy.{" "}
                    <a
                      href="https://console.firebase.google.com/project/hoc-tap-8c6f7/authentication/providers"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Mở cài đặt Firebase
                    </a>
                  </div>
                </section>
                <section className="panel settings-panel">
                  <div className="settings-icon pink">
                    <Github size={25} />
                  </div>
                  <h2>Để tôi biết bạn đã học gì</h2>
                  <p>
                    Đưa bản tiến độ và ghi chú về repo <strong>hoc-tap</strong>.
                    Lần sau tôi đọc bản này để tiếp tục đúng chỗ.
                  </p>
                  <div className="repository-chip">
                    <Github size={17} /> vangvanthuan1-commits/hoc-tap
                  </div>
                  <ol className="sync-steps">
                    <li>Kết nối tài khoản GitHub có quyền ghi vào repo.</li>
                    <li>Bấm đồng bộ để tạo bản ghi JSON + Markdown.</li>
                    <li>
                      Tôi đọc các bản mới trong <code>ho-so/tu-app/</code>.
                    </li>
                  </ol>
                  <button
                    className="button button-primary"
                    disabled={actionBusy || cloud.githubBusy}
                    onClick={() =>
                      run(
                        cloud.githubConnected ? sendGithub : signInGithub,
                        cloud.githubConnected
                          ? "Đã đưa tiến độ lên GitHub."
                          : undefined,
                      )
                    }
                  >
                    <Github size={17} />
                    {cloud.githubBusy
                      ? "Đang đưa lên repo…"
                      : cloud.githubConnected
                        ? "Đồng bộ lên GitHub"
                        : "Kết nối GitHub"}
                  </button>
                  <div className="github-result">
                    {githubResult && (
                      <a href={githubResult} target="_blank" rel="noreferrer">
                        <CheckCircle2 size={16} /> Xem bản tiến độ vừa lưu{" "}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p className="small-copy">
                    Repo hiện công khai. Bản đồng bộ gồm ghi chú và kết quả học;
                    chỉ gửi những gì bạn muốn xuất bản.
                  </p>
                </section>
                <section className="panel settings-panel">
                  <div className="settings-icon">
                    <ArrowDownToLine size={25} />
                  </div>
                  <h2>Sao lưu & khôi phục</h2>
                  <p>
                    Tải bản JSON để chuyển dữ liệu hoặc giữ bản riêng. Khôi phục
                    sẽ hợp nhất theo thời điểm cập nhật.
                  </p>
                  <div className="backup-stats">
                    <span>{state.notes.length} ghi chú</span>
                    <span>{state.quizAttempts.length} bài luyện</span>
                    <span>{state.highlights.length} highlight</span>
                  </div>
                  <div className="button-row">
                    <button
                      className="button button-secondary"
                      onClick={() => {
                        downloadLearningBackup();
                        setToast("Đã tải bản sao lưu.");
                      }}
                    >
                      <ArrowDownToLine size={17} /> Tải bản sao lưu
                    </button>
                    <button
                      className="button button-secondary"
                      onClick={() => fileInput.current?.click()}
                    >
                      <Upload size={17} /> Nhập bản sao lưu
                    </button>
                  </div>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="application/json,.json"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        importLearningData(await file.text());
                        setToast("Đã khôi phục và hợp nhất dữ liệu.");
                      } catch (err) {
                        setToast(
                          err instanceof Error
                            ? err.message
                            : "Bản sao lưu không hợp lệ.",
                        );
                      }
                      e.target.value = "";
                    }}
                  />
                </section>
                <section className="panel settings-panel">
                  <div className="settings-icon pink">
                    <BookOpen size={25} />
                  </div>
                  <h2>Cài lên điện thoại</h2>
                  <p>
                    Giữ Study Space trên màn hình chính để vào học nhanh. Nội
                    dung đã mở có thể tiếp tục dùng khi mất mạng.
                  </p>
                  <button
                    className="button button-secondary"
                    onClick={() => {
                      if (installPrompt)
                        run(async () => {
                          await installPrompt.prompt();
                          await installPrompt.userChoice;
                          setInstallPrompt(null);
                        });
                      else
                        setToast(
                          "Trên Chrome: menu ⋮ → Cài đặt ứng dụng. Trên iPhone: Chia sẻ → Thêm vào Màn hình chính.",
                        );
                    }}
                  >
                    <Plus size={17} /> Thêm vào màn hình chính
                  </button>
                  <div className="source-note">
                    Dữ liệu trên máy có thể mất nếu xóa dữ liệu trình duyệt. Nên
                    sao lưu hoặc kết nối tài khoản.
                  </div>
                </section>
              </div>
              <section className="panel source-panel">
                <h3>Nguồn & phạm vi</h3>
                <p>
                  Lịch học lấy từ cổng ngày 07/10/2026, phạm vi
                  12/10/2026–31/01/2027. Cấu trúc đầu vào từ ảnh thông báo bạn
                  gửi. Bài học và câu luyện là nội dung tự học; không phải đề
                  thi chính thức. Mục tiêu GPA chưa phải điểm đã đạt.
                </p>
                <a
                  href={`${REPO}/tree/master/ke-hoach-hoc-tap/hk1-2026`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem tài liệu và nguồn trong repo <ExternalLink size={15} />
                </a>
              </section>
            </>
          )}
          {route.page === "lesson" && !currentLesson && (
            <Empty
              icon={BookOpen}
              title="Chưa tìm thấy bài học"
              description="Quay về môn học để chọn một bài trong lộ trình."
              action={() => go("courses")}
              actionLabel="Mở môn học"
            />
          )}
        </main>
        <footer className="page-footer">
          <span>
            Thuận Study Space <span className="footer-dot">·</span> Chậm mà
            chắc, mỗi ngày một chút.
          </span>
          <button onClick={() => go("settings")}>
            <Cloud size={14} /> Dữ liệu & kết nối
          </button>
        </footer>
      </div>
      <nav className="mobile-nav" aria-label="Điều hướng trên điện thoại">
        {navigation.slice(0, 4).map((item) => (
          <button
            key={item.id}
            className={
              route.page === item.id ||
              (item.id === "courses" &&
                ["lesson", "subject"].includes(route.page))
                ? "active"
                : ""
            }
            onClick={() => go(item.id)}
          >
            <item.icon size={21} />
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className={
            ["notes", "settings", "tests"].includes(route.page) ? "active" : ""
          }
          onClick={() => go("notes")}
        >
          <BookMarked size={21} />
          <span>Sổ tay</span>
        </button>
      </nav>
      {toast && (
        <div className="toast" role="status">
          <CircleHelp size={19} />
          <span>{toast}</span>
          <button onClick={() => setToast("")} aria-label="Đóng thông báo">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
function SubjectCard({
  subject,
  progress,
  onClick,
}: {
  subject: Subject;
  progress: ReturnType<typeof useLearningState>["progress"];
  onClick: () => void;
}) {
  const list = lessons.filter((l) => l.subjectId === subject.id);
  const done = list.filter(
    (l) => progress[l.id]?.status === "completed",
  ).length;
  const available = list.filter((l) => content[l.id]).length;
  return (
    <button className={`subject-card subject-${subject.id}`} onClick={onClick}>
      <div className="subject-card-top">
        <IconSubject id={subject.id} />
        <ArrowUpRight size={19} />
      </div>
      <span className="mini-label">
        {subject.id === "EN" ? "ƯU TIÊN ĐẦU VÀO" : subject.code}
      </span>
      <h3>{SUBJECT_NAMES[subject.id]}</h3>
      <p>
        {list.length} tiết tự học <span>·</span> {available} bài có nội dung
      </p>
      <div className="subject-progress">
        <span>
          <span style={{ width: `${(done / list.length) * 100}%` }} />
        </span>
        <small>
          {done}/{list.length}
        </small>
      </div>
    </button>
  );
}
function SubjectView({
  subject,
  onOpen,
  onBack,
}: {
  subject: Subject;
  onOpen: (id: string) => void;
  onBack: () => void;
}) {
  const state = useLearningState();
  const [filter, setFilter] = useState("all");
  const list = lessons.filter((l) => l.subjectId === subject.id);
  const shown = list.filter(
    (l) =>
      filter === "all" ||
      (filter === "ready" && content[l.id]) ||
      (filter === "progress" && state.progress[l.id]?.status === "in_progress"),
  );
  return (
    <>
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={17} /> Tất cả môn học
      </button>
      <div className={`subject-heading tone-${subject.id}`}>
        <IconSubject id={subject.id} size={32} />
        <div>
          <span className="eyebrow">
            {subject.id === "EN" ? "MỤC TIÊU 8.5+ · THI ĐẦU VÀO" : subject.code}
          </span>
          <h1>{SUBJECT_NAMES[subject.id]}</h1>
          <p>
            {String(
              subject.description ||
                "Học từng chuyên đề, tự làm trước, sửa lỗi sau.",
            )}
          </p>
        </div>
        <span className="lesson-count">
          {list.length}
          <small>tiết tự học</small>
        </span>
      </div>
      <div className="filter-row">
        <div className="segmented">
          {[
            ["all", "Toàn bộ lộ trình"],
            ["ready", "Bài có nội dung"],
            ["progress", "Đang học"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={filter === id ? "active" : ""}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="muted small-copy">Đề cương tự học đề xuất</span>
      </div>
      <div className="lesson-list">
        {shown.map((l) => {
          const status = state.progress[l.id]?.status || "not_started";
          return (
            <button
              className={`lesson-row ${status}`}
              key={l.id}
              onClick={() => onOpen(l.id)}
            >
              <div
                className={`lesson-number ${status === "completed" ? "done" : ""}`}
              >
                {status === "completed" ? (
                  <Check size={20} />
                ) : (
                  String(l.order).padStart(2, "0")
                )}
              </div>
              <div className="lesson-row-copy">
                <div className="lesson-row-tags">
                  <span>{l.id}</span>
                  <span
                    className={
                      content[l.id] ? "content-ready" : "outline-label"
                    }
                  >
                    {content[l.id] ? "Bài học + luyện tập" : "Đề cương"}
                  </span>
                  {status === "in_progress" && (
                    <span className="status-in-progress">Đang học</span>
                  )}
                </div>
                <h3>{l.title}</h3>
                <p>{l.objective}</p>
              </div>
              <span className="lesson-time">
                <Clock3 size={15} />
                {l.durationMinutes} phút
              </span>
              <ChevronRight size={19} />
            </button>
          );
        })}
        {!shown.length && (
          <Empty
            icon={BookOpen}
            title="Chưa có bài trong nhóm này"
            description="Chọn toàn bộ lộ trình để xem chuyên đề tiếp theo."
          />
        )}
      </div>
      <div className="source-note">
        Bài có nội dung được biên soạn để tự học. Các tiết đề cương có mục
        tiêu/bài luyện dự kiến và nguồn tham khảo, chưa có toàn bộ giáo trình
        hay bộ câu hỏi.
      </div>
    </>
  );
}
function CalendarView() {
  const [week, setWeek] = useState(monday(today()));
  const [view, setView] = useState<"week" | "agenda">("week");
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i));
  const weekEvents = schedule.filter((e) => days.includes(e.date));
  const next = schedule.find((e) => e.date >= today());
  return (
    <>
      <PageHeading
        eyebrow="GIỮ NHỊP HỌC TẬP"
        title="Biết lịch, chủ động hơn."
        description="Lịch lớp từ cổng sinh viên, cùng mốc tiếng Anh đầu vào. Hiển thị theo giờ Việt Nam."
      />
      <div className="calendar-toolbar">
        <div className="button-row">
          <button
            className="icon-button"
            aria-label="Tuần trước"
            onClick={() => setWeek(addDays(week, -7))}
          >
            <ChevronLeft size={20} />
          </button>
          <strong>
            {formatDate(week)} – {formatDate(addDays(week, 6))}/
            {addDays(week, 6).slice(0, 4)}
          </strong>
          <button
            className="icon-button"
            aria-label="Tuần sau"
            onClick={() => setWeek(addDays(week, 7))}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="button-row">
          <button
            className="button button-small button-secondary"
            onClick={() => setWeek(monday(today()))}
          >
            Hôm nay
          </button>
          {next && (
            <button
              className="button button-small button-secondary"
              onClick={() => setWeek(monday(next.date))}
            >
              Buổi lớp đầu
            </button>
          )}
          <div className="segmented">
            {[
              ["week", "Tuần"],
              ["agenda", "Danh sách"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={view === id ? "active" : ""}
                onClick={() => setView(id as "week" | "agenda")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="exam-calendar-notice">
        <Target size={19} />
        <span>
          <strong>17–18/10 · Tiếng Anh đầu vào</strong> — dự kiến tại A6, chưa
          có phân ca cá nhân. Miễn học chỉ áp dụng lần thi đầu.
        </span>
      </div>
      {view === "week" ? (
        <div className="calendar-grid">
          {days.map((day, i) => {
            const items = weekEvents.filter((e) => e.date === day);
            const exam = ["2026-10-17", "2026-10-18"].includes(day);
            return (
              <div
                className={`calendar-day ${day === today() ? "is-today" : ""}`}
                key={day}
              >
                <div className="calendar-day-head">
                  <span>
                    {
                      [
                        "THỨ HAI",
                        "THỨ BA",
                        "THỨ TƯ",
                        "THỨ NĂM",
                        "THỨ SÁU",
                        "THỨ BẢY",
                        "CHỦ NHẬT",
                      ][i]
                    }
                  </span>
                  <strong>{day.slice(8)}</strong>
                  <small>Tháng {Number(day.slice(5, 7))}</small>
                </div>
                <div className="calendar-events">
                  {exam && (
                    <div className="calendar-event tone-EN">
                      <small>Chưa phân ca</small>
                      <strong>Tiếng Anh đầu vào</strong>
                      <span>Tòa A6 · Dự kiến</span>
                    </div>
                  )}
                  {items.map((e) => (
                    <div
                      className={`calendar-event tone-${e.subjectId || "IT"}`}
                      key={e.id}
                    >
                      <small>
                        {e.startTime}–{e.endTime}
                      </small>
                      <strong>{e.title}</strong>
                      <span>{e.room || "Chưa có phòng"}</span>
                      <span>{e.teacher}</span>
                    </div>
                  ))}
                  {!items.length && !exam && (
                    <span className="calendar-free">Chưa có lịch lớp</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="agenda-list">
          {weekEvents.length ? (
            weekEvents.map((e) => (
              <div className="panel agenda-item" key={e.id}>
                <div className="agenda-date">
                  <strong>{formatDate(e.date)}</strong>
                  <span>{formatDate(e.date, { weekday: "long" })}</span>
                </div>
                <span className={`subject-icon tone-${e.subjectId || "IT"}`}>
                  <BookOpen size={20} />
                </span>
                <div>
                  <h3>{e.title}</h3>
                  <p>
                    {e.teacher} · {e.className}
                  </p>
                </div>
                <div>
                  <strong>
                    {e.startTime}–{e.endTime}
                  </strong>
                  <span>{e.room || "Chưa có phòng"}</span>
                </div>
              </div>
            ))
          ) : (
            <Empty
              icon={CalendarDays}
              title="Tuần này chưa có lịch lớp trong dữ liệu"
              description="Bạn vẫn có thể học trước theo lộ trình. Lịch thi đầu vào dự kiến hiển thị ở phía trên."
            />
          )}
        </div>
      )}
      <div className="source-note">
        Nguồn cổng sinh viên · cập nhật 07/10/2026 · 64 buổi · phạm vi
        12/10/2026–31/01/2027. Chưa có lịch lớp không đồng nghĩa nghỉ học; kiểm
        tra thông báo mới của trường.
      </div>
    </>
  );
}
function TestsView() {
  const state = useLearningState();
  const [selected, setSelected] = useState("EN02");
  const [mode, setMode] = useState("practice");
  const questionLessons = lessons.filter(
    (l) => content[l.id]?.questions.length,
  );
  const chosen =
    questionLessons.find((l) => l.id === selected) || questionLessons[0];
  return (
    <>
      <PageHeading
        eyebrow="THỬ SỨC, TÌM CHỖ CẦN SỬA"
        title="Luyện tập có mục đích."
        description="Tự làm trước khi xem đáp án. Câu sai được lưu vào sổ lỗi để ôn lại."
      />
      <div className="test-selector panel">
        <div>
          <label htmlFor="test-lesson">Chọn chuyên đề</label>
          <select
            id="test-lesson"
            value={chosen?.id}
            onChange={(e) => setSelected(e.target.value)}
          >
            {questionLessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id} · {l.title}
              </option>
            ))}
          </select>
        </div>
        <div className="segmented">
          <button
            className={mode === "practice" ? "active" : ""}
            onClick={() => setMode("practice")}
          >
            Luyện không giới hạn
          </button>
          <button
            className={mode === "timed" ? "active" : ""}
            onClick={() => setMode("timed")}
          >
            Kiểm tra 10 phút
          </button>
        </div>
      </div>
      {chosen && (
        <>
          {content[chosen.id].quizScope && (
            <div className="info-banner">
              <Headphones size={20} />
              <p>{content[chosen.id].quizScope}</p>
            </div>
          )}
          <QuizPanel
            key={`${chosen.id}-${mode}`}
            lessonId={chosen.id}
            subjectId={chosen.subjectId}
            questions={content[chosen.id].questions}
            title={content[chosen.id].quizLabel || chosen.title}
            timed={mode === "timed"}
            durationMinutes={10}
          />
        </>
      )}
      <section className="panel attempt-history">
        <h3>Lịch sử làm bài</h3>
        {state.quizAttempts.length ? (
          [...state.quizAttempts]
            .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt))
            .slice(0, 12)
            .map((a) => (
              <div className="attempt-row" key={a.id}>
                <span>
                  <strong>{a.lessonId}</strong> · {a.title || "Bài luyện"}
                  <small>
                    {new Date(a.completedAt).toLocaleString("vi-VN")}
                  </small>
                </span>
                <strong>
                  {a.correctCount}/{a.totalQuestions}
                </strong>
              </div>
            ))
        ) : (
          <p className="muted">
            Chưa có lượt làm trong app. Kết quả EN01 trong hội thoại được giữ
            riêng trong hồ sơ.
          </p>
        )}
      </section>
      <div className="source-note">
        Bộ câu hỏi tự luyện, không phải đề trường. Chế độ 10 phút là lượt luyện
        ngắn, không mô phỏng toàn bộ bài đầu vào 50 câu/60 phút.
      </div>
    </>
  );
}
function Empty({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
}: {
  icon: typeof BookOpen;
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="empty-state">
      <Icon size={34} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <button className="button button-primary" onClick={action}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function GpaView() {
  const [scores, setScores] = useState<Record<string, string>>({
    GT: "",
    VL: "",
    IT: "",
    PL: "",
    EN: "",
  });
  const [includeEnglish, setIncludeEnglish] = useState(false);
  const credits: Record<SubjectId, number> = {
    GT: 3,
    VL: 3,
    IT: 2,
    PL: 2,
    EN: 2,
  };
  const ids: SubjectId[] = includeEnglish
    ? ["GT", "VL", "IT", "PL", "EN"]
    : ["GT", "VL", "IT", "PL"];
  const complete = ids.every(
    (id) =>
      scores[id].trim() !== "" &&
      Number.isFinite(Number(scores[id])) &&
      Number(scores[id]) >= 0 &&
      Number(scores[id]) <= 10,
  );
  const gpa = complete
    ? weightedGpa(
        ids.map((id) => ({ score: Number(scores[id]), credits: credits[id] })),
      )
    : null;
  return (
    <>
      <PageHeading
        eyebrow="MỤC TIÊU GPA ≥3.6"
        title="Chủ động với từng môn."
        description="Thử một kịch bản điểm theo quy chế Phenikaa. Đây là bảng tính, không ghi thành điểm thật trong hồ sơ."
      />
      <div className="gpa-layout">
        <section className="panel gpa-form">
          <div className="section-heading">
            <h2>Điểm học phần dự kiến</h2>
            <button
              className="text-button"
              onClick={() =>
                setScores({ GT: "8.5", VL: "8", IT: "9", PL: "9", EN: "8" })
              }
            >
              Điền kịch bản mục tiêu <Sparkles size={16} />
            </button>
          </div>
          <label className="gpa-toggle">
            <input
              type="checkbox"
              checked={includeEnglish}
              onChange={(e) => setIncludeEnglish(e.target.checked)}
            />
            <span>Tính thêm Tiếng Anh cơ bản 1 (2 TC), nếu phải học</span>
          </label>
          {ids.map((id) => (
            <div className="gpa-course" key={id}>
              <IconSubject id={id} />
              <div>
                <strong>
                  {id === "EN" ? "Tiếng Anh cơ bản 1" : SUBJECT_NAMES[id]}
                </strong>
                <span>{credits[id]} tín chỉ</span>
              </div>
              <input
                aria-label={`Điểm ${SUBJECT_NAMES[id]}`}
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="0–10"
                value={scores[id]}
                onChange={(e) =>
                  setScores((prev) => ({ ...prev, [id]: e.target.value }))
                }
              />
              <span className="gpa-point">
                {scores[id] !== "" &&
                Number(scores[id]) >= 0 &&
                Number(scores[id]) <= 10
                  ? toGradePoint(Number(scores[id])).toFixed(1)
                  : "—"}
              </span>
            </div>
          ))}
          <p className="source-note">
            Chạy 1, GDQP-AN và tiếng Anh bổ trợ có cờ không tính GPA trên cổng.
            Điểm công nhận/miễn cần đối chiếu trước khi tính; không đưa điểm đầu
            vào thành điểm học phần.
          </p>
        </section>
        <aside className="panel gpa-result">
          <span className="eyebrow">KẾT QUẢ KỊCH BẢN</span>
          <strong className="gpa-total">
            {gpa === null ? "—" : gpa.toFixed(2)}
          </strong>
          <span>/{includeEnglish ? "12" : "10"} tín chỉ trong nhóm tính</span>
          <p>
            {gpa === null
              ? "Nhập đủ điểm từ 0–10 để tính."
              : gpa >= 3.6
                ? "Kịch bản này đạt mục tiêu GPA 3.6."
                : "Kịch bản này chưa đạt 3.6; thử nâng điểm môn có nhiều tín chỉ."}
          </p>
          <div className="grade-scale">
            <h3>Thang điểm đã đối chiếu</h3>
            {[
              ["9.0–10", "A+", "4.0"],
              ["8.5–8.9", "A", "3.7"],
              ["8.0–8.4", "B+", "3.5"],
              ["7.0–7.9", "B", "3.0"],
            ].map(([score, letter, point]) => (
              <div key={score}>
                <span>{score}</span>
                <b>{letter}</b>
                <strong>{point}</strong>
              </div>
            ))}
          </div>
          <a
            className="text-button"
            href={`${REPO}/blob/master/ke-hoach-hoc-tap/hk1-2026/README.md`}
            target="_blank"
            rel="noreferrer"
          >
            Quy chế & cách tính <ExternalLink size={15} />
          </a>
        </aside>
      </div>
    </>
  );
}
