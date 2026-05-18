import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_read', title: 'First Step', description: 'Read your first section', icon: '📖', xp: 10 },
  { id: 'first_quiz', title: 'Quiz Taker', description: 'Complete your first section quiz', icon: '✏️', xp: 15 },
  { id: 'first_exam', title: 'Exam Ready', description: 'Complete your first chapter exam', icon: '🎓', xp: 50 },
  { id: 'streak_3', title: 'Habit Forming', description: '3-day reading streak', icon: '🔥', xp: 30 },
  { id: 'streak_7', title: 'Week Warrior', description: '7-day reading streak', icon: '⚡', xp: 75 },
  { id: 'streak_30', title: 'Iron Will', description: '30-day reading streak', icon: '💎', xp: 300 },
  { id: 'streak_100', title: 'Legendary', description: '100-day reading streak', icon: '🏆', xp: 1000 },
  { id: 'vol1_complete', title: 'Foundations Master', description: 'Complete Volume I', icon: '🔵', xp: 200 },
  { id: 'vol2_complete', title: 'Craft Master', description: 'Complete Volume II', icon: '🟢', xp: 200 },
  { id: 'vol3_complete', title: 'Systems Master', description: 'Complete Volume III', icon: '🟣', xp: 200 },
  { id: 'vol4_complete', title: 'Engineer Master', description: 'Complete Volume IV', icon: '🟠', xp: 200 },
  { id: 'vol5_complete', title: 'Professional Master', description: 'Complete Volume V', icon: '🔴', xp: 200 },
  { id: 'vol6_complete', title: 'Principal Master', description: 'Complete Volume VI', icon: '🟡', xp: 200 },
  { id: 'all_complete', title: 'Complete Master', description: 'Finish all 6 volumes', icon: '🌟', xp: 2000 },
  { id: 'bookmarker', title: 'Bookmarker', description: 'Save 10 bookmarks', icon: '🔖', xp: 20 },
  { id: 'note_taker', title: 'Scholar', description: 'Write 10 notes', icon: '📝', xp: 30 },
  { id: 'quiz_ace', title: 'Quiz Ace', description: 'Score 100% on 5 section quizzes', icon: '💯', xp: 100 },
  { id: 'exam_ace', title: 'Exam Champion', description: 'Pass 10 chapter exams', icon: '🥇', xp: 250 },
  { id: 'half_way', title: 'Halfway There', description: 'Read 50% of all sections', icon: '🚀', xp: 400 },
  { id: 'speed_reader', title: 'Speed Reader', description: 'Read 5 sections in one day', icon: '💨', xp: 50 },
];

interface AchievementData {
  unlocked: string[];
  xp: number;
}

const KEY = 'book_achievements';
const DEFAULTS: AchievementData = { unlocked: [], xp: 0 };

export function useAchievements() {
  const [data, setData] = useState<AchievementData>(DEFAULTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setData({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {}
  }, []);

  const unlock = (ids: string[]): Achievement[] => {
    const newOnes = ids.filter(id => !data.unlocked.includes(id));
    if (newOnes.length === 0) return [];
    const earned = ALL_ACHIEVEMENTS.filter(a => newOnes.includes(a.id));
    const addedXp = earned.reduce((s, a) => s + a.xp, 0);
    const next = { unlocked: [...data.unlocked, ...newOnes], xp: data.xp + addedXp };
    setData(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    return earned;
  };

  const isUnlocked = (id: string) => data.unlocked.includes(id);
  const level = Math.floor(data.xp / 100) + 1;
  const xpToNext = 100 - (data.xp % 100);

  return { data, unlock, isUnlocked, level, xpToNext, totalXp: data.xp };
}
