import { Button, ButtonProps } from '@xyflow/xy-ui';
import { openStripeCustomerPortal } from '@/server-actions';

export default function CustomerPortalButton(props: ButtonProps) {
  return <Button onClick={openStripeCustomerPortal} {...props} />;
}
