import React from 'react';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';

import ExampleViewer from '../../../components/ExampleViewer';
import examples from '../../../config/examples';
import Layout from '../../../components/Layout';
import { getMarkdown } from '../../../utils/browser/markdown';
import authProtected from '../../../hocs/auth-protected';

const innerContainerProps = {
  pt: 0,
  pr: 0,
};

function Example({ mdxSource }) {
  const router = useRouter();
  const { id } = router.query;
  const exampleConfig = examples.find((ex) => ex.id === id);

  if (!id || !exampleConfig) {
    return null;
  }

  return (
    <Layout bg="white" type="app" innerContainerProps={innerContainerProps}>
      <ExampleViewer {...exampleConfig} mdxSource={mdxSource} {...mdxSource.frontmatter} />
    </Layout>
  );
}

export default authProtected(Example);

export async function getStaticProps(context) {
  try {
    const source = await getMarkdown(`examples/${context.params.id}/README.mdx`);
    const mdxSource = await serialize(source, { parseFrontmatter: true });
    return { props: { mdxSource } };
  } catch (err) {
    return { props: { mdxSource: null } };
  }
}

export async function getStaticPaths() {
  const paths = examples.map((example) => ({ params: { id: example.id } }));
  return {
    paths,
    fallback: false,
  };
}
