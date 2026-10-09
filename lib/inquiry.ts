import {EMAIL, mailLink, waLink} from '@/lib/contact';
import {SITE_URL} from '@/lib/site';

export type ContactMethod = 'email' | 'whatsapp';

export type InquiryInput = {
  fullName?: string;
  contactMethod?: string;
  email?: string;
  phone?: string;
  tour?: string;
  dateFrom?: string;
  dateTo?: string;
  datesFlexible?: string;
  otherDates?: string;
  groupSize?: number;
  accommodation?: string;
  message?: string;
  company?: string;
};

export type Inquiry = {
  fullName: string;
  contactMethod: ContactMethod;
  email?: string;
  phone?: string;
  tour: string;
  dateFrom: string;
  dateTo?: string;
  datesFlexible?: 'yes' | 'no';
  otherDates?: string;
  groupSize: number;
  accommodation?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function clean(value: string | undefined, max: number) {
  const text = value?.replace(/\s+/g, ' ').trim() ?? '';
  return text.slice(0, max);
}

function isRealDate(value: string) {
  if (!DATE_RE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function parseInquiry(input: InquiryInput): {inquiry: Inquiry} | {error: string} {
  if (clean(input.company, 200)) return {error: 'Unable to send this inquiry.'};

  const fullName = clean(input.fullName, 120);
  if (fullName.length < 2) return {error: 'Please enter your name.'};

  const contactMethod = input.contactMethod;
  if (contactMethod !== 'email' && contactMethod !== 'whatsapp') {
    return {error: 'Choose email or WhatsApp.'};
  }

  const email = clean(input.email, 200);
  const phone = clean(input.phone, 40);
  if (contactMethod === 'email' && !EMAIL_RE.test(email)) {
    return {error: 'Please enter a valid email.'};
  }
  if (contactMethod === 'whatsapp' && phone.replace(/\D/g, '').length < 8) {
    return {error: 'Please enter a phone number with a country code.'};
  }

  const dateFrom = clean(input.dateFrom, 10);
  const dateTo = clean(input.dateTo, 10);
  if (!isRealDate(dateFrom)) return {error: 'Please select a start date.'};
  if (dateTo && !isRealDate(dateTo)) return {error: 'Please select a valid end date.'};
  if (dateTo && dateTo < dateFrom) return {error: 'The end date is before the start date.'};

  const datesFlexible =
    input.datesFlexible === 'yes' || input.datesFlexible === 'no' ? input.datesFlexible : undefined;
  const otherDates =
    datesFlexible === 'yes' ? input.otherDates?.trim().slice(0, 500) || undefined : undefined;

  const groupSize = Number(input.groupSize);
  if (!Number.isInteger(groupSize) || groupSize < 1 || groupSize > 11) {
    return {error: 'Please choose how many people are coming.'};
  }

  return {
    inquiry: {
      fullName,
      contactMethod,
      email: contactMethod === 'email' ? email : undefined,
      phone: contactMethod === 'whatsapp' ? phone : undefined,
      tour: clean(input.tour, 200) || 'Not sure yet',
      dateFrom,
      dateTo: dateTo || undefined,
      datesFlexible,
      otherDates,
      groupSize,
      accommodation: clean(input.accommodation, 200) || undefined,
      message: input.message?.trim().slice(0, 2000) || undefined
    }
  };
}

function formatDay(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatDates(inquiry: Inquiry) {
  return inquiry.dateTo
    ? `${formatDay(inquiry.dateFrom)} – ${formatDay(inquiry.dateTo)}`
    : formatDay(inquiry.dateFrom);
}

export function inquiryText(inquiry: Inquiry) {
  const dates = formatDates(inquiry);
  const contact =
    inquiry.contactMethod === 'email'
      ? `Email: ${inquiry.email}`
      : `WhatsApp: ${inquiry.phone}`;
  const group = inquiry.groupSize >= 11 ? '10+' : String(inquiry.groupSize);

  return [
    `Name: ${inquiry.fullName}`,
    `Prefers to be contacted by ${inquiry.contactMethod === 'email' ? 'email' : 'WhatsApp'}`,
    contact,
    `Tour: ${inquiry.tour}`,
    `Preferred date: ${dates}`,
    ...(inquiry.datesFlexible
      ? [`Dates flexible: ${inquiry.datesFlexible === 'yes' ? 'Yes' : 'No'}`]
      : []),
    ...(inquiry.otherDates ? [`Other dates that work: ${inquiry.otherDates}`] : []),
    `Group size: ${group}`,
    `Staying: ${inquiry.accommodation || 'Not specified'}`,
    '',
    inquiry.message || 'No extra message.'
  ].join('\n');
}

export function inquiryWhatsAppUrl(inquiry: Inquiry) {
  return waLink(`Hi Kat, I'd like to book a tour.\n\n${inquiryText(inquiry)}`);
}

export function inquiryMailUrl(inquiry: Inquiry) {
  return mailLink(`Tour inquiry from ${inquiry.fullName}`, inquiryText(inquiry));
}

export async function deliverInquiryEmail(inquiry: Inquiry, pageUrl = `${SITE_URL}/`) {
  const text = inquiryText(inquiry);
  let origin = SITE_URL;
  try {
    origin = new URL(pageUrl).origin;
  } catch {
    origin = SITE_URL;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: origin,
      Referer: pageUrl
    },
    body: JSON.stringify({
      _subject: `Tour inquiry from ${inquiry.fullName}`,
      _template: 'box',
      _captcha: 'false',
      ...(inquiry.email ? {_replyto: inquiry.email, email: inquiry.email} : {}),
      name: inquiry.fullName,
      contact_method: inquiry.contactMethod === 'email' ? 'Email' : 'WhatsApp',
      phone: inquiry.phone ?? '',
      tour: inquiry.tour,
      dates: formatDates(inquiry),
      dates_flexible: inquiry.datesFlexible === 'yes' ? 'Yes' : inquiry.datesFlexible === 'no' ? 'No' : '',
      other_dates: inquiry.otherDates ?? '',
      group_size: inquiry.groupSize >= 11 ? '10+' : String(inquiry.groupSize),
      accommodation: inquiry.accommodation ?? '',
      message: text
    })
  });

  let payload: {success?: string | boolean; message?: string} = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  const message = payload.message ?? '';
  if (/activat/i.test(message)) return {ok: false as const, code: 'activation_required' as const};
  if (!response.ok || String(payload.success) === 'false') {
    return {ok: false as const, code: 'delivery_failed' as const};
  }
  return {ok: true as const};
}
