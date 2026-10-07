import rawStudyData from "./study-data.json";
import rawContent from "./content.json";
import type { LessonContent, StudyData } from "./types";

export const studyData = rawStudyData as StudyData;
export const lessonContent = rawContent as Record<string, LessonContent>;
export const subjects = studyData.subjects;
export const lessons = studyData.lessons;
export const schedule = studyData.schedule;
export const curriculum = studyData.curriculum;
export const initialProgress = studyData.initialProgress;
export const sources = studyData.sources;
export * from "./types";
