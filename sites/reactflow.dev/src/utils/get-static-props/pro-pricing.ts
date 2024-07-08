import { fetchJSON } from '..';

export default async function getStaticProps() {
  const data = await fetchJSON(
    `${process.env.NEXT_PUBLIC_NHOST_API_URL}/stripe/pricing`,
  );

  return {
    props: {
      ssg: {
        proPricing: data,
      },
    },
    revalidate: 60 * 60 * 24,
  };
}
