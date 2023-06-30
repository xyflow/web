'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useSignInEmailPassword, useSendVerificationEmail } from '@nhost/nextjs';

import Card from 'components/Card';
import PasswordField from 'components/PasswordField';
import OAuthSignIn from 'components/OAuthSignIn';

function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const { signInEmailPassword, isLoading, needsEmailVerification, isSuccess, isError, error } =
    useSignInEmailPassword();
  const { sendEmail, isLoading: isVerificationMailLoading } = useSendVerificationEmail();

  useEffect(() => {
    if (isSuccess) {
      router.push(searchParams?.get('redirectTo') || '/');
    }
  }, [isSuccess, router, searchParams]);

  const handleFormSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPassword(form.email, form.password);
  };

  const handleVerificationMail = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    await sendEmail(form.email);
  };

  return (
    <Box>
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Heading textAlign="center">Sign in</Heading>
          <Card as="form" py={7} px={6} onSubmit={handleFormSubmit}>
            <Stack spacing="6">
              {isError && (
                <Alert borderRadius="md" status="error">
                  <AlertIcon />
                  {error?.message}
                </Alert>
              )}

              {needsEmailVerification && (
                <Alert borderRadius="md" status="info">
                  <AlertIcon />
                  <Box>
                    <Box>Your email has not been verified. Please check your mailbox.</Box>
                    <Box mt={2}>
                      <Button
                        isLoading={isVerificationMailLoading}
                        onClick={handleVerificationMail}
                        colorScheme="blue"
                        size="sm"
                      >
                        Resend verification mail
                      </Button>
                    </Box>
                  </Box>
                </Alert>
              )}
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(evt) => setForm({ ...form, email: evt.target.value })}
                    autoComplete="on"
                  />
                </FormControl>
                <PasswordField
                  value={form.password}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, password: evt.target.value })
                  }
                />
              </Stack>
              <HStack justify="space-between">
                <NextLink href="/reset-password">
                  <Button variant="link" colorScheme="blue" size="sm">
                    Forgot password?
                  </Button>
                </NextLink>
              </HStack>
              <Button type="submit" isLoading={isLoading} colorScheme="pink">
                Sign in
              </Button>
              <OAuthSignIn />
            </Stack>
          </Card>
          <Stack spacing="6">
            <Stack
              spacing={{
                base: '2',
                md: '3',
              }}
              textAlign="center"
            >
              <HStack spacing="1" justify="center">
                <Text>Don{"'"}t have an account?</Text>
                {/* @todo pass query params here like this: */}
                {/* <NextLink href={{ pathname: '/signup', query: router.query }}> */}
                <NextLink href={{ pathname: '/signup' }}>
                  <Button variant="link" colorScheme="blue">
                    Sign up
                  </Button>
                </NextLink>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Login;
