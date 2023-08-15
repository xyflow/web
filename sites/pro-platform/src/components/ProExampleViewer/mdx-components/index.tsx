import * as React from 'react';
import { Heading, Text } from 'xy-ui';

import { MDXComponents } from 'mdx/types';

import CodeBlock from './CodeBlock';
import FileLink from './FileLink';

export const mdxComponents: MDXComponents = {
  // @ts-ignore
  p: (props) => <Text {...props} />,
  // ul: (props) => (
  //   <List pl={2} lineHeight="1.4" color="gray.700" fontSize="md" {...props}>
  //     {props.children}
  //   </List>
  // ),
  // ol: (props) => (
  //   <OrderedList pl={2} lineHeight="1.4" color="gray.700" fontSize="md" {...props}>
  //     {props.children}
  //   </OrderedList>
  // ),
  // @ts-ignore
  h1: (props) => <Heading size="xl" {...props} />,
  // @ts-ignore
  h2: (props) => <Heading className="text-md" {...props} />,
  // h2: (props) => (
  //   <Heading fontSize="2xl" mb={4} mt={8}>
  //     {props.children}
  //   </Heading>
  // ),
  // h3: (props) => <Heading fontSize="lg">{props.children}</Heading>,
  // h4: (props) => <Heading fontSize="md">{props.children}</Heading>,
  // a: (props) => {
  //   const isExternal = props?.href?.startsWith('https');
  //   const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  //   return (
  //     <Link color="pink.500" {...externalProps} {...props}>
  //       {isExternal && <Icon verticalAlign="text-top" as={ExternalLinkIcon} />}
  //       {props.children}
  //     </Link>
  //   );
  // },
  pre: CodeBlock,
  FileLink: FileLink,
};

export default mdxComponents;
