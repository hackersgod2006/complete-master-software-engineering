import { useSettings, FontSize } from '@/hooks/use-settings';
import { Sun, Moon, Type, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FONT_SIZES: { label: string; value: FontSize }[] = [
  { label: 'S', value: 'sm' },
  { label: 'M', value: 'md' },
  { label: 'L', value: 'lg' },
  { label: 'XL', value: 'xl' },
];

export function SettingsPanel({ open, onClose }: Props) {
  const { settings, update } = useSettings();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Reading Settings</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <div className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Theme</div>
            <div className="flex gap-2">
              <button
                onClick={() => update({ darkMode: false })}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-sans text-sm font-medium transition-all ${!settings.darkMode ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}
              >
                <Sun className="w-4 h-4" /> Light
              </button>
              <button
                onClick={() => update({ darkMode: true })}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-sans text-sm font-medium transition-all ${settings.darkMode ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}
              >
                <Moon className="w-4 h-4" /> Dark
              </button>
            </div>
          </div>

          <div>
            <div className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Type className="w-3.5 h-3.5" /> Font Size
            </div>
            <div className="flex gap-2">
              {FONT_SIZES.map(fs => (
                <button
                  key={fs.value}
                  onClick={() => update({ fontSize: fs.value })}
                  className={`flex-1 py-2.5 rounded-lg border font-sans font-medium transition-all ${settings.fontSize === fs.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}
                  style={{ fontSize: fs.value === 'sm' ? '11px' : fs.value === 'md' ? '13px' : fs.value === 'lg' ? '15px' : '17px' }}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <div className="font-sans text-sm font-medium text-foreground">Show reading time</div>
              <div className="font-sans text-xs text-muted-foreground">Estimate per section</div>
            </div>
            <button
              onClick={() => update({ showReadingTime: !settings.showReadingTime })}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.showReadingTime ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${settings.showReadingTime ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm -z-10" />
    </div>
  );
}
