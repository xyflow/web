import { useRouter } from 'next/router';

export default function Logo() {
  const router = useRouter();

  const label = router.pathname.startsWith('/react-flow')
    ? 'React Flow'
    : router.pathname.startsWith('/svelte-flow')
    ? 'Svelte Flow'
    : 'XY Flow';

  return <strong>{label}</strong>;
}
