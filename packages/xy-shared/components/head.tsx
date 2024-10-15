export function Head({
  title,
  description,
  pageUrl,
  faviconUrl,
  ogImage,
  framework,
}: {
  title: string;
  description: string;
  pageUrl: string;
  faviconUrl: string;
  ogImage: {
    url: string;
    width?: string;
    height?: string;
  };
  framework?: string;
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />

      <link rel="icon" href={faviconUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@xyflowdev" />
      <meta name="twitter:creator" content="@xyflowdev" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />

      {ogImage && (
        <>
          <meta property="og:image" content={ogImage.url} />
          <meta property="og:image:alt" content="Teaser" />
          <meta property="og:image:width" content={ogImage.width ?? '1200'} />
          <meta property="og:image:height" content={ogImage.height ?? '640'} />
        </>
      )}

      {framework ? <meta name="docsearch:site" content={framework} /> : null}
    </>
  );
}
