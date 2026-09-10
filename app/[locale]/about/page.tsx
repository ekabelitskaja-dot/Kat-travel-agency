import {getTranslations} from 'next-intl/server';

import {WhyKat} from '@/components/home/WhyKat';
import {FinalCTA} from '@/components/home/FinalCTA';
import {JsonLd} from '@/components/seo/JsonLd';
import {graphSchema} from '@/lib/schema';

export async function generateMetadata() {
  const t = await getTranslations('about');
  return {
    title: `${t('title')} | Kat B. Private Tours`,
    description: t('intro')
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <div className="pt-20">
      <JsonLd data={graphSchema([])} />
      <WhyKat />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl">{t('why')}</h2>
        <p className="mt-4 text-base leading-8 text-text-muted">{t('whyBody')}</p>
        <h2 className="mt-12 text-2xl md:text-3xl">{t('experience')}</h2>
        <p className="mt-4 text-base leading-8 text-text-muted">{t('experienceBody')}</p>
        <h2 className="mt-12 text-2xl md:text-3xl">{t('promise')}</h2>
        <p className="mt-4 text-base leading-8 text-text-muted">{t('promiseBody')}</p>
      </section>
      <FinalCTA />
    </div>
  );
}
