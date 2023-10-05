import Link from 'next/link';

import { Text, Logo } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';

export default function NavbarLogo() {
  const { site, isOrg, lib } = useXYSite();
  const label = isOrg ? site : lib;
  const href = isOrg ? `/` : `/${site}-flow`;

  return (
    <Link href={href} className="flex space-x-2 items-center">
      <Logo className="h-9 w-9" animated />
      <Text className="font-black text-xl">{label}</Text>
    </Link>
  );
}
