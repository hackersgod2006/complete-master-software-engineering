import React from "react";

interface ContentRendererProps {
  content: string;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  // Simple parser to separate code blocks, tables, and paragraphs
  const blocks: React.ReactNode[] = [];
  
  const lines = content.split('\n');
  let currentParagraph: string[] = [];
  let currentCodeBlock: string[] = [];
  let inCodeBlock = false;
  let codeBlockLang = "";
  
  let currentTable: string[] = [];
  let inTable = false;
  
  let currentList: string[] = [];
  let inList = false;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push(
        <p key={blocks.length} className="font-serif text-[1.1rem] leading-relaxed mb-6 text-foreground/90">
          {parseInline(currentParagraph.join('\n'))}
        </p>
      );
      currentParagraph = [];
    }
  };
  
  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push(
        <ul key={blocks.length} className="list-disc pl-6 mb-6 font-serif text-[1.1rem] leading-relaxed text-foreground/90 marker:text-muted-foreground">
          {currentList.map((item, i) => (
            <li key={i} className="mb-2 pl-2">
              {parseInline(item.replace(/^-\s*/, ''))}
            </li>
          ))}
        </ul>
      );
      currentList = [];
      inList = false;
    }
  }

  const flushTable = () => {
    if (currentTable.length > 0) {
      const rows = currentTable.map(row => 
        row.split('|').filter(cell => cell.trim().length > 0).map(cell => cell.trim())
      );
      
      // Separate header from body (skip separator row)
      const header = rows[0];
      const body = rows.slice(2); // assuming row 1 is |---|---|
      
      blocks.push(
        <div key={blocks.length} className="my-8 overflow-x-auto border border-border rounded-md">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-3 font-medium border-r border-border last:border-0">{parseInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 border-r border-border last:border-0">{parseInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = [];
      inTable = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // end code block
        blocks.push(
          <div key={blocks.length} className="my-6 rounded-md overflow-hidden border border-border bg-muted/30">
            {codeBlockLang && (
              <div className="px-4 py-1.5 bg-muted/80 text-xs font-mono text-muted-foreground border-b border-border">
                {codeBlockLang}
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="font-mono text-[0.9rem] leading-relaxed">
                {currentCodeBlock.join('\n')}
              </code>
            </pre>
          </div>
        );
        currentCodeBlock = [];
        inCodeBlock = false;
        codeBlockLang = "";
      } else {
        flushParagraph();
        flushList();
        flushTable();
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line);
      continue;
    }

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushParagraph();
      flushList();
      inTable = true;
      currentTable.push(line.trim());
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.trim().startsWith('- ')) {
      flushParagraph();
      inList = true;
      currentList.push(line);
      continue;
    } else if (inList && line.trim() === '') {
      flushList();
    } else if (inList) {
      // Continuation of list item or malformed
      flushList();
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      blocks.push(
        <h3 key={blocks.length} className="font-sans font-semibold text-xl mt-8 mb-4 tracking-tight text-foreground">
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      flushParagraph();
      blocks.push(
        <h2 key={blocks.length} className="font-sans font-bold text-2xl mt-12 mb-6 tracking-tight text-foreground border-b border-border pb-2">
          {parseInline(line.slice(3))}
        </h2>
      );
    } else if (line.trim() === '---') {
      flushParagraph();
      blocks.push(<hr key={blocks.length} className="my-10 border-border" />);
    } else if (line.trim() === '') {
      flushParagraph();
    } else {
      if (!inTable && !inList && !inCodeBlock) {
        currentParagraph.push(line);
      }
    }
  }

  flushParagraph();
  flushList();
  flushTable();

  return <div className="max-w-none">{blocks}</div>;
}

// Very basic inline parser for bold, italic, and inline code
function parseInline(text: string): React.ReactNode[] {
  if (!text) return [];

  const result: React.ReactNode[] = [];
  let currentText = "";
  
  // Simple regex-based tokenization could be used, but let's do a basic manual scan
  let i = 0;
  while (i < text.length) {
    // Code: `text`
    if (text[i] === '`') {
      if (currentText) result.push(<span key={i+"text"}>{currentText}</span>);
      currentText = "";
      i++;
      let codeText = "";
      while (i < text.length && text[i] !== '`') {
        codeText += text[i];
        i++;
      }
      result.push(<code key={i+"code"} className="font-mono text-[0.85em] bg-muted/50 px-1.5 py-0.5 rounded border border-border/50 text-foreground">{codeText}</code>);
      i++;
      continue;
    }
    
    // Bold: **text**
    if (text[i] === '*' && text[i+1] === '*') {
      if (currentText) result.push(<span key={i+"text"}>{currentText}</span>);
      currentText = "";
      i += 2;
      let boldText = "";
      while (i < text.length && !(text[i] === '*' && text[i+1] === '*')) {
        boldText += text[i];
        i++;
      }
      result.push(<strong key={i+"bold"} className="font-semibold text-foreground">{boldText}</strong>);
      i += 2;
      continue;
    }
    
    // Italic: *text*
    if (text[i] === '*' && (i === 0 || text[i-1] !== '*')) {
      // Check if it's actually an italic boundary
      let j = i + 1;
      let foundEnd = false;
      while (j < text.length) {
        if (text[j] === '*' && (j === text.length - 1 || text[j+1] !== '*')) {
          foundEnd = true;
          break;
        }
        j++;
      }
      
      if (foundEnd) {
        if (currentText) result.push(<span key={i+"text"}>{currentText}</span>);
        currentText = "";
        i++;
        let italicText = "";
        while (i < text.length && text[i] !== '*') {
          italicText += text[i];
          i++;
        }
        result.push(<em key={i+"italic"} className="italic">{italicText}</em>);
        i++;
        continue;
      }
    }
    
    currentText += text[i];
    i++;
  }
  
  if (currentText) {
    result.push(<span key={i+"end"}>{currentText}</span>);
  }
  
  return result;
}
