import { useSearchParams } from 'next/navigation';

export default function useQueryString(): string {
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  return params && `?${params}`;
}
