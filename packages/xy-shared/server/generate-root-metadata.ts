import { Metadata } from 'next';

type RequiredMetadata = Required<
  Pick<Metadata, 'metadataBase' | 'keywords' | 'description'>
> &
  Metadata;

export function generateRootMetadata<T extends RequiredMetadata>(
  appName: string,
  { description, other, ...metadata }: T,
) {
  return {
    description: `${appName} - ${description}`,
    generator: 'Next.js',
    applicationName: appName,
    appleWebApp: {
      title: appName,
    },
    title: {
      default: appName,
      template: `%s - ${appName}`,
    },
    openGraph: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      url: './',
      locale: 'en_US',
      type: 'website',
      siteName: appName,
    },
    twitter: {
      site: 'https://x.com/xyflowdev',
      card: 'summary_large_image',
      creator: '@xyflowdev',
    },
    alternates: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      canonical: './',
    },
    ...metadata,
    other: {
      robots: 'index,follow',
      ...other,
    },
  };
}
