export function toGradePoint(score: number): number {
  if (!Number.isFinite(score) || score < 0 || score > 10)
    throw new Error("Điểm phải nằm trong khoảng 0–10.");
  const thresholds = [
    [9, 4],
    [8.5, 3.7],
    [8, 3.5],
    [7, 3],
    [6.5, 2.5],
    [5.5, 2],
    [5, 1.5],
    [4, 1],
    [0, 0],
  ];
  return thresholds.find(([minimum]) => score >= minimum)![1];
}
export function weightedGpa(
  courses: { score: number; credits: number }[],
): number | null {
  if (!courses.length) return null;
  if (courses.some((c) => !Number.isFinite(c.credits) || c.credits <= 0))
    throw new Error("Tín chỉ phải lớn hơn 0.");
  return (
    Math.round(
      (courses.reduce(
        (total, c) => total + toGradePoint(c.score) * c.credits,
        0,
      ) /
        courses.reduce((total, c) => total + c.credits, 0)) *
        100,
    ) / 100
  );
}
