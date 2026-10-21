import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/tours/half-day-jungle-adventure',
        destination: '/tours/coba-and-the-maya-underworld',
        permanent: true
      },
      {
        source: '/:locale(es|ru)/tours/half-day-jungle-adventure',
        destination: '/:locale/tours/coba-and-the-maya-underworld',
        permanent: true
      }
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default withNextIntl(nextConfig);

