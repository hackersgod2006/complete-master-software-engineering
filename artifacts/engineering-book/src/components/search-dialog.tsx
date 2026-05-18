import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { CHAPTERS } from '@/data/bookContent';
import { Search, X, BookOpen } from 'lucide-react';

const VOLUME_ACCENT: Record<number, string> = {
  1: 'text-blue-400', 2: 'text-emerald-400', 3: 'text-violet-400',
  4: 'text-orange-400', 5: 'text-rose-400', 6: 'text-amber-400',
};

interface SearchResult {
  chapterId: string;
  sectionId: string;
  chapterTitle: string;
  sectionTitle: string;
  sectionNumber: string;
  volumeNumber: number;
  snippet: string;
}

function buildIndex() {
  const results: SearchResult[] = [];
  for (const ch of CHAPTERS) {
    for (const s of ch.sections) {
      results.push({
        chapterId: ch.id,
        sectionId: s.id,
        chapterTitle: ch.title,
        sectionTitle: s.title,
        sectionNumber: s.number,
        volumeNumber: ch.volumeNumber,
        snippet: s.content.slice(0, 300).replace(/[#*`|]/g, '').trim(),
      });
    }
  }
  return results;
}

const INDEX = buildIndex();

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const matched = INDEX.filter(r =>
      r.sectionTitle.toLowerCase().includes(q) ||
      r.chapterTitle.toLowerCase().includes(q) ||
      r.snippet.toLowerCase().includes(q)
    ).slice(0, 12);
    setResults(matched);
    setActiveIdx(0);
  }, [query]);

  const navigate = (r: SearchResult) => {
    setLocation(`/read/${r.chapterId}/${r.sectionId}`);
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[activeIdx]) navigate(results[activeIdx]);
    if (e.key === 'Escape') onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4" onClick={onClose}>
      <div className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search sections, chapters, topics..."
            className="flex-1 bg-transparent font-sans text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {results.map((r, i) => (
              <button
                key={`${r.chapterId}-${r.sectionId}`}
                onClick={() => navigate(r)}
                onMouseEnter={() => setActiveIdx(i)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors border-b border-border/50 last:border-0 ${i === activeIdx ? 'bg-muted/60' : 'hover:bg-muted/30'}`}
              >
                <BookOpen className={`w-4 h-4 mt-0.5 shrink-0 ${VOLUME_ACCENT[r.volumeNumber]}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] text-muted-foreground">{r.sectionNumber}</span>
                    <span className="font-sans text-sm font-semibold text-foreground line-clamp-1">{r.sectionTitle}</span>
                  </div>
                  <div className="font-sans text-xs text-muted-foreground line-clamp-1">{r.chapterTitle}</div>
                  {i === activeIdx && r.snippet && (
                    <div className="font-sans text-xs text-muted-foreground/70 mt-1 line-clamp-2 leading-relaxed">{r.snippet}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="py-10 text-center font-sans text-sm text-muted-foreground">No sections found for "{query}"</div>
        )}

        {!query && (
          <div className="py-6 text-center font-sans text-xs text-muted-foreground">
            Type to search across all 739 sections
            <div className="mt-2 flex justify-center gap-4">
              <span className="flex items-center gap-1"><kbd className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">↵</kbd> go</span>
            </div>
          </div>
        )}
      </div>
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm -z-10" />
    </div>
  );
}
