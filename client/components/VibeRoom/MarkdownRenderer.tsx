import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Render inline formatting (bold, italic, inline code, links, strikethrough)
  const renderInline = (text: string): React.ReactNode[] => {
    // Regex for inline code: `code`
    // Regex for bold: **text** or __text__
    // Regex for italic: *text* or _text_
    // Regex for links: [text](url)
    // Regex for strikethrough: ~~text~~

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Pattern matching all inline elements
    const inlineRegex = /(`([^`]+)`)|\*\*([^*]+)\*\*|\*([^*]+)\*|~~([^~]+)~~|\[([^\]]+)\]\(([^)]+)\)/g;
    let match: RegExpExecArray | null;

    while ((match = inlineRegex.exec(text)) !== null) {
      // Push preceding plain text
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      if (match[1]) {
        // Inline code
        elements.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 bg-zinc-950 text-cyan-300 font-mono text-[11px] rounded border border-cyan-500/30"
          >
            {match[2]}
          </code>
        );
      } else if (match[3]) {
        // Bold
        elements.push(
          <strong key={match.index} className="font-bold text-cyan-200">
            {match[3]}
          </strong>
        );
      } else if (match[4]) {
        // Italic
        elements.push(
          <em key={match.index} className="italic text-zinc-300">
            {match[4]}
          </em>
        );
      } else if (match[5]) {
        // Strikethrough
        elements.push(
          <del key={match.index} className="line-through text-zinc-500">
            {match[5]}
          </del>
        );
      } else if (match[6] && match[7]) {
        // Link
        elements.push(
          <a
            key={match.index}
            href={match[7]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
          >
            {match[6]}
          </a>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  // Process blocks (paragraphs, headers, code blocks, lists, quotes)
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block Handling
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push(
          <div key={`code-${i}`} className="my-2.5 bg-zinc-950 border border-zinc-800 rounded-md p-3 font-mono text-xs overflow-x-auto shadow-inner">
            {codeBlockLang && (
              <div className="text-[10px] text-cyan-500/70 border-b border-zinc-800/80 pb-1 mb-2 font-bold uppercase tracking-wider">
                // {codeBlockLang}
              </div>
            )}
            <pre className="text-zinc-200 leading-relaxed font-mono">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLines = [];
        codeBlockLang = '';
      } else {
        // Start code block
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      blocks.push(
        <h1 key={`h1-${i}`} className="text-lg md:text-xl font-black text-cyan-300 tracking-tight uppercase border-b border-cyan-500/30 pb-1 mt-3 mb-2 font-mono">
          {renderInline(trimmed.slice(2))}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      blocks.push(
        <h2 key={`h2-${i}`} className="text-base font-bold text-amber-300 tracking-tight uppercase border-b border-zinc-800 pb-1 mt-2.5 mb-1.5 font-mono">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3 key={`h3-${i}`} className="text-sm font-bold text-emerald-400 uppercase mt-2 mb-1 font-mono">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      blocks.push(
        <blockquote key={`quote-${i}`} className="my-2 pl-3 py-1 border-l-2 border-cyan-400 bg-zinc-950/60 text-xs italic text-zinc-300 font-mono">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
    }
    // Task Checklist items: - [ ] or - [x]
    else if (/^- \[( |x|X)\] /.test(trimmed)) {
      const isChecked = trimmed.startsWith('- [x]') || trimmed.startsWith('- [X]');
      const taskText = trimmed.slice(6);
      blocks.push(
        <div key={`task-${i}`} className="flex items-center space-x-2 my-1 text-xs font-mono">
          <span className={`w-3.5 h-3.5 flex items-center justify-center rounded border text-[10px] ${
            isChecked ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'border-zinc-700 text-transparent'
          }`}>
            ✓
          </span>
          <span className={isChecked ? 'line-through text-zinc-500' : 'text-zinc-200'}>
            {renderInline(taskText)}
          </span>
        </div>
      );
    }
    // Unordered List Items
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      blocks.push(
        <div key={`ul-${i}`} className="flex items-start space-x-2 my-1 text-xs font-mono text-zinc-200 pl-2">
          <span className="text-cyan-400 font-bold select-none">•</span>
          <span>{renderInline(trimmed.slice(2))}</span>
        </div>
      );
    }
    // Numbered List Items
    else if (/^\d+\. /.test(trimmed)) {
      const numMatch = trimmed.match(/^(\d+)\. (.*)/);
      if (numMatch) {
        blocks.push(
          <div key={`ol-${i}`} className="flex items-start space-x-2 my-1 text-xs font-mono text-zinc-200 pl-2">
            <span className="text-amber-400 font-bold select-none">{numMatch[1]}.</span>
            <span>{renderInline(numMatch[2])}</span>
          </div>
        );
      }
    }
    // Horizontal Rule
    else if (trimmed === '---' || trimmed === '***') {
      blocks.push(<hr key={`hr-${i}`} className="my-3 border-zinc-800" />);
    }
    // Regular Paragraph
    else {
      blocks.push(
        <p key={`p-${i}`} className="my-1.5 text-xs text-zinc-300 leading-relaxed font-sans">
          {renderInline(trimmed)}
        </p>
      );
    }
  }

  // Handle unclosed code block at end of content
  if (inCodeBlock && codeBlockLines.length > 0) {
    blocks.push(
      <div key="code-end" className="my-2.5 bg-zinc-950 border border-zinc-800 rounded-md p-3 font-mono text-xs overflow-x-auto shadow-inner">
        <pre className="text-zinc-200 leading-relaxed font-mono">
          <code>{codeBlockLines.join('\n')}</code>
        </pre>
      </div>
    );
  }

  return <div className={`space-y-1 ${className}`}>{blocks}</div>;
};
