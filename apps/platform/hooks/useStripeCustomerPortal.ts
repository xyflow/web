import { useUserEmail } from '@nhost/nextjs';

function useStripeCustomerPortal(): { portalUrl: string } {
  const userEmail = useUserEmail();

  // @todo put this in env var for dev/prod
  return { portalUrl: `https://billing.stripe.com/p/login/test_bIYfZ70VVdRY7lucMM?prefill_email=${userEmail}` };
}

export default useStripeCustomerPortal;
