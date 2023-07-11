import Link from 'next/link';

import useXYSite from '@/hooks/use-xy-site';

export default function Logo() {
  const { site, isOrg, lib } = useXYSite();
  const label = isOrg ? site : lib;
  const href = isOrg ? `/` : `/${site}-flow`;

  return (
    <Link href={href}>
      <strong>{label}</strong>
    </Link>
  );
}
