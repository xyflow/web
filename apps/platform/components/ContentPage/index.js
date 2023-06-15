import React from 'react';
import { chakra, Box, Heading, Text, Link } from '@chakra-ui/react';
import { MDXRemote } from 'next-mdx-remote';

import Layout from '../Layout';
import Card from '../Card';

const createAnchorId = (children) => {
  if (typeof children === 'string') {
    return children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  return null;
};

export const markdownComponents = {
  ul: (props) => <chakra.ul m="0" my={2} pl={6} {...props} />,
  ol: (props) => <chakra.ol m="0" my={2} pl={6} {...props} />,
  h1: (props) => <Heading as="h1" size="xl" mb={4} mt={8} id={createAnchorId(props.children)} {...props} />,
  h2: (props) => <Heading as="h2" size="lg" mb={4} mt={6} id={createAnchorId(props.children)} {...props} />,
  h3: (props) => <Heading as="h3" size="md" mb={2} mt={4} id={createAnchorId(props.children)} {...props} />,
  h4: (props) => <Heading as="h4" size="sm" mb={2} mt={4} id={createAnchorId(props.children)} {...props} />,
  p: (props) => <Text as="p" my={2} {...props} />,
  a: (props) => <Link textDecoration="underline" as="a" {...props} />,
};

export default function ContentPage({ title, children, markdownSource, ...props }) {
  const content = markdownSource ? <MDXRemote {...markdownSource} components={markdownComponents} /> : children;

  return (
    <Layout bg="white" {...props}>
      <Box maxWidth="container.md" mx="auto">
        {title && (
          <Heading textAlign="center" my={10}>
            {title}
          </Heading>
        )}
        {content}
      </Box>
    </Layout>
  );
}
