import Link from 'next/link';

import { Text } from 'xy-ui';
import Logo from '@/components/logo';
import useXYSite from '@/hooks/use-xy-site';

export default function NavbarLogo() {
  const { site, isOrg, lib } = useXYSite();
  const label = isOrg ? site : lib;
  const href = isOrg ? `/` : `/${site}-flow`;

  return (
    <Link href={href} className="flex space-x-2 items-center">
      <Logo className="h-9 w-9" variant={site} animated />
      <Text className="font-black text-xl">{label}</Text>
    </Link>
  );
}
