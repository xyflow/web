import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useIsSubscribed } from '../../context/subscription';
import useStripeCustomerPortal from '../../hooks/useStripeCustomerPortal';

const CustomerPortalButton = (props: ButtonProps) => {
  const { isLoading, openPortal } = useStripeCustomerPortal();
  const isSubscribed = useIsSubscribed();

  if (!isSubscribed) {
    return (
      <NextLink href="/pricing#plans">
        <Button variant="outline" size="sm" {...props}>
          Subscribe
        </Button>
      </NextLink>
    );
  }

  return <Button isLoading={isLoading} variant="outline" size="sm" onClick={openPortal} {...props} />;
};

export default CustomerPortalButton;
