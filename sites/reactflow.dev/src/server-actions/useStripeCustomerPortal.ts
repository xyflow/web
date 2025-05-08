import useNhostFunction from './useNhostFunction';

function useStripeCustomerPortal(): { openCustomerPortal: () => void } {
  const callNhostFunction = useNhostFunction();

  const openCustomerPortal = async () => {
    const response = await callNhostFunction(
      '/stripe/create-customer-portal',
      {},
    );

    if (!response.error && response.url) {
      window.location.href = response.url;
    }
  };

  return {
    openCustomerPortal,
  };
}

export default useStripeCustomerPortal;
