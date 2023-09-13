import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

export default function useXYSite(): {
  site: 'react' | 'svelte' | 'xyflow';
  lib: 'React Flow' | 'Svelte Flow' | null;
  isOrg: boolean;
  getSiteByPathname: (pathname: string) => 'react' | 'svelte' | 'xyflow';
} {
  const router = useRouter();

  const getSiteByPathname = useCallback((pathname: string) => {
    const segments = pathname.split('/');

    if (segments.includes('react-flow')) {
      return 'react';
    } else if (segments.includes('svelte-flow')) {
      return 'svelte';
    }

    return 'xyflow';
  }, []);

  const site = useMemo(
    () => getSiteByPathname(router.pathname),
    [router.pathname]
  );

  const lib = useMemo(() => {
    if (site === 'xyflow') {
      return null;
    }

    return `${site.charAt(0).toUpperCase() + site.slice(1)} Flow` as
      | 'React Flow'
      | 'Svelte Flow';
  }, [site]);

  return {
    site,
    lib,
    isOrg: site === 'xyflow',
    getSiteByPathname,
  };
}
