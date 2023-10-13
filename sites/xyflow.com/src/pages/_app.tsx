import localFont from 'next/font/local';
import { Fira_Mono } from 'next/font/google';
import { Text, useFathom } from 'xy-ui';

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

const fathomOptions = {
  id: 'JQTCQNLV',
  domains: ['xyflow.com'],
};

const sites = [
  { name: 'xyflow.com', href: 'https://xyflow.com' },
  {
    name: 'React Flow',
    logo: '/img/react-logo.svg',
    href: 'https://reactflow.dev',
  },
  {
    name: 'Svelte Flow',
    logo: '/img/svelte-logo.svg',
    href: 'https://svelteflow.com',
  },
];

export default function App({ Component, pageProps }) {
  useFathom(fathomOptions);

  return (
    <div className={className}>
      <header className="bg-black py-2 flex items-center justify-center gap-8">
        {sites.map((site) => (
          <Text size="xs" key={site.name}>
            {site.logo && (
              <img src={site.logo} className="w-3 h-3 mr-2 inline-block" />
            )}
            <a href={site.href} className="text-white hover:text-gray-200">
              {site.name}
            </a>
          </Text>
        ))}
      </header>

      <Component {...pageProps} />
    </div>
  );
}
