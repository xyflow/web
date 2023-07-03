import { useProviderLink } from '@nhost/nextjs';
import { Stack, HStack, Divider, ButtonGroup, Text, Button, VisuallyHidden } from '@chakra-ui/react';
import { IoLogoGithub } from 'components/Icons';

// import { FcGoogle } from 'components/Icons'

export default function OAuthSignIn({ metadata = {} }) {
  const { github } = useProviderLink({ metadata });

  return (
    <Stack spacing={4}>
      <HStack>
        <Divider />
        <Text fontSize="sm" whiteSpace="nowrap" color="muted">
          or continue with
        </Text>
        <Divider />
      </HStack>
      <ButtonGroup variant="outline" spacing="4" width="full">
        <Button as="a" href={github} color="#171515" w="100%">
          <VisuallyHidden>Sign in with Github</VisuallyHidden>
          <IoLogoGithub size={22} />
        </Button>
        {/* <Button color="#1DA1F2" onClick={() => signIn('twitter')} isFullWidth>
          <VisuallyHidden>Sign in with Twitter</VisuallyHidden>
          <IoLogoTwitter size={22} />
        </Button> */}
        {/* <Button onClick={() => signIn('google')} isFullWidth>
          <VisuallyHidden>Sign in with Google</VisuallyHidden>
          <FcGoogle size={22} />
        </Button> */}
      </ButtonGroup>
    </Stack>
  );
}
