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

//

// UTILS -----------------------------------------------------------------------

/** Builds a tree of markdown links from the page map nextra gives us */
export const collectMarkdownLinks = (
  framework: 'react' | 'svelte',
  items: TitledPageMapItem[],
  indent = 0,
): string => {
  // The page map will contain separate file and folder entries in cases where
  // a route is both an actual page and a parent to other pages. To avoid duplicating
  // entries we keep track of the routes we've already seen at this level. It
  // *seems* deterministic that the mdx file appears in the list before the folder,
  // but it remains to be seen if we can rely on that... probably fine! 😇
  const seen = new Set();

  let output = '';

  for (const item of items) {
    if (isMdxFile(item) && !seen.has(item.route)) {
      const { name, route, title, frontMatter = {} } = item;
      const { description } = frontMatter;

      seen.add(route);
      output += `${' '.repeat(indent)}- [${title ?? name}](https://${framework}flow.dev${route})${description ? `: ${description}` : ''}\n`;
    }

    if (isFolder(item)) {
      const { title, route, children } = item;

      if (title && !seen.has(route)) {
        output += `${' '.repeat(indent)}- ${title}\n`;
      }

      seen.add(route);
      output += collectMarkdownLinks(framework, children, indent + 2);
    }
  }

  return output;
};

// CONSTANTS -------------------------------------------------------------------

const SITE_ROOT = process.cwd();
const EXAMPLE_APPS_ROOT = path.join(SITE_ROOT, '..', '..', 'apps', 'example-apps');

export interface Section {
  name: string;
  path: string;
}

export type SectionKey = 'reference' | 'learn' | 'examples' | 'ui';

function resolveSections<T extends SectionKey>(
  framework: 'react' | 'svelte',
  keys: T[],
): Section[] {
  const all: Record<SectionKey, Section> = {
    reference: {
      name: 'API Reference',
      path: path.join(SITE_ROOT, 'src/content/api-reference'),
    },
    learn: {
      name: 'Learn',
      path: path.join(SITE_ROOT, 'src/content/learn'),
    },
    examples: {
      name: 'Examples',
      path: path.join(EXAMPLE_APPS_ROOT, framework, 'examples'),
    },
    ui: {
      name: 'UI',
      path: path.join(SITE_ROOT, 'src/content/ui'),
    },
  };

  return keys.reduce((acc, key) => [...acc, all[key]], [] as Section[]);
}

// MDX LOADERS -----------------------------------------------------------------

/** Build a markdown document suitable for LLMs to consume. This will render the
 * content of each of the passed-in `sections` into a single file, making it great
 * to dump a lot of info into the context at once.
 *
 * This function is suitable for creating files like `/llms-full.txt`, but for the
 * standard `/llms.txt` format you should instead produce a markdown doc of links.
 */
export async function compileMdxSections<T extends SectionKey>(
  framework: 'react' | 'svelte',
  sections: T[],
  options?: {
    expand?: (mdx: string) => string | Promise<string>;
    strip?: (txt: string) => string | Promise<string>;
  },
): Promise<string> {
  const library =
    framework === 'react'
      ? 'React Flow'
      : framework === 'svelte'
        ? 'Svelte Flow'
        : 'React Flow';

  let output = `# ${library} Documentation

What is ${library}?

${library} is a library that allows you to create interactive, node-based user
interfaces: flowcharts, diagrams, visual programming tools, and workflows inside
your ${framework} applications. It supports theming, custom nodes and edges, a library
of shadcn UI components, and offers a large collection of examples for rapid development.
Developers can leverage the ${library} Pro platform for advanced features like
real-time collaboration, complex layouts, and enhanced performance, making it
suitable for both simple and large-scale, production-ready visual applications.

`;

  for (const { name, path } of Object.values(resolveSections(framework, sections))) {
    const title = `## ${name}`;
    const content = await compileMdxSection(path, options);

    output += title + '\n\n' + content;
  }

  return output;
}

/** Buid a single section of flattened markdown. This loads all the files under
 * a particular path like `src/content/learn` and passes each MDX file through a
 * processing pipeline so we can hopefully spit something useful out.
 *
 * A more robust approach would be probably be operating on the MDX ast directly,
 * but here we have some simple string-based transformations instead. Maybe in the
 * future, maybe...
 */
async function compileMdxSection(
  path: string,
  options: {
    expand?: (mdx: string) => string | Promise<string>;
    strip?: (txt: string) => string | Promise<string>;
  } = {},
): Promise<string> {
  let output = '';

  for (const file of collectMdxFiles(path)) {
    let mdx = fs.readFileSync(file, 'utf8');
    mdx = expandRemoteCodeViewers(mdx);
    mdx = expandUiComponentViewers(mdx);
    mdx = expandProExampleViewers(mdx);
    mdx = (await options.expand?.(mdx)) ?? mdx;

    let txt = await mdxToPlainText(mdx);
    txt = stripRemoteCodeViewerImports(txt);
    txt = stripProExampleViewerImports(txt);
    txt = stripUiComponentViewerImports(txt);
    txt = (await options.strip?.(txt)) ?? txt;

    output += txt.trim() + '\n\n';
  }

  return output;
}

interface CollectedMdxFile {
  fullPath: string;
  relativePath: string;
  name: string;
}

function collectMdxFiles(dir: string, basePath = ''): string[] {
  const files: string[] = [];
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

  mdxFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  for (const { fullPath } of mdxFiles) {
    files.push(fullPath);
  }

  directories.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  for (const { fullPath, relativePath } of directories) {
    files.push(...collectMdxFiles(fullPath, relativePath));
  }

  return files;
}

// MDX TRANSFORMATIONS: EXPAND EXAMPLES ----------------------------------------

const REMOTE_CODE_VIEWER_TAG_RE = /<RemoteCodeViewer\s[\s\S]*?\/>/g;
const ROUTE_ATTR_RE = /route=["']([^"']+)["']/;
const FRAMEWORK_ATTR_RE = /framework=["']([^"']+)["']/;

function expandRemoteCodeViewers(source: string): string {
  return source.replace(REMOTE_CODE_VIEWER_TAG_RE, (tag) => {
    const routeMatch = tag.match(ROUTE_ATTR_RE);
    const route = routeMatch ? routeMatch[1].trim() : '';
    const frameworkMatch = tag.match(FRAMEWORK_ATTR_RE);
    const framework = frameworkMatch ? frameworkMatch[1].trim() : 'react';
    if (!route) return tag;

    const example = loadExampleSource(route, framework);
    if (!example) return `[Example not found: ${route}]`;

    return formatExampleAsMarkdown(route, example.files);
  });
}

function formatExampleAsMarkdown(route: string, files: Record<string, string>): string {
  const lines: string[] = [`Example: ${route}`, ''];

  for (const [filename, content] of Object.entries(files)) {
    const ext = path.extname(filename).slice(1) || 'txt';

    lines.push(`### ${filename}`, '', '```' + ext, content.trimEnd(), '```', '');
  }

  return lines.join('\n');
}

const EXAMPLES_PUBLIC = path.join(EXAMPLE_APPS_ROOT, 'public');

function loadExampleSource(
  route: string,
  framework: string,
): { files: Record<string, string> } | null {
  if (route.includes('..') || path.isAbsolute(route)) return null;

  const sourcePath = path.join(EXAMPLES_PUBLIC, framework, route, 'source.json');
  if (!isPathUnderBase(sourcePath, EXAMPLES_PUBLIC)) return null;
  if (!fs.existsSync(sourcePath)) return null;

  const { files = {} } = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

  if (route.includes('examples/')) {
    delete files['index.html'];
    delete files['index.jsx'];
    delete files['index.ts'];
    delete files['README.mdx'];
  }

  return { files };
}

// MDX TRANSFORMATIONS: EXPAND UI EXAMPLES -------------------------------------

const UI_COMPONENT_VIEWER_TAG_RE = /<UiComponentViewer\s[\s\S]*?\/>/g;
const ID_ATTR_RE = /id=["']([^"']+)["']/;

function expandUiComponentViewers(source: string): string {
  return source.replace(UI_COMPONENT_VIEWER_TAG_RE, (tag) => {
    const idMatch = tag.match(ID_ATTR_RE);
    const id = idMatch ? idMatch[1].trim() : '';
    if (!id) return tag;

    const loaded = loadUiComponentFiles(id);
    if (!loaded) return `[UI Component not found: ${id}]`;

    return formatUiComponentAsMarkdown(id, loaded.files);
  });
}

const UI_COMPONENT_FILES = ['index.tsx', 'component-example.tsx'] as const;
const UI_COMPONENTS_REGISTRY = path.join(
  SITE_ROOT,
  '..',
  '..',
  'apps',
  'ui-components',
  'registry',
  'components',
);

function loadUiComponentFiles(id: string): { files: Record<string, string> } | null {
  const componentDir = path.join(UI_COMPONENTS_REGISTRY, id);

  if (!isPathUnderBase(componentDir, UI_COMPONENTS_REGISTRY)) return null;
  if (!fs.existsSync(componentDir) || !fs.statSync(componentDir).isDirectory())
    return null;

  const files: Record<string, string> = {};

  for (const name of UI_COMPONENT_FILES) {
    const filePath = path.join(componentDir, name);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      files[name] = fs.readFileSync(filePath, 'utf8');
    }
  }

  if (Object.keys(files).length === 0) return null;

  return { files };
}

function isPathUnderBase(candidatePath: string, baseDir: string): boolean {
  const base = path.resolve(baseDir);
  const resolved = path.resolve(candidatePath);
  return resolved === base || resolved.startsWith(base + path.sep);
}

function formatUiComponentAsMarkdown(id: string, files: Record<string, string>): string {
  const lines: string[] = [`UI Component: ${id}`, ''];

  for (const [filename, content] of Object.entries(files)) {
    const ext = path.extname(filename).slice(1) || 'txt';

    lines.push(`### ${filename}`, '', '```' + ext, content.trimEnd(), '```', '');
  }

  return lines.join('\n');
}

// MDX TRANSFORMATIONS: REPLACE PRO EXAMPLES -----------------------------------

const PRO_EXAMPLE_PLACEHOLDER =
  '! THIS IS A PRO EXAMPLE. SUBSCRIBE TO https://reactflow.dev/pro TO ACCESS PRO EXAMPLES !';

const PRO_EXAMPLE_VIEWER_TAG_RE = /<ProExampleViewer\s[\s\S]*?\/>/g;

function expandProExampleViewers(source: string): string {
  return source.replace(PRO_EXAMPLE_VIEWER_TAG_RE, PRO_EXAMPLE_PLACEHOLDER);
}

// TXT TRANSFORMATIONS ---------------------------------------------------------

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

function stripUiComponentViewerImports(text: string): string {
  return text.replace(
    /^import\s+UiComponentViewer\s+from\s+['"]@\/components\/ui-component-viewer\.mdx['"];\s*$/gm,
    '',
  );
}

//

async function mdxToPlainText(source: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(extractFrontmatterAndCreateHeader)
    .use(increaseHeadingLevels(2))
    .use(remarkStringify)
    .process(source);

  // remark-stringify can escape the leading | on table rows; undo so tables render normally
  return String(file).replace(/^\\\|/gm, '|');
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

function increaseHeadingLevels(amount: number) {
  const isHeading = (node: Parent | Heading): node is Heading => node.type === 'heading';

  return () => (tree: Root) => {
    function visit(node: Parent | Heading) {
      if (isHeading(node)) {
        node.depth = Math.min(node.depth + amount, 6) as Heading['depth'];
      }

      if (node.children) {
        node.children.forEach((child) => visit(child as typeof node));
      }
    }

    visit(tree);
  };
}

// UTILS -----------------------------------------------------------------------

export const isFolder = (item: TitledPageMapItem): item is TitledFolder =>
  'children' in item;

export const isMdxFile = (item: TitledPageMapItem): item is TitledMdxFile =>
  'frontMatter' in item;
