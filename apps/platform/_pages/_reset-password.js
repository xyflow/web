import { useState } from 'react';
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
import { useResetPassword } from '@nhost/nextjs';

import Layout from '../components/Layout';
import Card from '../components/Card';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword, isLoading, isSent, isError, error } = useResetPassword({ redirectTo: '/change-password' });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    resetPassword(email);
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
            <Heading textAlign="center">Reset Password</Heading>
            <Card py={7} px={6} as="form" onSubmit={handleSubmit}>
              <Stack spacing="6">
                {isError && error && (
                  <Alert borderRadius="md" status="error">
                    <AlertIcon />
                    {error.message}
                  </Alert>
                )}
                {isSent && (
                  <Alert borderRadius="md" status="success">
                    <AlertIcon />
                    Please check your inbox to set a new password.
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button isLoading={isLoading} type="submit" colorScheme="pink">
                    Send Reset Link
                  </Button>
                </Stack>
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
                  <Text>Back to </Text>
                  <NextLink href="/login">
                    <Button variant="link" colorScheme="blue">
                      Login
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

export default ResetPassword;
