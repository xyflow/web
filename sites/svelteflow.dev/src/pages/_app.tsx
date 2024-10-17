import { useRouter } from 'next/router';
import { cn } from '@xyflow/xy-ui';

import { UseConfigContext, useFathom } from 'xy-shared';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

import '../global.css';
import { useConfig } from 'nextra-theme-docs';

const fathomOptions = {
  id: 'PFWQXXRR',
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
        <UseConfigContext.Provider value={useConfig}>
          <Component {...pageProps} />
        </UseConfigContext.Provider>
      </div>
    </>
  );
}
