import useNhostFunction from './useNhostFunction';

function useStripeCustomerPortal(): { openCustomerPortal: () => void } {
  const callNhostFunction = useNhostFunction();

  const openCustomerPortal = async () => {
    const response = await callNhostFunction<{ url: string }>('/stripe/create-customer-portal', {});

    if (response.res.data?.url) {
      window.location.href = response.res.data.url;
    }
  };

  return {
    openCustomerPortal,
  };
}

export default useStripeCustomerPortal;
