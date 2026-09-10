import type {MetadataRoute} from 'next';

import {tours} from '@/data/tours';
import {routing} from '@/i18n/routing';
import {localizedUrl} from '@/lib/site';

const staticPaths = ['/', '/tours', '/about', '/services', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = [
    ...staticPaths,
    ...tours.map((tour) => `/tours/${tour.slug}`)
  ];

  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(path, locale)])
      ),
      'x-default': localizedUrl(path)
    };

    return routing.locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified,
      alternates: {languages}
    }));
  });
}
