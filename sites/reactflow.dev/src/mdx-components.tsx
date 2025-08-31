import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { Callout, Steps, Cards, Tabs } from 'nextra/components';
import { RemoteCodeViewer } from 'xy-shared/server';
import { APIDocs } from '@/components/api-docs';
import ProExampleViewer from '@/components/pro-example-viewer';

const docsComponents = getDocsMDXComponents({
  APIDocs,
  RemoteCodeViewer,
  ProExampleViewer: () => null, // TODO
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
