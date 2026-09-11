'use client';

import {useEffect, useRef} from 'react';
import Image from 'next/image';
import {useReducedMotion} from 'framer-motion';

type Props = {
  src: string;
  /** Shown as the poster frame, and used on its own when motion is reduced. */
  poster: string;
  alt: string;
  objectPosition?: string;
  /** Only the hero should preload eagerly; gallery tiles sit below the fold. */
  priority?: boolean;
  /** `cover` fills a cropped frame. `native` keeps the video's own aspect ratio. */
  fit?: 'cover' | 'native' | 'nativeUntilSm';
};

/**
 * Looping, muted background video for a page hero.
 *
 * `muted` + `playsInline` are what make autoplay work on iOS - without both,
 * mobile Safari refuses to start the clip. If the guest prefers reduced motion
 * we skip the video entirely and render the poster image instead.
 */
export function HeroVideo({
  src,
  poster,
  alt,
  objectPosition = 'center',
  priority = false,
  fit = 'cover'
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const native = fit === 'native';
  const nativeUntilSm = fit === 'nativeUntilSm';
  const videoClassName = native
    ? 'h-auto w-full'
    : nativeUntilSm
      ? 'h-auto w-full sm:absolute sm:inset-0 sm:h-full sm:w-full sm:object-cover'
      : 'absolute inset-0 h-full w-full object-cover';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Some browsers reject the autoplay promise; the poster stays visible.
    el.play().catch(() => {});
  }, []);

  if (reduced) {
    if (native) {
      return (
        <Image
          src={poster}
          alt={alt}
          width={1920}
          height={1080}
          priority={priority}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );
    }
    if (nativeUntilSm) {
      return (
        <Image
          src={poster}
          alt={alt}
          width={1920}
          height={1080}
          priority={priority}
          className="h-auto w-full sm:absolute sm:inset-0 sm:h-full sm:w-full sm:object-cover"
          style={{objectPosition}}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );
    }
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        style={{objectPosition}}
        sizes="100vw"
      />
    );
  }

  return (
    <video
      ref={ref}
      className={videoClassName}
      style={native ? undefined : {objectPosition}}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  );
}
