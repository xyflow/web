'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense, FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const TrackPageView: FC<{ id: string; domains?: string[] }> = ({ id, domains }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    load(id, {
      auto: false,
      includedDomains: domains,
    });
  }, [id, domains]);

  // Record a pageview when route changes
  useEffect(() => {
    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
};

export const Fathom: FC<{ id: string; domains?: string[] }> = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <TrackPageView {...props} />
    </Suspense>
  );
};
