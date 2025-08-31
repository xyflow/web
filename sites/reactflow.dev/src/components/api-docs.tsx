import { TSDoc, generateDefinition } from 'nextra/tsdoc';
import { getPageMap } from 'nextra/page-map';
import type { MdxFile } from 'nextra';
import { ComponentProps, FC } from 'react';

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

export const APIDocs: FC<{
  code?: string;
  componentName?: string;
  typeName?: string;
  functionName?: string;
  /** @default "react" */
  packageName?: string;
  groupKeys?: string;
}> = async ({
  componentName,
  typeName,
  functionName,
  packageName = 'react',
  groupKeys,
  ...props
}) => {
  'use cache'

  // Should be loaded dynamically to avoid Error: File not found: /var/task/sites/reactflow.dev/tsconfig.json on Vercel
  // const { generateDefinition } = await import('nextra/tsdoc');
  const pageMap = await getPageMap('/api-reference/types');
  const reactFlowLinks = Object.fromEntries(
    pageMap
      .filter((item): item is MdxFile => 'frontMatter' in item)
      .map((item) => [item.frontMatter!.title, `/api-reference/types/${item.name}`]),
  );
  const defaultTSDocProps: Pick<
    ComponentProps<typeof TSDoc>,
    'noParametersContent' | 'typeLinkMap'
  > = {
    noParametersContent: (
      <p className="x:not-first:mt-[1.25em]">
        This function does not accept any parameters.
      </p>
    ),
    typeLinkMap: {
      ...reactFlowLinks,
      ...externalReactLinks,
      ...externalLinks,
      NodeType: '/api-reference/types/node',
      EdgeMarkerType: '/api-reference/types/edge-marker',
      EdgeType: '/api-reference/types/edge',
    },
  };

  if (props.code) {
    // @ts-expect-error -- fixme
    const definition = await generateDefinition(props);
    return <TSDoc definition={definition} {...defaultTSDocProps} />;
  }
  if (functionName) {
    const definition = await generateDefinition({
      code: `export type { ${functionName} as default } from '@xyflow/react'`,
      flattened: true,
      ...props,
    });
    return <TSDoc definition={definition} {...defaultTSDocProps} />;
  }
  let code: string;

  if (componentName) {
    code = `
import type { ComponentProps, HTMLAttributes, SVGAttributes } from 'react'
import type { ${componentName} } from '@xyflow/react'
type MyProps = ComponentProps<typeof ${componentName}>`;

    code += groupKeys
      ? `
type WithGroupedProps = Omit<MyProps, keyof ${groupKeys}> & {
  '...props': ${groupKeys}
}
export default WithGroupedProps`
      : 'export default MyProps';
  } else {
    code = `export type { ${typeName} as default } from '@xyflow/${packageName}'`;
  }
  const definition = await generateDefinition({ code, ...props });
  return <TSDoc definition={definition} {...defaultTSDocProps} />;
};
