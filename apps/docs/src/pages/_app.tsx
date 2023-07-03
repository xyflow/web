import { type CSSProperties } from 'react';
import localFont from 'next/font/local';

import useXYSite from '@/hooks/use-xy-site';

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

const hueValuesBySite = {
  xyflow: 220,
  react: 330,
  svelte: 30,
};

export default function App({ Component, pageProps }) {
  const { site } = useXYSite();

  return (
    <main
      className={`${ntDapperFont.variable} font-sans`}
      style={{ '--nextra-primary-hue': hueValuesBySite[site] } as CSSProperties}
    >
      <Component {...pageProps} />
    </main>
  );
}
