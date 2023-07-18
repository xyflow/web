'use client';

import useStripeCustomerPortal from '@/hooks/useStripeCustomerPortal';
import { Button, ButtonProps } from 'xy-ui';

export default function (props: ButtonProps) {
  const { portalUrl } = useStripeCustomerPortal();
  return (
    <a target="_blank" href={portalUrl}>
      <Button {...props} />
    </a>
  );
}
