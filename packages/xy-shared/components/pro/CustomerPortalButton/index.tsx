import { Button, type ButtonProps } from '../../ui/button';
import { openStripeCustomerPortal } from '../../../server-actions/open-stripe-customer-portal';

export default function CustomerPortalButton(props: ButtonProps) {
  return <Button onClick={openStripeCustomerPortal} {...props} />;
}
