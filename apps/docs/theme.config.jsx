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

const SidebarClassNameLookup = {
  '/react-flow/examples/floating-edges': 'pro',
};

function SidebarTitle({ title, type, route }) {
  console.log(title, route, type);

  return (
    <div className={`sidebar-title ${SidebarClassNameLookup[route] ?? ''}`}>
      {title}
    </div>
  );
}

export default {
  logo: Logo,
  project: {
    link: 'https://github.com/xyflow/xyflow',
  },
  sidebar: {
    titleComponent: SidebarTitle,
  },
};
