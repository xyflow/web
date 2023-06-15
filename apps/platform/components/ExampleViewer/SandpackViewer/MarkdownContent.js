import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { Box, Link, List, OrderedList, Icon } from '@chakra-ui/react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import Heading from '../../Heading';
import Text from '../../Text';
import CodeViewer from './StaticCodeViewer';

const FileLink = (props) => {
  const { sandpack } = useSandpack();
  const { setActiveFile } = sandpack;

  const onClick = () => {
    if (!props.file) {
      return;
    }

    setActiveFile(props.file);
  };

  return (
    <Box
      onClick={onClick}
      color="pink.500"
      fontFamily="mono"
      fontSize="90%"
      as="span"
      cursor="pointer"
      _hover={{ color: 'gray.800' }}
      {...props}
    />
  );
};

const markdownComponents = {
  p: (props) => (
    <Text color="gray.700" fontSize="md" lineHeight="1.4" {...props}>
      {props.children}
    </Text>
  ),
  ul: (props) => (
    <List pl={2} lineHeight="1.4" color="gray.700" fontSize="md" {...props}>
      {props.children}
    </List>
  ),
  ol: (props) => (
    <OrderedList pl={2} lineHeight="1.4" color="gray.700" fontSize="md" {...props}>
      {props.children}
    </OrderedList>
  ),
  h1: (props) => <Heading fontSize="4xl">{props.children}</Heading>,
  h2: (props) => (
    <Heading fontSize="2xl" mb={4} mt={8}>
      {props.children}
    </Heading>
  ),
  h3: (props) => <Heading fontSize="lg">{props.children}</Heading>,
  h4: (props) => <Heading fontSize="md">{props.children}</Heading>,
  pre: (props) => <CodeViewer {...props} />,
  FileLink,
  a: (props) => {
    const isExternal = props?.href?.startsWith('https');
    const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
      <Link color="pink.500" {...externalProps} {...props}>
        {isExternal && <Icon verticalAlign="text-top" as={ExternalLinkIcon} />}
        {props.children}
      </Link>
    );
  },
};

export default function MarkdownContent({ mdxSource }) {
  if (!mdxSource) {
    return null;
  }
  return (
    <Box className="readme-mdx">
      <style>
        {`
      .readme-mdx p code {
        color: #936fed;
        background-color: #f8f9fb;
        font-size: 90%;
      }
    `}
      </style>
      <MDXRemote components={markdownComponents} {...mdxSource} />
    </Box>
  );
}
