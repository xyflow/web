import { fetchJSON } from '..';

export default function getUiComponentConfig(id: string) {
  console.log(id);
  return async () => {
    const data = await fetchJSON(
      `${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/registry/${id}.json`,
    );

    return {
      props: {
        ssg: data,
      },
      revalidate: 60 * 60 * 24,
    };
  };
}
