import { useBookProgress } from "@/hooks/use-book-progress";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements } from "@/hooks/use-achievements";
import { useSettings } from "@/hooks/use-settings";
import { CHAPTERS } from "@/data/bookContent";
import { Link } from "wouter";
import { Progress } from "@/components/ui/progress";
import { SearchDialog } from "@/components/search-dialog";
import { SettingsPanel } from "@/components/settings-panel";
import {
  BookOpen, CheckCircle, ChevronRight, Flame, Search,
  Settings, BarChart3, Trophy
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const VOLUME_COLORS: Record<number, string> = {
  1: "border-blue-500/40 bg-blue-500/5",
  2: "border-emerald-500/40 bg-emerald-500/5",
  3: "border-violet-500/40 bg-violet-500/5",
  4: "border-orange-500/40 bg-orange-500/5",
  5: "border-rose-500/40 bg-rose-500/5",
  6: "border-amber-500/40 bg-amber-500/5",
};

const VOLUME_ACCENT: Record<number, string> = {
  1: "text-blue-400", 2: "text-emerald-400", 3: "text-violet-400",
  4: "text-orange-400", 5: "text-rose-400", 6: "text-amber-400",
};

const VOLUME_BORDER: Record<number, string> = {
  1: "border-blue-500/30", 2: "border-emerald-500/30", 3: "border-violet-500/30",
  4: "border-orange-500/30", 5: "border-rose-500/30", 6: "border-amber-500/30",
};

export function Home() {
  const { isRead, readSections } = useBookProgress();
  const { streak } = useStreak();
  const { level, totalXp } = useAchievements();
  const { settings } = useSettings();
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setShowSearch(true); }
    if (e.key === 'Escape') { setShowSearch(false); setShowSettings(false); }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const totalSections = CHAPTERS.reduce((acc, ch) => acc + ch.sections.length, 0);
  const readCount = readSections.length;
  const progressPercent = Math.round((readCount / totalSections) * 100);

  const volumeGroups: { volumeNumber: number; volumeSubtitle: string; chapters: typeof CHAPTERS }[] = [];
  for (const ch of CHAPTERS) {
    const existing = volumeGroups.find(v => v.volumeNumber === ch.volumeNumber);
    if (existing) existing.chapters.push(ch);
    else volumeGroups.push({ volumeNumber: ch.volumeNumber, volumeSubtitle: ch.volumeSubtitle, chapters: [ch] });
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <SearchDialog open={showSearch} onClose={() => setShowSearch(false)} />
      <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col items-center text-center">
          {/* Top bar */}
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {streak.currentStreak > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="font-mono text-xs font-bold text-orange-400">{streak.currentStreak}d</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="font-mono text-xs font-bold text-amber-400">Lv.{level} · {totalXp}xp</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors font-sans text-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
              </button>
              <Link href="/dashboard">
                <button title="Dashboard" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </Link>
              <button onClick={() => setShowSettings(true)} title="Settings" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
            The Definitive Bible — All 6 Volumes · 37 Chapters · 700+ Sections
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-2 text-foreground">
            The Complete Master<br />of Software Engineering
          </h1>
          <p className="font-sans text-muted-foreground text-sm md:text-base mb-6 max-w-2xl">
            From transistors to distributed systems. From your first line of code to Principal Engineer.
            The most complete software engineering education ever assembled.
          </p>

          <div className="w-full max-w-md bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-sans font-semibold text-sm text-foreground">Your Progress</span>
              <span className="font-mono text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                {readCount} / {totalSections} sections
              </span>
            </div>
            <Progress value={progressPercent} className="h-2 mb-3" />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-sans">
                {progressPercent === 0 ? "Begin your journey. Chapter 1, Section 1."
                  : progressPercent < 25 ? `${progressPercent}% complete. Strong start.`
                  : progressPercent < 75 ? `${progressPercent}% complete. Keep going.`
                  : `${progressPercent}% complete. Near mastery.`}
              </p>
              {readCount === 0 && (
                <Link href={`/read/ch1/${CHAPTERS[0].sections[0].id}`}>
                  <span className="text-xs font-medium text-primary hover:underline font-sans">Start Reading →</span>
                </Link>
              )}
              {readCount > 0 && (
                <Link href="/dashboard">
                  <span className="text-xs font-medium text-primary hover:underline font-sans flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Dashboard
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Volume Groups */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {volumeGroups.map(({ volumeNumber, volumeSubtitle, chapters }) => {
          const volumeSections = chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
          const volumeRead = chapters.reduce((acc, ch) => acc + ch.sections.filter(s => isRead(s.id)).length, 0);
          const volumePercent = Math.round((volumeRead / volumeSections) * 100);
          const accentClass = VOLUME_ACCENT[volumeNumber] || "text-primary";
          const borderClass = VOLUME_BORDER[volumeNumber] || "border-primary/30";
          const cardClass = VOLUME_COLORS[volumeNumber] || "";
          const romanNums = ["I","II","III","IV","V","VI"];

          return (
            <section key={volumeNumber}>
              <div className={`rounded-xl border ${cardClass} p-6 mb-6`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className={`font-mono text-xs font-bold tracking-[0.2em] uppercase mb-1 ${accentClass}`}>
                      Volume {romanNums[volumeNumber-1]}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">{volumeSubtitle}</h2>
                    <p className="text-sm text-muted-foreground mt-1 font-sans">{chapters.length} chapters · {volumeSections} sections</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`font-mono text-2xl font-bold ${accentClass}`}>{volumePercent}%</div>
                    <div className="text-xs text-muted-foreground">{volumeRead}/{volumeSections} read</div>
                  </div>
                </div>
                <div className="mt-4"><Progress value={volumePercent} className="h-1.5" /></div>
              </div>

              <div className="space-y-6">
                {chapters.map((chapter) => {
                  let firstUnreadSectionId = chapter.sections[0]?.id;
                  for (const section of chapter.sections) {
                    if (!isRead(section.id)) { firstUnreadSectionId = section.id; break; }
                  }
                  const chapterProgress = chapter.sections.filter((s) => isRead(s.id)).length;
                  const isChapterComplete = chapterProgress === chapter.sections.length && chapter.sections.length > 0;
                  const chapterPercent = chapter.sections.length ? Math.round((chapterProgress / chapter.sections.length) * 100) : 0;

                  return (
                    <div key={chapter.id} className={`relative pl-6 border-l-2 ${borderClass} py-1`}>
                      <div className={`absolute -left-[9px] top-3 w-4 h-4 rounded-full border-2 border-background ${
                        isChapterComplete ? 'bg-primary' : chapterProgress > 0 ? 'bg-primary/40' : 'bg-muted'
                      }`} />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                              CH{String(chapter.number).padStart(2, '0')}
                            </span>
                            {isChapterComplete && (
                              <span className="flex items-center text-xs font-medium text-primary gap-1">
                                <CheckCircle className="w-3 h-3" /> Complete
                              </span>
                            )}
                            {chapterProgress > 0 && !isChapterComplete && (
                              <span className="text-xs text-muted-foreground">{chapterProgress}/{chapter.sections.length} sections</span>
                            )}
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-1.5">
                            {chapter.number}. {chapter.title}
                          </h3>
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl line-clamp-2">{chapter.intro}</p>
                          {chapter.surpassing && (
                            <p className="font-mono text-[10px] text-muted-foreground/40 mt-1.5">Surpassing: {chapter.surpassing}</p>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          {chapterProgress > 0 && (
                            <div className={`font-mono text-sm font-bold ${accentClass}`}>{chapterPercent}%</div>
                          )}
                          <div className="flex items-center gap-2">
                            {isChapterComplete && (
                              <Link href={`/exam/${chapter.id}`}>
                                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-500 font-sans text-xs font-semibold hover:bg-amber-500/20 transition-colors whitespace-nowrap">
                                  <Trophy className="w-3.5 h-3.5" /> Exam
                                </div>
                              </Link>
                            )}
                            <Link href={`/read/${chapter.id}/${firstUnreadSectionId}`} className="group">
                              <div className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-sans text-sm shadow-sm whitespace-nowrap">
                                {isChapterComplete ? 'Review' : chapterProgress > 0 ? 'Continue' : 'Start'}
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Section Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                        {chapter.sections.slice(0, 6).map((section) => {
                          const isSectionRead = isRead(section.id);
                          return (
                            <Link key={section.id} href={`/read/${chapter.id}/${section.id}`}
                              className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-all text-left ${
                                isSectionRead ? 'border-border/50 bg-muted/20 hover:bg-muted/40' : 'border-border bg-card hover:border-primary/30 shadow-sm hover:shadow'
                              }`}
                            >
                              {isSectionRead
                                ? <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                                : <BookOpen className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/50 shrink-0" />}
                              <div className="min-w-0">
                                <div className={`font-mono text-[9px] mb-0.5 ${isSectionRead ? 'text-muted-foreground/60' : 'text-primary/70 font-semibold'}`}>{section.number}</div>
                                <div className={`font-sans text-xs line-clamp-1 leading-snug ${isSectionRead ? 'text-muted-foreground' : 'text-foreground'}`}>{section.title}</div>
                              </div>
                            </Link>
                          );
                        })}
                        {chapter.sections.length > 6 && (
                          <Link href={`/read/${chapter.id}/${chapter.sections[6].id}`}
                            className="flex items-center justify-center p-2.5 rounded-lg border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                          >
                            <span className="font-sans text-xs">+{chapter.sections.length - 6} more</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
