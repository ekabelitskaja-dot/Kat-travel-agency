import type {Review} from '@/data/reviews';

import {Star} from 'lucide-react';

export function ReviewCard({review}: {review: Review}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-text/10 bg-white/70 backdrop-blur-sm p-6 shadow-[0_16px_40px_rgba(28,28,26,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-text">{review.name}</div>
        </div>
        <div
          className="flex items-center gap-1 text-gold"
          aria-label={`${review.rating} star rating`}
        >
          {Array.from({length: review.rating}).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-text/90">“{review.quote}”</p>

      <div className="mt-5 text-xs text-text-muted">
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors underline underline-offset-2"
        >
          {review.source}
        </a>
      </div>
    </article>
  );
}

