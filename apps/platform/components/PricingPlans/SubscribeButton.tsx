import { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useUserEmail, useNhostClient, useAccessToken } from '@nhost/nextjs';

import { isDevelopment } from 'utils/browser';

type SubscribeButtonProps = {
  priceTag: React.ReactNode;
  price: {
    development: string;
    production: string;
  };
  colorScheme: string;
};

function SubscribeButton({ priceTag, price, colorScheme }: SubscribeButtonProps) {
  const [isLoading, setLoading] = useState(false);
  const customerEmail = useUserEmail();
  const nhost = useNhostClient();
  const authToken = useAccessToken();

  const createStripeCheckoutSession = async () => {
    setLoading(true);

    const { res, error } = await nhost.functions.call(
      '/stripe/create-session',
      {
        customerEmail: customerEmail,
        priceId: isDevelopment() ? price.development : price.production,
      },
      // @todo not needed anymore after nhost fixes this (asked in discord)
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    // @ts-ignore
    const sessionUrl = res?.data?.sessionUrl;

    if (!error && sessionUrl) {
      window.location.href = sessionUrl;
    }

    // @todo: handle error response

    setLoading(false);
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Button isLoading={isLoading} onClick={createStripeCheckoutSession} colorScheme={colorScheme}>
          Subscribe
        </Button>
        <Box ml={2}>{priceTag}</Box>
      </Flex>
    </Box>
  );
}

export default SubscribeButton;
