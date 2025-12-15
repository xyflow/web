import { ComponentProps, FC } from 'react';
import { TSDoc, generateDefinition } from 'nextra/tsdoc';
import { getPageMap } from 'nextra/page-map';
import type { MdxFile } from 'nextra';

const externalSvelteLinks = {
  Snippet: 'https://svelte.dev/docs/svelte/snippet#Typing-snippets',
  ClassValue: 'https://svelte.dev/docs/svelte/class',
};

const externalLinks = {
  Partial: 'https://typescriptlang.org/docs/handbook/utility-types.html#partialtype',
  Record: 'https://typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
  MouseEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent',
  TouchEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent',
  KeyboardEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent',
  PointerEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent',
};

export const APIDocs: FC<{
  code?: string;
  componentName?: string;
  typeName?: string;
  functionName?: string;
  /** @default "svelte" */
  packageName?: string;
  groupKeys?: string;
}> = async ({
  componentName,
  typeName,
  functionName,
  packageName = 'svelte',
  groupKeys,
  ...props
}) => {
  const pageMap = await getPageMap('/api-reference/types');
  const svelteFlowLinks = Object.fromEntries(
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
      ...svelteFlowLinks,
      ...externalSvelteLinks,
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
      code: `export type { ${functionName} as default } from '@xyflow/svelte'`,
      flattened: true,
      ...props,
    });
    return <TSDoc definition={definition} {...defaultTSDocProps} />;
  }
  let code: string;

  if (componentName) {
    code = `
import type { ComponentProps } from 'svelte'
import type { HTMLAttributes, SVGAttributes, SVGPathElement, HTMLButtonAttributes } from 'svelte/elements'
import type { ${componentName} } from '@xyflow/svelte'
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

