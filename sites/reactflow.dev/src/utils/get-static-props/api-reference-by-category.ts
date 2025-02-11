import { type InternalRoute } from '../routes';
import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export type Category = 'components' | 'hooks' | 'types' | 'utils';

export async function getApiReferenceByCategory(
  category: Category,
): Promise<{ title: string; description: string; route: InternalRoute}[]> {
  const route = `/api-reference/${category}` satisfies InternalRoute;
  const pages = await getPageMap(route) as MdxFile[];

  return pages.map((page) => ({
    title: page.frontMatter.sidebarTitle ?? page.frontMatter.title,
    description: page.frontMatter.description,
    route: page.route as InternalRoute,
  }));
}

export default getApiReferenceByCategory;
