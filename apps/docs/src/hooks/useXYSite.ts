import { useMemo } from 'react';
import { useRouter } from 'next/router';

export default function useXYSite() {
  const router = useRouter();

  const site = useMemo(() => {
    const { pathname } = router;
    if (pathname.includes('react-flow')) {
      return 'react';
    } else if (pathname.includes('svelte-flow')) {
      return 'svelte';
    } else {
      return 'xyflow';
    }
  }, [router.pathname]);

  return {
    site,
    isFramework: site !== 'xyflow',
  };
}
