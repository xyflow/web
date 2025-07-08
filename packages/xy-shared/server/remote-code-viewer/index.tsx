import { Framework } from '@xyflow/xy-ui';
import { MDXRemote } from 'nextra/mdx-remote';
import path from 'path';
import { FC, ReactNode } from 'react';
import { ExampleCode } from '../../types';
import { compileCodeSnippet } from '../compile-code-snippet';
import { loadJSONFile } from '../utils';
import { CodePreview } from './CodePreview';
import './style.css';

const defaultOptions = {
  editorHeight: '60vh',
  editorWidthPercentage: 45,
  wrapContent: true,
  readOnly: false,
};

export type RemoteCodeViewerProps = {
  route: string;
  framework?: Framework;
  options?: typeof defaultOptions;
  activeFile?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  showOpenInCodeSandbox?: boolean;
  showOpenInStackblitz?: boolean;
  editorHeight?: string | number;
};

export const RemoteCodeViewer: FC<RemoteCodeViewerProps> = async ({
  route,
  framework,
  showEditor = true,
  showOpenInCodeSandbox = framework === 'react',
  showOpenInStackblitz = true,
  editorHeight = '40vh',
  activeFile,
}) => {
  const _framework: Framework =
    framework ?? (process.env.NEXT_PUBLIC_Framework as Framework) ?? 'react';
  const preview = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/index.html`;
  const p = path.join('../../apps/example-apps/public', _framework, route, 'source.json');

  const json = loadJSONFile<ExampleCode>(p);
  const isOk = !!json && 'files' in json && 'dependencies' in json;
  if (!isOk) {
    throw new Error('Example code not found!');
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

  const mdxSnippets: [string, ReactNode][] = Object.entries(snippets).map(
    ([filename, compiledSource]) => [
      filename,
      <MDXRemote key={filename} compiledSource={compiledSource} />,
    ],
  );

  return (
    <div className="remote-code-viewer mt-5 rounded-xl flex overflow-hidden border border-border flex-col">
      <CodePreview
        route={route}
        mdxSnippets={mdxSnippets}
        initialActiveFile={initialActiveFile}
        framework={_framework}
        showOpenInStackblitz={showOpenInStackblitz}
        showOpenInCodeSandbox={showOpenInCodeSandbox}
        showEditor={showEditor}
        editorHeight={editorHeight}
        preview={preview}
      />
    </div>
  );
};
