import {useTranslations} from 'next-intl';

import {Accordion} from '@/components/shared/Accordion';

export function FaqAccordion() {
  const t = useTranslations();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{t('faq.title')}</p>
      <div className="mt-2">
        <Accordion
          defaultOpenId="q1"
          items={[1, 2, 3, 4, 5, 6, 7, 8].filter((n) => t.has(`faq.q${n}.question`)).map((n) => ({
            id: `q${n}`,
            question: t(`faq.q${n}.question`),
            answer: t(`faq.q${n}.answer`)
          }))}
        />
      </div>
    </div>
  );
}
