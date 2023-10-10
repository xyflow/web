import { CSSProperties } from 'react';
import localFont from 'next/font/local';
import { Fira_Mono } from 'next/font/google';

import 'styles/global.css';
import useXYSite from '@/hooks/use-xy-site';
import { useFathom } from 'xy-ui';

const ntDapperFont = localFont({
  src: [
    { path: '../styles/fonts/NTDapper-regular.woff2', weight: '400' },
    { path: '../styles/fonts/NTDapper-medium.woff2', weight: '500' },
    { path: '../styles/fonts/NTDapper-bold.woff2', weight: '700' },
    { path: '../styles/fonts/NTDapper-black.woff2', weight: '900' },
  ],
  variable: '--font-ntdapper',
});

const firaMonoFont = Fira_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-firamono',
});

const className = `${ntDapperFont.variable} ${firaMonoFont.variable} font-sans`;

// @todo this doesn't work because it's not flexible enough
const hueValuesBySite = {
  xyflow: 220,
  react: 330,
  svelte: 30,
};

const fathomOptions = {
  id: 'JQTCQNLV',
  domains: ['xyflow.com'],
};

export default function App({ Component, pageProps }) {
  const { site } = useXYSite();

  useFathom(fathomOptions);

  return (
    <main
      className={className}
      style={
        {
          '--nextra-primary-hue': hueValuesBySite[site],
          '--docsearch-primary-color': `hsl(var(--color-${site}))`,
          '--docsearch-highlight-color': `hsl(var(--color-${site}))`,
          '--docsearch-searchbox-shadow': `inset 0 0 0 2px hsl(var(--color-${site}))`,
        } as CSSProperties
      }
    >
      <Component {...pageProps} />
    </main>
  );
}
