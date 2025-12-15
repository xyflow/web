import { Button, type ButtonProps } from '../../ui/button';
import { openStripeCustomerPortal } from '../../../server-actions';

export default function CustomerPortalButton(props: ButtonProps) {
  return <Button onClick={openStripeCustomerPortal} {...props} />;
}
