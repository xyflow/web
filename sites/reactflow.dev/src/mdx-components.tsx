import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { Callout, Steps, Cards, Tabs } from 'nextra/components';
import { RemoteCodeViewer } from 'xy-shared/server';
import ProExampleViewer from 'xy-shared/components/pro-example-viewer';

const docsComponents = getDocsMDXComponents({
  async APIDocs(props) {
    // Dynamically import APIDocs since it depends on ts-morph (requires TypeScript).
    // On Vercel (Pro platform), static import causes a runtime error:
    // "File not found: /var/task/sites/reactflow.dev/tsconfig.json"
    const { APIDocs } = await import('xy-shared/components/api-docs/react');
    return <APIDocs {...props} />;
  },
  RemoteCodeViewer,
  ProExampleViewer,
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
