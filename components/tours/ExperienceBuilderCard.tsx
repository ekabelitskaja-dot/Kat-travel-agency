'use client';

import {useState} from 'react';
import {Compass, Droplets, Landmark, Sparkles, TreePalm, Turtle} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {ExperienceBuilderModal} from './ExperienceBuilderModal';

/** Icons floated over the card header in place of a photo. */
const HEADER_ICONS = [Turtle, Droplets, Landmark, TreePalm, Compass];

export function ExperienceBuilderCard() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full">
      <article className="group h-full overflow-hidden rounded-3xl border border-dashed border-accent/40 bg-white shadow-[0_16px_40px_rgba(28,28,26,0.10)] flex flex-col">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-1 flex-col text-left"
        >
          {/* Icon header, standing in for the photo the real tours have */}
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-accent/10">
            <div className="flex items-center gap-3">
              {HEADER_ICONS.map((IconCmp, i) => (
                <span
                  key={i}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/80 text-accent shadow-sm transition-transform duration-500 group-hover:-translate-y-1"
                  style={{transitionDelay: `${i * 45}ms`}}
                >
                  <IconCmp className="h-5 w-5" />
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="flex items-center gap-2 text-xl leading-tight">
              <Sparkles className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              {t('builder.cardTitle')}
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-muted">{t('builder.cardTagline')}</p>

            <div className="mt-5 flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-text">{t('builder.cardDuration')}</span>
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-text">{t('builder.cardGroup')}</span>
              </span>
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <div className="text-sm text-text">{t('builder.cardPrice')}</div>
              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 group-hover:opacity-80"
                style={{backgroundColor: '#CAFFF5', color: '#394D4A'}}
              >
                {t('builder.cardCta')}
              </span>
            </div>
          </div>
        </button>
      </article>

      <ExperienceBuilderModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
