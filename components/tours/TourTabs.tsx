'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';

import type {Tour} from '@/data/tours';
import {BookTourButton} from '@/components/shared/BookTourButton';
import {TourStory} from '@/components/tours/TourStory';

type TabKey = 'overview' | 'included' | 'important';

export function TourTabs({tour}: {tour: Tour}) {
  const t = useTranslations();
  const [active, setActive] = useState<TabKey>('overview');

  const tabs = useMemo(
    () =>
      [
        {key: 'overview' as const, label: t('tourDetail.overview')},
        {key: 'included' as const, label: t('tourDetail.included')},
        {key: 'important' as const, label: t('tourDetail.important')}
      ] satisfies Array<{key: TabKey; label: string}>,
    [t]
  );

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2 border-b border-text/10 pb-4">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={[
                'rounded-full px-4 py-2 text-sm border transition-colors',
                isActive
                  ? 'text-white border-[#0E9E8A]'
                  : 'bg-white/70 backdrop-blur-sm border-text/10 text-text/80 hover:text-text hover:bg-surface'
              ].join(' ')}
              style={isActive ? {backgroundColor: '#0E9E8A'} : undefined}
              aria-current={isActive ? 'true' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {active === 'overview' && (
        <div className="mt-8">
          {tour.description && (
            <TourStory tagline={tour.tagline} description={tour.description} />
          )}
          <div className="mb-8">
            <BookTourButton label={t('tourDetail.talkToKat')} tourName={tour.name} />
          </div>
          <h3 className="text-xl">{t('tourDetail.highlights')}</h3>
          <ul className="mt-4 grid gap-2 text-sm text-text-muted">
            {tour.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {active === 'included' && (
        <div className="mt-8 rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-7">
          <ul className="grid gap-4 text-sm text-text-muted">
            {tour.included.map((x) => {
              const title = typeof x === 'string' ? x : x.title;
              const description = typeof x === 'string' ? undefined : x.description;
              return (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>
                    <span className="block font-medium text-text">{title}</span>
                    {description ? (
                      <span className="mt-1 block leading-6">{description}</span>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {active === 'important' && (
        <div className="mt-8 rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-7">
          <h3 className="text-xl">{t('tourDetail.important')}</h3>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-text-muted">
            <p>{t('tourDetail.important.p1')}</p>
            <p>{t('tourDetail.important.p2')}</p>
            <p>{t('tourDetail.important.p3')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

