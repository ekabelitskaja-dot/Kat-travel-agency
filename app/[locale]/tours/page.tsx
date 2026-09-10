import {getTranslations} from 'next-intl/server';

import {tours} from '@/data/tours';
import {ToursCatalog} from '@/components/tours/ToursCatalog';
import {JsonLd} from '@/components/seo/JsonLd';
import {graphSchema} from '@/lib/schema';

export async function generateMetadata() {
  const t = await getTranslations('tours');
  return {
    title: `${t('title')} | Kat B. Private Tours`,
    description: t('subtitle')
  };
}

export default async function ToursPage() {
  const t = await getTranslations('tours');

  return (
    <div className="pt-28 pb-20">
      <JsonLd data={graphSchema([])} />
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
          {t('title')}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">
          {t('subtitle')}
        </p>
        <ToursCatalog tours={tours} />
      </div>
    </div>
  );
}
