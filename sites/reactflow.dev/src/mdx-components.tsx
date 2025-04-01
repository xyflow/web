import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { unstable_TSDoc as TSDoc } from 'nextra/tsdoc';
import { getPageMap } from 'nextra/page-map';
import type { MdxFile } from 'nextra';

const externalReactLinks = {
  ComponentType:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L75',
  CSSProperties:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1545',
  Dispatch:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdd784f597ef151da8659762300621686969470d/types/react/v17/index.d.ts#L879',
  DragEvent:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0cb3553dbd4f91bf6c20e1f4e8bc56197b1e61f8/types/d3-drag/index.d.ts#L281C1-L281C1',
  MouseEvent:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1226C6-L1226C6',
  ReactNode:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d7e13a7c7789d54cf8d601352517189e82baf502/types/react/index.d.ts#L264',
  SetStateAction:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdd784f597ef151da8659762300621686969470d/types/react/v17/index.d.ts#L879',
  StoreApi:
    'https://github.com/pmndrs/zustand/blob/0426978490e8b14f40443bcbb2332e103076510b/src/vanilla.ts#L8',
};

const externalLinks = {
  Partial: 'https://typescriptlang.org/docs/handbook/utility-types.html#partialtype',
  Record: 'https://typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
};


const docsComponents = getDocsMDXComponents({
  async APIDocs({ typeName, ...props }) {
    const pageMap = await getPageMap('/api-reference/types');
    const reactFlowLinks = Object.fromEntries(
      pageMap
        .filter((item): item is MdxFile => 'frontMatter' in item)
        .map((item) => [item.frontMatter.title, `/api-reference/types/${item.name}`]),
    );
    const allLinks = {
      ...reactFlowLinks,
      ...externalReactLinks,
      ...externalLinks,
      NodeType: '/api-reference/types/node',
      EdgeMarkerType: '/api-reference/types/edge-marker'
    };
    return <TSDoc
      typeLinkMap={allLinks}
      code={`export type { ${typeName} as default } from '@xyflow/react'`}
      {...props}
    />;
  },
});

export const useMDXComponents: typeof getDocsMDXComponents = (components) => ({
  ...docsComponents,
  ...components,
});
