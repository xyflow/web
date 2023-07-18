import { useUserEmail } from '@nhost/nextjs';

function useStripeCustomerPortal(): { portalUrl: string } {
  const userEmail = useUserEmail();
  return {
    portalUrl: `https://billing.stripe.com/p/login/${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_ID}?prefilled_email=${userEmail}`,
  };
}

export default useStripeCustomerPortal;
