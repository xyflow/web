import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import NewsletterSignup from './index';

export default function NewsletterSignupInline({ size = 'md', ...props }) {
  return (
    <Box bgColor="purple.800" color="white" p={8} borderRadius={8} {...props}>
      <Heading size="lg">Sign up for our Newsletter</Heading>
      <Text>Get the latest updates, articles and resources directly from the React Flow team</Text>
      <NewsletterSignup />
    </Box>
  );
}
