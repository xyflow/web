const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://xyflow.com'
    : 'http://localhost:3001';

export default {
  // this is necessary to hide the github icon
  project: {},
  sidebar: {
    toggleButton: false,
  },
  head() {
    const hasImage =
      frontMatter.image && frontMatter.imageWidth && frontMatter.imageHeight;

    const ogImage = {
      url: `${baseUrl}${hasImage || '/img/og/xyflow.jpg'}`,
      width: frontMatter.imageWidth,
      height: frontMatter.imageHeight,
    };
    return (
      <>
        <meta property="og:image" content={ogImage.url} />
        <meta property="og:image:alt" content="Teaser" />
        <meta property="og:image:width" content={ogImage.width} />
        <meta property="og:image:height" content={ogImage.height} />
      </>
    );
  },
};
