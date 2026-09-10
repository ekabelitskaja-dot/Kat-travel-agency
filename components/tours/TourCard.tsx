import Image from 'next/image';
import {useTranslations} from 'next-intl';

import type {Tour} from '@/data/tours';
import {Link} from '@/i18n/navigation';

export function TourCard({tour}: {tour: Tour}) {
  const t = useTranslations();

  return (
    <article className="group overflow-hidden rounded-3xl border border-text/10 bg-white shadow-[0_16px_40px_rgba(28,28,26,0.10)] flex flex-col">
      <Link href={`/tours/${tour.slug}`} className="flex flex-col flex-1">
        <div className="relative aspect-[4/3]">
          <Image
            src={tour.image.src}
            alt={tour.image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, rgba(28,28,26,0.05) 0%, rgba(28,28,26,0.62) 100%)'
            }}
          />
        </div>

        <div className="flex flex-col p-6 flex-1">
          <h3 className="text-xl leading-tight">{tour.name}</h3>

          <div className="mt-5 flex items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <img src="/icons/avg_pace.svg" alt="" width={14} height={14} aria-hidden="true" />
              <span className="text-text">{tour.duration}</span>
            </span>
            <span className="flex items-center gap-1">
              <img src="/icons/person_2.svg" alt="" width={14} height={14} aria-hidden="true" />
              <span className="text-text">{tour.groupSize}</span>
            </span>
          </div>

          <div className="mt-auto pt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-text">
              {t('tour.card.from')} <span className="font-bold">${tour.price}</span>
            </div>
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 group-hover:opacity-80" style={{backgroundColor: '#CAFFF5', color: '#394D4A'}}>
              {t('tour.card.details')}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
