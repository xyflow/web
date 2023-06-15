import { Box, Heading, Flex, Button, Wrap } from '@chakra-ui/react';

import authProtected from '../hocs/auth-protected';

import Layout from '../components/Layout';
import Text from '../components/Text';
import { useIsSubscribed, useSubscription } from '../context/subscription';

import SubscriptionFeatures from '../components/SubscriptionFeatures';
import SubscriberSurvey from '../components/SubscriberSurvey';
import PricingPlans from '../components/PricingPlans';
import useStripeCustomerPortal from '../hooks/useStripeCustomerPortal';
import { useSignOut } from '@nhost/nextjs';

const widgets = {
  free: (
    <Box maxWidth="1600px">
      <PricingPlans />
    </Box>
  ),
  student: (
    <Box maxWidth="1200px">
      <SubscriptionFeatures />
    </Box>
  ),
  oss: (
    <Box maxWidth="1200px">
      <SubscriptionFeatures />
    </Box>
  ),
  starter: (
    <Box maxWidth="1200px">
      <SubscriptionFeatures />
      <SubscriberSurvey mt={6} />
    </Box>
  ),
  pro: (
    <Box maxWidth="1200px">
      <SubscriptionFeatures />
      <SubscriberSurvey mt={6} />
    </Box>
  ),
};

const introTexts = {
  free: (
    <>
      Welcome to React Flow Pro! With a subscription, you are ensuring the sustainable maintenance and development of
      the React Flow library.
    </>
  ),
  starter:
    'Thank you for subscribing to React Flow Pro! With your subscription, you are ensuring the sustainable maintenance and development of the React Flow library.',
  pro: 'Thank you for subscribing to React Flow Pro! With your subscription, you are ensuring the sustainable maintenance and development of the React Flow library.',
};

function DashboardTitle({ introText }) {
  const isSubscribed = useIsSubscribed();
  const { isLoading: isPortalLoading, openPortal } = useStripeCustomerPortal();
  const { signOut } = useSignOut();

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box>
          <Heading
            letterSpacing="1px"
            color="gray.500"
            textTransform="uppercase"
            fontSize="sm"
            style={{
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            Dashboard
          </Heading>
          <Heading fontSize={['3xl', '4xl', '4xl', '5xl']} as="h1" mb={2}>
            React Flow Pro
          </Heading>
        </Box>
        <Box>
          <Wrap>
            {isSubscribed && (
              <Button onClick={openPortal} isLoading={isPortalLoading} variant="outline" size="sm" colorScheme="pink">
                Billing & Subscription
              </Button>
            )}
            <Button onClick={signOut} variant="outline" size="sm" colorScheme="pink">
              Logout
            </Button>
          </Wrap>
        </Box>
      </Flex>

      <Text mt={2} fontSize="lg" fontWeight="normal" maxWidth="1000px">
        {introText}
      </Text>
    </Box>
  );
}

function Dashboard() {
  const subscription = useSubscription();

  const dashboardWidgets = !subscription ? null : widgets[subscription.id];
  const introText = introTexts[subscription?.id] || introTexts.free;

  return (
    <Layout bg="gray.50" type="app" title={<DashboardTitle introText={introText} />}>
      <Box width="100%" position="relative">
        <Box mt={5}>{dashboardWidgets}</Box>
      </Box>
    </Layout>
  );
}

export default authProtected(Dashboard);
