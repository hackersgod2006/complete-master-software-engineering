import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { CHAPTERS } from '@/data/bookContent';
import { ALL_QUIZ_DATA } from '@/data/quizzes/index';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowLeft, Layers } from 'lucide-react';

const VOLUME_ACCENT: Record<number, string> = {
  1: 'text-blue-400', 2: 'text-emerald-400', 3: 'text-violet-400',
  4: 'text-orange-400', 5: 'text-rose-400', 6: 'text-amber-400',
};

export function FlashcardsPage() {
  const [, params] = useRoute('/flashcards/:chapterId');
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());

  if (!params) return null;
  const { chapterId } = params;
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  if (!chapter) return <div className="p-8 text-center">Chapter not found.</div>;

  const quizData = ALL_QUIZ_DATA[chapterId];
  const cards = quizData
    ? quizData.examQuestions.map(q => ({ front: q.question, back: `${q.options[q.correct]}\n\n${q.explanation}` }))
    : chapter.sections.slice(0, 20).map(s => ({ front: s.title, back: s.content.replace(/[#*`|]/g, '').slice(0, 300).trim() + '...' }));

  const card = cards[cardIndex];
  const accentClass = VOLUME_ACCENT[chapter.volumeNumber];

  const prev = () => { setFlipped(false); setCardIndex(i => Math.max(0, i - 1)); };
  const next = () => { setFlipped(false); setCardIndex(i => Math.min(cards.length - 1, i + 1)); };
  const markDone = () => { setDone(s => new Set([...s, cardIndex])); next(); };
  const reset = () => { setCardIndex(0); setFlipped(false); setDone(new Set()); };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/read/${chapterId}/${chapter.sections[0].id}`}>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="font-sans text-sm text-muted-foreground">Flashcards · Ch{chapter.number}</span>
          </div>
          <button onClick={reset} className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-sans text-xs transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className={`font-mono text-xs font-bold uppercase tracking-wider mb-6 ${accentClass}`}>
          {chapter.number}. {chapter.title}
        </div>

        <div className="font-sans text-xs text-muted-foreground mb-8">
          Card {cardIndex + 1} of {cards.length} · {done.size} mastered
        </div>

        <div
          className="w-full max-w-lg h-72 cursor-pointer perspective-1000"
          onClick={() => setFlipped(f => !f)}
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-card border-2 border-border rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-4">Question — tap to flip</div>
              <p className="font-serif text-xl font-semibold text-foreground leading-relaxed">{card.front}</p>
              {done.has(cardIndex) && <div className="mt-4 text-xs text-emerald-500 font-mono">✓ Mastered</div>}
            </div>
            {/* Back */}
            <div
              className="absolute inset-0 bg-primary text-primary-foreground rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="font-mono text-[10px] text-primary-foreground/60 uppercase tracking-wider mb-4">Answer</div>
              <p className="font-sans text-base leading-relaxed whitespace-pre-line">{card.back}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button onClick={prev} disabled={cardIndex === 0} className="p-3 rounded-xl border border-border bg-card hover:bg-muted/50 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={markDone} className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-sans text-sm font-semibold hover:bg-emerald-600 transition-colors">
            Got it ✓
          </button>
          <button onClick={next} disabled={cardIndex === cards.length - 1} className="p-3 rounded-xl border border-border bg-card hover:bg-muted/50 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {done.size === cards.length && (
          <div className="mt-8 text-center">
            <div className="font-serif text-2xl font-bold text-foreground mb-2">All cards mastered! 🎉</div>
            <button onClick={reset} className="font-sans text-sm text-muted-foreground hover:text-foreground underline">Study again</button>
          </div>
        )}
      </div>
    </div>
  );
}
