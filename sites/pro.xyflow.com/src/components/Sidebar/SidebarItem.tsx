'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, cn, ButtonProps } from 'xy-ui';

const SidebarItem = ({
  href,
  label,
  matchSubPaths = false,
  icon = null,
  className,
  btnVariant = 'ghost',
}: {
  href: string;
  label: string;
  matchSubPaths?: boolean;
  icon?: React.ReactNode;
  className?: string;
  btnVariant?: ButtonProps['variant'];
}) => {
  const pathname = usePathname();
  const isActive = matchSubPaths ? pathname.startsWith(href) : pathname === href;

  const btnClassName = cn(
    'shrink-0 bg-gray-100 lg:bg-transparent gap-1 text-muted-foreground justify-start',
    {
      '!bg-pink-100 !text-react': isActive,
      'pl-4': !!icon,
    },
    className
  );

  return (
    <Button variant={btnVariant} className={btnClassName} asChild>
      <Link className="[&>svg]:w-5 [&>svg]:h-5" href={href}>
        {icon} {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
