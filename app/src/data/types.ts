export type SubjectId = "EN" | "GT" | "VL" | "IT" | "PL";
export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface StudySource {
  id: string;
  title: string;
  url: string;
  kind: "repo" | "official" | "user" | "resource";
  scope: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
  shortName: string;
  code: string;
  credits: number;
  color: string;
  icon: string;
  priority: number;
  target: string;
  lessonCount: number;
  description: string;
  sourceFile: string;
  resourceIds: string[];
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
  resources: StudySource[];
  proposed: boolean;
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
  /** Zero-based index into options; disclose after submitting, not during practice. */
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
  provenance: string;
  completionHint: string;
}

export interface RecordedProgress {
  status: LessonStatus;
  studiedAt: string | null;
  result: string;
  errors: string[];
}

export interface ClassEvent {
  id: string;
  subjectId: SubjectId | "PE" | "OTHER";
  title: string;
  /** ISO calendar date in Asia/Ho_Chi_Minh. */
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  teacher: string;
  className: string;
  kind: "class";
  source: string;
  periods: string;
}

export interface CurriculumCourse {
  order: number;
  code: string;
  name: string;
  knowledgeBlock: string;
  credits: number;
  prerequisite: string;
  plannedSemester: string;
  actualSemester: string;
  lecturePeriods: number;
  practicePeriods: number;
  /** null means the GPA flag was not checked for this course. */
  countsForGpa: boolean | null;
}

export interface InitialReview {
  id: string;
  lessonId: string;
  subjectId: SubjectId;
  date: string;
  title: string;
  status: "planned";
  source: string;
}

export interface StudyData {
  meta: {
    version: number;
    checkedAt: string;
    timezone: string;
    lessonCount: number;
    scheduleCheckedAt: string;
    scheduleRangeStart: string;
    scheduleRangeEnd: string;
    contentNotice: string;
    outlineNotice: string;
    scheduleNotice: string;
  };
  profile: {
    name: string;
    nickname: string;
    university: string;
    cohort: string;
    major: string;
    className: string;
    gpaTarget: number;
    englishTarget: number;
    currentLesson: string;
    currentMathLesson: string;
    englishPlacement: {
      startDate: string;
      endDate: string;
      location: string;
      status: "tentative_group_window";
      personalSlotKnown: boolean;
      durationMinutes: number;
      totalQuestions: number;
      sections: { name: string; questions: number }[];
      exemptions: { minScore: number; maxScore: number; courses: string[] }[];
      exemptionFirstAttemptOnly: boolean;
      source: string;
    };
    checkpoints: { subjectId: SubjectId; text: string }[];
  };
  subjects: Subject[];
  lessons: Lesson[];
  schedule: ClassEvent[];
  curriculum: CurriculumCourse[];
  initialProgress: Record<string, RecordedProgress>;
  sources: StudySource[];
  initialReviews: InitialReview[];
}
