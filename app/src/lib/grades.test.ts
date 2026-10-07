import { expect, it } from "vitest";
import { toGradePoint, weightedGpa } from "./grades";
it("uses the verified Phenikaa grade scale at boundaries", () => {
  expect(toGradePoint(8.5)).toBe(3.7);
  expect(toGradePoint(8.9)).toBe(3.7);
  expect(toGradePoint(9)).toBe(4);
  expect(toGradePoint(8)).toBe(3.5);
  expect(toGradePoint(3.9)).toBe(0);
});
it("weights actual included credits and handles no course", () => {
  const grades = [
    { score: 8.5, credits: 3 },
    { score: 8, credits: 3 },
    { score: 9, credits: 2 },
    { score: 9, credits: 2 },
  ];
  expect(weightedGpa(grades)).toBe(3.76);
  expect(weightedGpa([...grades, { score: 8, credits: 2 }])).toBe(3.72);
  expect(weightedGpa([])).toBe(null);
});
it("rejects invalid scores and credits instead of inventing GPA", () => {
  expect(() => toGradePoint(11)).toThrow();
  expect(() => toGradePoint(NaN)).toThrow();
  expect(() => weightedGpa([{ score: 8, credits: 0 }])).toThrow();
});
