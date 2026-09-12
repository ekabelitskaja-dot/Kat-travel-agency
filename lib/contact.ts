/**
 * Single source of truth for Kat's contact details.
 * Update the number/email here only - every CTA on the site reads from this file.
 */

/** International format, digits only: country code + number. No +, spaces or dashes. */
export const WA_PHONE = '529841508096';

/** Human-readable version, used in labels and visible text. */
export const PHONE_DISPLAY = '+52 984 150 8096';

export const EMAIL = 'motiontravelmexico@gmail.com';

/** wa.me deep link - opens the WhatsApp app on mobile, WhatsApp Web on desktop. */
export function waLink(message: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Gmail compose in the browser — mailto: does nothing if there's no mail app. */
export function mailLink(subject: string, body?: string) {
  const query = [
    'view=cm',
    'fs=1',
    `to=${encodeURIComponent(EMAIL)}`,
    `su=${encodeURIComponent(subject)}`
  ];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `https://mail.google.com/mail/?${query.join('&')}`;
}
