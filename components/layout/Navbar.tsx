'use client';

import {useEffect, useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Menu, X} from 'lucide-react';

import {Link, usePathname} from '@/i18n/navigation';
import {Button} from '@/components/shared/Button';
import {useBookingModal} from '@/components/shared/BookingModal';

function NavLink({
  href,
  children,
  onNavigate,
  transparent
}: {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  transparent?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={[
        'text-sm transition-colors duration-300 px-3 py-1.5 rounded-full',
        transparent
          ? 'text-white/90 hover:text-white hover:bg-white/15'
          : 'text-text/80 hover:text-text hover:bg-white/60'
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();

  // next-intl's usePathname strips the locale - home is always '/'
  const isHome = useMemo(() => pathname === '/', [pathname]);

  const {open: openModal} = useBookingModal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (!isHome) {
      setScrolled(true);
      return;
    }
    setScrolled(window.scrollY > 40);
  }, [isHome, pathname]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow"
      >
        {t('nav.skipToContent')}
      </a>

      <div
        className={[
          'mx-auto max-w-7xl px-4 md:px-6 transition-all duration-300',
          scrolled ? 'pt-2 md:pt-3' : 'pt-3 md:pt-5'
        ].join(' ')}
      >
        <div
          className={[
            'rounded-2xl border transition-all duration-300',
            scrolled
              ? 'bg-white/70 backdrop-blur-xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.10)]'
              : 'bg-transparent border-transparent'
          ].join(' ')}
        >
          <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="inline-flex flex-col items-stretch font-serif text-lg tracking-tight md:text-xl"
                aria-label="Mexico with Kat Home"
              >
                <span
                  style={{
                    background: 'linear-gradient(100deg, #00D4FF -8.86%, #2EE0B4 104.42%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Mexico with Kat
                </span>
                <span
                  className="mt-1 h-px w-full"
                  style={{
                    background: transparent
                      ? 'rgba(255,255,255,0.7)'
                      : 'linear-gradient(100deg, #00D4FF -8.86%, #2EE0B4 104.42%)'
                  }}
                  aria-hidden="true"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                <NavLink href="/tours" transparent={transparent}>{t('nav.tours')}</NavLink>
                <NavLink href="/about" transparent={transparent}>{t('nav.about')}</NavLink>
                <NavLink href="/services" transparent={transparent}>{t('nav.services')}</NavLink>
                <NavLink href="/contact" transparent={transparent}>{t('nav.contact')}</NavLink>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {transparent ? (
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="hidden md:inline-block rounded-full border border-white/60 px-5 py-2 text-sm text-white transition-colors hover:bg-white/15"
                >
                  {t('nav.bookNow')}
                </button>
              ) : (
                <Button size="md" className="hidden md:inline-flex" onClick={() => openModal()}>
                  {t('nav.bookNow')}
                </Button>
              )}

              <button
                type="button"
                className={[
                  'md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300',
                  transparent
                    ? 'border-white/40 text-white hover:bg-white/15'
                    : 'border-white/40 bg-white/70 backdrop-blur-md text-text hover:bg-white/90'
                ].join(' ')}
                onClick={() => setOpen(v => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden px-6 pb-4">
              <div className="flex flex-col gap-2 rounded-xl bg-white/80 backdrop-blur-xl border border-white/40 p-4">
                <NavLink href="/tours" onNavigate={() => setOpen(false)}>{t('nav.tours')}</NavLink>
                <NavLink href="/about" onNavigate={() => setOpen(false)}>{t('nav.about')}</NavLink>
                <NavLink href="/services" onNavigate={() => setOpen(false)}>{t('nav.services')}</NavLink>
                <NavLink href="/contact" onNavigate={() => setOpen(false)}>{t('nav.contact')}</NavLink>
                <Button
                  className="w-full mt-1"
                  onClick={() => {
                    setOpen(false);
                    openModal();
                  }}
                >
                  {t('nav.bookNow')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
