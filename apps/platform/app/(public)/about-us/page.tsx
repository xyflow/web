'use client';

import { Box, Link, Heading, chakra } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import Head from 'next/head';

import Text from 'components/Text';

import aboutUsPic from 'public/img/aboutus-office.jpeg';

const ContactLink = chakra(NextLink);

// @todo fix hydration errors on this page
const TeamPage = () => {
  return (
    <Box>
      <Head>
        <title>About us - React Flow</title>
      </Head>
      <Text>
        <Heading mt={[5, 10]} fontSize={{ base: '4xl', xl: '5xl' }} lineHeight={1.1} display="block" mb={6}>
          About us
        </Heading>
      </Text>
      <Box mb="8" position="relative" height={{ base: 250, sm: 400, lg: 500 }}>
        <NextImage
          objectFit="cover"
          objectPosition="bottom"
          src={aboutUsPic}
          alt="Christopher, Moritz, and John working in their office"
          layout="fill"
        />
      </Box>
      <Box mb={10}>
        <Text>
          We are Moritz, Christopher, and John, and we work full-time to build and maintain React Flow. We are an
          independent company dedicated to creating a stable and maintained open source library that enables you to
          create better node-based UIs.
        </Text>

        <Text>
          Since 2014, Moritz and Christopher have been creating infographics, tools, and projects together through their
          interactive news agency,{' '}
          <Link color="pink.500" href="https://webkid.io" target="_blank">
            webkid
          </Link>
          . Along the way to creating{' '}
          <Link color="pink.500" href="https://editor.datablocks.pro" target="_blank">
            Datablocks
          </Link>{' '}
          in 2021, they developed React Flow and decided to open-source it. More and more people started using it, to
          the point they decided to work on it full-time to create their own open-source project like the many they have
          used and supported themselves.
        </Text>

        <Text>
          John joined the team in 2022 and takes care of the documentation, communication and community at React Flow.
        </Text>
        <Text align="left">
          For any questions or feedback you can{' '}
          <ContactLink href="/contact" passHref>
            <Link color="pink.500">contact us</Link>
          </ContactLink>
          .
        </Text>
      </Box>
    </Box>
  );
};

export default TeamPage;
