/**
 * lib/calculators/educationUtils.js
 * Calculation utilities for GPA Calculator and Grade / Final Exam Calculator.
 */

export const GRADE_SCALE_4_0 = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0
};

import { GPA_SCALES } from './unitUtils.js';

// --- 1. GPA CALCULATOR ---

export function calculateGpa(courses = [], scale = '4.0') {
  if (!courses || courses.length === 0) return null;

  const currentScale = GPA_SCALES[scale] || GPA_SCALES['4.0'];
  const scaleMap = currentScale?.grades || GRADE_SCALE_4_0;

  let totalPoints = 0;
  let totalCredits = 0;
  let validCoursesCount = 0;

  for (const c of courses) {
    const cred = Number(c.credits);
    const gradeKey = (c.grade || '').trim().toUpperCase();
    const point = scaleMap[gradeKey] !== undefined ? scaleMap[gradeKey] : (GRADE_SCALE_4_0[gradeKey] !== undefined ? GRADE_SCALE_4_0[gradeKey] : Number(c.grade));

    if (!isNaN(cred) && cred > 0 && !isNaN(point) && point >= 0) {
      totalCredits += cred;
      totalPoints += point * cred;
      validCoursesCount++;
    }
  }

  if (totalCredits === 0 || validCoursesCount === 0) return null;

  const gpa = totalPoints / totalCredits;

  return {
    gpa: Number(gpa.toFixed(2)),
    gpaDetailed: Number(gpa.toFixed(3)),
    totalCredits,
    totalPoints: Number(totalPoints.toFixed(2)),
    coursesCount: validCoursesCount,
    scale,
    maxGpa: currentScale.maxGpa
  };
}


// --- 2. GRADE CALCULATOR ---

export function calculateWeightedGrade(assignments = []) {
  if (!assignments || assignments.length === 0) return null;

  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const a of assignments) {
    const score = Number(a.score);
    const weight = Number(a.weight);

    if (!isNaN(score) && !isNaN(weight) && weight > 0) {
      totalWeightedScore += (score * weight);
      totalWeight += weight;
    }
  }

  if (totalWeight === 0) return null;

  const currentGrade = totalWeightedScore / totalWeight;

  return {
    currentGrade: Number(currentGrade.toFixed(2)),
    totalWeight: Number(totalWeight.toFixed(2)),
    percentageScore: `${Number(currentGrade.toFixed(1))}%`
  };
}

export function calculateRequiredFinalGrade({ currentGrade, targetGrade, finalExamWeight }) {
  const current = Number(currentGrade);
  const target = Number(targetGrade);
  const finalWeight = Number(finalExamWeight);

  if (isNaN(current) || isNaN(target) || isNaN(finalWeight) || finalWeight <= 0 || finalWeight > 100) {
    return null;
  }

  const w = finalWeight / 100;
  const required = (target - (current * (1 - w))) / w;

  return {
    requiredGrade: Number(required.toFixed(2)),
    targetGrade: target,
    currentGrade: current,
    finalWeight,
    isAchievable: required <= 100,
    isOver100: required > 100
  };
}
