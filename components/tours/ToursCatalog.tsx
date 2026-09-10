'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';

import type {Tour, TourCategory} from '@/data/tours';
import {TourCard} from './TourCard';
import {ExperienceBuilderCard} from './ExperienceBuilderCard';

const FILTERS: Array<{key: string; category: TourCategory | null; labelKey: string}> = [
  {key: 'all', category: null, labelKey: 'tours.filters.all'},
  {key: 'cenotes', category: 'water-cenotes', labelKey: 'tours.filters.cenotes'},
  {key: 'ruins', category: 'history-ruins', labelKey: 'tours.filters.ruins'},
  {key: 'jungle', category: 'adventure', labelKey: 'tours.filters.jungle'}
];

export function ToursCatalog({tours}: {tours: Tour[]}) {
  const t = useTranslations();
  const [active, setActive] = useState<string>('all');

  const items = useMemo(() => {
    const filter = FILTERS.find((f) => f.key === active);
    if (!filter?.category) return tours;
    return tours.filter((tour) => tour.categories.includes(filter.category!));
  }, [active, tours]);

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={[
                'rounded-full px-4 py-2 text-sm transition-colors border',
                isActive
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white/70 backdrop-blur-sm border-text/10 text-text/80 hover:text-text hover:bg-surface'
              ].join(' ')}
              aria-pressed={isActive}
            >
              {t(f.labelKey)}
            </button>
          );
        })}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
        {active === 'all' ? <ExperienceBuilderCard /> : null}
      </div>
    </div>
  );
}
