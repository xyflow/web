import React from 'react';
import { Link, List, OrderedList, Icon } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import Heading from 'components/Heading';
import Text from 'components/Text';
import { MDXComponents } from 'mdx/types';

import CodeBlock from './CodeBlock';
import FileLink from './FileLink';

export const mdxComponents: MDXComponents = {
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
  pre: CodeBlock,
  FileLink,
};

export default mdxComponents;
