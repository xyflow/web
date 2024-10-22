import { useConfig } from 'nextra-theme-docs';
import { compileMdx } from 'nextra/compile';
import { useData } from 'nextra/hooks';

import { useFathom, SharedContext } from 'xy-shared';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

import '../global.css';

const fathomOptions = {
  id: 'JQTCQNLV',
};

const sharedContext = { useConfig, compileMdx, useData };

export default function App({ Component, pageProps }) {
  useFathom(fathomOptions);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ntDapperFont.style.fontFamily}, sans-serif;
        }
      `}</style>
      <div className={fontClassNames}>
        <SharedContext.Provider value={sharedContext}>
          <Component {...pageProps} />
        </SharedContext.Provider>
      </div>
    </>
  );
}
