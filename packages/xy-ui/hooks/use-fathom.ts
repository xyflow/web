import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { load, trackPageview } from 'fathom-client';

export function useFathom({
  id,
  domains = [],
}: {
  id: string;
  domains?: string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const options = domains
      ? {
          includedDomains: domains,
        }
      : {};

    load(id, options);

    function onRouteChangeComplete() {
      trackPageview();
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [id, domains]);

  return null;
}
