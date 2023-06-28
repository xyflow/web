import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';

import useSubscription from 'hooks/useSubscription';
import useStripeCustomerPortal from 'hooks/useStripeCustomerPortal';

const CustomerPortalButton = (props: ButtonProps) => {
  const { portalUrl } = useStripeCustomerPortal();
  const { isSubscribed } = useSubscription();

  if (!isSubscribed) {
    return (
      <NextLink href="/dashboard">
        <Button variant="outline" size="sm" {...props}>
          Subscribe
        </Button>
      </NextLink>
    );
  }

  return <Button as="a" href={portalUrl} variant="outline" size="sm" {...props} />;
};

export default CustomerPortalButton;
