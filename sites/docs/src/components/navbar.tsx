import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import { getPagesUnderRoute } from 'nextra/context';

import { Button } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';
import Logo from '@/components/logo';
import {
  PRO_PLATFORM_OR_REACT_PRO_URL,
  PRO_PLATFORM_SIGNUP_URL,
  PRO_PLATFORM_URL,
} from '@/constants';

import reactLogo from '../../public/img/react-logo.svg';
import svelteLogo from '../../public/img/svelte-logo.svg';
import { SparklesIcon } from '@heroicons/react/24/outline';

const topNav = [
  {
    title: 'xyflow',
    route: '/',
    logo: null,
  },
  {
    title: 'React',
    route: '/react-flow',
    logo: reactLogo,
  },
  {
    title: 'Svelte',
    route: '/svelte-flow',
    logo: svelteLogo,
  },
];

const xyNavBarRoutes = ['/blog', '/about', '/showcase', '/open-source'];

export default function Navbar(props) {
  const { site, isOrg } = useXYSite();

  const navBarItems = isOrg
    ? props.items.filter((item) => xyNavBarRoutes.includes(item.route))
    : getPagesUnderRoute(`/${site}-flow`)
        .filter(
          (page) =>
            page.name !== 'index' &&
            page.name !== 'pro' &&
            page.name !== 'support-us'
        )
        .map((p) => ({ ...p, title: p.meta?.title }));

  return (
    <>
      <div className="relative flex items-center justify-center py-2 text-xs bg-black space-x-2 z-30">
        {topNav.map((item) => (
          <Link
            className="px-1 text-white hover:text-gray-300 flex items-center"
            href={item.route}
            key={item.title}
          >
            {item.logo ? (
              <Image
                src={item.logo}
                alt="react logo"
                className="w-4 h-4 mr-1"
              />
            ) : (
              <Logo variant="xyflow" className="w-4 h-4 mr-1" inverted />
            )}
            {item.title}
          </Link>
        ))}
      </div>
      <NextraNavbar
        flatDirectories={props.flatDirectories}
        items={navBarItems}
      />
    </>
  );
}

export function NavBarAdditional() {
  const { site, isOrg } = useXYSite();
  const { pathname } = useRouter();

  const isReactProPage = pathname === '/react-flow/pro';

  if (isReactProPage) {
    return (
      <Button asChild variant={site} className="px-4 font-black">
        <Link href={PRO_PLATFORM_SIGNUP_URL}>Sign Up</Link>
      </Button>
    );
  }

  const link =
    site === 'react' || isOrg
      ? PRO_PLATFORM_OR_REACT_PRO_URL
      : `/svelte-flow/support-us`;
  const label =
    site === 'react' || isOrg ? (
      <>
        <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
      </>
    ) : (
      'Support Us'
    );

  return (
    <Button asChild variant={site} size="sm" className="px-4 font-black">
      <Link href={link}>{label}</Link>
    </Button>
  );
}
