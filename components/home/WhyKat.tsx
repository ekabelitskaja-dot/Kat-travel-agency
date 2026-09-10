import {useTranslations} from 'next-intl';

import {AnimatedSection} from '@/components/shared/AnimatedSection';
import {SectionHeading} from '@/components/shared/SectionHeading';

export function WhyKat() {
  const t = useTranslations();

  const paragraphs = t.raw('whyKat.paragraphs') as string[];

  const Body = () => (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-8 text-gray-600">{p}</p>
      ))}
      <p className="text-base leading-8 text-gray-600 whitespace-pre-line">
        {t('whyKat.signoff')}
      </p>
    </>
  );

  return (
    <AnimatedSection className="overflow-hidden bg-[#e8ede8]">
      {/* Mobile: image on top, text below */}
      <div className="md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/guide/kat-private-tour-guide-mexico.jpg"
          alt="Kat B., private tour guide, in a stone passageway at the Cobá ruins"
          className="w-full h-[320px] object-cover object-[30%_78%]"
        />
        <div className="px-6 py-8 bg-white">
          <SectionHeading eyebrow={t('whyKat.eyebrow')} title={t('whyKat.title')} accentPhrase="you around!" />
          <div className="mt-8 grid gap-5">
            <Body />
          </div>
        </div>
      </div>

      {/* Desktop: two columns side by side */}
      <div className="hidden md:grid grid-cols-2 min-h-[600px]">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/guide/kat-private-tour-guide-mexico.jpg"
            alt="Kat B., private tour guide, in a stone passageway at the Cobá ruins"
            className="absolute inset-0 w-full h-full object-cover object-[30%_78%]"
          />
        </div>
        {/* Text column */}
        <div className="flex items-center px-12 py-14 lg:px-16 bg-white">
          <div>
            <SectionHeading eyebrow={t('whyKat.eyebrow')} title={t('whyKat.title')} accentPhrase="you around!" />
            <div className="mt-10 grid gap-5">
              <Body />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
