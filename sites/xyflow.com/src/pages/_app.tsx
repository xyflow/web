import { useFathom } from 'xy-shared';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

import 'styles/global.css';

const fathomOptions = {
  id: 'JQTCQNLV',
};

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
        <Component {...pageProps} />
      </div>
    </>
  );
}
