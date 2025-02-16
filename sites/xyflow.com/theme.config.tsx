import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, Logo, Text } from '@xyflow/xy-ui';

const defaultDescription =
  'Open source libraries for creating interactive workflows, dynamic diagrams and custom node-based UIs.';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://xyflow.com'
    : 'http://localhost:3001';

const faviconUrl = `${baseUrl}/img/favicon.ico`;
const faviconAppletouchUrl = `${baseUrl}/img/apple-touch-icon.png`;
const faviconSvgUrl = `${baseUrl}/img/favicon.svg`;

export default {
  docsRepositoryBase:
    'https://github.com/xyflow/web/tree/main/sites/xyflow.com',
  // this is necessary to hide the github icon
  project: {},
  darkMode: false,
  nextThemes: {
    forcedTheme: 'light',
    defaultTheme: 'light',
  },
  search: {
    component: undefined,
  },
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
  color: {
    hue: 333,
    saturation: 100,
  },
  toc: {
    backToTop: null,
  },
  sidebar: {
    toggleButton: false,
  },
  head() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    const title = frontMatter.title
      ? `${frontMatter.title} - xyflow`
      : 'xyflow';

    const hasImage =
      frontMatter.image && frontMatter.imageWidth && frontMatter.imageHeight;

    const ogImage = {
      url: `${baseUrl}${hasImage || '/img/og/xyflow.jpg'}`,
      width: frontMatter.imageWidth,
      height: frontMatter.imageHeight,
    };

    const description = frontMatter.description ?? defaultDescription;
    const pageUrl = `${baseUrl}${router.asPath}`;

    // We are not allowed to render components inside head!
    // https://github.com/shuding/nextra/issues/3529
    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />

        <link rel="icon" href={faviconUrl} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={faviconAppletouchUrl}
        />
        <link rel="icon" href={faviconSvgUrl} type="image/svg+xml" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://x.com/xyflowdev" />
        <meta name="twitter:creator" content="@xyflowdev" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage.url} />
            <meta property="og:image:alt" content="Teaser" />
            <meta property="og:image:width" content={ogImage.width} />
            <meta property="og:image:height" content={ogImage.height} />
          </>
        )}
      </>
    );
  },
};
