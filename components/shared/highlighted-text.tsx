import type {ReactNode} from 'react';

function BlobHighlight({children}: {children: ReactNode}) {
  return (
    <span
      style={{
        background: 'linear-gradient(100deg, #00D4FF -8.86%, #2EE0B4 104.42%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {children}
    </span>
  );
}

export function highlightAccent(text: string, accent: string): ReactNode {
  if (!accent) return text;
  const idx = text.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <BlobHighlight>{text.slice(idx, idx + accent.length)}</BlobHighlight>
      {text.slice(idx + accent.length)}
    </>
  );
}

/** Render `**keyword**` markers as bold, for scannable tour copy. */
export function emphasizeKeywords(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const match = /^\*\*([^*]+)\*\*$/.exec(part);
    if (match) {
      return (
        <strong key={i} className="font-semibold text-text">
          {match[1]}
        </strong>
      );
    }
    return part;
  });
}

/** Plain-text version of copy that uses `**keyword**` markers. */
export function stripEmphasis(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1');
}
