import {getTranslations} from 'next-intl/server';

import {Services} from '@/components/home/Services';
import {FinalCTA} from '@/components/home/FinalCTA';
import {JsonLd} from '@/components/seo/JsonLd';
import {graphSchema} from '@/lib/schema';

export async function generateMetadata() {
  const t = await getTranslations('services');
  return {
    title: `${t('title')} | Kat B. Private Tours`,
    description: t('subtitle')
  };
}

export default async function ServicesPage() {
  return (
    <div className="pt-20">
      <JsonLd data={graphSchema([])} />
      <Services />
      <FinalCTA />
    </div>
  );
}
