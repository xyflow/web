import React, { useMemo } from 'react';
import { PropsTable, type PropsTableProps } from 'xy-shared';

import svelteFlowTypes from '@/pages/api-reference/types/_meta.json';

export const svelteFlowLinks = Object.entries(svelteFlowTypes).reduce<
  Record<string, string>
>((curr, [slug, name]) => {
  curr[name] = `/api-reference/types/${slug}`;
  return curr;
}, {});

const externalReactLinks = {
  Writable:
    'https://github.com/sveltejs/svelte/blob/3d20b392895b54b75b840fda6511840cc6a7a371/packages/svelte/src/runtime/store/public.d.ts#L37',
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

export default function PropsTableWrapper(tableProps: PropsTableProps) {
  const allLinks = useMemo(
    () => ({
      ...tableProps.links,
      ...svelteFlowLinks,
      ...externalReactLinks,
      ...externalLinks,
    }),
    [tableProps.links],
  );

  return <PropsTable {...tableProps} links={allLinks} />;
}

export { PropsTableWrapper as PropsTable };
