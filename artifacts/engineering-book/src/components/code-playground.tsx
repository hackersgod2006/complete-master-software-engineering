import { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

const STARTER: Record<string, string> = {
  javascript: `// JavaScript Playground
// Try concepts from this chapter!

function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const sorted = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29];
console.log("Index of 13:", binarySearch(sorted, 13));
console.log("Index of 6:", binarySearch(sorted, 6));`,

  python: `# Python Playground
# Copy and run locally — paste output here

def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

sorted_arr = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29]
print("Index of 13:", binary_search(sorted_arr, 13))
print("Index of 6:", binary_search(sorted_arr, 6))`,
};

function runJS(code: string): string {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
    error: (...args: unknown[]) => logs.push('ERROR: ' + args.join(' ')),
    warn: (...args: unknown[]) => logs.push('WARN: ' + args.join(' ')),
  };
  try {
    const fn = new Function('console', code);
    fn(fakeConsole);
    return logs.join('\n') || '(no output)';
  } catch (e) {
    return `Error: ${e instanceof Error ? e.message : String(e)}`;
  }
}

export function CodePlayground() {
  const [lang, setLang] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState(STARTER.javascript);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleLangChange = (l: 'javascript' | 'python') => {
    setLang(l);
    setCode(STARTER[l]);
    setOutput('');
  };

  const handleRun = () => {
    if (lang === 'javascript') {
      setOutput(runJS(code));
    } else {
      setOutput('Python runs locally. Copy the code and run it in your terminal:\n\n$ python3 script.py');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(STARTER[lang]);
    setOutput('');
  };

  return (
    <div className="mt-8 rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/40 border-b border-border px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {(['javascript', 'python'] as const).map(l => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={`px-3 py-1 rounded-md font-mono text-xs font-medium transition-colors ${lang === l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {l === 'javascript' ? 'JavaScript' : 'Python'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={handleReset} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button onClick={handleRun} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary text-primary-foreground font-sans text-xs font-semibold hover:bg-primary/90 transition-colors">
            <Play className="w-3 h-3" /> Run
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        rows={12}
        className="w-full px-4 py-3 bg-[#1a1a2e] text-[#e2e8f0] font-mono text-xs leading-relaxed outline-none resize-none"
        style={{ tabSize: 2 }}
        onKeyDown={e => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const s = e.currentTarget;
            const start = s.selectionStart;
            const end = s.selectionEnd;
            const next = code.substring(0, start) + '  ' + code.substring(end);
            setCode(next);
            setTimeout(() => { s.selectionStart = s.selectionEnd = start + 2; }, 0);
          }
        }}
      />

      {output && (
        <div className="border-t border-border bg-muted/20 px-4 py-3">
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Output</div>
          <pre className="font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">{output}</pre>
        </div>
      )}
    </div>
  );
}
