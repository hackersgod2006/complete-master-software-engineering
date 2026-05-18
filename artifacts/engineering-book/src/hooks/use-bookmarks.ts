import { useState, useEffect } from 'react';

export interface Bookmark {
  id: string;
  chapterId: string;
  sectionId: string;
  chapterTitle: string;
  sectionTitle: string;
  sectionNumber: string;
  createdAt: number;
}

const KEY = 'book_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (next: Bookmark[]) => {
    setBookmarks(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    setBookmarks(prev => {
      if (prev.some(b => b.sectionId === bookmark.sectionId)) return prev;
      const next = [...prev, { ...bookmark, id: `${Date.now()}`, createdAt: Date.now() }];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeBookmark = (sectionId: string) => {
    save(bookmarks.filter(b => b.sectionId !== sectionId));
  };

  const isBookmarked = (sectionId: string) => bookmarks.some(b => b.sectionId === sectionId);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
