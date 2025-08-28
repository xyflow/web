import { getPageMap as getExamplesPageMap } from '@/app/(content-pages)/examples/[...slug]/utils';
import { SidebarTitle } from 'xy-shared';
import { normalizeSubscription } from '@/utils/pro-utils';
import { Folder, MdxFile, MetaJsonFile } from 'nextra';
import { getPageMap, mergeMetaWithPageMap } from 'nextra/page-map';
// import { getSubscription } from '@/server-actions';

const hidden = { display: 'hidden' };

export const normalizePageMap = async () => {
  const [
    //
    _pageMap,
    { user, ...subscriptionContext },
  ] = await Promise.all([
    getPageMap(),
    Promise.resolve({ user: null } as any),
    // getSubscription(),
  ]);

  const subscription = normalizeSubscription(subscriptionContext);

  const pageMap = mergeMetaWithPageMap(_pageMap.slice(), {
    pro: {
      items: user
        ? {
            'sign-in': hidden,
            'sign-up': hidden,
            ...(subscription.isSubscribed && { subscribe: hidden }),
            ...(!subscription.isAdmin && { team: hidden }),
          }
        : {
            dashboard: hidden,
            support: hidden,
            team: hidden,
            account: hidden,
            subscribe: hidden,
          },
    },
  });

  // Add badges
  const apiReference = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'api-reference',
  );
  const examplesIndex = pageMap.findIndex(
    (item): item is Folder => 'name' in item && item.name === 'examples',
  );
  const [examplesMeta, ...examples] = (pageMap[examplesIndex] as Folder).children;
  const [catchAllExamplesMeta, ...catchAllExamples] = (await getExamplesPageMap())
    .children;
  // Merge on disk examples with examples from catch-all [...slug] route
  pageMap[examplesIndex] = {
    ...pageMap[examplesIndex],
    children: [
      {
        // Merge meta records
        data: {
          ...(examplesMeta as MetaJsonFile).data,
          ...(catchAllExamplesMeta as MetaJsonFile).data,
        },
      },
      ...examples.slice(0, -1), // Exclude /examples/pro page
      ...catchAllExamples,
      examples.at(-1)!, // Move /examples/pro to the end of sidebar
    ],
  };

  const components = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'ui',
  );

  const folders = [
    ...apiReference!.children,
    ...components!.children,
    ...catchAllExamples,
  ].filter((item): item is Folder<MdxFile> => 'children' in item);

  for (const folder of folders) {
    // First filter out hidden items
    folder.children = folder.children
      .filter((item: MdxFile) => {
        // Skip items where frontMatter.hidden is true
        return !('frontMatter' in item && item.frontMatter?.hidden === true);
      })
      .map((item: MdxFile & { title: string }) => ({
        ...item,
        title:
          typeof item.title === 'string' ? (
            <SidebarTitle frontMatter={item.frontMatter!} title={item.title} />
          ) : (
            item.title
          ),
      }));
  }

  return {
    pageMap,
    subscriptionContext,
    user,
  };
};
