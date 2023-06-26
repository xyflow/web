import { useMemo } from 'react';
import { useRouter } from 'next/router';

export default function useXYSite() {
  const router = useRouter();

  const site = useMemo(() => {
    if (router.pathname.includes('react-flow')) {
      return 'react';
    } else if (router.pathname.includes('svelte-flow')) {
      return 'svelte';
    } else {
      return 'xyflow';
    }
  }, [router.pathname]);

  const lib = useMemo(() => {
    if (site === 'xyflow') {
      return site;
    }

    return `${site.charAt(0).toUpperCase() + site.slice(1)} Flow`;
  }, [site]);

  return {
    site,
    lib,
    isOrg: site === 'xyflow',
  };
}
