'use client';

import { Box, Heading, Flex, Button, Wrap } from '@chakra-ui/react';
import { useSignOut } from '@nhost/nextjs';

import { PlanId } from 'config/plans';

import { authProtected } from 'components/Auth';
import Text from 'components/Text';
import SubscriptionFeatures from 'components/SubscriptionFeatures';
import SubscriberSurvey from 'components/SubscriberSurvey';
import PricingPlans from 'components/PricingPlans';

import useStripeCustomerPortal from 'hooks/useStripeCustomerPortal';
import useSubscription from 'hooks/useSubscription';

const widgets: Record<PlanId, React.ReactNode> = {
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
  enterprise: null,
};

function DashboardTitle({ introText }: { introText: React.ReactNode }) {
  const { isSubscribed } = useSubscription();
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
  const { plan, isSubscribed, isLoading } = useSubscription();

  const dashboardWidgets = isLoading ? null : widgets[plan];

  const introText = isSubscribed ? (
    'Thank you for subscribing to React Flow Pro! With your subscription, you are ensuring the sustainable maintenance and development of the React Flow library.'
  ) : (
    <>
      Welcome to React Flow Pro! With a subscription, you are ensuring the sustainable maintenance and development of
      the React Flow library.
    </>
  );

  return (
    <Box>
      <DashboardTitle introText={introText} />
      <Box width="100%" position="relative">
        <Box mt={5}>{dashboardWidgets}</Box>
      </Box>
    </Box>
  );
}

export default authProtected(Dashboard);
