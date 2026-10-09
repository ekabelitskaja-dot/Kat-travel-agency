import {getTranslations} from 'next-intl/server';
import {Mail, MessageCircle} from 'lucide-react';

import {FaqAccordion} from '@/components/contact/FaqAccordion';
import {JsonLd} from '@/components/seo/JsonLd';
import {faqSchema, graphSchema} from '@/lib/schema';
import {mailLink, waLink} from '@/lib/contact';

export async function generateMetadata() {
  const t = await getTranslations('tourDetail');
  const [title, description] = t('talkGreeting').split('\n\n');
  return {
    title: `${title} | Kat B. Private Tours`,
    description
  };
}

export default async function ContactPage() {
  const t = await getTranslations();
  const [greetingTitle, greetingBody] = t('tourDetail.talkGreeting').split('\n\n');
  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8].filter((n) => t.has(`faq.q${n}.question`)).map((n) => ({
    question: t(`faq.q${n}.question`),
    answer: t(`faq.q${n}.answer`)
  }));

  return (
    <div className="pt-28 pb-20">
      <JsonLd data={graphSchema([faqSchema(faqItems)])} />
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
          {t('nav.contact')}
        </p>
        <div className="max-w-3xl">
          <h1 className="mt-3 text-4xl md:text-5xl">{greetingTitle}</h1>
          <p className="mt-4 text-base leading-7 text-text-muted">{greetingBody}</p>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={waLink("Hi Kat, I'm interested in a tour")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-text/10 bg-white px-5 py-4 hover:border-accent/30 hover:bg-accent/5 transition-colors"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10">
                <MessageCircle className="h-5 w-5 text-accent" />
              </span>
              <span className="text-sm font-medium text-text">{t('contact.whatsapp.title')}</span>
            </a>
            <a
              href={mailLink('Tour Inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-text/10 bg-white px-5 py-4 hover:border-accent/30 hover:bg-accent/5 transition-colors"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10">
                <Mail className="h-5 w-5 text-accent" />
              </span>
              <span className="text-sm font-medium text-text">{t('contact.email.title')}</span>
            </a>
          </div>
          <p className="mt-6 text-sm leading-6 text-text-muted">{t('contact.hours.body')}</p>
        </div>
      </div>
    </div>
  );
}
