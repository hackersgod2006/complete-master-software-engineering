import { Link } from 'wouter';
import { CHAPTERS } from '@/data/bookContent';
import { useBookProgress } from '@/hooks/use-book-progress';
import { useStreak } from '@/hooks/use-streak';
import { useAchievements, ALL_ACHIEVEMENTS } from '@/hooks/use-achievements';
import { useQuiz } from '@/hooks/use-quiz';
import { useNotes } from '@/hooks/use-notes';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Flame, Trophy, BookOpen, Target, Star, StickyNote, Bookmark } from 'lucide-react';

const VOLUME_COLORS: Record<number, { bg: string; text: string; bar: string }> = {
  1: { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', bar: 'bg-blue-500' },
  2: { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  3: { bg: 'bg-violet-500/10 border-violet-500/30', text: 'text-violet-400', bar: 'bg-violet-500' },
  4: { bg: 'bg-orange-500/10 border-orange-500/30', text: 'text-orange-400', bar: 'bg-orange-500' },
  5: { bg: 'bg-rose-500/10 border-rose-500/30', text: 'text-rose-400', bar: 'bg-rose-500' },
  6: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', bar: 'bg-amber-500' },
};

export function Dashboard() {
  const { readSections, isRead } = useBookProgress();
  const { streak } = useStreak();
  const { data: achData, isUnlocked, level, xpToNext, totalXp } = useAchievements();
  const { totalCorrect, totalAttempts, examsPassed } = useQuiz();
  const { allNotes } = useNotes();
  const { bookmarks } = useBookmarks();

  const totalSections = CHAPTERS.reduce((s, c) => s + c.sections.length, 0);
  const readCount = readSections.length;
  const overallPercent = Math.round((readCount / totalSections) * 100);
  const quizAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const volumeGroups = CHAPTERS.reduce((acc, ch) => {
    const v = ch.volumeNumber;
    if (!acc[v]) acc[v] = { subtitle: ch.volumeSubtitle, chapters: [] };
    acc[v].chapters.push(ch);
    return acc;
  }, {} as Record<number, { subtitle: string; chapters: typeof CHAPTERS }>);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Library
            </button>
          </Link>
          <h1 className="font-serif text-xl font-semibold text-foreground">Your Dashboard</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Flame className="w-5 h-5 text-orange-400" />, label: 'Current Streak', value: `${streak.currentStreak}`, sub: `${streak.longestStreak} best` },
            { icon: <BookOpen className="w-5 h-5 text-blue-400" />, label: 'Sections Read', value: `${readCount}`, sub: `of ${totalSections}` },
            { icon: <Target className="w-5 h-5 text-emerald-400" />, label: 'Quiz Accuracy', value: `${quizAccuracy}%`, sub: `${totalAttempts} answered` },
            { icon: <Trophy className="w-5 h-5 text-amber-400" />, label: 'Achievements', value: `${achData.unlocked.length}`, sub: `of ${ALL_ACHIEVEMENTS.length}` },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="font-sans text-xs text-muted-foreground">{s.label}</span></div>
              <div className="font-serif text-3xl font-bold text-foreground">{s.value}</div>
              <div className="font-mono text-xs text-muted-foreground mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* XP / Level */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="font-sans font-semibold text-foreground">Level {level}</span>
            </div>
            <div className="font-mono text-sm text-muted-foreground">{totalXp} XP total</div>
          </div>
          <Progress value={100 - xpToNext} className="h-2.5 mb-2" />
          <div className="font-sans text-xs text-muted-foreground">{xpToNext} XP to Level {level + 1}</div>
        </div>

        {/* Volume Progress */}
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-5">Volume Progress</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(volumeGroups).map(([vNum, { subtitle, chapters }]) => {
              const vol = parseInt(vNum);
              const total = chapters.reduce((s, c) => s + c.sections.length, 0);
              const read = chapters.reduce((s, c) => s + c.sections.filter(sec => isRead(sec.id)).length, 0);
              const pct = Math.round((read / total) * 100);
              const colors = VOLUME_COLORS[vol];
              const romanNums = ['I','II','III','IV','V','VI'];
              return (
                <div key={vol} className={`rounded-xl border p-5 ${colors.bg}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className={`font-mono text-[10px] font-bold tracking-wider uppercase ${colors.text} mb-1`}>Volume {romanNums[vol-1]}</div>
                      <div className="font-sans font-semibold text-foreground">{subtitle}</div>
                      <div className="font-sans text-xs text-muted-foreground mt-0.5">{chapters.length} chapters · {total} sections</div>
                    </div>
                    <div className={`font-mono text-2xl font-bold ${colors.text}`}>{pct}%</div>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                  <div className="font-mono text-xs text-muted-foreground mt-2">{read} / {total} read</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-5">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ALL_ACHIEVEMENTS.map(a => {
              const unlocked = isUnlocked(a.id);
              return (
                <div key={a.id} className={`rounded-xl border p-4 text-center transition-all ${unlocked ? 'border-amber-500/40 bg-amber-500/5' : 'border-border bg-muted/20 opacity-50 grayscale'}`}>
                  <div className="text-3xl mb-2">{a.icon}</div>
                  <div className="font-sans text-xs font-semibold text-foreground mb-0.5">{a.title}</div>
                  <div className="font-sans text-[10px] text-muted-foreground leading-snug">{a.description}</div>
                  {unlocked && <div className="font-mono text-[10px] text-amber-500 mt-1">+{a.xp} XP</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes & Bookmarks */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <StickyNote className="w-4 h-4 text-amber-500" />
              <h2 className="font-serif text-xl font-semibold text-foreground">My Notes ({allNotes.length})</h2>
            </div>
            {allNotes.length === 0 ? (
              <div className="text-muted-foreground font-sans text-sm bg-muted/20 rounded-xl p-6 text-center">No notes yet. Add notes while reading.</div>
            ) : (
              <div className="space-y-3">
                {allNotes.slice(0, 5).map(note => (
                  <div key={note.sectionId} className="bg-card border border-border rounded-lg p-4">
                    <div className="font-mono text-[10px] text-muted-foreground mb-1">{note.sectionId}</div>
                    <div className="font-sans text-sm text-foreground line-clamp-3 leading-relaxed">{note.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-4 h-4 text-blue-400" />
              <h2 className="font-serif text-xl font-semibold text-foreground">Bookmarks ({bookmarks.length})</h2>
            </div>
            {bookmarks.length === 0 ? (
              <div className="text-muted-foreground font-sans text-sm bg-muted/20 rounded-xl p-6 text-center">No bookmarks yet. Bookmark sections while reading.</div>
            ) : (
              <div className="space-y-3">
                {bookmarks.slice(0, 5).map(b => (
                  <Link key={b.id} href={`/read/${b.chapterId}/${b.sectionId}`}>
                    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="font-mono text-[10px] text-muted-foreground mb-1">{b.sectionNumber}</div>
                      <div className="font-sans text-sm font-medium text-foreground">{b.sectionTitle}</div>
                      <div className="font-sans text-xs text-muted-foreground">{b.chapterTitle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
