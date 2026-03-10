import {
  FIELDS,
  getSvelteFlowAPIPropsCode,
  SvelteFlowAPIPropsGroup,
} from '@/references/SvelteFlow.props';
import { Folder, MdxFile, MetaJsonFile } from 'nextra';
import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import type { Root, Parent, Heading } from 'mdast';

// TYPES -----------------------------------------------------------------------

/** The types that nextra expose don't seem to have the `title` property on them,
 * but when I log the data it's there, so we're defining these types so that we
 * can use the title directly if it's available.
 */
export type TitledPageMapItem = TitledFolder | TitledMdxFile | MetaJsonFile;

export type TitledFolder = Folder & { title?: string };

export type TitledMdxFile = MdxFile & { title?: string };

// UTILS -----------------------------------------------------------------------

export const isFolder = (item: TitledPageMapItem): item is TitledFolder =>
  'children' in item;

export const isMdxFile = (item: TitledPageMapItem): item is TitledMdxFile =>
  'frontMatter' in item;

// LLM TXT UTILS ----------------------------------------------------------------

// CONFIG (relative to site root = process.cwd() when running Next from svelteflow.dev)
const SITE_ROOT = process.cwd();
const EXAMPLE_APPS_ROOT = path.join(SITE_ROOT, '..', '..', 'apps', 'example-apps');
const EXAMPLES_PUBLIC = path.join(EXAMPLE_APPS_ROOT, 'public');

export const ALL_SECTIONS: Record<string, Section> = {
  'api-reference': {
    name: 'API Reference',
    path: path.join(SITE_ROOT, 'src/content/api-reference'),
  },
  learn: {
    name: 'Learn',
    path: path.join(SITE_ROOT, 'src/content/learn'),
  },
  examples: {
    name: 'Examples',
    path: path.join(EXAMPLE_APPS_ROOT, 'svelte', 'examples'),
  },
};

export interface Section {
  name: string;
  path: string;
}

interface CollectedMdxFile {
  fullPath: string;
  relativePath: string;
  name: string;
}

function getAllMdxFiles(dir: string, basePath = ''): string[] {
  const files: string[] = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    const directories: { fullPath: string; relativePath: string }[] = [];
    const mdxFiles: CollectedMdxFile[] = [];

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);

      if (item.isDirectory()) {
        directories.push({ fullPath, relativePath });
      } else if (item.isFile() && item.name.endsWith('.mdx')) {
        mdxFiles.push({ fullPath, relativePath, name: item.name });
      }
    }

    directories.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
    mdxFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

    for (const file of mdxFiles) {
      if (file.name === 'index.mdx') {
        files.push(file.fullPath);
      }
    }

    for (const file of mdxFiles) {
      if (file.name !== 'index.mdx') {
        files.push(file.fullPath);
      }
    }

    for (const dirItem of directories) {
      const subFiles = getAllMdxFiles(dirItem.fullPath, dirItem.relativePath);
      files.push(...subFiles);
    }
  } catch (error) {
    console.warn(
      `Warning: Could not read directory ${dir}:`,
      error instanceof Error ? error.message : String(error),
    );
  }

  return files;
}

// ============================================================================
// <RemoteCodeViewer> tag replacement
// ============================================================================

function getExampleSourcePath(route: string, framework: string): string {
  return path.join(EXAMPLES_PUBLIC, framework, route, 'source.json');
}

/** Returns true if candidatePath is under baseDir (or equal). */
function isPathUnderBase(candidatePath: string, baseDir: string): boolean {
  const base = path.resolve(baseDir);
  const resolved = path.resolve(candidatePath);
  return resolved === base || resolved.startsWith(base + path.sep);
}

function loadExampleFiles(
  route: string,
  framework: string,
): { files: Record<string, string> } | null {
  // Protect against directory traversal and absolute paths.
  if (route.includes('..') || path.isAbsolute(route)) {
    return null;
  }
  const sourcePath = getExampleSourcePath(route, framework);
  if (!isPathUnderBase(sourcePath, EXAMPLES_PUBLIC)) {
    return null;
  }
  try {
    if (!fs.existsSync(sourcePath)) return null;
    const json = JSON.parse(fs.readFileSync(sourcePath, 'utf8')) as {
      files?: Record<string, string>;
      dependencies?: unknown;
    };
    if (!json?.files || typeof json.files !== 'object') return null;
    const files = { ...json.files };
    if (route.includes('examples/')) {
      delete files['index.html'];
      delete files['index.jsx'];
      delete files['index.ts'];
      delete files['README.mdx'];
    }
    return { files };
  } catch {
    return null;
  }
}

function formatExampleAsMarkdown(route: string, files: Record<string, string>): string {
  const lines: string[] = [`Example: ${route}`, ''];
  for (const [filename, content] of Object.entries(files)) {
    const ext = path.extname(filename).slice(1) || 'txt';
    lines.push(`### ${filename}`, '', '```' + ext, content.trimEnd(), '```', '');
  }
  return lines.join('\n');
}

const REMOTE_CODE_VIEWER_TAG_RE = /<RemoteCodeViewer\s[\s\S]*?\/>/g;
const ROUTE_ATTR_RE = /route=["']([^"']+)["']/;
const FRAMEWORK_ATTR_RE = /framework=["']([^"']+)["']/;

function expandRemoteCodeViewers(source: string): string {
  return source.replace(REMOTE_CODE_VIEWER_TAG_RE, (tag) => {
    const routeMatch = tag.match(ROUTE_ATTR_RE);
    const route = routeMatch ? routeMatch[1].trim() : '';
    const frameworkMatch = tag.match(FRAMEWORK_ATTR_RE);
    const framework = frameworkMatch ? frameworkMatch[1].trim() : 'svelte';
    if (!route) return tag;
    const loaded = loadExampleFiles(route, framework);
    if (!loaded) return `[Example not found: ${route}]`;
    return formatExampleAsMarkdown(route, loaded.files);
  });
}

// ============================================================================
// <SvelteFlowAPIProps> and <APIDocs> — shared markdown helpers
// ============================================================================

function wrapInBackticks(s: string): string {
  return '`' + String(s).trim() + '`';
}

function escapeTableCell(s: string): string {
  return s.trim();
}

interface TypeFieldLike {
  name: string;
  type: string;
  description?: string;
  optional?: boolean;
}

function tableFromFields(
  fields: TypeFieldLike[],
  headers: [string, string, string],
  optionalSuffix = false,
): string {
  if (fields.length === 0) return '';
  const [h1, h2, h3] = headers;
  const rows = [
    `| ${h1} | ${h2} | ${h3} |`,
    '|---|---|---|',
    ...fields.map((f) => {
      const name = optionalSuffix && f.optional ? `${f.name}?` : f.name;
      const desc = escapeTableCell(f.description ?? '');
      return `| ${wrapInBackticks(name)} | ${wrapInBackticks(f.type ?? '')} | ${desc} |`;
    }),
  ];
  return rows.join('\n');
}

function definitionToMarkdownTable(definition: { entries?: TypeFieldLike[] }): string {
  const entries = definition?.entries;
  if (!Array.isArray(entries) || entries.length === 0) return '';
  return tableFromFields(entries, ['Prop', 'Type', 'Description'], true);
}

function fallbackPropsTable(propNames: string[], groupLabel: string): string {
  const rows = [
    `#### ${groupLabel}\n`,
    '| Prop |',
    '|---|',
    ...propNames.map((n) => `| ${wrapInBackticks(n)} |`),
  ];
  return rows.join('\n');
}

const SVELTE_FLOW_API_PROPS_TAG_RE =
  /<SvelteFlowAPIProps\s+group=["']([^"']+)["']\s*\/>/g;
const GROUP_LABELS: Record<string, string> = {
  common: 'Common props',
  viewport: 'Viewport props',
  edge: 'Edge props',
  node: 'Node props',
  nodeEvents: 'Node events',
  selectionEvents: 'Selection events',
  paneEvents: 'Pane events',
  style: 'Style props',
  generalEvents: 'General events',
  edgeEvents: 'Edge events',
  connectionEvents: 'Connection events',
  interaction: 'Interaction props',
  connectionLine: 'Connection line props',
  keyboard: 'Keyboard props',
};

async function getSvelteFlowAPIPropsMarkdown(group: string): Promise<string> {
  const normalizedGroup = group.trim() as SvelteFlowAPIPropsGroup;
  const validGroups: SvelteFlowAPIPropsGroup[] = [
    'common',
    ...(Object.keys(FIELDS) as SvelteFlowAPIPropsGroup[]),
  ];
  if (!validGroups.includes(normalizedGroup)) {
    return `[SvelteFlowAPIProps: unknown group "${group}"]`;
  }

  try {
    const { generateDefinition } = await import('nextra/tsdoc');
    const code = getSvelteFlowAPIPropsCode(normalizedGroup);
    const definition = generateDefinition({ code });
    const table = definitionToMarkdownTable(definition as { entries?: TypeFieldLike[] });
    if (table) {
      const label = GROUP_LABELS[normalizedGroup] ?? normalizedGroup;
      return `#### ${label}\n\n${table}`;
    }
  } catch {
    // fallback: table of prop names only
  }

  if (normalizedGroup === 'common') {
    const allNames = Object.values(FIELDS).flat();
    return fallbackPropsTable(
      allNames,
      'Common props (Svelte Flow also accepts standard div props)',
    );
  }
  const propNames = FIELDS[normalizedGroup] ?? [];
  return fallbackPropsTable(propNames, GROUP_LABELS[normalizedGroup] ?? normalizedGroup);
}

async function expandSvelteFlowAPIProps(source: string): Promise<string> {
  const matches = [...source.matchAll(SVELTE_FLOW_API_PROPS_TAG_RE)];
  if (!matches.length) return source;
  let result = source;
  for (const [tag, group] of matches) {
    result = result.replace(tag, await getSvelteFlowAPIPropsMarkdown(group));
  }
  return result;
}

// ============================================================================
// <APIDocs> tag replacement
// ============================================================================

const APIDOCS_TAG_RE = /<APIDocs\s+[\s\S]*?\/>/g;
const APIDOCS_ATTR_RE = /(\w+)=["']([^"']*)["']/g;

function parseAPIDocsAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const m of tag.matchAll(APIDOCS_ATTR_RE)) attrs[m[1]] = m[2];
  return attrs;
}

function getAPIDocsCode(
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
    let code = `
import type { ComponentProps, HTMLAttributes, SVGAttributes } from 'react'
import type { ${componentName} } from '@xyflow/svelte'
type MyProps = ComponentProps<typeof ${componentName}>`;
    code += groupKeys
      ? `
type WithGroupedProps = Omit<MyProps, keyof ${groupKeys}> & { '...props': ${groupKeys} }
export default WithGroupedProps`
      : '\nexport default MyProps';
    return { code };
  }
  if (attrs.typeName) {
    const pkg = attrs.packageName ?? 'svelte';
    return { code: `export type { ${attrs.typeName} as default } from '@xyflow/${pkg}'` };
  }
  return null;
}

interface ReturnFieldLike {
  type: string;
}

function definitionToMarkdown(definition: {
  entries?: TypeFieldLike[];
  signatures?: {
    params: TypeFieldLike[];
    returns: TypeFieldLike[] | ReturnFieldLike;
  }[];
  name?: string;
  description?: string;
}): string {
  const parts: string[] = [];

  if (definition.description) parts.push(definition.description.trim(), '');

  if (definition.entries?.length) {
    const table = definitionToMarkdownTable(definition);
    if (table) parts.push('#### Props', '', table, '');
  }

  if (definition.signatures?.length) {
    const sig = definition.signatures[0];
    const paramsTable = tableFromFields(
      sig.params ?? [],
      ['Param', 'Type', 'Description'],
      true,
    );
    parts.push(
      '#### Parameters',
      '',
      paramsTable || 'This function does not accept any parameters.',
      '',
    );
    const ret = sig.returns;
    if (Array.isArray(ret) && ret.length > 0) {
      parts.push(
        '#### Returns',
        '',
        tableFromFields(ret, ['Name', 'Type', 'Description']),
        '',
      );
    } else if (ret && typeof ret === 'object' && 'type' in ret) {
      parts.push('#### Returns', '', wrapInBackticks((ret as ReturnFieldLike).type), '');
    }
  }

  return parts.join('\n');
}

async function getAPIDocsMarkdown(tag: string): Promise<string> {
  const attrs = parseAPIDocsAttrs(tag);
  const codeOpt = getAPIDocsCode(attrs);
  if (!codeOpt) return '[APIDocs: missing componentName, functionName, or typeName]';
  try {
    const { generateDefinition } = await import('nextra/tsdoc');
    const definition = generateDefinition(codeOpt) as Parameters<
      typeof definitionToMarkdown
    >[0];
    const markdown = definitionToMarkdown(definition);
    if (markdown) {
      const title = attrs.componentName ?? attrs.functionName ?? attrs.typeName ?? 'API';
      return `#### ${title}\n\n${markdown}`;
    }
  } catch {
    /* fallback to placeholder */
  }
  const name = attrs.componentName ?? attrs.functionName ?? attrs.typeName ?? 'unknown';
  return `[APIDocs: ${name}]`;
}

async function expandAPIDocs(source: string): Promise<string> {
  const matches = [...source.matchAll(APIDOCS_TAG_RE)];
  if (!matches.length) return source;
  let result = source;
  for (const [tag] of matches) {
    result = result.replace(tag, await getAPIDocsMarkdown(tag));
  }
  return result;
}

// ============================================================================
// Final processing of markdown
// ============================================================================

const PRO_EXAMPLE_PLACEHOLDER =
  '! THIS IS A PRO EXAMPLE. SUBSCRIBE TO https://svelteflow.dev/pro TO ACCESS PRO EXAMPLES !';

const PRO_EXAMPLE_VIEWER_TAG_RE = /<ProExampleViewer\s[\s\S]*?\/>/g;

function replaceProExampleViewers(source: string): string {
  return source.replace(PRO_EXAMPLE_VIEWER_TAG_RE, PRO_EXAMPLE_PLACEHOLDER);
}

function stripRemoteCodeViewerImports(text: string): string {
  return text.replace(
    /^import\s+\{\s*RemoteCodeViewer\s*\}\s+from\s+['"]xy-shared\/server['"];\s*$/gm,
    '',
  );
}

function stripProExampleViewerImports(text: string): string {
  return text.replace(
    /^import\s+ProExampleViewer\s+from\s+['"]@\/components\/pro-example-viewer['"];\s*$/gm,
    '',
  );
}

function stripSvelteFlowAPIPropsImports(text: string): string {
  return text.replace(
    /^import\s+\{\s*SvelteFlowAPIProps\s*\}\s+from\s+['"]@\/references\/SvelteFlow\.props['"];\s*$/gm,
    '',
  );
}

function increaseHeadingLevels(amount: number) {
  return () => (tree: Root) => {
    function visit(node: Parent | Heading) {
      if (node.type === 'heading' && 'depth' in node && typeof node.depth === 'number') {
        node.depth = Math.min(node.depth + amount, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      }
      if (node.children) {
        node.children.forEach((child) => visit(child as typeof node));
      }
    }
    visit(tree);
  };
}

function extractFrontmatterAndCreateHeader() {
  return (tree: Root) => {
    let title = '';

    const frontmatterIndex = tree.children.findIndex((node) => node.type === 'yaml');
    if (frontmatterIndex !== -1) {
      const frontmatter = tree.children[frontmatterIndex];
      const yamlContent = 'value' in frontmatter ? String(frontmatter.value) : '';

      const titleMatch = yamlContent.match(/^title:\s*(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1].trim().replace(/^["']|["']$/g, '');
      }

      tree.children.splice(frontmatterIndex, 1);
    }

    if (title) {
      tree.children.unshift({
        type: 'heading',
        depth: 1,
        children: [{ type: 'text', value: title }],
      });
    }
  };
}

async function mdxToPlainText(source: string): Promise<string> {
  // Markdown-only (no remark-mdx) so type strings like Record<string, Node> stay literal.
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(extractFrontmatterAndCreateHeader)
    .use(increaseHeadingLevels(2))
    .use(remarkStringify)
    .process(source);

  let out = String(file);
  // remark-stringify can escape the leading | on table rows; undo so tables render normally
  out = out.replace(/^\\\|/gm, '|');
  return out;
}

async function buildLLMSTxtSection(sectionPath: string): Promise<string> {
  const mdxFiles = getAllMdxFiles(sectionPath);
  let output = '';

  for (const file of mdxFiles) {
    let raw = fs.readFileSync(file, 'utf8');
    raw = expandRemoteCodeViewers(raw);
    raw = replaceProExampleViewers(raw);
    raw = await expandSvelteFlowAPIProps(raw);
    raw = await expandAPIDocs(raw);
    let plain = await mdxToPlainText(raw);
    plain = stripRemoteCodeViewerImports(plain);
    plain = stripProExampleViewerImports(plain);
    plain = stripSvelteFlowAPIPropsImports(plain);
    output += plain.trim() + '\n\n';
  }

  return output;
}

export async function buildLLMSTxt(sections: Record<string, Section>): Promise<string> {
  let output = '# Svelte Flow Documentation\n\n';
  output += `
    What is Svelte Flow?\n\nSvelte Flow is a library that allows you to create
    interactive, node-based user interfaces: flowcharts, diagrams, visual
    programming tools, and workflows inside your Svelte applications. It supports
    theming, custom nodes and edges, and offers a large collection of examples for
    rapid development. Developers can leverage the Svelte Flow Pro platform for
    advanced features like real-time collaboration, complex layouts, and enhanced
    performance, making it suitable for both simple and large-scale,
    production-ready visual applications.\n\n`;

  for (const section in sections) {
    const sectionOutput = `## ${sections[section].name}\n\n${await buildLLMSTxtSection(sections[section].path)}`;
    output += sectionOutput;
  }

  return output;
}
