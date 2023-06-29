import useXYSite from '@/hooks/useXYSite';

export default function Logo() {
  const { site } = useXYSite();

  const label =
    site === 'react'
      ? 'React Flow'
      : site === 'svelte'
      ? 'Svelte Flow'
      : 'XY Flow';

  return <strong>{label}</strong>;
}
