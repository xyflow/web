import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';

/** Root node shape used by remark (mdast). */
interface MdastRoot {
  children: Array<{ type: string; value?: string; depth?: number; children?: unknown[] }>;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..');
const EXAMPLES_PUBLIC = path.join(
  SITE_ROOT,
  '..',
  '..',
  'apps',
  'example-apps',
  'public',
);

const SECTIONS: Record<string, { name: string; path: string }> = {
  'api-reference': {
    name: 'API Reference',
    path: path.join(SITE_ROOT, 'src/content/api-reference'),
  },
  learn: {
    name: 'Learn',
    path: path.join(SITE_ROOT, 'src/content/learn'),
  },
  // ui: {
  //   name: 'UI',
  //   path: path.join(SITE_ROOT, 'src/content/ui'),
  // },
};

const OUTPUT_FILE = path.join(SITE_ROOT, 'public/llms.txt');

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

/** Path to source.json for a given route and framework (e.g. react). */
function getExampleSourcePath(route: string, framework: string): string {
  return path.join(EXAMPLES_PUBLIC, framework, route, 'source.json');
}

/** Load file-by-file content from example-apps public source.json. Returns null if missing. */
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
    // Mirror RemoteCodeViewer: for examples, omit boilerplate from the dump
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

/** Format example files as markdown code blocks for the LLM txt. */
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

/** Replace every <RemoteCodeViewer route="..." framework="..." /> in source with example file contents. */
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

const PRO_EXAMPLE_PLACEHOLDER =
  '! THIS IS A PRO EXAMPLE. SUBSCRIBE TO https://reactflow.dev/pro TO ACCESS PRO EXAMPLES !';

const PRO_EXAMPLE_VIEWER_TAG_RE = /<ProExampleViewer\s[\s\S]*?\/>/g;

/** Replace every <ProExampleViewer ... /> in source with static placeholder. */
function replaceProExampleViewers(source: string): string {
  return source.replace(PRO_EXAMPLE_VIEWER_TAG_RE, PRO_EXAMPLE_PLACEHOLDER);
}

/** Remove import lines that only import RemoteCodeViewer (leftover from MDX). */
function stripRemoteCodeViewerImports(text: string): string {
  return text.replace(
    /^import\s+\{\s*RemoteCodeViewer\s*\}\s+from\s+['"]xy-shared\/server['"];\s*$/gm,
    '',
  );
}

/** Remove import lines for ProExampleViewer (leftover from MDX). */
function stripProExampleViewerImports(text: string): string {
  return text.replace(
    /^import\s+ProExampleViewer\s+from\s+['"]@\/components\/pro-example-viewer['"];\s*$/gm,
    '',
  );
}

function increaseHeadingLevels(amount: number) {
  return () => (tree: unknown) => {
    const root = tree as MdastRoot;
    function visit(node: { type: string; depth?: number; children?: unknown[] }) {
      if (node.type === 'heading' && typeof node.depth === 'number') {
        node.depth = Math.min(node.depth + amount, 6);
      }
      if (node.children) {
        node.children.forEach((child) => visit(child as typeof node));
      }
    }
    visit(root as unknown as { type: string; depth?: number; children?: unknown[] });
  };
}

function extractFrontmatterAndCreateHeader() {
  return (tree: unknown) => {
    const root = tree as MdastRoot;
    let title = '';

    const frontmatterIndex = root.children.findIndex((node) => node.type === 'yaml');
    if (frontmatterIndex !== -1) {
      const frontmatter = root.children[frontmatterIndex];
      const yamlContent = 'value' in frontmatter ? String(frontmatter.value) : '';

      const titleMatch = yamlContent.match(/^title:\s*(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1].trim().replace(/^["']|["']$/g, '');
      }

      root.children.splice(frontmatterIndex, 1);
    }

    if (title) {
      root.children.unshift({
        type: 'heading',
        depth: 1,
        children: [{ type: 'text', value: title }],
      } as never);
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
    let plain = await mdxToPlainText(raw);
    plain = stripRemoteCodeViewerImports(plain);
    plain = stripProExampleViewerImports(plain);
    output += plain.trim() + '\n\n';
  }

  return output;
}

async function buildLLMSTxt(outputFile: string): Promise<void> {
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

  for (const section of Object.values(SECTIONS)) {
    const sectionOutput = `## ${section.name}\n\n${await buildLLMSTxtSection(section.path)}`;
    output += sectionOutput;
  }

  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`✅ Wrote ${outputFile}`);
}

buildLLMSTxt(OUTPUT_FILE);
