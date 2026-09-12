'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {motion, useReducedMotion} from 'framer-motion';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {highlightAccent} from '@/components/shared/highlighted-text';

import {reviews} from '@/data/reviews';
import {ReviewCard} from '@/components/shared/ReviewCard';

export function ReviewsSlider() {
  const t = useTranslations();
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scrollLeft = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({left: -420, behavior: 'smooth'});
  };

  const scrollRight = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({left: 420, behavior: 'smooth'});
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = scrollerRef.current;
    if (!el) return;

    const id = window.setInterval(() => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const next = Math.min(el.scrollLeft + 340, maxScrollLeft);
      if (next >= maxScrollLeft - 8) {
        el.scrollTo({left: 0, behavior: 'smooth'});
      } else {
        el.scrollTo({left: next, behavior: 'smooth'});
      }
    }, 4200);

    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section className="bg-surface pt-8 pb-[52px] md:pt-12 md:pb-[68px] overflow-hidden">

      {/* Section Header - Centered */}
      <div className="mx-auto max-w-6xl px-6 text-center mb-9">
        <motion.div
          initial={reduced ? {opacity: 1} : {opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 0.6}}
        >
          <span className="text-xs uppercase tracking-widest text-accent">
            {t('reviews.eyebrow')}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl">
            {highlightAccent(t('reviews.title'), 'across')}
          </h2>
        </motion.div>
      </div>

      {/* Scrollable Gallery with Gradient Fades and Arrows */}
      <div className="relative">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-surface to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-surface to-transparent z-10 pointer-events-none" />

        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full bg-white border border-text/10 text-text hover:bg-accent hover:text-white hover:border-accent shadow-lg transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full bg-white border border-text/10 text-text hover:bg-accent hover:text-white hover:border-accent shadow-lg transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Reviews Container - Hidden Scrollbar */}
        <div
          ref={scrollerRef}
          className="flex items-stretch gap-6 overflow-x-auto px-6 md:px-12 scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {reviews.map((r, index) => (
            <motion.div
              key={`${r.name}-${r.sourceUrl}`}
              className="flex min-w-[320px] sm:min-w-[380px] md:min-w-[420px] snap-start"
              initial={reduced ? {opacity: 1} : {opacity: 0, x: 20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.5, delay: index * 0.1}}
            >
              <ReviewCard review={r} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

