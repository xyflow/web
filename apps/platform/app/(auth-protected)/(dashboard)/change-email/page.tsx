'use client';

import { useState } from 'react';
import { Box, Button, Container, FormControl, Stack, Alert, AlertIcon, FormLabel, Input } from '@chakra-ui/react';
import { useChangeEmail } from '@nhost/nextjs';

import Card from 'components/Card';

function ChangeEmail() {
  const [email, setEmail] = useState('');
  const { changeEmail, isLoading, needsEmailVerification, isError, error } = useChangeEmail();

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    changeEmail(email);
  };

  return (
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
              {needsEmailVerification && (
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
  );
}

export default ChangeEmail;
