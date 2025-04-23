import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { APIDocs } from '@/components/api-docs';

const docsComponents = getDocsMDXComponents({
  APIDocs,
});

export const useMDXComponents: typeof getDocsMDXComponents = (components) => ({
  ...docsComponents,
  ...components,
});
