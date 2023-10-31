'use client';

// @todo how can this be turned into a server component?
import { Button, ButtonProps } from 'xy-ui';
import useStripeCustomerPortal from '@/hooks/useStripeCustomerPortal';

export default function (props: ButtonProps) {
  const { openCustomerPortal } = useStripeCustomerPortal();
  return <Button onClick={openCustomerPortal} {...props} />;
}
