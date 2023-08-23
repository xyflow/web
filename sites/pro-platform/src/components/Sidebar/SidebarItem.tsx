'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, cn } from 'xy-ui';

const SidebarItem = ({
  href,
  label,
  matchSubPaths = false,
  icon = null,
}: {
  href: string;
  label: string;
  matchSubPaths?: boolean;
  icon?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = matchSubPaths ? pathname.startsWith(href) : pathname === href;

  const className = cn('shrink-0 bg-gray-100 lg:bg-transparent gap-1 text-muted-foreground justify-start', {
    '!bg-pink-100 !text-react': isActive,
    'pl-4': !!icon,
  });

  return (
    <Button variant="ghost" className={className} asChild>
      <Link className="[&>svg]:w-5 [&>svg]:h-5" href={href}>
        {icon} {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
