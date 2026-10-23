import {renderMarkedText} from '@/components/shared/highlighted-text';

function isSectionHeading(text: string) {
  const plain = text.replace(/\*\*/g, '').trim();
  return plain.length > 3 && /[A-Z]/.test(plain) && plain === plain.toUpperCase();
}

export function TourStory({tagline, description}: {tagline: string; description: string}) {
  const paragraphs = description.split('\n\n').filter(Boolean);
  const flatTagline = tagline.replace(/\n/g, ' ');
  const keepOnOneLine = flatTagline.length <= 60;
  const lines = tagline.split('\n');

  return (
    <div className="mb-6 max-w-3xl">
      <p
        className={
          keepOnOneLine
            ? 'whitespace-nowrap text-[clamp(0.8125rem,2.15vw+0.55rem,1.5rem)] font-semibold leading-tight text-text'
            : 'whitespace-pre-line text-[clamp(0.8125rem,2.15vw+0.55rem,1.5rem)] font-semibold leading-tight text-text'
        }
      >
        {lines.map((line, i) =>
          i === 0 ? (
            line
          ) : (
            <span key={i} className="block sm:inline">
              <span className="hidden sm:inline"> </span>
              {line}
            </span>
          )
        )}
      </p>
      <div className="mt-6 grid gap-5">
        {paragraphs.map((para, i) => {
          if (isSectionHeading(para)) {
            return (
              <p
                key={i}
                className="mt-2 text-lg font-semibold uppercase tracking-wide text-text"
              >
                {para.replace(/\*\*/g, '')}
              </p>
            );
          }

          return (
            <p key={i} className="text-base leading-7 text-text-muted">
              {renderMarkedText(para)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
