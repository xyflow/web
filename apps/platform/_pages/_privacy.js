import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';

import { getMarkdown } from '../utils/browser/markdown';
import ContentPage from '../components/ContentPage';

export default function Terms({ source }) {
  return (
    <>
      <Head>
        <meta key="robots" name="robots" content="noindex,follow" />
        <meta key="googlebot" name="googlebot" content="noindex,follow" />
      </Head>
      <ContentPage markdownSource={source} />
    </>
  );
}

export async function getStaticProps() {
  const source = await getMarkdown('markdown/privacy-policy.md');
  const mdxSource = await serialize(source);

  return { props: { source: mdxSource } };
}
