import { useState } from 'react';
import { nhost } from '../utils/browser/nhost';

function useStripeCustomerPortal() {
  const [isLoading, setLoading] = useState(false);

  const openPortal = async function () {
    setLoading(true);
    const { res, error } = await nhost.functions.call('/stripe/create-portal');
    const sessionUrl = res?.data?.sessionUrl;

    if (!error && sessionUrl) {
      window.location.assign(sessionUrl);
    }

    setTimeout(() => setLoading(false), 500);
  };

  return { isLoading, openPortal };
}

export default useStripeCustomerPortal;
