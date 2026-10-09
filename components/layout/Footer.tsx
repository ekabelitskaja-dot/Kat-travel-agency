'use client';

import {useTranslations} from 'next-intl';

import {EMAIL, mailLink} from '@/lib/contact';

function SignFemale() {
  return (
    <svg viewBox="5.85 1.85 12.3 21.5" className="h-[17.92px] w-[10.25px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="5.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 13.4v9.2M7.4 18.8h9.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SignAlien() {
  return (
    <svg viewBox="1.65 0.85 20.7 22.7" className="h-[18.92px] w-[17.25px]" fill="none" aria-hidden="true">
      <path
        d="M12 1.6C18.2 1.6 21.6 5.6 21.4 10.2 21.1 16 16.2 20.1 12 22.8 7.8 20.1 2.9 16 2.6 10.2 2.4 5.6 5.8 1.6 12 1.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="7.85"
        cy="10.5"
        rx="2.45"
        ry="3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(-24 7.85 10.5)"
      />
      <ellipse
        cx="16.15"
        cy="10.5"
        rx="2.45"
        ry="3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(24 16.15 10.5)"
      />
    </svg>
  );
}

function SignMale() {
  return (
    <svg viewBox="3.25 3.05 17.7 17.7" className="h-[14.75px] w-[14.75px]" fill="none" aria-hidden="true">
      <circle cx="9.4" cy="14.6" r="5.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.4 10.6 20.2 3.8M14.6 3.8H20.2v5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignNeutral() {
  return (
    <svg viewBox="0 28 250 592" className="h-5 w-[11.4px]" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <circle
        cx="134.96"
        cy="91.59"
        r="41.55"
        stroke="currentColor"
        strokeWidth="22"
      />
      <path
        d="M103.812,151.021C70.4141,151.681,51.1377,178.689,46.5264,193.985L6.4258,327.176C5.5273,330.195,5.1201,333.02,5.1201,335.628C5.1201,348.16,14.5381,355.677,24.292,355.677C32.0703,355.677,40.0625,350.897,43.6621,340.065L79.4658,216.899H89.4912L27.9082,433.155H85.1943V594.989C85.3877,609.69,96.4258,617.041,107.446,617.041C118.467,617.041,129.469,609.69,129.591,594.989V433.155H140.333V587.828C140.686,606.409,154.545,615.907,168.188,615.907C181.634,615.907,194.868,606.681,194.754,587.828V224.061H204.78V355.818C204.544,369.918,214.447,376.968,224.47,376.968C234.493,376.968,244.637,369.918,244.88,355.818V212.604C244.307,182.008,220.519,151.569,184.729,151.021H103.812Z"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignVegan() {
  return (
    <svg viewBox="3.65 3.05 19.9 18.1" className="h-[15.08px] w-[16.58px]" fill="none" aria-hidden="true">
      <path
        d="M4.4 5.2 12 20.4 16.5 10.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8 11.4c1.7-3.5 4.2-6.3 7-7.6-2.4.1-5 2.1-6.4 5.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8 10.5c1.4-2.6 3.4-4.8 5.6-6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterMark({src, width, shift}: {src: string; width: string; shift: string}) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 shrink-0 bg-current"
      style={{
        width,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: shift,
        maskPosition: shift,
        WebkitMaskSize: '20px 20px',
        maskSize: '20px 20px'
      }}
    />
  );
}

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-surface">
        <div className="h-px w-full bg-text/10" />
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex h-8 items-end text-xs uppercase tracking-wider text-text-muted">
            {t('footer.goodToKnow')}
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-text-muted">
            <p className="flex items-center gap-0.5">
              <span>{t('footer.reply')}</span>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
                <path
                  d="M12 20.4S4.2 14.6 4.2 9.4C4.2 6.7 6.3 4.8 8.9 4.8c1.5 0 2.8.8 3.1 2 0.3-1.2 1.6-2 3.1-2 2.6 0 4.7 1.9 4.7 4.6 0 5.2-7.8 11-7.8 11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <a
              href={mailLink('Tour Inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              {EMAIL}
            </a>
            <div className="h-px w-full bg-text/10" />
            <p
              className="flex items-center gap-3 text-text-muted/80"
              aria-label="Everyone is welcome"
            >
              <SignFemale />
              <SignNeutral />
              <SignMale />
              <SignAlien />
              <FooterMark src="/icons/mermaid-3.png" width="17.58px" shift="-1.21px 0" />
              <SignVegan />
              <FooterMark src="/icons/people.png" width="16.72px" shift="-1.64px 0" />
            </p>
            <p>{t('footer.welcome')}</p>
            <div className="h-px w-full bg-text/10" />
            <p>Playa del Carmen, Mexico</p>
            <p className="text-xs leading-none">
              English · Español · <span className="text-[10px]">Русский</span>
            </p>
          </div>

          <div className="mt-12">
            <div className="h-px w-full bg-text/10" />
            <span className="mt-6 block text-xs tracking-[0.18em] text-text-muted">
              © 2026 Mexico with Kat
            </span>
          </div>
        </div>
    </footer>
  );
}
