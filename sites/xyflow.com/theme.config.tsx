import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://xyflow.com'
    : 'http://localhost:3001';

const faviconUrl = `${baseUrl}/img/favicon.ico`;
const faviconAppletouchUrl = `${baseUrl}/img/apple-touch-icon.png`;
const faviconSvgUrl = `${baseUrl}/img/favicon.svg`;

export default {
  // this is necessary to hide the github icon
  project: {},
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
  sidebar: {
    toggleButton: false,
  },
  head() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    const hasImage =
      frontMatter.image && frontMatter.imageWidth && frontMatter.imageHeight;

    const ogImage = {
      url: `${baseUrl}${hasImage || '/img/og/xyflow.jpg'}`,
      width: frontMatter.imageWidth,
      height: frontMatter.imageHeight,
    };

    const pageUrl = `${baseUrl}${router.asPath}`;

    // We are not allowed to render components inside head!
    // https://github.com/shuding/nextra/issues/3529
    return (
      <>
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
