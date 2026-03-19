import {
  FIELDS,
  getSvelteFlowAPIPropsCode,
  SvelteFlowAPIPropsGroup,
} from '@/references/SvelteFlow.props';
import { generateDefinition } from 'nextra/tsdoc';
import {
  APIDOCS_TAG_RE,
  compileMdxSections,
  definitionToFullMarkdown,
  getAPIDocsReplacement,
  SectionKey,
} from 'xy-shared/server';

// --- SvelteFlowAPIProps ---

const SVELTE_FLOW_API_PROPS_TAG_RE =
  /<SvelteFlowAPIProps\s+group=["']([^"']+)["']\s*\/>/g;

function getSvelteFlowAPIPropsReplacement(group: string): string {
  // TODO: implement via getSvelteFlowAPIPropsCode when SvelteFlowAPIProps is used in expandTsDocTags
  const normalizedGroup = group.trim() as SvelteFlowAPIPropsGroup;
  const validGroups: SvelteFlowAPIPropsGroup[] = [
    'common',
    ...(Object.keys(FIELDS) as SvelteFlowAPIPropsGroup[]),
  ];
  if (!validGroups.includes(normalizedGroup)) {
    return `[SvelteFlowAPIProps: unknown group "${group}"]`;
  }
  try {
    const definition = generateDefinition({
      code: getSvelteFlowAPIPropsCode(normalizedGroup),
    });

    return definitionToFullMarkdown(definition);
  } catch (error) {
    /* fallback below */
    return `[SvelteFlowAPIProps: error generating definition: ${error instanceof Error ? error.message : String(error)}]`;
  }
}

function stripSvelteFlowAPIPropsImports(text: string): string {
  return text.replace(
    /^import\s+\{\s*SvelteFlowAPIProps\s*\}\s+from\s+['"]@\/references\/SvelteFlow\.props['"];\s*$/gm,
    '',
  );
}

/**
 * Same as getSvelteAPIDocsCode but for Svelte: uses @xyflow/svelte, Svelte
 * component props types (ComponentNameProps), and svelte/elements for
 * HTMLAttributes when groupKeys is used.
 */
function getSvelteAPIDocsCode(
  attrs: Record<string, string>,
): { code: string; flattened?: boolean } | null {
  if (attrs.functionName) {
    return {
      code: `export type { ${attrs.functionName} as default } from '@xyflow/svelte'`,
      flattened: true,
    };
  }
  if (attrs.componentName) {
    const { componentName, groupKeys } = attrs;
    const propsTypeName = `${componentName}Props`;
    let code = `
import type { ${propsTypeName} } from '@xyflow/svelte'`;
    if (groupKeys) {
      code += `
import type { HTMLAttributes } from 'svelte/elements'
type MyProps = ${propsTypeName}
type WithGroupedProps = Omit<MyProps, keyof ${groupKeys}> & { '...props': ${groupKeys} }
export default WithGroupedProps`;
    } else {
      code += `\nexport default ${propsTypeName}`;
    }
    return { code };
  }
  if (attrs.typeName) {
    const pkg = attrs.packageName ?? 'svelte';
    return { code: `export type { ${attrs.typeName} as default } from '@xyflow/${pkg}'` };
  }
  return null;
}

function expandTsDocTags(source: string): string {
  let result = source;
  for (const [tag, group] of source.matchAll(SVELTE_FLOW_API_PROPS_TAG_RE)) {
    result = result.replace(tag, getSvelteFlowAPIPropsReplacement(group));
  }
  for (const [tag] of source.matchAll(APIDOCS_TAG_RE)) {
    result = result.replace(tag, getAPIDocsReplacement(getSvelteAPIDocsCode, tag));
  }
  return result;
}

export async function buildLLMSTxt(sections: SectionKey[]): Promise<string> {
  return compileMdxSections('svelte', sections, {
    expand: (source) => expandTsDocTags(source),
    strip: stripSvelteFlowAPIPropsImports,
  });
}
