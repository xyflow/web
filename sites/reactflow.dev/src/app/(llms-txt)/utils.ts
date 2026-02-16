import { Folder, MdxFile, MetaJsonFile } from 'nextra';

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

import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import type { Root, Parent, Heading } from 'mdast';

// CONFIG (relative to site root = process.cwd() when running Next from reactflow.dev)
const SITE_ROOT = process.cwd();
const EXAMPLE_APPS_ROOT = path.join(SITE_ROOT, '..', '..', 'apps', 'example-apps');
const EXAMPLES_PUBLIC = path.join(EXAMPLE_APPS_ROOT, 'public');
const UI_COMPONENTS_REGISTRY = path.join(
  SITE_ROOT,
  '..',
  '..',
  'apps',
  'ui-components',
  'registry',
  'components',
);

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
    path: path.join(EXAMPLE_APPS_ROOT, 'react', 'examples'),
  },
  ui: {
    name: 'UI',
    path: path.join(SITE_ROOT, 'src/content/ui'),
  },
};

export interface Section {
  name: string;
  path: string;
}

interface MdxFile {
  fullPath: string;
  relativePath: string;
  name: string;
}

function getAllMdxFiles(dir: string, basePath = ''): string[] {
  const files: string[] = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    const directories: { fullPath: string; relativePath: string }[] = [];
    const mdxFiles: MdxFile[] = [];

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

function loadExampleFiles(
  route: string,
  framework: string,
): { files: Record<string, string> } | null {
  const sourcePath = getExampleSourcePath(route, framework);
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
    const framework = frameworkMatch ? frameworkMatch[1].trim() : 'react';
    if (!route) return tag;
    const loaded = loadExampleFiles(route, framework);
    if (!loaded) return `[Example not found: ${route}]`;
    return formatExampleAsMarkdown(route, loaded.files);
  });
}

// ============================================================================
// <UiComponentViewer> tag replacement
// ============================================================================

const UI_COMPONENT_FILES = ['index.tsx', 'component-example.tsx'] as const;

function loadUiComponentFiles(id: string): { files: Record<string, string> } | null {
  const componentDir = path.join(UI_COMPONENTS_REGISTRY, id);
  try {
    if (!fs.existsSync(componentDir) || !fs.statSync(componentDir).isDirectory()) {
      return null;
    }
    const files: Record<string, string> = {};
    for (const name of UI_COMPONENT_FILES) {
      const filePath = path.join(componentDir, name);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        files[name] = fs.readFileSync(filePath, 'utf8');
      }
    }
    if (Object.keys(files).length === 0) return null;
    return { files };
  } catch {
    return null;
  }
}

function formatUiComponentAsMarkdown(id: string, files: Record<string, string>): string {
  const lines: string[] = [`UI Component: ${id}`, ''];
  for (const [filename, content] of Object.entries(files)) {
    const ext = path.extname(filename).slice(1) || 'txt';
    lines.push(`### ${filename}`, '', '```' + ext, content.trimEnd(), '```', '');
  }
  return lines.join('\n');
}

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

// ============================================================================
// Final processing of markdown
// ============================================================================

const PRO_EXAMPLE_PLACEHOLDER =
  '! THIS IS A PRO EXAMPLE. SUBSCRIBE TO https://reactflow.dev/pro TO ACCESS PRO EXAMPLES !';

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

function stripUiComponentViewerImports(text: string): string {
  return text.replace(
    /^import\s+UiComponentViewer\s+from\s+['"]@\/components\/ui-component-viewer\.mdx['"];\s*$/gm,
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
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(extractFrontmatterAndCreateHeader)
    .use(increaseHeadingLevels(2))
    .use(remarkStringify)
    .process(source);

  return String(file);
}

async function buildLLMSTxtSection(sectionPath: string): Promise<string> {
  const mdxFiles = getAllMdxFiles(sectionPath);
  let output = '';

  for (const file of mdxFiles) {
    let raw = fs.readFileSync(file, 'utf8');
    raw = expandRemoteCodeViewers(raw);
    raw = replaceProExampleViewers(raw);
    raw = expandUiComponentViewers(raw);
    let plain = await mdxToPlainText(raw);
    plain = stripRemoteCodeViewerImports(plain);
    plain = stripProExampleViewerImports(plain);
    plain = stripUiComponentViewerImports(plain);
    output += plain.trim() + '\n\n';
  }

  return output;
}

export async function buildLLMSTxt(sections: Record<string, Section>): Promise<string> {
  let output = '# React Flow Documentation\n\n';
  output += `
    What is React Flow?\n\nReact Flow is a library that allows you to create
    interactive, node-based user interfaces: flowcharts, diagrams, visual
    programming tools, and workflows inside your React applications. It supports
    theming, custom nodes and edges, a library of shadcn UI components, and offers a
    large collection of examples for rapid development. Developers can leverage the
    React Flow Pro platform for advanced features like real-time collaboration,
    complex layouts, and enhanced performance, making it suitable for both simple
    and large-scale, production-ready visual applications.\n\n`;

  for (const section in sections) {
    const sectionOutput = `## ${sections[section].name}\n\n${await buildLLMSTxtSection(sections[section].path)}`;
    output += sectionOutput;
  }

  return output;
}
