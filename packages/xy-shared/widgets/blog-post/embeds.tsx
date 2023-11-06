// Nextra's markdown rendering is pretty nice, but for certain types of embeddable
// content like images and our interactive code viewer, we'd like to style them
// a bit differently.
//
// All of the embeds in this file are designed to be used in our blog posts and
// reflect our figma designs: occupying more horizontal space than the text
// content and having a rounded border.
//

import NxImage from 'next/image';
import { cn } from '@xyflow/xy-ui';

import { ReactPlayer, wideNegativeMargin } from '../../';

// IMAGES ----------------------------------------------------------------------

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  wide?: boolean;
  caption?: string;
  attribution?: string;
};

export function Image({
  src,
  alt,
  width = 0,
  height = 0,
  wide,
  caption,
  attribution,
}: ImageProps) {
  return (
    <figure className={`my-8 mx-0 ${wide && wideNegativeMargin}`}>
      <NxImage
        src={src}
        alt={alt}
        // Setting width/height to 0 means that the image we can use classes to
        // size it instead.
        width={width}
        height={height}
        sizes="100vw"
        className="w-full h-auto rounded-xl"
      />
      {attribution && (
        <a
          href={attribution}
          className="block mt-2 text-xs text-right text-gray-400"
        >
          source: {attribution}
        </a>
      )}
      {caption && (
        <figcaption className="mx-12 mt-2 font-semibold text-gray-400 text-center sm:mx-auto sm:w-3/4 lg:w-1/2">
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
  className?: string;
};

type IFrameProps = {
  loading?: 'lazy' | 'eager';
};

export function Embed({ src, lazy, className }: EmbedProps) {
  const iFrameProps: IFrameProps = {};

  if (lazy) {
    iFrameProps.loading = 'lazy';
  }

  return (
    <div
      className={cn(
        `relative aspect-video my-8 mx-0 ${wideNegativeMargin} rounded-xl bg-gray-50`,
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
};

export function YoutubeEmbed({ id }: YoutubeEmbedProps) {
  return (
    <div
      className={`relative aspect-video my-8 mx-0 ${wideNegativeMargin} rounded-xl bg-gray-50`}
    >
      <ReactPlayer
        controls
        url={`https://www.youtube.com/watch?v=${id}`}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
}
