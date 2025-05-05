import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { APIDocs } from '@/components/api-docs';

const docsComponents = getDocsMDXComponents({
  APIDocs,
});

export function useMDXComponents(components) {
  return {
    ...docsComponents,
    ...components,
  };
}
