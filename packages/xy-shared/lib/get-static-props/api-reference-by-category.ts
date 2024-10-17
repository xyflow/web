import { getMdxPagesUnderRoute } from '../utils';

export type Category = 'components' | 'hooks' | 'types';

export function getApiReferenceByCategory<InternalRoute extends string>(
  category: Category,
): { title: string; description: string; route: InternalRoute }[] {
  const route = `/api-reference/${category}`;
  const pages = getMdxPagesUnderRoute(route);

  return pages.map((page) => ({
    title: page.frontMatter?.displayTitle ?? page.frontMatter?.title,
    description: page.frontMatter?.description,
    route: page.route as InternalRoute,
  }));
}

export default getApiReferenceByCategory;
