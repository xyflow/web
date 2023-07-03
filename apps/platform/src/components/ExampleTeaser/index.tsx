import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, Heading, Text, BoxProps } from '@chakra-ui/react';
import { useAuthenticationStatus } from '@nhost/nextjs';

import Card from '../Card';
import { Example } from 'config/examples';

export type ExamplePreviewProps = {
  example: Example;
} & BoxProps;

function ExamplePreview({ example, ...rest }: ExamplePreviewProps) {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (!example) {
    return null;
  }

  const link =
    isLoading || !isAuthenticated
      ? `https://reactflow.dev/docs/examples/${example.publicPath}`
      : `/examples/${example.id}`;

  return (
    <NextLink href={link}>
      <Card
        _hover={{ transform: 'scale(1.01)' }}
        transform="scale(1)"
        transition="transform .2s"
        cursor="pointer"
        boxShadow="md"
        height="100%"
        {...rest}
      >
        <Box height="250px" position="relative">
          <NextImage
            fill
            style={{ objectFit: 'cover' }}
            src={`/img/examples/${example.id}.jpg`}
            sizes="(max-width: 48em) 600px, 800px"
            alt="Preview of the pro example"
          />
        </Box>
        <Box p={4}>
          <Heading size="md" mb={2}>
            {example.name}
          </Heading>
          <Text>{example.description}</Text>
        </Box>
      </Card>
    </NextLink>
  );
}

export default ExamplePreview;
