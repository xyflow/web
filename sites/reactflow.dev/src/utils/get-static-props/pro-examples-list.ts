import { fetchJSON } from '..';

export default async function getStaticProps() {
  const data = await fetchJSON(
    `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/examples.json`,
  );

  return {
    props: {
      ssg: {
        remoteProExamples: data,
      },
    },
    revalidate: 60 * 60 * 24,
  };
}
