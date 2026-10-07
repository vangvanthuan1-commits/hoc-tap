export type SubjectId = "EN" | "GT" | "VL" | "IT" | "PL";
export type CourseId = SubjectId;
export type LessonStatus = "not_started" | "in_progress" | "completed";
export type HighlightColor = "pink" | "blue" | "yellow";

export interface Resource {
  title: string;
  url: string;
  note?: string;
}
export interface Subject {
  id: SubjectId;
  name: string;
  code: string;
  color?: string;
  description?: string;
  [key: string]: unknown;
}
export interface Lesson {
  id: string;
  subjectId: SubjectId;
  order: number;
  title: string;
  objective: string;
  exercises: string;
  criteria: string;
  durationMinutes: number;
  outlineOnly: boolean;
  sourcePath: string;
  resources?: Resource[];
}
export interface LessonSection {
  id: string;
  title: string;
  body: string;
}
export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}
export interface LessonContent {
  intro: string;
  sections: LessonSection[];
  questions: QuizQuestion[];
  challenge?: string;
  quizLabel?: string;
  quizScope?: string;
}
export interface ScheduleEvent {
  id: string;
  subjectId: SubjectId | null;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  teacher: string;
  className: string;
  kind: "class";
  source: string;
}
export interface LessonProgress {
  status: LessonStatus;
  studiedAt: string | null;
  result: string;
  errors: string[];
  updatedAt: string;
}
export type InitialLessonProgress = Omit<LessonProgress, "updatedAt">;
export interface LearningNote {
  id: string;
  lessonId: string;
  subjectId?: SubjectId;
  sectionId?: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
export interface Highlight {
  id: string;
  lessonId: string;
  sectionId: string;
  text: string;
  color: HighlightColor;
  startOffset?: number;
  endOffset?: number;
  createdAt: string;
  updatedAt: string;
}
export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number | null;
  correct: boolean;
}
export interface QuizAttempt {
  id: string;
  lessonId: string;
  subjectId: SubjectId;
  title?: string;
  answers: QuizAnswer[];
  correctCount: number;
  totalQuestions: number;
  durationSeconds: number;
  completedAt: string;
  updatedAt: string;
}
export interface ReviewCard {
  id: string;
  lessonId: string;
  subjectId?: SubjectId;
  front: string;
  back: string;
  dueAt: string;
  intervalDays: number;
  repetitions: number;
  lastReviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface StudySession {
  id: string;
  lessonId: string;
  subjectId: SubjectId;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  updatedAt: string;
}
export interface LearningState {
  schemaVersion: 1;
  ownerUid: string | null;
  createdAt: string;
  updatedAt: string;
  progress: Record<string, LessonProgress>;
  notes: LearningNote[];
  highlights: Highlight[];
  quizAttempts: QuizAttempt[];
  reviewCards: ReviewCard[];
  sessions: StudySession[];
  deleted: Record<string, string>;
}
export interface CloudUser {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
}
export interface CloudStatus {
  user: CloudUser | null;
  state: "local" | "connecting" | "syncing" | "synced" | "error";
  message: string;
  lastSyncedAt: string | null;
  githubConnected: boolean;
  githubBusy: boolean;
  lastGithubAt: string | null;
}
