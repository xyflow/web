// scripts/make-llms-txt.mjs
import fs from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
// import strip from 'strip-markdown';

// Configuration of the sections to include in the LLM txt file
const SECTIONS = {
  'api-reference': {
    name: 'API Reference',
    path: path.join(process.cwd(), 'src/content/api-reference'),
  },
  learn: { name: 'Learn', path: path.join(process.cwd(), 'src/content/learn') },
  ui: { name: 'UI', path: path.join(process.cwd(), 'src/content/ui') },
};

// Path of the LLM txt file
const OUTPUT_FILE = path.join(process.cwd(), 'public/llms.txt');

function getAllMdxFiles(dir, basePath = '') {
  const files = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);

      if (item.isDirectory()) {
        // Recursively search subdirectories
        files.push(...getAllMdxFiles(fullPath, relativePath));
      } else if (item.isFile() && item.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}:`, error.message);
  }

  return files;
}

// Custom plugin to extract frontmatter and create headers
function extractFrontmatterAndCreateHeader() {
  return (tree) => {
    let title = '';

    // Find and extract frontmatter
    const frontmatterIndex = tree.children.findIndex((node) => node.type === 'yaml');
    if (frontmatterIndex !== -1) {
      const frontmatter = tree.children[frontmatterIndex];
      const yamlContent = frontmatter.value;

      // Extract title from YAML
      const titleMatch = yamlContent.match(/^title:\s*(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1].trim();
        // Remove quotes if present
        title = title.replace(/^["']|["']$/g, '');
      }

      // Remove the frontmatter node
      tree.children.splice(frontmatterIndex, 1);
    }

    // If we found a title, create a header at the beginning
    if (title) {
      const headerNode = {
        type: 'heading',
        depth: 1,
        children: [{ type: 'text', value: `======= ${title} =======` }],
      };
      tree.children.unshift(headerNode);
    }
  };
}

async function mdxToPlainText(source) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(extractFrontmatterAndCreateHeader)
    .use(remarkStringify)
    .process(source);

  return String(file);
}

async function buildLLMSTxtSection(path) {
  const mdxFiles = getAllMdxFiles(path);

  let output = '';

  for (const file of mdxFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const plain = await mdxToPlainText(raw);

    output += plain.trim() + '\n\n';
  }

  return output;
}

async function buildLLMSTxt(outputFile) {
  let output = '';

  for (const section of Object.values(SECTIONS)) {
    let sectionOutput = '# ==================================\n';
    sectionOutput += `# ${section.name}\n`;
    sectionOutput += '# ==================================';
    sectionOutput += '\n\n';
    sectionOutput += await buildLLMSTxtSection(section.path);
    output += sectionOutput;
  }

  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`✅ Wrote ${outputFile}`);
}

buildLLMSTxt(OUTPUT_FILE);
