import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Container, HStack, Stack, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useChangePassword } from '@nhost/nextjs';

import Layout from '../components/Layout';
import Card from '../components/Card';
import PasswordField from '../components/PasswordField';

import authProtected from '../hocs/auth-protected';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const { changePassword, isLoading, isSuccess, isError, error } = useChangePassword();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    changePassword(password);
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
                    Your password has been changed.
                  </Alert>
                )}
                <Stack spacing="5">
                  <PasswordField
                    label="New Password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                </Stack>
                <Stack spacing="6">
                  <Button isLoading={isLoading} type="submit" colorScheme="pink">
                    Change Password
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
                  <NextLink href="/">
                    <Button variant="link" colorScheme="blue">
                      Home
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

export default authProtected(ChangePassword);
