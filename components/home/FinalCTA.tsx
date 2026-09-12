'use client';

import {useTranslations} from 'next-intl';
import {Mail, MessageCircle} from 'lucide-react';
import {highlightAccent} from '@/components/shared/highlighted-text';
import {EMAIL, mailLink, waLink} from '@/lib/contact';

export function FinalCTA() {
  const t = useTranslations();

  const waUrl = waLink("Hi Kat, I'm interested in a tour");
  const emailUrl = mailLink('Tour Inquiry');

  return (
    <section id="contact" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div
          className="rounded-3xl border border-text/10 bg-white/65 backdrop-blur-sm p-10 md:p-14"
          style={{boxShadow: 'var(--shadow-soft)'}}
        >
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-3xl leading-[1.4] md:text-4xl">
                Tell me about your trip.<br />
                {highlightAccent("I'll figure out the rest.", "the rest.")}
              </h2>
              <p className="mt-5 max-w-md whitespace-pre-line text-base leading-8 text-gray-600">
                {t('finalCta.body')}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-text/10 bg-white px-5 py-4 hover:border-accent/30 hover:bg-accent/5 transition-colors"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10">
                  <MessageCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text">WhatsApp</div>
                </div>
              </a>

              <a
                href={emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-text/10 bg-white px-5 py-4 hover:border-accent/30 hover:bg-accent/5 transition-colors"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-text">Email</div>
                  <div className="break-all text-xs text-text-muted">{EMAIL}</div>
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

