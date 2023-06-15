import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { NhostProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import * as Fathom from 'fathom-client';
import NextNProgress from 'nextjs-progressbar';

import { StripeContextWrapper } from '../context/stripe';
import { SubscriptionContextWrapper } from '../context/subscription';
import theme from '../styles/theme';
import { nhost } from '../utils/browser/nhost';

import '../styles/globals.css';

function ReactFlowPlatform({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (window?.location?.hash.includes('type=passwordReset')) {
      router.push(`/change-password/${window.location.hash}`);
    }
  }, []);

  // https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel
  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('PUYCLHSM', {
      includedDomains: ['pro.reactflow.dev'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <ChakraProvider theme={theme}>
          <SubscriptionContextWrapper>
            <StripeContextWrapper>
              <>
                <NextNProgress options={{ showSpinner: false }} color={theme.colors.pink['500']} />
                <Component {...pageProps} />
              </>
            </StripeContextWrapper>
          </SubscriptionContextWrapper>
        </ChakraProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
}

export default ReactFlowPlatform;
