import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { Callout, Steps, Cards, Tabs } from 'nextra/components';
import { RemoteCodeViewer } from 'xy-shared/server';
import ProExampleViewer from '@/components/pro-example-viewer';

const docsComponents = getDocsMDXComponents({
  async APIDocs(props) {
    const { APIDocs } = await import('@/components/api-docs');
    return <APIDocs {...props} />;
  },
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
