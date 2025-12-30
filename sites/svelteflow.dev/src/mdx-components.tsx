import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { APIDocs } from 'xy-shared/components/api-docs/svelte';

const docsComponents = getDocsMDXComponents({ APIDocs });

export function useMDXComponents(components = {}) {
  return {
    ...docsComponents,
    ...components,
  };
}
