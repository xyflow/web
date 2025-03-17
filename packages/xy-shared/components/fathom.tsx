'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackPageView({ id, domains }: { id: string; domains?: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    load(id, {
      auto: false,
      includedDomains: domains,
    });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Fathom(props: { id: string; domains?: string[] }) {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <TrackPageView {...props} />
    </Suspense>
  );
}
