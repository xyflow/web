import { getMdxPagesUnderRoute } from '../index';
import { type InternalRoute } from '../routes';

export type Category = 'components' | 'hooks' | 'types' | 'utils';

export function getApiReferenceByCategory(
  category: Category,
): { title: string; description: string; route: InternalRoute }[] {
  const route = `/api-reference/${category}` satisfies InternalRoute;
  const pages = getMdxPagesUnderRoute(route);

  return pages.map((page) => ({
    title: page.frontMatter.title,
    description: page.frontMatter.description,
    route: page.route as InternalRoute,
  }));
}

export default getApiReferenceByCategory;
