import {routing} from '@/i18n/routing';

/** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL if needed. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mexicowithkat.com'
).replace(/\/$/, '');

/** Path with locale prefix only when it is not the default (English). */
export function localizedPath(path: string, locale: string = routing.defaultLocale) {
  const suffix = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return suffix || '/';
  }
  return `/${locale}${suffix}`;
}

export function localizedUrl(path: string, locale: string = routing.defaultLocale) {
  const localized = localizedPath(path, locale);
  return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`;
}

export const BUSINESS_NAME = 'Kat B. Private Tours';
export const GUIDE_NAME = 'Kat B.';
export const AREA_SERVED = [
  'Playa del Carmen',
  'Tulum',
  'Cobá',
  'Akumal',
  'Riviera Maya',
  'Yucatán'
];

export const SAME_AS = [
  'https://www.toursbylocals.com/tour-guides/mexico/playa-del-carmen/guide-profile/kat-b-664d223396689af34337a5f5'
];
