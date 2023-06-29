'use client';

import { useState } from 'react';
import { Box, SimpleGrid, Wrap, Button, WrapItem, Text, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { HiX } from 'components/Icons';
import ExampleTeaser from 'components/ExampleTeaser';

import examples from 'pro-examples/examples';

const uniqueTags = examples.reduce<string[]>((tags, example) => {
  example.tags?.forEach((tag) => !tags.includes(tag) && tags.push(tag));
  return tags;
}, []);

function Examples() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <Box>
      <Head>
        <title>Pro Examples - React Flow</title>
      </Head>
      <Heading mb={4} fontSize={['3xl', '4xl', '4xl', '5xl']} as="h1">
        Pro Examples
      </Heading>
      <Text mt={2} mb={4} fontSize="lg" fontWeight="normal" maxWidth="1000px">
        The pro examples are a constantly expanded collection of advanced React Flow examples.
      </Text>
      <Box>
        <Wrap mb={4} spacing={2}>
          {uniqueTags.map((tag) => (
            <WrapItem key={tag}>
              <Button
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                variant={selectedTag === tag ? 'solid' : 'outline'}
                colorScheme="pink"
                size="sm"
                rightIcon={selectedTag === tag ? <HiX /> : undefined}
              >
                {tag}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
      <SimpleGrid columns={[1, 2, 2, 3, 4, 5]} spacingX={4} spacingY={8}>
        {examples
          .filter((example) => !example.hidden)
          .filter((example) => (selectedTag ? example.tags?.includes(selectedTag) : true))
          .map((example) => (
            <ExampleTeaser example={example} key={example.id} />
          ))}
      </SimpleGrid>
    </Box>
  );
}

export default Examples;
