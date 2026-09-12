import {reviews} from '@/data/reviews';
import {tours, type Tour} from '@/data/tours';
import {EMAIL, PHONE_DISPLAY, WA_PHONE} from '@/lib/contact';
import {
  AREA_SERVED,
  BUSINESS_NAME,
  GUIDE_NAME,
  SAME_AS,
  SITE_URL,
  localizedUrl
} from '@/lib/site';

function durationToIso(duration: string) {
  const match = duration.match(/(\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  return `PT${match[1]}H`;
}

const personId = `${SITE_URL}/#kat`;
const businessId = `${SITE_URL}/#business`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: GUIDE_NAME,
    jobTitle: 'Private tour guide',
    description:
      'Kat B. is a private tour guide in Playa del Carmen, Mexico, running small-group cenote, Mayan ruin and jungle tours across the Riviera Maya in English, Spanish and Russian.',
    knowsLanguage: ['en', 'es', 'ru'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Playa del Carmen',
      addressRegion: 'Quintana Roo',
      addressCountry: 'MX'
    },
    url: SITE_URL,
    ...(SAME_AS.length ? {sameAs: SAME_AS} : {}),
    worksFor: {'@id': businessId}
  };
}

export function localBusinessSchema() {
  const ratingValue =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return {
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': businessId,
    name: BUSINESS_NAME,
    url: SITE_URL,
    email: EMAIL,
    telephone: `+${WA_PHONE}`,
    image: `${SITE_URL}/photos/guide/kat-private-tour-guide-mexico.jpg`,
    description:
      'Private tours in Playa del Carmen, Tulum, Cobá and the Riviera Maya. Cenotes, Mayan ruins and jungle adventures with an English, Spanish and Russian-speaking guide.',
    areaServed: AREA_SERVED.map((name) => ({
      '@type': 'Place',
      name
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Playa del Carmen',
      addressRegion: 'Quintana Roo',
      addressCountry: 'MX'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.6296,
      longitude: -87.0739
    },
    priceRange: '$$',
    currenciesAccepted: 'USD',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '08:00',
      closes: '20:00'
    },
    knowsLanguage: ['en', 'es', 'ru'],
    ...(SAME_AS.length ? {sameAs: SAME_AS} : {}),
    employee: {'@id': personId},
    founder: {'@id': personId},
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: {'@type': 'Person', name: r.name},
      reviewBody: r.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1
      },
      publisher: {'@type': 'Organization', name: r.source}
    })),
    makesOffer: tours.map((tour) => ({
      '@type': 'Offer',
      url: localizedUrl(`/tours/${tour.slug}`),
      name: tour.name,
      price: tour.price,
      priceCurrency: 'USD'
    }))
  };
}

export function touristTripSchema(tour: Tour, locale: string) {
  return {
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.description.replace(/\*\*/g, ''),
    url: localizedUrl(`/tours/${tour.slug}`, locale),
    image: `${SITE_URL}${tour.image.src}`,
    touristType: tour.groupSize,
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.highlights.map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name
      }))
    },
    provider: {'@id': businessId},
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: localizedUrl(`/tours/${tour.slug}`, locale)
    },
    ...(durationToIso(tour.duration)
      ? {duration: durationToIso(tour.duration)}
      : {})
  };
}

export function faqSchema(
  items: Array<{question: string; answer: string}>
) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function graphSchema(nodes: Array<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(), localBusinessSchema(), ...nodes]
  };
}

export {PHONE_DISPLAY};
