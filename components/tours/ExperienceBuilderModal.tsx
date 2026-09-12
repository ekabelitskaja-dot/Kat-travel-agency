'use client';

import {useCallback, useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import * as icons from 'lucide-react';
import {ArrowLeft, Check, Compass, X} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {attractions, type BuilderAttraction} from '@/data/experience-builder';
import {mailLink, waLink} from '@/lib/contact';

/** Resolve a lucide icon by name, falling back to a compass. */
function Icon({name, className}: {name: string; className?: string}) {
  const Cmp = (icons as unknown as Record<string, React.ComponentType<{className?: string}>>)[name];
  const Resolved = Cmp ?? Compass;
  return <Resolved className={className} />;
}

export function ExperienceBuilderModal({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const t = useTranslations();
  const [attractionId, setAttractionId] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);

  const attraction = useMemo<BuilderAttraction | undefined>(
    () => attractions.find((a) => a.id === attractionId),
    [attractionId]
  );

  const reset = useCallback(() => {
    setAttractionId(null);
    setPicked([]);
  }, []);

  const close = useCallback(() => {
    onClose();
    // Let the exit animation finish before clearing the wizard.
    window.setTimeout(reset, 300);
  }, [onClose, reset]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const chosenAddOns = attraction?.addOns.filter((a) => picked.includes(a.id)) ?? [];
  const total = (attraction?.basePrice ?? 0) + chosenAddOns.reduce((sum, a) => sum + a.price, 0);

  const summary = attraction
    ? [
        `${t('builder.summaryIntro')} ${attraction.name}.`,
        chosenAddOns.length
          ? `${t('builder.summaryAddOns')} ${chosenAddOns.map((a) => a.name).join(', ')}.`
          : t('builder.summaryNoAddOns'),
        `${t('builder.summaryEstimate')} $${total}.`
      ].join('\n')
    : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={close}
          />

          <motion.div
            key="panel"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8"
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 16}}
            transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t('builder.title')}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-bg shadow-[0_32px_80px_rgba(0,0,0,0.25)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                aria-label={t('builder.close')}
                className="absolute top-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-text/10 bg-white/80 text-text hover:bg-surface transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 md:p-12">
                {/* ── Step 1: pick the main attraction ─────────────────── */}
                {!attraction && (
                  <>
                    <span className="text-xs uppercase tracking-widest text-accent">
                      {t('builder.step1Eyebrow')}
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl leading-tight">
                      {t('builder.step1Title')}
                    </h2>
                    <p className="mt-2 text-base text-text-muted">{t('builder.step1Body')}</p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {attractions.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAttractionId(a.id)}
                          className="group flex items-start gap-4 rounded-2xl border border-text/10 bg-white p-5 text-left transition-colors hover:border-accent/40 hover:bg-accent/5"
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10">
                            <Icon name={a.icon} className="h-5 w-5 text-accent" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-base font-medium text-text">{a.name}</span>
                            <span className="mt-1 block text-sm leading-6 text-text-muted">
                              {a.blurb}
                            </span>
                            <span className="mt-2 block text-xs text-text-muted">
                              {a.duration} · {t('builder.from')} ${a.basePrice}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* ── Step 2: add-ons for that attraction ──────────────── */}
                {attraction && (
                  <>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t('builder.back')}
                    </button>

                    <div className="mt-5 flex items-start gap-4 rounded-2xl border border-accent/25 bg-accent/5 p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15">
                        <Icon name={attraction.icon} className="h-5 w-5 text-accent" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-base font-medium text-text">{attraction.name}</div>
                        <div className="mt-1 text-sm leading-6 text-text-muted">
                          {attraction.blurb}
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-8 text-xl">{t('builder.step2Title')}</h3>
                    <p className="mt-1 text-sm text-text-muted">{t('builder.step2Body')}</p>

                    <div className="mt-5 grid gap-3">
                      {attraction.addOns.map((addOn) => {
                        const on = picked.includes(addOn.id);
                        return (
                          <button
                            key={addOn.id}
                            type="button"
                            onClick={() => toggle(addOn.id)}
                            aria-pressed={on}
                            className={[
                              'flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors',
                              on
                                ? 'border-accent/50 bg-accent/5'
                                : 'border-text/10 bg-white hover:border-accent/30'
                            ].join(' ')}
                          >
                            <span
                              className={[
                                'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors',
                                on ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                              ].join(' ')}
                            >
                              {on ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <Icon name={addOn.icon} className="h-5 w-5" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-text">
                                {addOn.name}
                              </span>
                              <span className="mt-1 block text-sm leading-6 text-text-muted">
                                {addOn.blurb}
                              </span>
                              <span className="mt-1 block text-xs text-text-muted">
                                {addOn.duration}
                              </span>
                            </span>
                            <span className="shrink-0 text-sm text-text">+${addOn.price}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Summary + CTA */}
                    <div className="mt-8 rounded-2xl border border-text/10 bg-white p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-sm text-text-muted">
                          {t('builder.estimate')}
                          {chosenAddOns.length > 0 && (
                            <> · {t('builder.extras', {count: chosenAddOns.length})}</>
                          )}
                        </span>
                        <span className="text-2xl font-bold text-text">${total}</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-text-muted">
                        {t('builder.estimateNote')}
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={waLink(summary)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                          style={{backgroundColor: '#0E9E8A'}}
                        >
                          {t('builder.ctaWhatsApp')}
                        </a>
                        <a
                          href={mailLink(t('builder.mailSubject'), summary)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center rounded-full border border-text/15 bg-white px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-surface"
                        >
                          {t('builder.ctaEmail')}
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
