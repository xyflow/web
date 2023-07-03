import Link from 'next/link';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import { getPagesUnderRoute } from 'nextra/context';

import useXYSite from '@/hooks/use-xy-site';
import { Button } from 'xy-ui';

const topNav = [
  {
    title: 'xyflow',
    route: '/',
  },
  {
    title: 'React Flow',
    route: '/react-flow',
  },
  {
    title: 'Svelte Flow',
    route: '/svelte-flow',
  },
];

const xyNavBarRoutes = ['/blog', '/about', '/showcase', '/open-source'];

export default function Navbar(props) {
  const { site, isOrg } = useXYSite();

  const navBarItems = isOrg
    ? props.items.filter((item) => xyNavBarRoutes.includes(item.route))
    : getPagesUnderRoute(`/${site}-flow`)
        .filter((page) => page.name !== 'index' && page.name !== 'pro')
        .map((p) => ({ ...p, title: p.meta?.title }));

  return (
    <div>
      <div className="flex items-center justify-center py-2 text-xs bg-black ">
        {topNav.map((item) => (
          <Link
            className="px-1 mx-2 text-white hover:text-gray-300"
            href={item.route}
            key={item.title}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <NextraNavbar
        flatDirectories={props.flatDirectories}
        items={navBarItems}
      />
    </div>
  );
}

export function NavBarAdditional() {
  const { site, isOrg } = useXYSite();

  if (isOrg) {
    return null;
  }

  return (
    <Button asChild variant={site} size="sm" className="px-4 font-black">
      <Link href={`/${site}-flow/pro`}>Pro</Link>
    </Button>
  );
}
