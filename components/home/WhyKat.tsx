import {useTranslations} from 'next-intl';

import {AnimatedSection} from '@/components/shared/AnimatedSection';
import {BookTourButton} from '@/components/shared/BookTourButton';
import {BlobHighlight, renderMarkedText} from '@/components/shared/highlighted-text';
import {SectionHeading} from '@/components/shared/SectionHeading';

export function WhyKat() {
  const t = useTranslations();

  const paragraphs = t.raw('whyKat.paragraphs') as string[];

  const Copy = () => (
    <>
      {paragraphs.map((p, i) => {
        const sectionLabel = p.match(/^\*\*([^*]+)\*\*$/);
        if (sectionLabel) {
          return (
            <p key={i} className="text-base leading-7">
              <BlobHighlight>{sectionLabel[1]}</BlobHighlight>
            </p>
          );
        }

        const lines = p.split('\n');
        if (lines.length > 1) {
          return (
            <div key={i} className="grid gap-3.5">
              {lines.map((line) => (
                <p key={line} className="text-base leading-7 text-gray-600">
                  {renderMarkedText(line)}
                </p>
              ))}
            </div>
          );
        }

        return (
          <p key={i} className="text-base leading-7 text-gray-600">
            {renderMarkedText(p)}
          </p>
        );
      })}
      <p className="text-base leading-7 text-gray-600 whitespace-pre-line">
        {t('whyKat.signoff')}
      </p>
    </>
  );

  const Cta = ({className}: {className: string}) => (
    <div className={className}>
      <BookTourButton label={t('tourDetail.talkToKat')} />
    </div>
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
        <div className="bg-white px-6 pb-3 pt-6">
          <SectionHeading eyebrow={t('whyKat.eyebrow')} title={t('whyKat.title')} accentPhrase="show you around!" />
          <div className="mt-6 grid gap-3.5">
            <Copy />
          </div>
          <Cta className="-ml-5 pt-6" />
        </div>
      </div>

      {/* Desktop: two columns side by side */}
      <div className="hidden md:grid grid-cols-2">
        <div className="relative min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/guide/kat-private-tour-guide-mexico.jpg"
            alt="Kat B., private tour guide, in a stone passageway at the Cobá ruins"
            className="absolute inset-0 w-full h-full object-cover object-[30%_78%]"
          />
        </div>
        <div className="flex items-start bg-white px-12 pb-4 pt-10 lg:px-16">
          <div>
            <SectionHeading eyebrow={t('whyKat.eyebrow')} title={t('whyKat.title')} accentPhrase="show you around!" />
            <div className="mt-6 grid gap-3.5">
              <Copy />
            </div>
            <Cta className="-ml-5 pt-10" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
