import { useRouter } from 'next/router';
import { cn } from '@xyflow/xy-ui';

import { useConfig } from 'nextra-theme-docs';
import { compileMdx } from 'nextra/compile';

import { SharedContext, useFathom } from 'xy-shared';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

import '../global.css';
import { useData } from 'nextra/hooks';

const fathomOptions = {
  id: 'LXMRMWLB',
  domains: ['reactflow.dev'],
};

const sharedContext = { useConfig, compileMdx, useData };

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
        <SharedContext.Provider value={sharedContext}>
          <Component {...pageProps} />
        </SharedContext.Provider>
      </div>
    </>
  );
}
