import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export type Category = 'components' | 'hooks' | 'types' | 'utils';

export async function getApiReferenceByCategory(
  category: Category,
): Promise<{ title: string; description: string; route: string }[]> {
  const pages = (await getPageMap(`/api-reference/${category}`)) as MdxFile[];

  return pages.map((page) => ({
    title: page.frontMatter!.sidebarTitle || page.frontMatter!.title,
    description: page.frontMatter!.description,
    route: page.route,
  }));
}
