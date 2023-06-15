'use client';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

import Text from 'components/Text';
import Heading from 'components/Heading';
import PricingPlans from 'components/PricingPlans';
import PricingFAQ from 'components/PricingFAQ';
import WorkflowBuilderExample from 'components/PricingWorkflowBuilder/App';

const SubscribePage = () => {
  // we are using a default breakpoint "md" here in order to prevent jumping on desktop screens
  const showWorkflow = useBreakpointValue({ base: false, md: true }, 'md');

  return (
    <Box>
      <Flex mb={{ base: 2, lg: 14 }} mt={{ lg: 1, '2xl': 6 }}>
        <Box flex="1" pr={{ lg: 10 }}>
          <Heading lineHeight={1.1}>
            Build Better Node-Based UIs
            {showWorkflow ? <br /> : ` `}
            with React Flow
          </Heading>
          <Text mx="0" pt={{ base: 2, lg: 6 }}>
            <strong>Thanks for checking out React Flow Pro!</strong> We are Christopher, Moritz, and John, and we work
            full-time to build and maintain React Flow.
          </Text>
          <Text mx="0">
            <strong>React Flow is open-source MIT-licensed software</strong>, and it will be forever. We are glad to see
            our library enabling thousands of developers as well as organizations like Stripe and Linkedin to build
            their node-based apps. With so many active users, it takes time and effort to maintain React Flow, and we
            can’t do that without your support.
          </Text>
          <Text mx="0">
            <strong>Why Subscribe?</strong> With your subscription, you are ensuring the sustainable maintenance and
            development of the React Flow library. This is how we make sure React Flow stays MIT-licensed. In return,
            you get a high-quality, maintained, updated library, along with benefits like direct support, prioritized
            feature requests, and access to our Pro Examples.
          </Text>
        </Box>
        {showWorkflow && (
          <Flex ml={5} overflow="hidden" flex="1">
            <WorkflowBuilderExample />
          </Flex>
        )}
      </Flex>

      <PricingPlans />

      <Box maxWidth="850px" mx="auto">
        <Text mt={{ base: 4, lg: 10 }} mb={{ base: 8, lg: 24 }}>
          Your subscription goes directly towards the development and maintenance of React Flow and allows us to keep
          the library independent and open source.
        </Text>
        <Box mt="16">
          <PricingFAQ />
        </Box>
      </Box>
    </Box>
  );
};

export default SubscribePage;
