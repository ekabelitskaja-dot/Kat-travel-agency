'use client';

import {useState, useRef, useEffect} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {MessageCircle, Mail} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {mailLink, waLink} from '@/lib/contact';

export function FloatingContactButton() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const getWhatsAppUrl = () => {
    const message = "Hi Kat, I'm interested in a tour";
    return waLink(message);
  };

  const getEmailUrl = () => {
    const subject = 'Tour Inquiry';
    const body = "Hi Kat,\n\nI'm interested in booking a tour.\n\nThanks!";
    return mailLink(subject, body);
  };

  return (
    <div ref={dropdownRef} className="fixed bottom-5 right-5 z-50">
      {open && (
        <motion.div
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          className="absolute bottom-full right-0 mb-3 w-64 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] overflow-hidden"
        >
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F4FF]">
              <MessageCircle className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-medium text-text">WhatsApp</div>
            </div>
          </a>

          <div className="h-px bg-text/10" />

          <a
            href={getEmailUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F4FF]">
              <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-medium text-text">Email</div>
              <div className="text-xs text-text-muted">{t('contact.emailOption')}</div>
            </div>
          </a>
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Contact options"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#0E9E8A] text-white shadow-[0_18px_60px_rgba(255,140,66,0.35)]"
        initial={false}
        animate={
          reduced
            ? {opacity: 1}
            : {
                opacity: 1,
                scale: [1, 1.05, 1],
                rotate: [0, -8, 8, -8, 0]
              }
        }
        transition={
          reduced
            ? undefined
            : {
                scale: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                rotate: {
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut'
                }
              }
        }
        whileHover={reduced ? undefined : {scale: 1.1, rotate: 5}}
        whileTap={{scale: 0.95}}
      >
        <span className="pointer-events-none absolute -inset-2 rounded-full bg-[#0E9E8A]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  y: [0, -2, 0]
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
          }
        >
          <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </div>
  );
}
