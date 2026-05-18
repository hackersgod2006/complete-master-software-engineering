import { useRoute, useLocation, Link } from "wouter";
import { CHAPTERS } from "@/data/bookContent";
import { useBookProgress } from "@/hooks/use-book-progress";
import { useSettings } from "@/hooks/use-settings";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements } from "@/hooks/use-achievements";
import { useQuiz } from "@/hooks/use-quiz";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useNotes } from "@/hooks/use-notes";
import { ContentRenderer } from "@/components/content-renderer";
import { QuizPanel } from "@/components/quiz-panel";
import { NotesPanel } from "@/components/notes-panel";
import { AchievementPopup } from "@/components/achievement-popup";
import { SettingsPanel } from "@/components/settings-panel";
import { SearchDialog } from "@/components/search-dialog";
import { CodePlayground } from "@/components/code-playground";
import { ALL_QUIZ_DATA } from "@/data/quizzes/index";
import { Achievement } from "@/hooks/use-achievements";
import {
  ChevronLeft, ChevronRight, CheckCircle, Circle, Library,
  Menu, X, Bookmark, BookmarkCheck, StickyNote, Settings,
  Search, Code2, Layers, Trophy, Flame, BarChart3, Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useCallback } from "react";

const VOLUME_ACCENT: Record<number, string> = {
  1: "text-blue-400", 2: "text-emerald-400", 3: "text-violet-400",
  4: "text-orange-400", 5: "text-rose-400", 6: "text-amber-400",
};

const FONT_SIZE_CLASS: Record<string, string> = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-lg leading-loose",
  xl: "text-xl leading-loose",
};

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function Reader() {
  const [, params] = useRoute("/read/:chapterId/:sectionId");
  const [, setLocation] = useLocation();
  const { readSections, markAsRead, isRead } = useBookProgress();
  const { settings } = useSettings();
  const { streak, recordRead } = useStreak();
  const { unlock, level, totalXp } = useAchievements();
  const { recordSectionQuiz, getSectionQuiz, hasPassed } = useQuiz();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { hasNote } = useNotes();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [pendingNav, setPendingNav] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
    setShowQuiz(false);
    setShowCode(false);
  }, [params?.sectionId]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setShowSearch(true); }
    if (e.key === 'Escape') { setShowSearch(false); setShowSettings(false); }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!params) return null;
  const { chapterId, sectionId } = params;
  const chapterIndex = CHAPTERS.findIndex((c) => c.id === chapterId);
  const chapter = CHAPTERS[chapterIndex];
  if (!chapter) return <div className="p-8 text-center font-sans text-muted-foreground">Chapter not found.</div>;

  const sectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
  const section = chapter.sections[sectionIndex];
  if (!section) return <div className="p-8 text-center font-sans text-muted-foreground">Section not found.</div>;

  const isFirstSection = sectionIndex === 0;
  const isLastSection = sectionIndex === chapter.sections.length - 1;
  const hasNextChapter = chapterIndex < CHAPTERS.length - 1;
  const hasPrevChapter = chapterIndex > 0;
  const allSectionsBefore = CHAPTERS.slice(0, chapterIndex).reduce((acc, c) => acc + c.sections.length, 0);
  const globalPosition = allSectionsBefore + sectionIndex + 1;
  const totalGlobal = CHAPTERS.reduce((acc, c) => acc + c.sections.length, 0);
  const chapterProgress = chapter.sections.filter((s) => isRead(s.id)).length;
  const progressPercent = Math.round((chapterProgress / chapter.sections.length) * 100);
  const accentClass = VOLUME_ACCENT[chapter.volumeNumber] || "text-primary";
  const readingTime = estimateReadingTime(section.content);
  const totalReadCount = readSections.length;

  let prevLink: string | null = null;
  if (!isFirstSection) prevLink = `/read/${chapterId}/${chapter.sections[sectionIndex - 1].id}`;
  else if (hasPrevChapter) { const pc = CHAPTERS[chapterIndex - 1]; prevLink = `/read/${pc.id}/${pc.sections[pc.sections.length - 1].id}`; }

  let nextLink: string | null = null;
  if (!isLastSection) nextLink = `/read/${chapterId}/${chapter.sections[sectionIndex + 1].id}`;
  else if (hasNextChapter) nextLink = `/read/${CHAPTERS[chapterIndex + 1].id}/${CHAPTERS[chapterIndex + 1].sections[0].id}`;

  const quizData = ALL_QUIZ_DATA[chapterId];
  const sectionQuestions = quizData?.sectionQuizzes?.[sectionId] ?? [];
  const alreadyPassedQuiz = hasPassed(sectionId);
  const isChapterAllRead = chapter.sections.every(s => isRead(s.id));

  const checkAndUnlockAchievements = (newReadCount: number, newStreak: number) => {
    const toUnlock: string[] = [];
    if (newReadCount === 1) toUnlock.push('first_read');
    if (newReadCount >= Math.floor(totalGlobal * 0.5)) toUnlock.push('half_way');
    if (newStreak >= 3) toUnlock.push('streak_3');
    if (newStreak >= 7) toUnlock.push('streak_7');
    if (newStreak >= 30) toUnlock.push('streak_30');
    if (newStreak >= 100) toUnlock.push('streak_100');
    // Volume completions
    let running = 0;
    for (const ch of CHAPTERS) {
      const allRead = ch.sections.every(s => s.id === sectionId || isRead(s.id));
      if (allRead) {
        const volKey = `vol${ch.volumeNumber}_complete`;
        toUnlock.push(volKey);
      }
      running += ch.sections.length;
    }
    if (newReadCount >= totalGlobal) toUnlock.push('all_complete');
    if (toUnlock.length > 0) {
      const earned = unlock(toUnlock);
      if (earned.length > 0) setNewAchievements(earned);
    }
  };

  const doNavigate = (link: string | null) => {
    if (link) setLocation(link);
    else setLocation("/");
  };

  const handleMarkAsRead = () => {
    markAsRead(section.id);
    recordRead();
    const newCount = totalReadCount + (isRead(section.id) ? 0 : 1);
    checkAndUnlockAchievements(newCount, streak.currentStreak + 1);

    if (sectionQuestions.length > 0 && !alreadyPassedQuiz) {
      setShowQuiz(true);
    } else {
      doNavigate(nextLink);
    }
  };

  const handleQuizComplete = (score: number, total: number, passed: boolean) => {
    recordSectionQuiz(sectionId, score, total, []);
    if (passed) {
      const earned = unlock(['first_quiz']);
      if (earned.length > 0) setNewAchievements(prev => [...prev, ...earned]);
    }
    setShowQuiz(false);
    doNavigate(nextLink);
  };

  const handleQuizSkip = () => {
    setShowQuiz(false);
    doNavigate(nextLink);
  };

  const toggleBookmark = () => {
    if (isBookmarked(sectionId)) {
      removeBookmark(sectionId);
    } else {
      addBookmark({ chapterId, sectionId, chapterTitle: chapter.title, sectionTitle: section.title, sectionNumber: section.number });
    }
  };

  const fontSizeClass = FONT_SIZE_CLASS[settings.fontSize] || FONT_SIZE_CLASS.md;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Achievement Popup */}
      <AchievementPopup achievements={newAchievements} onDismiss={() => setNewAchievements([])} />

      {/* Search Dialog */}
      <SearchDialog open={showSearch} onClose={() => setShowSearch(false)} />

      {/* Settings Panel */}
      <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border p-3 flex items-center justify-between gap-2">
        <Link href="/" className="text-muted-foreground hover:text-foreground p-1">
          <Library className="w-5 h-5" />
        </Link>
        <div className="font-mono text-xs font-medium text-foreground">{section.number}</div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowSearch(true)} className="p-1 text-muted-foreground hover:text-foreground"><Search className="w-4 h-4" /></button>
          <button onClick={() => setShowSettings(true)} className="p-1 text-muted-foreground hover:text-foreground"><Settings className="w-4 h-4" /></button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 text-foreground">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-[53px] md:top-0 h-[calc(100vh-53px)] md:h-screen w-72
        bg-card border-r border-border shrink-0 flex flex-col z-30 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar top: nav */}
        <div className="p-4 border-b border-border">
          <div className="hidden md:flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-sans text-sm font-medium">
              <Library className="w-4 h-4" /> Library
            </Link>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowSearch(true)} title="Search (⌘K)" className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <Link href="/dashboard">
                <button title="Dashboard" className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </Link>
              <button onClick={() => setShowSettings(true)} title="Settings" className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${accentClass}`}>
            Vol {["I","II","III","IV","V","VI"][chapter.volumeNumber - 1]} — {chapter.volumeSubtitle}
          </div>
          <h2 className="font-serif font-semibold text-sm leading-snug text-foreground">
            {chapter.number}. {chapter.title}
          </h2>

          <div className="mt-3">
            <div className="flex justify-between font-sans text-xs text-muted-foreground mb-1">
              <span>Chapter</span>
              <span className={`font-semibold ${accentClass}`}>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-1" />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
              <span>Global: {globalPosition}/{totalGlobal}</span>
              <span>Lv.{level} · {totalXp}xp</span>
            </div>
          </div>

          {/* Streak */}
          {streak.currentStreak > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-orange-400">
              <Flame className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] font-bold">{streak.currentStreak} day streak</span>
            </div>
          )}
        </div>

        {/* Chapter exam / flashcards links */}
        <div className="flex border-b border-border">
          <Link href={`/exam/${chapterId}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1.5 py-2 font-sans text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
              <Trophy className="w-3.5 h-3.5" /> Exam
            </button>
          </Link>
          <div className="w-px bg-border" />
          <Link href={`/flashcards/${chapterId}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1.5 py-2 font-sans text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
              <Layers className="w-3.5 h-3.5" /> Cards
            </button>
          </Link>
        </div>

        {/* Sections list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {chapter.sections.map((s) => {
            const isActive = s.id === sectionId;
            const read = isRead(s.id);
            const hasQ = !!(quizData?.sectionQuizzes?.[s.id]?.length);
            const qPassed = hasPassed(s.id);
            const noted = hasNote(s.id);
            return (
              <Link key={s.id} href={`/read/${chapter.id}/${s.id}`} className={`
                flex items-start gap-2 p-2 rounded-lg text-sm font-sans transition-colors
                ${isActive ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'}
              `}>
                <div className="mt-0.5 shrink-0">
                  {read ? <CheckCircle className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-primary/60'}`} />
                        : <Circle className={`w-3.5 h-3.5 ${isActive ? 'text-primary/50' : 'text-muted-foreground/30'}`} />}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`font-mono text-[9px] leading-tight mb-0.5 ${isActive ? `${accentClass} font-bold` : 'text-muted-foreground/50'}`}>{s.number}</span>
                  <span className={`line-clamp-2 leading-snug text-xs ${isActive ? 'font-semibold' : ''}`}>{s.title}</span>
                </div>
                <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
                  {noted && <StickyNote className="w-2.5 h-2.5 text-amber-400" />}
                  {hasQ && <span className={`w-2.5 h-2.5 rounded-full ${qPassed ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} title={qPassed ? 'Quiz passed' : 'Has quiz'} />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Next chapter preview */}
        {hasNextChapter && isLastSection && (
          <div className="p-3 border-t border-border bg-muted/20">
            <div className="text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-wider">Up Next</div>
            <Link href={`/read/${CHAPTERS[chapterIndex+1].id}/${CHAPTERS[chapterIndex+1].sections[0].id}`}>
              <div className="text-xs font-medium text-foreground hover:text-primary transition-colors font-sans line-clamp-2">
                Ch{CHAPTERS[chapterIndex+1].number}: {CHAPTERS[chapterIndex+1].title} →
              </div>
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className={`flex-1 max-w-3xl mx-auto w-full px-6 py-10 md:py-16 lg:px-12 ${fontSizeClass}`}>

          {/* Section Header */}
          <div className="mb-10 border-b border-border pb-8">
            <div className={`font-mono text-xs tracking-widest font-bold mb-3 uppercase ${accentClass}`}>
              {chapter.volume} · {chapter.volumeSubtitle} · Section {section.number}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4">
              {section.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {settings.showReadingTime && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-sans text-xs">{readingTime} min read</span>
                </div>
              )}
              {isRead(sectionId) && (
                <div className="flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-sans text-xs font-medium">Read{alreadyPassedQuiz ? ' · Quiz Passed' : ''}</span>
                </div>
              )}
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={toggleBookmark}
                  title={isBookmarked(sectionId) ? 'Remove bookmark' : 'Bookmark this section'}
                  className={`p-1.5 rounded-md transition-colors ${isBookmarked(sectionId) ? 'text-blue-400 hover:text-blue-300' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {isBookmarked(sectionId) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setShowCode(!showCode)}
                  title="Toggle code playground"
                  className={`p-1.5 rounded-md transition-colors ${showCode ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Code2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="pb-8">
            <ContentRenderer content={section.content} />
          </div>

          {/* Code Playground */}
          {showCode && <CodePlayground />}

          {/* Notes Panel */}
          <NotesPanel sectionId={sectionId} sectionTitle={section.title} />

          {/* Section Quiz (shown after clicking Mark as Read if not already passed) */}
          {showQuiz && sectionQuestions.length > 0 && (
            <QuizPanel
              sectionId={sectionId}
              sectionTitle={section.title}
              questions={sectionQuestions}
              onComplete={handleQuizComplete}
              onSkip={handleQuizSkip}
            />
          )}

          {/* Chapter complete CTA */}
          {isChapterAllRead && isLastSection && (
            <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 text-center">
              <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <div className="font-serif text-xl font-semibold text-foreground mb-1">Chapter Complete!</div>
              <p className="font-sans text-sm text-muted-foreground mb-4">
                You've read all sections. Ready to test your mastery?
              </p>
              <Link href={`/exam/${chapterId}`}>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-lg font-sans text-sm font-semibold hover:bg-amber-600 transition-colors">
                  <Trophy className="w-4 h-4" /> Take Chapter Exam
                </button>
              </Link>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {prevLink && (
                  <Link href={prevLink} className="flex-1 sm:flex-none">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors font-sans text-sm text-foreground">
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </div>
                  </Link>
                )}
              </div>

              {!showQuiz && (
                <button
                  onClick={handleMarkAsRead}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-sans font-semibold text-sm shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  {isRead(sectionId)
                    ? (nextLink ? 'Continue →' : 'Complete')
                    : (nextLink ? 'Mark as Read & Continue' : 'Complete Book')}
                </button>
              )}

              {nextLink && !showQuiz && (
                <Link href={nextLink} className="hidden sm:block">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors font-sans text-sm text-foreground">
                    Next <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              )}
            </div>

            <div className="mt-4 text-center font-mono text-xs text-muted-foreground/40">
              §{globalPosition} of {totalGlobal} · Chapter {chapter.number} of {CHAPTERS.length}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
