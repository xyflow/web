import Link from 'next/link';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';

import useXYSite from 'hooks/useXYSite';
import { navItems } from './items';

export default function Navbar(props) {
  const { site } = useXYSite();

  return (
    <div>
      <div className="flex items-center justify-center py-2 text-xs bg-black ">
        {props.items.map((item) => (
          <Link
            className="px-1 mx-2 text-white hover:text-gray-300"
            href={item.route}
            key={item.name}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <NextraNavbar
        flatDirectories={props.flatDirectories}
        items={navItems[site]}
      />
    </div>
  );
}
