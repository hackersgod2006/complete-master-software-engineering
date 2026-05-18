import { useState } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { CHAPTERS } from '@/data/bookContent';
import { useQuiz } from '@/hooks/use-quiz';
import { ALL_QUIZ_DATA } from '@/data/quizzes/index';
import { CheckCircle, XCircle, ArrowLeft, Trophy, RotateCcw, ChevronRight } from 'lucide-react';

const VOLUME_ACCENT: Record<number, string> = {
  1: 'text-blue-400', 2: 'text-emerald-400', 3: 'text-violet-400',
  4: 'text-orange-400', 5: 'text-rose-400', 6: 'text-amber-400',
};

type Phase = 'intro' | 'exam' | 'result';

export function ExamPage() {
  const [, params] = useRoute('/exam/:chapterId');
  const [, setLocation] = useLocation();
  const { recordExam, getExam } = useQuiz();
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!params) return null;
  const { chapterId } = params;
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  if (!chapter) return <div className="p-8 text-center">Chapter not found.</div>;

  const quizData = ALL_QUIZ_DATA[chapterId];
  if (!quizData || quizData.examQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-sans text-muted-foreground mb-4">No exam available for this chapter yet.</div>
          <Link href={`/read/${chapterId}/${chapter.sections[0].id}`}>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-sans text-sm">Back to Reading</button>
          </Link>
        </div>
      </div>
    );
  }

  const questions = quizData.examQuestions;
  const q = questions[current];
  const accentClass = VOLUME_ACCENT[chapter.volumeNumber];
  const pastExam = getExam(chapterId);
  const score = questions.filter(q => answers[q.id] === q.correct).length;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    setAnswers(prev => ({ ...prev, [q.id]: idx }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      const finalScore = questions.filter(q => answers[q.id] === q.correct).length;
      recordExam(chapterId, finalScore, questions.length, answers);
      setPhase('result');
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setShowExplanation(false);
    setPhase('exam');
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className={`font-mono text-xs tracking-widest font-bold mb-3 uppercase ${accentClass}`}>
            Chapter {chapter.number} — Final Exam
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">{chapter.title}</h1>
          <p className="font-sans text-muted-foreground mb-2">{questions.length} questions covering the entire chapter.</p>
          <p className="font-sans text-muted-foreground text-sm mb-8">You need <strong>70%</strong> ({Math.ceil(questions.length * 0.7)}+) to pass.</p>
          {pastExam && (
            <div className={`rounded-xl border p-4 mb-6 ${pastExam.passed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
              <div className="font-sans text-sm font-medium text-foreground">Previous attempt: {pastExam.score}/{pastExam.total} ({pastExam.passed ? 'PASSED' : 'FAILED'})</div>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <Link href={`/read/${chapterId}/${chapter.sections[0].id}`}>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg font-sans text-sm text-foreground hover:bg-muted/50 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </Link>
            <button onClick={() => setPhase('exam')} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-sans text-sm font-semibold hover:bg-primary/90 transition-colors">
              Start Exam <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const passed = score / questions.length >= 0.7;
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-xl w-full">
          <div className="text-center mb-8">
            {passed ? <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" /> : <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />}
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">{passed ? 'Exam Passed!' : 'Not quite yet'}</h1>
            <div className="font-mono text-4xl font-bold text-foreground mb-1">{score}/{questions.length}</div>
            <div className="font-sans text-muted-foreground">{Math.round((score/questions.length)*100)}% — {passed ? 'Chapter Mastered' : `Need ${Math.ceil(questions.length*0.7)} to pass`}</div>
          </div>
          <div className="space-y-3 mb-8 max-h-80 overflow-y-auto">
            {questions.map((question, i) => {
              const wasCorrect = answers[question.id] === question.correct;
              return (
                <div key={question.id} className={`flex items-start gap-3 p-3 rounded-lg border ${wasCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
                  {wasCorrect ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                  <div className="min-w-0">
                    <div className="font-sans text-xs text-foreground line-clamp-1">{i+1}. {question.question}</div>
                    {!wasCorrect && <div className="font-sans text-xs text-muted-foreground mt-0.5">✓ {optionLabels[question.correct]}. {question.options[question.correct]}</div>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button onClick={handleRetry} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg font-sans text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
            <Link href="/" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-sans text-sm font-semibold hover:bg-primary/90 transition-colors">
                Back to Library
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className={`font-mono text-xs font-bold uppercase tracking-wider ${accentClass}`}>Chapter {chapter.number} Exam</div>
          <div className="font-mono text-xs text-muted-foreground">Q{current + 1} / {questions.length}</div>
        </div>
        <div className="w-full bg-muted h-1">
          <div className="bg-primary h-1 transition-all" style={{ width: `${((current) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="font-sans text-lg font-medium text-foreground mb-6 leading-relaxed">{q.question}</p>
        <div className="space-y-3 mb-6">
          {q.options.map((option, idx) => {
            let cls = 'border-border bg-muted/30 hover:bg-muted/60 text-foreground cursor-pointer';
            if (selected !== null) {
              if (idx === q.correct) cls = 'border-emerald-500 bg-emerald-500/10 text-foreground cursor-default';
              else if (idx === selected && idx !== q.correct) cls = 'border-rose-500 bg-rose-500/10 text-muted-foreground cursor-default';
              else cls = 'border-border/50 bg-muted/10 text-muted-foreground/50 cursor-default';
            }
            return (
              <button key={idx} onClick={() => handleSelect(idx)} className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all font-sans ${cls}`}>
                <span className="font-mono text-sm font-bold shrink-0 mt-0.5 w-6">{optionLabels[idx]}.</span>
                <span className="leading-relaxed">{option}</span>
                {selected !== null && idx === q.correct && <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto shrink-0 mt-0.5" />}
                {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 text-rose-500 ml-auto shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
        {showExplanation && (
          <div className="bg-muted/40 border border-border rounded-xl p-5 mb-6">
            <div className="font-sans text-sm font-semibold text-foreground mb-2">Explanation</div>
            <div className="font-sans text-sm text-muted-foreground leading-relaxed">{q.explanation}</div>
          </div>
        )}
        {selected !== null && (
          <button onClick={handleNext} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-sans font-semibold hover:bg-primary/90 transition-colors">
            {current < questions.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
