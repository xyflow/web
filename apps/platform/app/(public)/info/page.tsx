'use client';

import { Box } from '@chakra-ui/react';

import Heading from 'components/Heading';
import PricingFAQ from 'components/PricingFAQ';

export default function InfoPage() {
  return (
    <Box maxWidth="850px" mx="auto">
      <Heading textAlign="center" my={10}>
        Frequently Asked Questions
      </Heading>
      <PricingFAQ showTitle={false} />
    </Box>
  );
}
