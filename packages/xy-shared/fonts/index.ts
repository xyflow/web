import localFont from 'next/font/local';
import { Fira_Mono } from 'next/font/google';

export const ntDapperFont = localFont({
  src: [
    { path: './NTDapper-regular.woff2', weight: '400' },
    { path: './NTDapper-medium.woff2', weight: '500' },
    { path: './NTDapper-bold.woff2', weight: '700' },
    { path: './NTDapper-black.woff2', weight: '900' },
  ],
  variable: '--font-ntdapper',
});

export const firaMonoFont = Fira_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-firamono',
});

export const fontClassNames = `${ntDapperFont.variable} ${firaMonoFont.variable} font-sans`;
