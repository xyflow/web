import { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
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
import { useSignUpEmailPassword } from '@nhost/nextjs';

import Layout from '../components/Layout';
import Card from '../components/Card';
import PasswordField from '../components/PasswordField';
import OAuthSignIn from '../components/OAuthSignIn';

function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [metadata, setMetadata] = useState({ newsletter: false });
  const { signUpEmailPassword, isLoading, needsEmailVerification, isSuccess, isError, error } =
    useSignUpEmailPassword();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await signUpEmailPassword(email, password);
  };

  return (
    <Layout>
      <Box bg="gray.50">
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
            <Heading textAlign="center">Sign Up</Heading>
            <Card py={7} px={6} as="form" onSubmit={handleSubmit}>
              <Stack spacing="6">
                {isError && error && (
                  <Alert borderRadius="md" status="error">
                    <AlertIcon />
                    {error.message}
                  </Alert>
                )}
                {(isSuccess || needsEmailVerification) && (
                  <Alert borderRadius="md" status="success">
                    <AlertIcon />
                    To complete your registration, please check your mailbox and click the link we have sent you.
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(evt) => setEmail(evt.target.value)}
                      autoComplete="on"
                    />
                  </FormControl>
                  <PasswordField value={password} onChange={(evt) => setPassword(evt.target.value)} />
                  {/* <FormControl>
                    <Checkbox
                      isChecked={metadata.newsletter}
                      onChange={(evt) => setMetadata({ ...metadata, newsletter: evt.target.checked })}
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        Sign up for our newsletter
                      </Text>
                    </Checkbox>
                  </FormControl> */}
                </Stack>
                <Button isLoading={isLoading} type="submit" colorScheme="pink">
                  Sign Up
                </Button>
                <OAuthSignIn metadata={metadata} />
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
                  <Text>Already have an account?</Text>
                  <NextLink href={{ pathname: '/login', query: router.query }}>
                    <Button variant="link" colorScheme="blue">
                      Sign in
                    </Button>
                  </NextLink>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default Signup;
