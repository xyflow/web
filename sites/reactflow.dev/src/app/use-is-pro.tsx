import { usePathname } from 'next/navigation';

export function useIsPro() {
  const pathname = usePathname();
  return pathname.startsWith('/pro');
}
