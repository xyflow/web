import { FC } from 'react';
import { MdxFile } from 'nextra';
import { getPageMap } from 'nextra/page-map';
import { PropsTable as XYPropsTable, type PropsTableProps } from 'xy-shared';

const externalReactLinks = {
  Writable:
    'https://github.com/sveltejs/svelte/blob/3d20b392895b54b75b840fda6511840cc6a7a371/packages/svelte/src/runtime/store/public.d.ts#L37',
  Readable:
    'https://github.com/sveltejs/svelte/blob/3d20b392895b54b75b840fda6511840cc6a7a371/packages/svelte/src/runtime/store/public.d.ts#L27',
  ComponentType:
    'https://github.com/sveltejs/svelte/blob/3d20b392895b54b75b840fda6511840cc6a7a371/packages/svelte/src/runtime/internal/public.d.ts#L67',
  SvelteComponent:
    'https://github.com/sveltejs/svelte/blob/3d20b392895b54b75b840fda6511840cc6a7a371/packages/svelte/src/runtime/internal/Component.js#L451',
};

const externalLinks = {
  Partial:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
  Record:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
  CustomEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent',
};

export const PropsTable: FC<PropsTableProps> = async (tableProps) => {
  const pageMap = await getPageMap('/api-reference/types');
  const svelteFlowLinks = Object.fromEntries(
    pageMap
      .filter((item): item is MdxFile => 'frontMatter' in item)
      .map((item) => [
        item.frontMatter.title,
        `/api-reference/types/${item.name}`,
      ]),
  );
  const allLinks = {
    ...tableProps.links,
    ...svelteFlowLinks,
    ...externalReactLinks,
    ...externalLinks,
  };

  return <XYPropsTable {...tableProps} links={allLinks} />;
};
