'use client';

import { Box } from '@chakra-ui/react';

import Text from 'components/Text';
import Heading from 'components/Heading';
import PricingPlans from 'components/PricingPlans';
import PricingFAQ from 'components/PricingFAQ';

const PricingPage = () => {
  return (
    <Box>
      <Box maxWidth="850px" mx="auto">
        <Heading textAlign="center">Pricing</Heading>
        <Text mt={{ base: 4, lg: 10 }} mb={{ base: 8, lg: 24 }} textAlign="center">
          Your subscription goes directly towards the development and maintenance of React Flow and allows us to keep
          the library independent and open source.
        </Text>
      </Box>
      <Box my={{ base: 8, lg: 14 }}>
        <PricingPlans />
      </Box>
      <Box maxWidth="850px" mx="auto">
        <PricingFAQ />
      </Box>
    </Box>
  );
};

export default PricingPage;
