'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';

import type {Tour} from '@/data/tours';
import {renderMarkedText} from '@/components/shared/highlighted-text';
import {BookTourButton} from '@/components/shared/BookTourButton';
import {TourStory} from '@/components/tours/TourStory';

type TabKey = 'overview' | 'included' | 'important' | 'whatToBring' | 'pricing';

function PricingColumn({
  sizes,
  rates,
  groupLabel,
  priceLabel
}: {
  sizes: number[];
  rates: Array<number | null>;
  groupLabel: string;
  priceLabel: string;
}) {
  const t = useTranslations();
  return (
    <table className="w-fit border-collapse text-sm">
      <thead>
        <tr>
          <th className="pb-3 pr-24 text-left text-xs font-medium uppercase tracking-[0.14em] text-text-muted whitespace-nowrap">
            {groupLabel}
          </th>
          <th className="pb-3 text-left text-xs font-medium uppercase tracking-[0.14em] text-text-muted whitespace-nowrap">
            {priceLabel}
          </th>
        </tr>
      </thead>
      <tbody>
        {sizes.map((size) => {
          const amount = rates[size - 1];
          return (
            <tr key={size}>
              <td className="border-t border-text/10 py-2.5 pr-24 font-medium text-text whitespace-nowrap">
                {t('tourDetail.pricingGuest', {count: size})}
              </td>
              <td className="border-t border-text/10 py-2.5 tabular-nums text-text">
                {amount == null ? '—' : `$${amount}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function TourTabs({tour}: {tour: Tour}) {
  const t = useTranslations();
  const [active, setActive] = useState<TabKey>('overview');

  const tabs = useMemo(
    () =>
      [
        {key: 'overview' as const, label: t('tourDetail.overview')},
        {key: 'included' as const, label: t('tourDetail.included')},
        {key: 'important' as const, label: t('tourDetail.important')},
        {key: 'whatToBring' as const, label: t('tourDetail.whatToBring')},
        {key: 'pricing' as const, label: t('tourDetail.pricing')}
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
                'rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] border transition-colors',
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
          {tour.itinerary ? (
            <div className="mt-10">
              <div className="h-px w-full bg-text/10" />
              <h3 className="mt-8 font-sans text-base font-semibold uppercase tracking-[0.14em] text-text">
                {tour.itinerary.title}
              </h3>
              <div className="mt-6 grid gap-6">
                {tour.itinerary.stops.map((stop) => (
                  <div key={`${stop.time}-${stop.place}`}>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-text">
                      {stop.time} · {stop.place}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {renderMarkedText(stop.description)}
                    </p>
                  </div>
                ))}
              </div>
              {tour.itinerary.note ? (
                <p className="mt-6 -ml-[0.15em] text-sm italic leading-6 text-text-muted">
                  {tour.itinerary.note}
                </p>
              ) : null}
              <div className="mt-8 h-px w-full bg-text/10" />
            </div>
          ) : null}
          <div className="mt-8">
            <p className="text-[clamp(0.8125rem,2.15vw+0.55rem,1.5rem)] font-semibold leading-tight text-text">
              {t('tourDetail.readyExplore')}
            </p>
            <div className="mt-6">
              <BookTourButton
                variant="soft"
                label={t('tourDetail.talkToKat')}
                tourName={tour.name}
              />
            </div>
          </div>
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
          {tour.goodToKnow?.length ? (
            <ul className="grid gap-4 text-sm text-text-muted">
              {tour.goodToKnow.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>
                    <span className="block font-medium text-text">{item.title}</span>
                    <span className="mt-1 block leading-6">{item.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      {active === 'whatToBring' && (
        <div className="mt-8 rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-7">
          {tour.whatToBring?.length ? (
            <ul className="grid gap-4 text-sm text-text-muted">
              {tour.whatToBring.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>
                    <span className="block font-medium text-text">{item.title}</span>
                    {item.description ? (
                      <span className="mt-1 block leading-6">{item.description}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      {active === 'pricing' && (
        <div className="mt-8 rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-7">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              {t('tourDetail.pricingTitle')}
            </p>
            <p className="mt-2 text-sm leading-6 text-text">{t('tourDetail.pricingBody')}</p>
          </div>
          {tour.pricePerPerson?.length ? (
            <div className="mt-8 grid gap-8 justify-items-start sm:grid-cols-2">
              <PricingColumn
                sizes={[1, 2, 3, 4, 5]}
                rates={tour.pricePerPerson}
                groupLabel={t('tourDetail.pricingYourGroup')}
                priceLabel={t('tourDetail.pricingPerPerson')}
              />
              <PricingColumn
                sizes={[6, 7, 8, 9, 10]}
                rates={tour.pricePerPerson}
                groupLabel={t('tourDetail.pricingYourGroup')}
                priceLabel={t('tourDetail.pricingPerPerson')}
              />
            </div>
          ) : null}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              {t('tourDetail.pricingLargeGroup')}
            </p>
            <p className="mt-2 text-sm leading-6 text-text">
              {t('tourDetail.pricingLargeGroupBody')}
            </p>
            <div className="mt-6">
              <BookTourButton
                variant="soft"
                label={t('tourDetail.talkToKat')}
                tourName={tour.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

