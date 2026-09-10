import type {Metadata} from 'next';
import {DM_Sans, Oswald} from 'next/font/google';

import {SITE_URL} from '@/lib/site';
import './globals.css';

/** Headings (h1/h2/h3) and the "Kat B." wordmark. */
const heading = Oswald({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const body = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap'
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Kat B. | Private Tour Guide in Playa del Carmen, Mexico',
  description:
    "Private tours in Playa del Carmen, Tulum, Cobá & the Riviera Maya. Cenotes, Mayan ruins, jungle adventures. English, Spanish & Russian-speaking guide."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
