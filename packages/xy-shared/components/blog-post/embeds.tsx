// Nextra's Markdown rendering is pretty nice, but for certain types of embeddable
// content like images and our interactive code viewer, we'd like to style them
// a bit differently.
//
// All the embeds in this file are designed to be used in our blog posts and
// reflect our Figma designs: occupying more horizontal space than the text
// content and having a rounded border.
//

import NxImage from 'next/image';
import { cn } from '../../lib/utils';

import { LiteYouTubeEmbed } from '../liteyoutube-embed';

// Well this is a pretty funky class, huh. I'm gonna try and break it down a bit
// so we can understand what's going on here:
//
// sm:
//  This is a tailwind breakpoint. It means the class will only apply on screens
//  that are at least 640px wide.
//
// -mx
//  This utility sets a *negative* margin, and its ultimately how we get our
//  content to be wider than its container.
//
// calc((100vw-768px)/2)
//  768px is the max width of our content container. 100vh is the full width of
//  the viewport. So this expression calculates how much space is left on the
//  screen for us to fill. We divide it by two because we're applying this margin
//  equally on both sides of the embed.
//
// min(...,12rem)
//  As the display gets wider, we want to limit the width of our embeds to do
//  something sensible so they don't end up spanning the entire width of someone's
//  ultra-wide monitor. 12rem was chosen as an arbitrary sensible limit, it corresponds
//  to tailwind's `mx-44` utility.
//
// Use the actual content width token if available, fall back to 768px.
const wideNegativeMargin =
  'sm:-mx-[min(calc((100vw-var(--nextra-content-width,768px))/2),12rem)]';

// IMAGES ----------------------------------------------------------------------

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  wide?: boolean;
  caption?: string;
  attribution?: string;
  className?: string;
  imageClassName?: string;
};

export function Image({
  src,
  alt,
  width = 0,
  height = 0,
  wide,
  caption,
  attribution,
  className,
  imageClassName,
}: ImageProps) {
  return (
    <figure className={cn('my-8 mx-0', wide && wideNegativeMargin, className)}>
      <NxImage
        src={src}
        alt={alt}
        // Setting width/height to 0 means that the image we can use classes to
        // size it instead.
        width={width}
        height={height}
        sizes="100vw"
        className={cn('w-full h-auto rounded-xl', imageClassName)}
      />
      {attribution && (
        <a href={attribution} className="block mt-2 text-xs text-right text-gray-400">
          source: {attribution}
        </a>
      )}
      {caption && (
        <figcaption className="mx-6 mt-2 text-gray-400 text-center sm:mx-auto w-3/4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// (IFRAME) EMBEDS -------------------------------------------------------------

export type EmbedProps = {
  src: string;
  lazy?: boolean;
  wide?: boolean;
  className?: string;
};

type IFrameProps = {
  loading?: 'lazy' | 'eager';
};

export function Embed({ src, lazy, wide = true, className }: EmbedProps) {
  const iFrameProps: IFrameProps = {};

  if (lazy) {
    iFrameProps.loading = 'lazy';
  }

  return (
    <div
      className={cn(
        'relative aspect-video my-8 mx-0 rounded-xl bg-gray-50',
        wide && wideNegativeMargin,
        className,
      )}
    >
      <iframe src={src} {...iFrameProps} className="w-full h-full" />
    </div>
  );
}

// YoutubeEmbed ----------------------------------------------------------------

export type YoutubeEmbedProps = {
  id: string;
  title?: string;
};

export function YoutubeEmbed({ id, title = 'youtube embed' }: YoutubeEmbedProps) {
  return (
    <div
      className={cn(
        'relative aspect-video my-8 mx-0 rounded-xl bg-gray-50',
        wideNegativeMargin,
      )}
    >
      <LiteYouTubeEmbed
        id={id}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title={title}
        poster="maxresdefault"
      />
    </div>
  );
}
