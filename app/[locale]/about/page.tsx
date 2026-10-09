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
  return (
    <div className="pt-20">
      <JsonLd data={graphSchema([])} />
      <WhyKat />
      <FinalCTA className="pt-16 md:pt-24" />
    </div>
  );
}
