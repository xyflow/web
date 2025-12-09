import { Button, ButtonProps } from 'xy-shared';
import { openStripeCustomerPortal } from '@/server-actions';

export default function CustomerPortalButton(props: ButtonProps) {
  return <Button onClick={openStripeCustomerPortal} {...props} />;
}
