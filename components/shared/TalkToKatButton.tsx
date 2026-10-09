'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {Mail, MessageCircle, X} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslations} from 'next-intl';

import {Button} from '@/components/shared/Button';
import {mailLink, waLink} from '@/lib/contact';

export function TalkToKatWindow({
  open,
  onClose,
  tourName
}: {
  open: boolean;
  onClose: () => void;
  tourName?: string;
}) {
  const t = useTranslations('tourDetail');
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const whatsappUrl = waLink(
    tourName
      ? `Hi Kat, I have a question about ${tourName}.`
      : 'Hi Kat, I have a question.'
  );
  const emailUrl = mailLink(
    tourName ? `Question about ${tourName}` : 'A question for Kat',
    tourName
      ? `Hi Kat,\n\nI have a question about ${tourName}.\n\n`
      : 'Hi Kat,\n\nI have a question.\n\n'
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 12}}
            transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
          >
            <div
              className="relative w-full max-w-[23rem] rounded-3xl bg-bg p-8 shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-text/10 bg-white/80 text-text hover:bg-surface transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="whitespace-pre-line pr-6 text-base leading-7 text-text">{t('talkGreeting')}</p>
              <div className="mt-6 grid gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-text/10 bg-white px-5 py-4 hover:border-accent/30 hover:bg-accent/5 transition-colors"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10">
                    <MessageCircle className="h-5 w-5 text-accent" />
                  </span>
                  <span className="text-sm font-medium text-text">WhatsApp</span>
                </a>
                <a
                  href={emailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-text/10 bg-white px-5 py-4 hover:border-accent/30 hover:bg-accent/5 transition-colors"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </span>
                  <span className="text-sm font-medium text-text">Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function TalkToKatLink({
  children,
  tourName
}: {
  children: ReactNode;
  tourName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-medium text-text underline decoration-text/30 underline-offset-4 hover:decoration-text"
      >
        {children}
      </button>
      <TalkToKatWindow open={open} onClose={() => setOpen(false)} tourName={tourName} />
    </>
  );
}

export function TalkToKatButton({
  label,
  tourName,
  variant = 'soft',
  className
}: {
  label: string;
  tourName?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'soft';
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={variant} className={className} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <TalkToKatWindow open={open} onClose={() => setOpen(false)} tourName={tourName} />
    </>
  );
}
