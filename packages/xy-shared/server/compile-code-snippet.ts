import { compileMdx } from 'nextra/compile';

type CompileCodeSnippetOptions = {
  filetype?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  highlight?: string;
  filename?: string;
  npm2yarn?: boolean;
};

function createMDXString(
  snippet: string,
  options: CompileCodeSnippetOptions = {},
) {
  const codeblockMetadata = [
    options.showCopy && 'copy',
    options.showLineNumbers && 'showLineNumbers',
    options.highlight && `/${options.highlight}/`,
    options.filename && `filename="${options.filename}"`,
    options.npm2yarn && 'npm2yarn',
  ]
    .filter(Boolean)
    .join(' ');
  const filetype = options.filetype ?? 'js';
  return `~~~${filetype} ${codeblockMetadata}
${snippet}`;
}

export function compileCodeSnippet(
  snippet: string,
  options?: CompileCodeSnippetOptions,
): Promise<string> {
  const rawMdx = createMDXString(snippet, options);
  return compileMdx(rawMdx);
}
