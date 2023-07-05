'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from 'xy-ui';

const SidebarItem = ({
  href,
  label,
  matchSubPaths = false,
}: {
  href: string;
  label: string;
  matchSubPaths?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = matchSubPaths ? pathname.startsWith(href) : pathname === href;

  const className = cn(
    'rounded-md py-1 px-4 lg:pr-10 font-bold ',
    isActive ? 'bg-react text-white' : 'hover:underline'
  );

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
};

export default SidebarItem;
