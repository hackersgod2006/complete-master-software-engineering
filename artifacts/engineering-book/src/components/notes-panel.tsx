import { useState, useEffect } from 'react';
import { useNotes } from '@/hooks/use-notes';
import { StickyNote, Save, Trash2 } from 'lucide-react';

interface Props {
  sectionId: string;
  sectionTitle: string;
}

export function NotesPanel({ sectionId, sectionTitle }: Props) {
  const { getNote, saveNote, hasNote } = useNotes();
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setText(getNote(sectionId));
    setSaved(false);
  }, [sectionId]);

  const handleSave = () => {
    saveNote(sectionId, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    saveNote(sectionId, '');
    setText('');
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 font-sans text-sm font-medium transition-colors ${open || hasNote(sectionId) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <StickyNote className={`w-4 h-4 ${hasNote(sectionId) ? 'text-amber-500' : ''}`} />
        {hasNote(sectionId) ? 'Edit my notes' : 'Add notes for this section'}
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-border bg-card/50 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
            <span className="font-sans text-xs font-medium text-muted-foreground">Notes — {sectionTitle}</span>
            {text.trim() && (
              <button onClick={handleDelete} className="text-muted-foreground hover:text-rose-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setSaved(false); }}
            placeholder="Write your thoughts, key takeaways, questions..."
            rows={5}
            className="w-full px-4 py-3 bg-transparent font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
          />
          <div className="px-4 py-2.5 border-t border-border flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground">{text.length} chars</span>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-sans text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <Save className="w-3 h-3" />
              {saved ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
