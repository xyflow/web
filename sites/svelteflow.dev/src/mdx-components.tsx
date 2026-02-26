import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';

const docsComponents = getDocsMDXComponents({
  async APIDocs(props) {
    // Dynamically import APIDocs since it depends on nextra/tsdoc (requires TypeScript).
    // On Vercel, static import causes a runtime error:
    // "File not found: /var/task/sites/svelteflow.dev/tsconfig.json"
    const { APIDocs } = await import('xy-shared/components/api-docs/svelte');
    return <APIDocs {...props} />;
  },
});

export function useMDXComponents(components = {}) {
  return {
    ...docsComponents,
    ...components,
  };
}
