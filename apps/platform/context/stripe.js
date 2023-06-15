import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeContext = createContext();

// @todo this should be removed, don't load stripe globally
export function StripeContextWrapper({ children }) {
  const loading = useRef(false);
  const [contextValue, setContextValue] = useState(null);

  useEffect(() => {
    if (!contextValue && !loading.current) {
      loading.current = true;

      (async () => {
        try {
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
          setContextValue(stripe);
          loading.current = false;
        } catch (err) {
          loading.current = false;
        }
      })();
    }
  }, []);

  return <StripeContext.Provider value={contextValue}>{children}</StripeContext.Provider>;
}

export function useStripe() {
  return useContext(StripeContext);
}
