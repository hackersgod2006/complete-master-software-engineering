import { useState, useEffect } from 'react';

export interface Note {
  sectionId: string;
  content: string;
  updatedAt: number;
}

const KEY = 'book_notes';

export function useNotes() {
  const [notes, setNotes] = useState<Record<string, Note>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
  }, []);

  const saveNote = (sectionId: string, content: string) => {
    setNotes(prev => {
      const next = { ...prev, [sectionId]: { sectionId, content, updatedAt: Date.now() } };
      if (!content.trim()) {
        delete next[sectionId];
      }
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const getNote = (sectionId: string): string => notes[sectionId]?.content ?? '';
  const hasNote = (sectionId: string) => !!notes[sectionId]?.content?.trim();
  const allNotes = Object.values(notes).sort((a, b) => b.updatedAt - a.updatedAt);

  return { notes, saveNote, getNote, hasNote, allNotes };
}
