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

const API_REFERENCE_PATH = path.join(process.cwd(), 'src/content/api-reference');

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

const apiReference = getAllMdxFiles(API_REFERENCE_PATH);

console.log(apiReference);

async function mdxToPlainText(source) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    // .use(removeEsModules)
    // .use(removeMdxJsx)
    // .use(strip) // strip markdown formatting
    // .use(remarkRehype)
    // .use(rehypeStringify)
    .use(remarkStringify)
    .process(source);

  return String(file);
}

const OUTPUT_FILE = path.join(process.cwd(), 'llms.txt');
async function buildLLMSTxt() {
  const mdxFiles = getAllMdxFiles(API_REFERENCE_PATH);
  let output = '';

  for (const file of mdxFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const plain = await mdxToPlainText(raw);

    output += `\n\n===== ${path.relative(API_REFERENCE_PATH, file)} =====\n\n`;
    output += plain.trim() + '\n';
  }

  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`✅ Wrote ${OUTPUT_FILE} with ${mdxFiles.length} files`);
}

buildLLMSTxt();
