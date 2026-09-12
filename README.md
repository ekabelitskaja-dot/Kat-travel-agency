# Kat B. — Multilingual Personal Tour Guide Site

Multilingual (EN/ES/RU) personal website for **Kat B.**, a private tour guide based in **Playa del Carmen, Mexico**. Designed to feel personal, adventurous, and conversion-focused, with a persistent WhatsApp CTA.

## Tech stack
- **Next.js 14** (App Router)
- **Tailwind CSS v4** (CSS variables as design tokens via `@theme`)
- **Framer Motion** (page transitions + scroll reveals)
- **next-intl** (i18n routing + messages)
- **React Hook Form** (contact form UI + validation; submission is a stub for now)
- **Lucide React** (icons)
- **Fonts** (Google Fonts via `next/font/google`): **Playfair Display** (headings) + **DM Sans** (body)

## Local development
```bash
npm install
npm run dev
```

Open `http://localhost:3000` (it redirects to `/en`).

## i18n (EN / ES / RU)
- **Locales** live in `i18n/routing.ts`.
- **Middleware** (`middleware.ts`) handles locale detection/redirects.
- **Messages** live in:
  - `messages/en.json`
  - `messages/es.json`
  - `messages/ru.json`

Pages are routed under `app/[locale]/*`:
- Home: `app/[locale]/page.tsx`
- Tours: `app/[locale]/tours/page.tsx`
- Tour detail: `app/[locale]/tours/[slug]/page.tsx`
- Services: `app/[locale]/services/page.tsx`
- About: `app/[locale]/about/page.tsx`
- Contact: `app/[locale]/contact/page.tsx`

## Data-driven content
Local typed data sources:
- `data/tours.ts`
- `data/reviews.ts`
- `data/services.ts`

## Design tokens
Palette + tokens are defined in `app/globals.css` as CSS variables (e.g. `--color-accent`, `--color-surface`) and exposed to Tailwind via `@theme inline`.

## Customization checklist
- **Contact details**: WhatsApp number, display number and email all live in `lib/contact.ts`. Change them there only - every CTA imports from it via the `waLink()` / `mailLink()` helpers. `WA_PHONE` must be international digits only (country code + number, no `+`, spaces or dashes).
- **Domain / metadataBase**: update `metadataBase` in `app/layout.tsx` (currently `https://yourdomain.com`).
- **OG image**: metadata references `/og-image.jpg` (not included yet). Add a real file at `public/og-image.jpg`.
- **Photos**: placeholder photography uses Unsplash image URLs. Search for `TODO: Replace with real photo`.
- **Contact form delivery**: `components/contact/InquiryForm.tsx` logs form payload and shows a success state. Wire to an email/API route later.

## Deployment (Vercel)
This project is Vercel-compatible out of the box:

```bash
npm run build
npm run start
```

## ENV variables
None required right now.

When you connect email delivery later, we’ll add the needed keys (e.g. Resend API key) here.
