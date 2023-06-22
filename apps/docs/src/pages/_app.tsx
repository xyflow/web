import useXYSite from 'hooks/useXYSite';
import localFont from 'next/font/local';

import 'styles/global.css';

const ntDapperFont = localFont({
  src: [
    { path: '../styles/fonts/NTDapper-regular.woff2', weight: '400' },
    { path: '../styles/fonts/NTDapper-medium.woff2', weight: '500' },
    { path: '../styles/fonts/NTDapper-bold.woff2', weight: '700' },
    { path: '../styles/fonts/NTDapper-black.woff2', weight: '900' },
  ],
  variable: '--font-ntdapper',
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${ntDapperFont.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
