'use client';

import { useRouter } from 'next/router';
import { cn } from '@xyflow/xy-ui';

import { useFathom } from 'xy-shared';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

const fathomOptions = {
  id: 'LXMRMWLB',
  domains: ['reactflow.dev'],
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // we need this to be able to override nextra theme styles for specific pages
  const routeSegment = router.pathname?.split('/')?.[1];
  useFathom(fathomOptions);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ntDapperFont.style.fontFamily}, sans-serif;
        }
      `}</style>
      <div className={cn(fontClassNames, routeSegment)}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
