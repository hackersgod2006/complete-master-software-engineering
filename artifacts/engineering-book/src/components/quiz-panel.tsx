import { useState } from 'react';
import { QuizQuestion } from '@/data/quizTypes';
import { CheckCircle, XCircle, RefreshCw, ChevronRight, Trophy } from 'lucide-react';

interface Props {
  sectionId: string;
  sectionTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number, total: number, passed: boolean) => void;
  onSkip: () => void;
}

type Phase = 'quiz' | 'review' | 'done';

export function QuizPanel({ sectionTitle, questions, onComplete, onSkip }: Props) {
  const [phase, setPhase] = useState<Phase>('quiz');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const passed = score >= Math.ceil(questions.length * 0.6);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setPhase('review');
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setPhase('quiz');
  };

  const handleFinish = () => {
    onComplete(score, questions.length, passed);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const diffColors: Record<string, string> = { easy: 'text-emerald-500', medium: 'text-amber-500', hard: 'text-rose-500' };

  if (phase === 'review') {
    return (
      <div className="rounded-xl border border-border bg-card p-6 mt-8 shadow-sm">
        <div className="text-center mb-6">
          {passed ? (
            <>
              <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <div className="font-serif text-2xl font-bold text-foreground mb-1">Section Complete!</div>
              <div className="text-muted-foreground font-sans text-sm">You scored {score} / {questions.length}</div>
            </>
          ) : (
            <>
              <XCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <div className="font-serif text-2xl font-bold text-foreground mb-1">Not quite — try again</div>
              <div className="text-muted-foreground font-sans text-sm">You scored {score} / {questions.length} (need {Math.ceil(questions.length * 0.6)}+)</div>
            </>
          )}
        </div>

        <div className="space-y-3 mb-6">
          {questions.map((question, i) => {
            const wasCorrect = answers[i] === question.correct;
            return (
              <div key={question.id} className={`flex items-start gap-3 p-3 rounded-lg ${wasCorrect ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-rose-500/5 border border-rose-500/20'}`}>
                {wasCorrect ? <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />}
                <div className="min-w-0">
                  <div className="font-sans text-sm font-medium text-foreground line-clamp-1">{question.question}</div>
                  <div className="font-sans text-xs text-muted-foreground mt-0.5">Correct: {optionLabels[question.correct]}. {question.options[question.correct]}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          {!passed && (
            <button onClick={handleRetry} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted/50 font-sans text-sm font-medium text-foreground transition-colors">
              <RefreshCw className="w-4 h-4" /> Retry Quiz
            </button>
          )}
          <button onClick={handleFinish} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-sm font-semibold transition-colors">
            <ChevronRight className="w-4 h-4" /> Continue Reading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 mt-8 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Section Quiz · {sectionTitle}</div>
          <div className="font-sans text-xs text-muted-foreground">Question {current + 1} of {questions.length}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] font-bold uppercase ${diffColors[q.difficulty]}`}>{q.difficulty}</span>
          <button onClick={onSkip} className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline">Skip</button>
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-1 mb-6">
        <div className="bg-primary h-1 rounded-full transition-all" style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>

      <p className="font-sans text-base font-medium text-foreground mb-5 leading-relaxed">{q.question}</p>

      <div className="space-y-2.5 mb-5">
        {q.options.map((option, idx) => {
          let cls = 'border border-border bg-muted/30 hover:bg-muted/60 text-foreground cursor-pointer';
          if (selected !== null) {
            if (idx === q.correct) cls = 'border-emerald-500 bg-emerald-500/10 text-foreground cursor-default';
            else if (idx === selected && idx !== q.correct) cls = 'border-rose-500 bg-rose-500/10 text-muted-foreground cursor-default';
            else cls = 'border-border/50 bg-muted/10 text-muted-foreground/50 cursor-default';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all font-sans text-sm ${cls}`}>
              <span className="font-mono text-xs font-bold mt-0.5 shrink-0 w-5">{optionLabels[idx]}.</span>
              <span className="leading-relaxed">{option}</span>
              {selected !== null && idx === q.correct && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0 mt-0.5" />}
              {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 text-rose-500 ml-auto shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="bg-muted/40 border border-border rounded-lg p-4 mb-5">
          <div className="font-sans text-xs font-semibold text-foreground mb-1">Explanation</div>
          <div className="font-sans text-sm text-muted-foreground leading-relaxed">{q.explanation}</div>
        </div>
      )}

      {selected !== null && (
        <button onClick={handleNext} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-sm font-semibold transition-colors">
          {current < questions.length - 1 ? 'Next Question' : 'See Results'}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
