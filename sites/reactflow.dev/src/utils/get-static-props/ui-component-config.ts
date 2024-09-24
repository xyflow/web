import { fetchJSON } from '..';

export default function getUiComponentConfig(id: string) {
  return async () => {
    const data = await fetchJSON(
      `${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/registry/${id}.json`,
    );

    const demo = await fetchJSON(
      `${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/demo/${id}.json`,
    );

    return {
      props: {
        ssg: {
          ...data,
          demo,
        },
      },
      revalidate: 60 * 60 * 24,
    };
  };
}
