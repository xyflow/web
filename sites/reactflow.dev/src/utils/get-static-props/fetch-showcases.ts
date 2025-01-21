import { fetchNotionShowcases } from 'xy-shared/server';

export default async function getStaticShowcases() {
  const showcases = await fetchNotionShowcases('React Flow');

  return {
    props: {
      ssg: {
        showcases,
      },
    },
  };
}
