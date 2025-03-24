import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { createTypeTable } from '@nextra/typescript'

const { AutoTypeTable } = createTypeTable()

const docsComponents = getDocsMDXComponents({
  AutoTypeTable
});

export const useMDXComponents: typeof getDocsMDXComponents = (components) => ({
  ...docsComponents,
  ...components,
});
