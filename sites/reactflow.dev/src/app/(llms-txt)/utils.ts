import {
  FIELDS,
  getReactFlowAPIPropsCode,
  ReactFlowAPIPropsGroup,
} from '@/references/ReactFlow.props';
import {
  generateDefinition,
  GeneratedDefinition,
  GeneratedFunction,
  GeneratedType,
  TypeField,
  ReturnField,
} from 'nextra/tsdoc';
import { compileMdxSections, SectionKey } from 'xy-shared/server';

// ================ ============================================================
// <ReactFlowAPIProps> and <APIDocs> — tsdoc to markdown (shared)
// ============================================================================

const qu = (s: string) => '`' + String(s).trim() + '`';

const fieldList = (ret: TypeField[] | ReturnField, optionalSuffix = false) =>
  Array.isArray(ret)
    ? ret
        .map((f) => {
          const name = optionalSuffix && f.optional ? `${f.name}?` : f.name;
          const type = f.type ? ': ' + f.type : '';
          return '- ' + qu(name + type) + ' ' + (f.description ?? '').trim();
        })
        .join('\n')
    : qu(ret.type ?? '');

function definitionToFullMarkdown(
  definition: GeneratedDefinition & (GeneratedType | GeneratedFunction),
): string {
  const parts: string[] = [];
  if (definition.description) parts.push(definition.description.trim(), '');
  if ('entries' in definition && definition.entries?.length) {
    // The definition is a type, so it has entries.
    parts.push(fieldList(definition.entries, true));
  }
  if ('signatures' in definition && definition.signatures?.length) {
    // The definition is a function, so it has signatures.
    const sig = definition.signatures[0];
    const paramsTable = fieldList(sig.params ?? [], true);

    if (paramsTable) parts.push('#### Parameters', '', paramsTable, '');
    else parts.push('This function does not accept any parameters.');
    const ret = sig.returns;
    if (ret) parts.push('#### Returns', '', fieldList(ret), '');
    else parts.push('This function does not return anything.');
  }
  return parts.join('\n');
}

// --- ReactFlowAPIProps ---

const REACT_FLOW_API_PROPS_TAG_RE = /<ReactFlowAPIProps\s+group=["']([^"']+)["']\s*\/>/g;

async function getReactFlowAPIPropsReplacement(group: string): Promise<string> {
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

// --- APIDocs ---

const APIDOCS_TAG_RE = /<APIDocs\s+[\s\S]*?\/>/g;
const APIDOCS_ATTR_RE = /(\w+)="([^"]*)"/g;

function parseAPIDocsAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const m of tag.matchAll(APIDOCS_ATTR_RE)) attrs[m[1]] = m[2];
  return attrs;
}

/**
 * @param attrs - The attributes of the <APIDocs> tag.
 * @returns The code for the APIDocs tag that `nextra/tsdoc` can use to generate the definition
 * via `generateDefinition`.
 */
function getAPIDocsCode(
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

async function getAPIDocsReplacement(tag: string): Promise<string> {
  const attrs = parseAPIDocsAttrs(tag);
  const codeOpt = getAPIDocsCode(attrs);
  if (!codeOpt) return '[APIDocs: missing componentName, functionName, or typeName]';

  try {
    const definition = generateDefinition(codeOpt);
    return definitionToFullMarkdown(definition);
  } catch (error) {
    /* fallback */
    console.error('Error generating APIDocs definition:', error);
    return `[APIDocs: error generating definition: ${error instanceof Error ? error.message : String(error)}]`;
  }
}

/** Expands <ReactFlowAPIProps> and <APIDocs> tags to markdown (tsdoc pipeline). */
async function expandTsDocTags(source: string): Promise<string> {
  let result = source;
  for (const [tag, group] of source.matchAll(REACT_FLOW_API_PROPS_TAG_RE)) {
    result = result.replace(tag, await getReactFlowAPIPropsReplacement(group));
  }
  for (const [tag] of source.matchAll(APIDOCS_TAG_RE)) {
    result = result.replace(tag, await getAPIDocsReplacement(tag));
  }
  return result;
}

function stripReactFlowAPIPropsImports(text: string): string {
  return text.replace(
    /^import\s+\{\s*ReactFlowAPIProps\s*\}\s+from\s+['"]@\/references\/ReactFlow\.props['"];\s*$/gm,
    '',
  );
}

export async function buildLLMSTxt(sections: SectionKey[]): Promise<string> {
  return compileMdxSections('react', sections, {
    expand: expandTsDocTags,
    strip: stripReactFlowAPIPropsImports,
  });
}
