import {
  FIELDS,
  getReactFlowAPIPropsCode,
  ReactFlowAPIPropsGroup,
} from '@/references/ReactFlow.props';
import { generateDefinition } from 'nextra/tsdoc';
import {
  APIDOCS_TAG_RE,
  compileMdxSections,
  definitionToFullMarkdown,
  getAPIDocsReplacement,
  SectionKey,
} from 'xy-shared/server';

// --- ReactFlowAPIProps tag replacement ---

const REACT_FLOW_API_PROPS_TAG_RE = /<ReactFlowAPIProps\s+group=["']([^"']+)["']\s*\/>/g;

function getReactFlowAPIPropsReplacement(group: string): string {
  const normalizedGroup = group.trim() as ReactFlowAPIPropsGroup;
  const validGroups: ReactFlowAPIPropsGroup[] = [
    'common',
    ...(Object.keys(FIELDS) as ReactFlowAPIPropsGroup[]),
  ];
  if (!validGroups.includes(normalizedGroup)) {
    return `[ReactFlowAPIProps: unknown group "${group}"]`;
  }
  try {
    const definition = generateDefinition({
      code: getReactFlowAPIPropsCode(normalizedGroup),
    });

    return definitionToFullMarkdown(definition);
  } catch (error) {
    /* fallback below */
    return `[ReactFlowAPIProps: error generating definition: ${error instanceof Error ? error.message : String(error)}]`;
  }
}

function stripReactFlowAPIPropsImports(text: string): string {
  return text.replace(
    /^import\s+\{\s*ReactFlowAPIProps\s*\}\s+from\s+['"]@\/references\/ReactFlow\.props['"];\s*$/gm,
    '',
  );
}

/**
 * @param attrs - The attributes of the <APIDocs> tag.
 * @returns The code for the APIDocs tag that `nextra/tsdoc` can use to generate the definition
 * via `generateDefinition`.
 */
function getReactAPIDocsCode(
  attrs: Record<string, string>,
): { code: string; flattened?: boolean } | null {
  if (attrs.functionName) {
    return {
      code: `export type { ${attrs.functionName} as default } from '@xyflow/react'`,
      flattened: true,
    };
  }
  if (attrs.componentName) {
    const { componentName, groupKeys } = attrs;
    let code = `
  import type { ComponentProps, HTMLAttributes, SVGAttributes } from 'react'
  import type { ${componentName} } from '@xyflow/react'
  type MyProps = ComponentProps<typeof ${componentName}>`;
    code += groupKeys
      ? `\ntype WithGroupedProps = Omit<MyProps, keyof ${groupKeys}> & { '...props': ${groupKeys} }\nexport default WithGroupedProps`
      : '\nexport default MyProps';
    return { code };
  }
  if (attrs.typeName) {
    const pkg = attrs.packageName ?? 'react';
    return { code: `export type { ${attrs.typeName} as default } from '@xyflow/${pkg}'` };
  }
  return null;
}

/** Expands <ReactFlowAPIProps>, <SvelteFlowAPIProps>, and <APIDocs> tags to markdown (tsdoc pipeline). */
function expandTsDocTags(source: string): string {
  let result = source;
  for (const [tag, group] of source.matchAll(REACT_FLOW_API_PROPS_TAG_RE)) {
    result = result.replace(tag, getReactFlowAPIPropsReplacement(group));
  }

  for (const [tag] of source.matchAll(APIDOCS_TAG_RE)) {
    result = result.replace(tag, getAPIDocsReplacement(getReactAPIDocsCode, tag));
  }
  return result;
}

export async function buildLLMSTxt(sections: SectionKey[]): Promise<string> {
  return compileMdxSections('react', sections, {
    expand: (source) => expandTsDocTags(source),
    strip: stripReactFlowAPIPropsImports,
  });
}
