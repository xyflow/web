import { Box, Button, Center, Flex, SimpleGrid } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import Layout from '../components/Layout';
import Text from '../components/Text';
import Heading from '../components/Heading';
import ExampleTeaser from '../components/ExampleTeaser';
import ProExampleFAQ from '../components/ProExampleFAQ';

import examples from '../config/examples';

import ExampleTeaserImage from '../public/img/examples/pro-examples.jpg';

import { HiOutlineArrowRight } from 'components/Icons';

const ProExamples = () => {
  return (
    <Layout w="100%" maxWidth="none" bg="white" p={0}>
      <Box maxWidth="1200px" mx="auto" p={5}>
        <Box maxWidth="850px" mx="auto">
          <Heading textAlign="center">React Flow Pro Examples</Heading>
          <Text mt={{ base: 4, lg: 8 }} mb={{ base: 8, lg: 12 }} textAlign="center">
            React Flow subscribers have access to advanced examples and guides that can be used as a starting point or
            inspiration for building node-based UIs.
          </Text>
        </Box>
        <Flex my={{ base: 4, lg: 8 }} alignItems="center" flexDirection="column">
          <Box position="relative" w="100%" boxShadow="xl">
            <NextImage src={ExampleTeaserImage} placeholder="blur" priority />
          </Box>
          <Text mt={2} fontSize="md" color="gray.600" textAlign="center" fontStyle="italic">
            The force layout example in the subscriber dashboard
          </Text>
        </Flex>

        <Box maxWidth="800px" px={2} mx="auto">
          <Heading fontSize={['2xl', '3xl', '4xl']} textAlign="center" mt={16}>
            Available Pro Examples
          </Heading>
          <Text mt={{ base: 4, lg: 8 }} mb={{ base: 8, lg: 12 }} textAlign="center">
            New Pro examples are being added by the creators of React Flow on a regular basis. Here you can find a
            preview of the currently available Pro examples.
          </Text>
        </Box>

        <SimpleGrid columns={[1, 2]} gap={8}>
          {examples
            .filter((e) => !e.hidden)
            .map((example) => (
              <ExampleTeaser key={example.id} example={example} />
            ))}
        </SimpleGrid>
        <Box mt={16}>
          <ProExampleFAQ />
        </Box>
      </Box>
      <Box bgColor="purple.800" color="white">
        <Box maxWidth="800px" px={2} mx="auto" mt={8} pt={8} pb={24}>
          <Heading fontSize={['2xl', '3xl', '4xl']} textAlign="center" mt={16}>
            Subscribe to React Flow Pro
          </Heading>
          <Text mt={{ base: 4, lg: 8 }} mb={{ base: 8, lg: 12 }} textAlign="center">
            Sign up to one of our plans to get the code behind every Pro Example
          </Text>
          <Center>
            <NextLink href="/pricing">
              <Button rightIcon={<HiOutlineArrowRight />} colorScheme="pink">
                Pricing
              </Button>
            </NextLink>
          </Center>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProExamples;
