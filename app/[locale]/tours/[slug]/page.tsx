import {notFound} from 'next/navigation';

import {tours, getTourBySlug} from '@/data/tours';
import {TourDetail} from '@/components/tours/TourDetail';
import {JsonLd} from '@/components/seo/JsonLd';
import {graphSchema, touristTripSchema} from '@/lib/schema';

export function generateStaticParams() {
  return tours.map((t) => ({slug: t.slug}));
}

export async function generateMetadata({params}: {params: {slug: string}}) {
  const tour = getTourBySlug(params.slug);
  if (!tour) return {};
  return {
    title: `${tour.name} | Kat B. Private Tours`,
    description: tour.tagline
  };
}

export default function TourPage({params}: {params: {slug: string; locale: string}}) {
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();

  const related = tours.filter(t => t.slug !== tour.slug);

  return (
    <>
      <JsonLd data={graphSchema([touristTripSchema(tour, params.locale)])} />
      <TourDetail tour={tour} related={related} />
    </>
  );
}
