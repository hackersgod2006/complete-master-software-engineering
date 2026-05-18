import { useState, useEffect } from 'react';

export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

interface Settings {
  darkMode: boolean;
  fontSize: FontSize;
  showReadingTime: boolean;
  autoAdvanceAfterQuiz: boolean;
}

const DEFAULTS: Settings = {
  darkMode: false,
  fontSize: 'md',
  showReadingTime: true,
  autoAdvanceAfterQuiz: false,
};

const KEY = 'book_settings';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setSettings({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [settings.darkMode]);

  const update = (patch: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { settings, update };
}
