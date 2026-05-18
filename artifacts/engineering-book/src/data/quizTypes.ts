export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChapterQuizData {
  chapterId: string;
  sectionQuizzes: Record<string, QuizQuestion[]>;
  examQuestions: QuizQuestion[];
}
