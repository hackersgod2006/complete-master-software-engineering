import { useState, useEffect } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string | null;
  totalDaysRead: number;
}

const KEY = 'book_streak';
const DEFAULTS: StreakData = { currentStreak: 0, longestStreak: 0, lastReadDate: null, totalDaysRead: 0 };

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>(DEFAULTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setStreak(JSON.parse(stored));
    } catch {}
  }, []);

  const recordRead = () => {
    setStreak(prev => {
      const today = todayStr();
      if (prev.lastReadDate === today) return prev;

      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const continued = prev.lastReadDate === yesterday;
      const newStreak = continued ? prev.currentStreak + 1 : 1;
      const next: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastReadDate: today,
        totalDaysRead: prev.totalDaysRead + 1,
      };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { streak, recordRead };
}
