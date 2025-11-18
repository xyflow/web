import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content/api-reference');
const OUTPUT_FILE = path.join(__dirname, '../public/llms.txt');

// Function to remove frontmatter and clean MDX
function cleanMDX(content) {
  // Remove frontmatter
  content = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Remove import statements
  content = content.replace(/^import .+$/gm, '');
  
  // Remove custom React components like <APIDocs /> <ReactFlowAPIProps />
  content = content.replace(/<[A-Z][a-zA-Z0-9]*[^>]*\/>/g, '[API Definition]');
  content = content.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z0-9]*>/g, '[Component Content]');
  
  // Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  return content.trim();
}

// Recursively read all .mdx files
async function readMDXFiles(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...await readMDXFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
      const relativePath = path.relative(baseDir, fullPath);
      const content = await fs.readFile(fullPath, 'utf-8');
      files.push({ path: relativePath, content });
    }
  }

  return files;
}

// Generate the llms.txt file
async function generateLLMSTxt() {
  console.log('Generating llms.txt from API reference documentation...');
  
  const files = await readMDXFiles(CONTENT_DIR);
  
  // Sort files by category
  const categories = {
    main: [],
    components: [],
    hooks: [],
    types: [],
    utils: [],
  };

  for (const file of files) {
    const cleaned = cleanMDX(file.content);
    const entry = {
      path: file.path,
      content: cleaned,
    };

    if (file.path.startsWith('components/')) {
      categories.components.push(entry);
    } else if (file.path.startsWith('hooks/')) {
      categories.hooks.push(entry);
    } else if (file.path.startsWith('types/')) {
      categories.types.push(entry);
    } else if (file.path.startsWith('utils/')) {
      categories.utils.push(entry);
    } else {
      categories.main.push(entry);
    }
  }

  // Build the output
  let output = `# React Flow API Reference

> A comprehensive reference for building node-based editors and interactive diagrams with React Flow

## Overview

React Flow (@xyflow/react) is a library for building node-based editors, workflow builders, and interactive diagrams.

- Website: https://reactflow.dev
- GitHub: https://github.com/xyflow/xyflow
- npm: https://www.npmjs.com/package/@xyflow/react

---

`;

  // Add main components
  if (categories.main.length > 0) {
    output += `## Main Components\n\n`;
    for (const file of categories.main) {
      output += `${file.content}\n\n---\n\n`;
    }
  }

  // Add components
  if (categories.components.length > 0) {
    output += `## Components\n\n`;
    for (const file of categories.components.sort((a, b) => a.path.localeCompare(b.path))) {
      output += `${file.content}\n\n---\n\n`;
    }
  }

  // Add hooks
  if (categories.hooks.length > 0) {
    output += `## Hooks\n\n`;
    for (const file of categories.hooks.sort((a, b) => a.path.localeCompare(b.path))) {
      output += `${file.content}\n\n---\n\n`;
    }
  }

  // Add utility functions
  if (categories.utils.length > 0) {
    output += `## Utility Functions\n\n`;
    for (const file of categories.utils.sort((a, b) => a.path.localeCompare(b.path))) {
      output += `${file.content}\n\n---\n\n`;
    }
  }

  // Add types
  if (categories.types.length > 0) {
    output += `## Types\n\n`;
    for (const file of categories.types.sort((a, b) => a.path.localeCompare(b.path))) {
      output += `${file.content}\n\n---\n\n`;
    }
  }

  // Write to file
  await fs.writeFile(OUTPUT_FILE, output, 'utf-8');
  
  console.log(`✅ Generated llms.txt with ${files.length} API references`);
  console.log(`   Output: ${OUTPUT_FILE}`);
  console.log(`   Size: ${(output.length / 1024).toFixed(2)} KB`);
}

generateLLMSTxt().catch(console.error);

