import { useRouter } from 'next/router';

function Logo() {
  const router = useRouter();

  const label = router.pathname.startsWith('/react-flow')
    ? 'React Flow'
    : router.pathname.startsWith('/svelte-flow')
    ? 'Svelte Flow'
    : 'XY Flow';

  return <strong>{label}</strong>;
}

export default {
  logo: Logo,
  project: {
    link: 'https://github.com/shuding/nextra',
  },
  // ...
};
