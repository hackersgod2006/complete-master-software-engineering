import { useState, useEffect } from 'react';

interface QuizAttempt {
  questionId: string;
  correct: boolean;
  timestamp: number;
}

interface SectionQuizRecord {
  passed: boolean;
  score: number;
  total: number;
  completedAt: number;
}

interface ExamRecord {
  score: number;
  total: number;
  passed: boolean;
  completedAt: number;
  answers: Record<string, number>;
}

interface QuizData {
  attempts: QuizAttempt[];
  sectionQuizzes: Record<string, SectionQuizRecord>;
  exams: Record<string, ExamRecord>;
}

const KEY = 'book_quiz_data';
const DEFAULTS: QuizData = { attempts: [], sectionQuizzes: {}, exams: {} };

export function useQuiz() {
  const [data, setData] = useState<QuizData>(DEFAULTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setData({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {}
  }, []);

  const save = (next: QuizData) => {
    setData(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const recordSectionQuiz = (sectionId: string, score: number, total: number, attempts: QuizAttempt[]) => {
    const next: QuizData = {
      ...data,
      attempts: [...data.attempts, ...attempts],
      sectionQuizzes: {
        ...data.sectionQuizzes,
        [sectionId]: { passed: score >= Math.ceil(total * 0.6), score, total, completedAt: Date.now() },
      },
    };
    save(next);
  };

  const recordExam = (chapterId: string, score: number, total: number, answers: Record<string, number>) => {
    const next: QuizData = {
      ...data,
      exams: {
        ...data.exams,
        [chapterId]: { score, total, passed: score / total >= 0.7, completedAt: Date.now(), answers },
      },
    };
    save(next);
  };

  const getSectionQuiz = (sectionId: string) => data.sectionQuizzes[sectionId] ?? null;
  const getExam = (chapterId: string) => data.exams[chapterId] ?? null;
  const hasPassed = (sectionId: string) => !!data.sectionQuizzes[sectionId]?.passed;
  const totalCorrect = data.attempts.filter(a => a.correct).length;
  const totalAttempts = data.attempts.length;
  const examsPassed = Object.values(data.exams).filter(e => e.passed).length;

  return { data, recordSectionQuiz, recordExam, getSectionQuiz, getExam, hasPassed, totalCorrect, totalAttempts, examsPassed };
}
