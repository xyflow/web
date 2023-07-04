import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';
import { useAuthenticated } from '@nhost/nextjs';

function SignInButton() {
  const isAuthenticated = useAuthenticated();

  if (isAuthenticated) {
    return (
      <NextLink href="/">
        <Button colorScheme="pink">Dashboard</Button>
      </NextLink>
    );
  }

  return (
    <NextLink href="/login">
      <Button colorScheme="pink">Sign In</Button>
    </NextLink>
  );
}

export default SignInButton;
