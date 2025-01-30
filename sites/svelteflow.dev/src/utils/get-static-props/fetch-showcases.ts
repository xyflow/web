import { fetchNotionShowcases } from 'xy-shared/server';

export default async function getStaticShowcases() {
  const showcases = await fetchNotionShowcases('Svelte Flow');

  return {
    props: {
      ssg: {
        showcases,
      },
    },
  };
}
