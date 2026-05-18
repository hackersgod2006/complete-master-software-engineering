import { useState, useEffect } from "react";

const PROGRESS_KEY = "book_progress";

export function useBookProgress() {
  const [readSections, setReadSections] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        setReadSections(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
  }, []);

  const markAsRead = (sectionId: string) => {
    setReadSections((prev) => {
      if (prev.includes(sectionId)) return prev;
      const next = [...prev, sectionId];
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const markAsUnread = (sectionId: string) => {
    setReadSections((prev) => {
      const next = prev.filter((id) => id !== sectionId);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  return {
    readSections,
    markAsRead,
    markAsUnread,
    isRead: (sectionId: string) => readSections.includes(sectionId)
  };
}
