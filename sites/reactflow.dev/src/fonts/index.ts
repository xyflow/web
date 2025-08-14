import localFont from 'next/font/local';

export const NtDapperFont = localFont({
  src: [
    {
      path: './NTDapper-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './NTDapper-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './NTDapper-black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
});
