import {highlightAccent} from './highlighted-text';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  accentPhrase
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accentPhrase?: string;
}) {
  return (
    <div
      className={[
        align === 'center' ? 'text-center' : 'text-left',
        'max-w-2xl'
      ].join(' ')}
    >
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.18em] text-text-muted">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 whitespace-pre-line text-3xl leading-[1.05] md:text-4xl">
        {accentPhrase ? highlightAccent(title, accentPhrase) : title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-7 text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}

