import { useUserEmail, useUserId } from '@nhost/nextjs';

const StripePricingTable = () => {
  const userEmail = useUserEmail();
  const userId = useUserId();

  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js" />
      <stripe-pricing-table
        pricing-table-id="prctbl_1NNZwyANIskB3EFJ4oapmotc"
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        client-reference-id={userId}
        customer-email={userEmail}
      />
    </>
  );
};

export default StripePricingTable;
