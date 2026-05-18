import { useEffect, useState } from 'react';
import { Achievement } from '@/hooks/use-achievements';

interface Props {
  achievements: Achievement[];
  onDismiss: () => void;
}

export function AchievementPopup({ achievements, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (achievements.length > 0) {
      setIdx(0);
      setVisible(true);
    }
  }, [achievements]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      if (idx < achievements.length - 1) {
        setIdx(i => i + 1);
      } else {
        setVisible(false);
        onDismiss();
      }
    }, 3500);
    return () => clearTimeout(t);
  }, [visible, idx, achievements.length]);

  if (!visible || achievements.length === 0) return null;

  const a = achievements[idx];
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-card border border-border rounded-xl shadow-2xl p-4 flex items-center gap-4 min-w-64 max-w-80">
        <div className="text-3xl shrink-0">{a.icon}</div>
        <div className="min-w-0">
          <div className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-0.5">Achievement Unlocked!</div>
          <div className="font-sans text-sm font-bold text-foreground">{a.title}</div>
          <div className="font-sans text-xs text-muted-foreground">{a.description}</div>
          <div className="font-mono text-xs text-amber-500 mt-0.5">+{a.xp} XP</div>
        </div>
        <button onClick={() => { setVisible(false); onDismiss(); }} className="text-muted-foreground hover:text-foreground shrink-0 text-lg leading-none">×</button>
      </div>
    </div>
  );
}
