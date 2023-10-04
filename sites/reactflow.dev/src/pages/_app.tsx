import localFont from 'next/font/local';
import { Fira_Mono } from 'next/font/google';

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

const firaMonoFont = Fira_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-firamono',
});

const className = `${ntDapperFont.variable} ${firaMonoFont.variable} font-sans`;

export default function App({ Component, pageProps }) {
  return (
    <main className={className}>
      <Component {...pageProps} />
    </main>
  );
}
