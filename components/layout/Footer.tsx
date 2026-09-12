'use client';

import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/navigation';
import {EMAIL, mailLink, waLink} from '@/lib/contact';

function SignFemale() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="4.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 12.75v8.5M8.5 17.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SignAlien() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="5" ry="4.4" fill="currentColor" />
      <ellipse cx="10.05" cy="5.55" rx="1.2" ry="1.85" fill="var(--color-surface)" />
      <ellipse cx="13.95" cy="5.55" rx="1.2" ry="1.85" fill="var(--color-surface)" />
      <rect x="10.35" y="9.6" width="3.3" height="6.2" rx="0.35" fill="currentColor" />
      <rect x="5.1" y="10.2" width="13.8" height="2.15" rx="1.05" fill="currentColor" />
      <rect x="8.2" y="15.6" width="2.2" height="6.6" rx="1.05" fill="currentColor" />
      <rect x="13.6" y="15.6" width="2.2" height="6.6" rx="1.05" fill="currentColor" />
    </svg>
  );
}

function SignMale() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="10" cy="14" r="4.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.2 10.8 19 5M14.5 5H19v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignHeart() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7.2-4.4-7.2-9.1C4.8 8.2 6.6 6.5 9 6.5c1.4 0 2.3.7 3 1.7.7-1 1.6-1.7 3-1.7 2.4 0 4.2 1.7 4.2 4.4C19.2 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignLeaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 19C5 11.5 10.2 4.5 19.5 4.5 19.5 13.8 12.5 19 5 19Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8.5 15.5C11 12 15 8.2 19.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-text/10 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-row items-start justify-between gap-6 md:gap-12">
          <div className="min-w-0 flex-1">
            <div className="flex h-8 items-end text-sm uppercase tracking-wider text-text-muted">
              Mexico with Kat
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-text-muted">
              {t('footer.tagline')}
            </p>
            <a
              className="mt-4 block break-all text-sm text-text/80 hover:text-text"
              href={mailLink('Tour Inquiry')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {EMAIL}
            </a>
            <a
              className="mt-2 block text-sm text-text/80 hover:text-text"
              href={waLink("Hi Kat, I'm interested in a tour")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.whatsapp')}
            </a>
            <p className="mt-5 text-xs leading-none text-text-muted">
              English · Español · <span className="text-[10px]">Русский</span>
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex h-8 items-end text-xs uppercase tracking-wider text-text-muted">
              {t('footer.explore')}
            </div>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link className="text-text/80 hover:text-text" href="/tours">
                {t('nav.tours')}
              </Link>
              <Link className="text-text/80 hover:text-text" href="/about">
                {t('nav.about')}
              </Link>
              <Link className="text-text/80 hover:text-text" href="/services">
                {t('nav.services')}
              </Link>
              <Link className="text-text/80 hover:text-text" href="/contact">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex h-8 items-end text-xs uppercase tracking-wider text-text-muted">
              {t('footer.goodToKnow')}
            </div>
            <div className="mt-4 flex flex-col gap-2 text-sm leading-6 text-text-muted">
              <p>{t('footer.based')}</p>
              <p>{t('footer.area')}</p>
              <p>{t('footer.reply')}</p>
              <p
                className="flex items-center gap-3 text-text-muted/80"
                aria-label="Everyone is welcome — whoever you are, whoever you love, whatever you eat"
              >
                <SignFemale />
                <SignMale />
                <SignHeart />
                <SignLeaf />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-text/10 pt-6">
          <span className="text-xs tracking-[0.18em] text-text-muted">
            © 2026 Mexico with Kat
          </span>
        </div>
      </div>
    </footer>
  );
}
