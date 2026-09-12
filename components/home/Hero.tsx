'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion';

import {Button} from '@/components/shared/Button';
import {Link} from '@/i18n/navigation';

const SLIDES = [
  {
    src: '/photos/hero/private-tour-riviera-maya.jpg',
    alt: 'Kat with guests on a private tour in the Riviera Maya'
  },
  {
    src: '/photos/hero/green-sea-turtle-akumal.jpg',
    alt: 'Green sea turtle gliding through clear Caribbean water at Akumal'
  },
  {
    src: '/photos/hero/underground-cenote-mexico.jpg',
    alt: 'Light falling into an underground cenote over deep blue water'
  },
  {
    src: '/photos/hero/kat-guiding-coba-ruins.jpg',
    alt: 'Kat guiding guests through the ancient Maya ruins of Coba'
  },
  {
    src: '/photos/hero/ziplining-riviera-maya-mexico.jpg',
    alt: 'Zip line ride over a jungle cenote in the Riviera Maya'
  }
];

const INTERVAL = 5000;
const BUTTON_GRADIENT = 'linear-gradient(100deg, #00D4FF -8.86%, #2EE0B4 104.42%)';

export function Hero() {
  const t = useTranslations();
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  const headline = t('hero.headline');
  const lines = headline.split('\n');

  return (
    <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
      {/* Sliding backgrounds */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 will-change-transform"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1.2, ease: 'easeInOut'}}
          aria-hidden="true"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          {/* Headline */}
          <motion.h1
            className="flex w-full flex-col items-center text-[38px] font-medium uppercase tracking-[0.08em] text-white md:text-[68px]"
            style={{lineHeight: 1.1, textShadow: '0 3px 24px rgba(0,0,0,0.4)'}}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {transition: {staggerChildren: 0.06, delayChildren: 0.1}}
            }}
          >
            {lines.map((line, lineIndex) => {
              const words = line.split(' ').filter(Boolean);
              const isFirst = lineIndex === 0;
              const isPayoff = lineIndex === lines.length - 1 && lines.length > 1;
              return (
                <span
                  key={lineIndex}
                  className={
                    isFirst
                      ? 'inline-flex flex-col items-stretch'
                      : 'mt-3 block md:mt-4'
                  }
                >
                  <span
                    className="block"
                    style={
                      isPayoff
                        ? {
                            background: BUTTON_GRADIENT,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 3px 18px rgba(0,0,0,0.4))'
                          }
                        : undefined
                    }
                  >
                    {words.map((w, i) => (
                      <motion.span
                        key={`${lineIndex}-${w}-${i}`}
                        className={['inline-block', i < words.length - 1 ? 'mr-[0.25em]' : ''].join(' ')}
                        variants={{
                          hidden: reduced ? {opacity: 1} : {opacity: 0, y: 20},
                          show: {opacity: 1, y: 0}
                        }}
                        transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
                      >
                        {w}
                      </motion.span>
                    ))}
                  </span>
                  {isFirst && lines.length > 1 ? (
                    <span
                      className="mt-3 h-px w-full md:mt-4"
                      style={{background: 'rgba(255,255,255,0.7)'}}
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              );
            })}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-7 w-full max-w-2xl whitespace-pre-line text-center text-lg font-medium leading-8 tracking-[0.02em] md:mt-8 md:text-xl md:leading-9"
            style={{color: '#ffffff', textShadow: '0 2px 18px rgba(0,0,0,0.55)'}}
            initial={reduced ? {opacity: 1} : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.4, duration: 0.6}}
          >
            {t('hero.subheadline')}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8 flex w-full justify-center"
            initial={reduced ? {opacity: 1} : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.55, duration: 0.6}}
          >
            <Link href="/tours">
              <Button size="lg">{t('hero.cta.book')}</Button>
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
