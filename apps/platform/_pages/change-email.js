import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useChangeEmail } from '@nhost/nextjs';

import Layout from '../components/Layout';
import Card from '../components/Card';
import authProtected from '../hocs/auth-protected';

function ChangeEmail() {
  const [email, setEmail] = useState('');
  const { changeEmail, isLoading, isSuccess, needsEmailVerification, isError, error } = useChangeEmail();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    changeEmail(email);
  };

  return (
    <Layout type="app" title="Change Email">
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
                    Please check your inbox to confirm your email.
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">New Email</FormLabel>
                    <Input id="email" type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button isLoading={isLoading} type="submit" colorScheme="pink">
                    Change Email
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default authProtected(ChangeEmail);
