import React from 'react';
import { Alert, AlertIcon, Stack, SimpleGrid, Box, Flex, Avatar, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Head from 'next/head';

import Layout from '../components/Layout';
import Card from '../components/Card';
import CardHeader from '../components/Card/CardHeader';
import CardItem from '../components/Card/CardItem';
import ContactForm from '../components/ContactForm';

import Text from '../components/Text';
import Heading from '../components/Heading';

const ContactLink = (props) => (
  <Link color="pink.500" textDecoration="underline" fontWeight="bold" _hover={{ color: 'pink.700' }} {...props} />
);

function TeamMember({ image, name }) {
  return (
    <Flex alignItems="center">
      <Avatar bg="gray.100" size="sm" name={name} src={image} />
      <Box mx={2}>
        <Text as="div" fontWeight="bold" fontSize="md" mb={0}>
          {name}
        </Text>
      </Box>
    </Flex>
  );
}

function ContactTeamMember({ twitter, github }) {
  return (
    <Box>
      {twitter && (
        <>
          <ContactLink target="_blank" href={`https://twitter.com/${twitter}`}>
            Twitter
          </ContactLink>
          {' | '}
        </>
      )}

      <ContactLink target="_blank" href={`https://github.com/${github}`}>
        Github
      </ContactLink>
    </Box>
  );
}

export default function Contact() {
  const router = useRouter();

  return (
    <Layout w="100%" maxWidth="1600px">
      <Head>
        <title>Contact us - React Flow</title>
      </Head>

      <Box maxWidth="850px" mx="auto">
        {router.query.success && (
          <Alert borderRadius="md" status="success">
            <AlertIcon />
            Thanks for your message. We will get back to you as soon as possible.
          </Alert>
        )}

        <Heading textAlign="center">Contact</Heading>

        <Text mt={{ base: 4, lg: 10 }} mb={{ base: 8, lg: 24 }} textAlign="center">
          If you have questions regarding your subscription or want to talk to us about a custom plan for your company,
          don{"'"}t hesitate to contact us. Please make sure to read our{' '}
          <Link href="/info" as={NextLink} fontWeight="bold" color="pink.500">
            FAQs
          </Link>{' '}
          as well.
        </Text>

        <SimpleGrid columns={[1, 1, 1]} spacing={7} mx="auto">
          <Card>
            <CardHeader title="Message Us" />
            <Box p={5}>
              <ContactForm />
            </Box>
          </Card>

          <Card>
            <CardHeader title="More Contact Options" />

            <CardItem
              label="Mail"
              actionItem={
                <ContactLink target="_blank" href="mailto:info@reactflow.dev">
                  info@reactflow.dev
                </ContactLink>
              }
            />

            <CardItem
              label="Discord"
              actionItem={
                <ContactLink target="_blank" href="https://discord.gg/Bqt6xrs">
                  join community
                </ContactLink>
              }
            />

            <CardItem
              label="Twitter"
              actionItem={
                <ContactLink target="_blank" href="https://twitter.com/reactflowdev">
                  twitter.com/reactflowdev
                </ContactLink>
              }
            />
            <CardItem
              label="Github"
              actionItem={
                <ContactLink target="_blank" href="https://github.com/wbkd/react-flow">
                  github.com/wbkd/react-flow
                </ContactLink>
              }
            />
          </Card>

          <Card>
            <CardHeader title="Team" />
            <CardItem
              label={<TeamMember name="Moritz Klack" image="https://github.com/moklick.png" />}
              actionItem={<ContactTeamMember github="moklick" twitter="moklick" calcom="moritz" />}
            />
            <CardItem
              label={<TeamMember name="Christopher Möller" image="https://github.com/chrtze.png" />}
              actionItem={<ContactTeamMember github="chrtze" twitter="chrtze" calcom="chrtze" />}
            />
            <CardItem
              label={<TeamMember name="John Robb" image="https://github.com/johnrobbjr.png" />}
              actionItem={<ContactTeamMember github="johnrobbjr" />}
            />
          </Card>

          <Card p={6} color="gray.600" fontSize="xs">
            <Text fontSize="md" fontWeight="bold" mb={4}>
              Made in Berlin
            </Text>
            <Text fontSize="sm" mb={0}>
              React Flow is developed and maintained by{' '}
              <ContactLink fontWeight="bold" href="https://webkid.io">
                webkid
              </ContactLink>
              , a developer studio from Berlin. <br />
              webkid GmbH | Kohlfurter Str. 41/43 | 10999 Berlin
            </Text>
          </Card>
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
