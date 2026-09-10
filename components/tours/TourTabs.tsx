'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';

import type {Tour} from '@/data/tours';
import {emphasizeKeywords} from '@/components/shared/highlighted-text';

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
            <div className="mb-8 grid gap-5">
              <p className="text-xl leading-8 text-text md:text-2xl md:leading-9">
                {emphasizeKeywords(tour.tagline)}
              </p>
              {tour.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-base leading-7 text-text-muted">
                  {emphasizeKeywords(para)}
                </p>
              ))}
            </div>
          )}
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
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-7">
            <h3 className="text-xl">{t('tourDetail.included')}</h3>
            <ul className="mt-4 grid gap-2 text-sm text-text-muted">
              {tour.included.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-7">
            <h3 className="text-xl">{t('tourDetail.notIncluded')}</h3>
            <ul className="mt-4 grid gap-2 text-sm text-text-muted">
              {tour.notIncluded.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-text-muted shrink-0" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
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

