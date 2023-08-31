'use client';

import { Button, ButtonProps } from 'xy-ui';
import useStripeCustomerPortal from '@/hooks/useStripeCustomerPortal';

export default function (props: ButtonProps) {
  const { openCustomerPortal } = useStripeCustomerPortal();
  return <Button onClick={openCustomerPortal} {...props} />;
}
