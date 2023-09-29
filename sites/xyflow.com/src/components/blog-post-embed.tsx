// Nextra's markdown rendering is pretty nice, but for certain types of YoutubeEmbeddable
// content like images and our interactive code viewer, we'd like to style them
// a bit differently.
//
// All of the YoutubeEmbeds in this file are designed to be used in our blog posts and
// reflect our figma designs: occupying more horizontal space than the text
// content and having a rounded border.
//

import NxImage from 'next/image';
import ExampleViewer from '@/components/example-viewer';
import ReactPlayer from '@/components/react-player-lazy';

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
    <figure className={`my-8 mx-0 ${wide && negativeMargin}`}>
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
        <figcaption className="mx-12 mt-2 font-semibold text-gray-400 sm:mx-auto sm:w-3/4 lg:w-1/2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// CODE VIEWER -----------------------------------------------------------------

export type CodeViewerProps = {
  codePath: string;
  additionalFiles?: string[];
  showEditor?: boolean;
  dependencies?: Record<string, string>;
  isTypescript?: boolean;
};

export function CodeViewer({
  codePath,
  additionalFiles = [],
  showEditor = false,
  dependencies = {},
  isTypescript = false,
}: CodeViewerProps) {
  return (
    <div className={`relative h-full mx-0 ${negativeMargin}`}>
      <ExampleViewer
        codePath={codePath}
        editorHeight={'50vh'}
        sandpackOptions={{
          editorWidthPercentage: 100,
          wrapContent: false,
          readOnly: false,
        }}
        additionalFiles={additionalFiles}
        showEditor={showEditor}
        dependencies={dependencies}
        isTypescript={isTypescript}
      />
    </div>
  );
}

// (IFRAME) EMBEDS -------------------------------------------------------------

export type EmbedProps = {
  src: string;
};

export function Embed({ src }: EmbedProps) {
  return (
    <div
      className={`relative aspect-video my-8 mx-0 ${negativeMargin} rounded-xl bg-gray-50`}
    >
      <iframe src={src} className="w-full h-full" />
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
      className={`relative aspect-video my-8 mx-0 ${negativeMargin} rounded-xl bg-gray-50`}
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

// UTILS -----------------------------------------------------------------------

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
//  As the display gets wider, we want to limit the width of our embeds to
//  something sensible so they don't end up spanning the entire width of someone's
//  ultrawide monitor. 12rem was chosen as an arbitrary sensible limit, it corresponds
//  to tailwind's `mx-44` utility.
//
const negativeMargin = 'sm:-mx-[min(calc((100vw-768px)/2),12rem)]';
