import {getTranslations} from 'next-intl/server';
import {Suspense} from 'react';
import {Mail, MapPin, MessageCircle} from 'lucide-react';

import {FaqAccordion} from '@/components/contact/FaqAccordion';
import {InquiryForm} from '@/components/contact/InquiryForm';
import {JsonLd} from '@/components/seo/JsonLd';
import {faqSchema, graphSchema} from '@/lib/schema';
import {EMAIL, waLink} from '@/lib/contact';

export async function generateMetadata() {
  const t = await getTranslations('contact');
  return {
    title: `${t('title')} | Kat B. Private Tours`,
    description: t('subtitle')
  };
}

export default async function ContactPage() {
  const t = await getTranslations();
  const faqItems = [1, 2, 3, 4, 5, 6].map((n) => ({
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
        <h1 className="mt-3 text-4xl md:text-5xl">{t('contact.title')}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">
          {t('contact.subtitle')}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <a
            href={waLink("Hi Kat, I'm interested in a tour")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border border-text/10 bg-white/70 p-6 hover:border-accent/30"
          >
            <MessageCircle className="h-5 w-5 text-accent" />
            <h2 className="mt-4 text-lg">{t('contact.whatsapp.title')}</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              {t('contact.whatsapp.body')}
            </p>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-3xl border border-text/10 bg-white/70 p-6 hover:border-accent/30"
          >
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="mt-4 text-lg">{t('contact.email.title')}</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              {t('contact.email.body')}
            </p>
          </a>
          <div className="rounded-3xl border border-text/10 bg-white/70 p-6">
            <MapPin className="h-5 w-5 text-accent" />
            <h2 className="mt-4 text-lg">{t('contact.location.title')}</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              {t('contact.location.body')}
            </p>
            <p className="mt-3 text-sm text-text-muted">{t('contact.hours.body')}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-surface" />}>
            <InquiryForm />
          </Suspense>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
