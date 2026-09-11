import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {MapPin, Clock, Car} from 'lucide-react';

import type {Tour} from '@/data/tours';
import {BookTourButton} from '@/components/shared/BookTourButton';
import {ContactDropdown} from '@/components/shared/ContactDropdown';
import {TourTabs} from './TourTabs';
import {TourCard} from './TourCard';
import {HeroVideo} from './HeroVideo';

type GalleryItem = Tour['gallery'][number];

function GalleryTile({
  img,
  className
}: {
  img: GalleryItem;
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        'relative aspect-[4/3] overflow-hidden rounded-3xl border border-text/10'
      }
    >
      {img.video ? (
        <HeroVideo
          src={img.video}
          poster={img.src}
          alt={img.alt}
          objectPosition={img.objectPosition}
        />
      ) : (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );
}

function TourGallery({tour}: {tour: Tour}) {
  const isCobaPuzzle = tour.slug === 'half-day-jungle-adventure';
  const video = tour.gallery.find((item) => item.video);
  const photos = tour.gallery.filter((item) => !item.video);

  if (isCobaPuzzle && video) {
    const [topA, topB, rightA, rightB, ...bottom] = photos;
    return (
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {topA ? <GalleryTile img={topA} /> : null}
        {topB ? <GalleryTile img={topB} /> : null}
        <GalleryTile
          img={video}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-text/10 sm:aspect-auto sm:row-span-2 sm:h-full sm:min-h-0"
        />
        {rightA ? <GalleryTile img={rightA} /> : null}
        {rightB ? <GalleryTile img={rightB} /> : null}
        {bottom.map((img) => (
          <GalleryTile key={img.video ?? img.src} img={img} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {tour.gallery.map((img) => (
        <GalleryTile key={img.video ?? img.src} img={img} />
      ))}
    </div>
  );
}

export function TourDetail({
  tour,
  related
}: {
  tour: Tour;
  related: Tour[];
}) {
  const t = useTranslations();

  return (
    <div className="pt-24 bg-bg">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {tour.video ? (
            <HeroVideo
              src={tour.video.src}
              poster={tour.video.poster}
              alt={tour.image.alt}
              objectPosition={tour.video.objectPosition}
              priority
            />
          ) : (
            <Image
              src={tour.image.src}
              alt={tour.image.alt}
              fill
              className="object-cover [object-position:center_65%]"
              priority
              sizes="100vw"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(250,250,247,0.05) 0%, rgba(26,107,90,0.52) 100%)'
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pt-52 md:pb-44">
          <div className="max-w-3xl">
            <h1 className="text-4xl leading-[1.0] text-white md:text-6xl">
              {tour.name}
            </h1>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-0 pb-32">
        <div className="-mt-11 mb-10 grid gap-4 md:gap-8 rounded-3xl border border-text/10 bg-white p-5 md:p-6 shadow-md relative z-10 md:grid-cols-3">
          <div className="flex items-start gap-3 text-text">
            <Clock className="h-5 w-5 shrink-0 -mt-0.5 text-accent" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-muted">{t('tour.badge.duration')}</div>
              <div className="text-sm font-medium text-text">{tour.duration}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-text">
            <Car className="h-5 w-5 shrink-0 -mt-0.5 text-accent" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-muted">{t('tourDetail.transportLabel')}</div>
              <div className="text-sm font-medium text-text">{t('tourDetail.transportValue')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-text">
            <MapPin className="h-5 w-5 shrink-0 -mt-0.5 text-accent" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-muted">{t('tour.card.from')}</div>
              <div className="text-sm font-medium text-text">${tour.price}</div>
            </div>
          </div>
        </div>
        <TourTabs tour={tour} />

        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl">{t('tourDetail.gallery')}</h2>
          <TourGallery tour={tour} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl">{t('tourDetail.related')}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <TourCard key={r.slug} tour={r} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-text/10 bg-white/90 backdrop-blur-md shadow-[0_-8px_32px_rgba(28,28,26,0.12)]">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-text-muted">{t('tour.card.from')}</div>
              <div className="text-2xl font-bold text-text">${tour.price}</div>
            </div>
            <div className="flex gap-3">
              <div className="btn-pulse rounded-[900px]">
                <BookTourButton label={t('tourDetail.bookThis')} tourName={tour.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

