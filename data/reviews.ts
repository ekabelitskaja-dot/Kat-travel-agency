export type Review = {
  name: string;
  rating: 5;
  quote: string;
  source: 'Google Reviews' | 'TripAdvisor';
  sourceUrl: string;
};

export const reviews: Review[] = [
  {
    name: 'George Kourtelis',
    rating: 5,
    quote:
      'Exceptional Tour Guide! We had the pleasure of joining a tour with Kat as a group of 25 people, and the experience was flawless from start to finish.',
    source: 'Google Reviews',
    sourceUrl: 'https://share.google/58ywIsUWfP5vLFVdG'
  },
  {
    name: 'dianeg4148',
    rating: 5,
    quote:
      'Kat, as the leader, was terrific! She was prompt for our early morning pickup and provided snacks and cold water for our van ride to Coba.',
    source: 'TripAdvisor',
    sourceUrl: 'https://www.tripadvisor.com'
  },
  {
    name: 'Emily H.',
    rating: 5,
    quote:
      "We had three generations on this trip. Kat managed to keep everyone happy, which I wasn't sure was possible. Honestly, best day of the whole vacation.",
    source: 'TripAdvisor',
    sourceUrl: 'https://www.tripadvisor.com'
  },
  {
    name: 'Rebecca M.',
    rating: 5,
    quote:
      'We booked the snorkeling tour for our anniversary and Kat made it genuinely special. She knew exactly when and where the sea turtles would be.',
    source: 'Google Reviews',
    sourceUrl: 'https://www.google.com/maps'
  },
  {
    name: 'Eva Katherine',
    rating: 5,
    quote:
      'We had an incredible time on our adventure with Kat. She was super fun and professional and her joy and passion for adventure in Mexico was infectious!!!',
    source: 'Google Reviews',
    sourceUrl: 'https://share.google/C9wfBDz3Z7fFLNTFE'
  }
];
