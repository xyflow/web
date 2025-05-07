import { useSearchParams } from 'next/navigation';

export default function useQueryString(): string {
  const searchParams = useSearchParams();
  return searchParams.toString() === '' ? '' : `?${searchParams.toString()}`;
}
