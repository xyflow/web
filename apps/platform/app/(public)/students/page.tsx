'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Alert,
  AlertIcon,
  Checkbox,
} from '@chakra-ui/react';
import { useSignInEmailPasswordless } from '@nhost/nextjs';

import Heading from 'components/Heading';
import Card from 'components/Card';
import Text from 'components/Text';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [metadata, setMetadata] = useState<{ student: boolean }>({ student: false });
  const { signInEmailPasswordless, isLoading, isSuccess, isError, error } = useSignInEmailPasswordless();

  const handleSubmit = async (evt: React.FormEvent<HTMLDivElement>) => {
    evt.preventDefault();
    await signInEmailPasswordless(email, { metadata, redirectTo: '/dashboard' });
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Box my={5}>
        <Heading textAlign="center">React Flow Pro for Students</Heading>
        <Text textAlign="center">
          This is only intended for educational purposes. If you are a business or private user of React Flow, please
          use the{' '}
          <NextLink href={{ pathname: '/signup' }}>
            <Box as="span" color="blue">
              regular sign up
            </Box>
          </NextLink>
          . Please use your university mail for this form.
        </Text>
      </Box>
      <Box>
        <Container
          maxW="2xl"
          py={{
            base: '12',
            md: '12',
          }}
          px={{
            base: '0',
            sm: '8',
          }}
        >
          <Stack spacing="8">
            <Card py={7} px={6} as="form" onSubmit={handleSubmit}>
              <Stack spacing="6">
                {isError && error && (
                  <Alert borderRadius="md" status="error">
                    <AlertIcon />
                    {error.message}
                  </Alert>
                )}
                {isSuccess && (
                  <Alert borderRadius="md" status="success">
                    <AlertIcon />
                    To complete your registration, please check your mailbox and click the link we have sent you.
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Your university mail</FormLabel>
                    <Input
                      isRequired
                      id="email"
                      type="email"
                      value={email}
                      onChange={(evt) => setEmail(evt.target.value)}
                      autoComplete="on"
                    />
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      isRequired
                      isChecked={metadata.student}
                      onChange={(evt) => setMetadata({ ...metadata, student: evt.target.checked })}
                    >
                      I confirm that I am using React Flow Pro only for educational purposes
                    </Checkbox>
                  </FormControl>
                </Stack>
                <Button isLoading={isLoading} type="submit" colorScheme="pink">
                  Sign Up
                </Button>
              </Stack>
            </Card>
            {/* <Stack spacing="6">
              <Stack
                spacing={{
                  base: '2',
                  md: '3',
                }}
                textAlign="center"
              >
                <HStack spacing="1" justify="center">
                  <Text>Not looking for educational purpose? Please use our regular</Text>
                  <NextLink href={{ pathname: '/login', query: router.query }}>
                    <Button variant="link" colorScheme="blue">
                      Sign in
                    </Button>
                  </NextLink>
                </HStack>
              </Stack>
            </Stack> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Signup;
