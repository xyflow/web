import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { APIDocs } from '@/components/api-docs';
import { RemoteCodeViewer } from 'xy-shared/server';
import { Callout, Steps, Cards, Tabs } from 'nextra/components';

const docsComponents = getDocsMDXComponents({
  APIDocs,
  RemoteCodeViewer: () => null,
  Callout,
  Steps,
  Cards,
  Tabs,
});

export function useMDXComponents(components = {}) {
  return {
    ...docsComponents,
    ...components,
  };
}
