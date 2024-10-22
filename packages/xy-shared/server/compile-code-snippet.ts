import { compileMdx } from 'nextra/compile';
import { CompiledMdx } from '../types';

type CompileCodeSnippetOptions = {
  filetype?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  highlight?: string;
  filename?: string;
};

const defaultOptions = {
  filetype: 'js',
  showCopy: false,
  showLineNumbers: false,
  highlight: '',
  filename: '',
};

function createMDXString(snippet: string, options: CompileCodeSnippetOptions) {
  return (
    '```' +
    options.filetype +
    (options.showCopy ? ' copy ' : '') +
    (options.showLineNumbers ? ' showLineNumbers ' : '') +
    (options.highlight ? ` /${options.highlight}/ ` : '') +
    (options.filename ? ` filename="${options.filename}" ` : '') +
    '\n' +
    snippet
  );
}

export async function compileCodeSnippet(
  snippet: string,
  options?: CompileCodeSnippetOptions,
): Promise<CompiledMdx> {
  const opts = { ...defaultOptions, ...options };

  const { result: compiledSource, frontMatter } = await compileMdx(
    createMDXString(snippet, opts),
  );

  return { compiledSource, frontMatter };
}
