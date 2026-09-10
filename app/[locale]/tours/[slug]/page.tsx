import {notFound} from 'next/navigation';

import {tours, getTourBySlug} from '@/data/tours';
import {TourDetail} from '@/components/tours/TourDetail';
import {stripEmphasis} from '@/components/shared/highlighted-text';

export function generateStaticParams() {
  return tours.map((t) => ({slug: t.slug}));
}

export async function generateMetadata({params}: {params: {slug: string}}) {
  const tour = getTourBySlug(params.slug);
  if (!tour) return {};
  return {
    title: `${tour.name} | Kat B. Private Tours`,
    description: stripEmphasis(tour.tagline)
  };
}

export default function TourPage({params}: {params: {slug: string}}) {
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();

  const related = tours.filter(t => t.slug !== tour.slug).slice(0, 3);

  return <TourDetail tour={tour} related={related} />;
}
