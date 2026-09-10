import {useTranslations} from 'next-intl';

import {tours} from '@/data/tours';
import {Link} from '@/i18n/navigation';
import {AnimatedSection} from '@/components/shared/AnimatedSection';
import {SectionHeading} from '@/components/shared/SectionHeading';
import {TourCard} from '@/components/tours/TourCard';
import {ExperienceBuilderCard} from '@/components/tours/ExperienceBuilderCard';
import {Button} from '@/components/shared/Button';

export function FeaturedTours() {
  const t = useTranslations();

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="flex justify-center">
        <SectionHeading
          eyebrow={t('featuredTours.eyebrow')}
          title={t('featuredTours.title')}
          align="center"
          accentPhrase="worth"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
        <ExperienceBuilderCard />
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/tours">
          <Button size="md">{t('featuredTours.cta')}</Button>
        </Link>
      </div>
    </AnimatedSection>
  );
}

