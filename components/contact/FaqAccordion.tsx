import {useTranslations} from 'next-intl';

import {Accordion} from '@/components/shared/Accordion';

export function FaqAccordion() {
  const t = useTranslations();

  return (
    <div>
      <h2 className="text-2xl md:text-3xl">{t('faq.title')}</h2>
      <div className="mt-6">
        <Accordion
          defaultOpenId="q1"
          items={[1, 2, 3, 4, 5, 6].map((n) => ({
            id: `q${n}`,
            question: t(`faq.q${n}.question`),
            answer: t(`faq.q${n}.answer`)
          }))}
        />
      </div>
    </div>
  );
}
