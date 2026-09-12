'use client';

import {useState, useRef, useEffect} from 'react';
import {ChevronDown, MessageCircle, Mail} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from './Button';
import {mailLink, waLink} from '@/lib/contact';

interface ContactDropdownProps {
  tourName?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}


export function ContactDropdown({
  tourName,
  variant = 'primary',
  className = '',
  size = 'md'
}: ContactDropdownProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const message = tourName
      ? `Hi Kat, I'm interested in the tour: ${tourName}`
      : "Hi Kat, I'm interested in a tour";
    return waLink(message);
  };

  const getEmailUrl = () => {
    const subject = tourName ? `Inquiry about: ${tourName}` : 'Tour Inquiry';
    const body = tourName
      ? `Hi Kat,\n\nI'm interested in learning more about the ${tourName} tour.\n\nThanks!`
      : "Hi Kat,\n\nI'm interested in booking a tour.\n\nThanks!";
    return mailLink(subject, body);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button
        variant={variant}
        size={size}
        className={`${className} flex items-center gap-2`}
        onClick={() => setOpen(!open)}
      >
        {t('contact.chooseMethod')}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </Button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 w-full min-w-[200px] rounded-2xl border border-text/10 bg-white shadow-card overflow-hidden z-50">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/10">
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/10">
              <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-medium text-text">Email</div>
              <div className="text-xs text-text-muted">{t('contact.emailOption')}</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
