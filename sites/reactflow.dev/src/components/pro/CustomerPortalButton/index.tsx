'use client';

// @todo how can this be turned into a server component?
import { Button, ButtonProps } from '@xyflow/xy-ui';
import useStripeCustomerPortal from '@/hooks/useStripeCustomerPortal';

export default function CustomerPortalButton(props: ButtonProps) {
  const { openCustomerPortal } = useStripeCustomerPortal();
  return <Button onClick={openCustomerPortal} {...props} />;
}
