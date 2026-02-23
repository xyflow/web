import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { APIDocs } from 'xy-shared/components/api-docs/svelte';
import ProExampleViewer from 'xy-shared/components/pro-example-viewer';

const docsComponents = getDocsMDXComponents({ APIDocs, ProExampleViewer });

export function useMDXComponents(components = {}) {
  return {
    ...docsComponents,
    ...components,
  };
}
