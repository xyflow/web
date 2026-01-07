import { Framework } from '../../types';
import { MDXRemote } from 'nextra/mdx-remote';
import path from 'path';
import { ReactNode } from 'react';
import { ExampleCode } from '../../types';
import { compileCodeSnippet } from '../compile-code-snippet';
import { loadJSONFile } from '../utils';
import { CodePreview } from './CodePreview';
import './style.css';

type DefaultOptions = {
  editorWidthPercentage: 45;
  wrapContent: true;
  readOnly: false;
};

export type RemoteCodeViewerProps = {
  route: string;
  framework?: Framework;
  options?: DefaultOptions;
  activeFile?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  showOpenInCodeSandbox?: boolean;
  showOpenInStackblitz?: boolean;
  aspectRatio?: '4' | '3' | '2' | '1' | '16/9';
};

export async function RemoteCodeViewer({
  route,
  framework,
  showEditor,
  // TODO: Re-enable open in codesandbox when we have static sandboxes that
  // are created via Codesandbox SDK at build time, and not every time via the API.
  showOpenInCodeSandbox = false, //framework === 'react',
  showOpenInStackblitz = true,
  aspectRatio = '16/9',
  activeFile,
}: RemoteCodeViewerProps) {
  const _framework: Framework =
    framework ?? (process.env.NEXT_PUBLIC_Framework as Framework) ?? 'react';
  const preview = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/index.html`;
  const p = path.join(
    process.cwd(),
    '../../apps/example-apps/public',
    _framework,
    route,
    'source.json',
  );

  const json = loadJSONFile<ExampleCode>(p);
  const isOk = !!json && 'files' in json && 'dependencies' in json;
  if (!isOk) {
    throw new Error(`Example code for "${p}" not found! Preview: ${preview}`);
  }
  const snippets: Record<string, string> = {};
  for (const [filename, file] of Object.entries(json.files)) {
    const filetype = filename.split('.').pop();
    const compiledSnippet = await compileCodeSnippet(file, { filetype });
    snippets[filename] = compiledSnippet;
  }

  const isExample = route.includes('examples/');
  if (isExample) {
    delete snippets['index.html'];
    delete snippets['index.jsx'];
    delete snippets['index.ts'];
    delete snippets['README.mdx'];
  }

  const initialActiveFile =
    activeFile ??
    (Object.keys(snippets).includes('App.jsx') ? 'App.jsx' : Object.keys(snippets)[0]);

  const mdxSnippets: [string, ReactNode, string][] = Object.entries(snippets).map(
    ([filename, compiledSource]) => [
      filename,
      <MDXRemote key={filename} compiledSource={compiledSource} />,
      json.files[filename],
    ],
  );

  return (
    <CodePreview
      route={route}
      mdxSnippets={mdxSnippets}
      initialActiveFile={initialActiveFile}
      framework={_framework}
      showOpenInStackblitz={showOpenInStackblitz}
      showOpenInCodeSandbox={showOpenInCodeSandbox}
      showEditor={showEditor ?? isExample}
      aspectRatio={aspectRatio}
      preview={preview}
    />
  );
}
