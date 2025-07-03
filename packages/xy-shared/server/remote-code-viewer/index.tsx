import path from 'path';
import { FC } from 'react';
import { MDXRemote } from 'nextra/mdx-remote';
import { OpenInCodesandbox } from './open-in-codesandbox';
import { OpenInStackblitz } from './open-in-stackblitz';
import { cn, Framework, Tabs, TabsContent, TabsList, TabsTrigger } from '@xyflow/xy-ui';
import { ExampleCode } from '../../types';
import { compileCodeSnippet } from '../compile-code-snippet';
import { loadJSONFile } from '../utils';
import './style.css';
import { ActionBar } from './ActionBar';

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
  orientation?: 'horizontal' | 'vertical';
  sandpackOptions?: Record<string, any>;
};

export const RemoteCodeViewer: FC<RemoteCodeViewerProps> = async ({
  route,
  framework,
  showEditor = true,
  showOpenInCodeSandbox = framework === 'react',
  showOpenInStackblitz = true,
  sandpackOptions = {},
  editorHeight = '40vh',
  activeFile,
  orientation,
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
  // 1. If showEditor is false, the layout is vertical (isHorizontal = false).
  // 2. If orientation is provided, it is horizontal only if orientation === 'horizontal'.
  // 3. If the route includes 'examples/', the layout is vertical (isHorizontal = false).
  // 4. Default fallback: the layout is horizontal (isHorizontal = true).
  const isExample = route.includes('examples/');
  const isHorizontal = false;
  const snippets: Record<string, string> = {};
  for (const [filename, file] of Object.entries(json.files)) {
    const filetype = filename.split('.').pop();
    const compiledSnippet = await compileCodeSnippet(file, { filetype });
    snippets[filename] = compiledSnippet;
  }

  if (true) {
  }

  const _initialActiveFile =
    activeFile ??
    (Object.keys(snippets).includes('App.jsx') ? 'App.jsx' : Object.keys(snippets)[0]);

  return (
    <div
      className={cn(
        'transition-all remote-code-viewer mt-5 rounded-xl flex overflow-hidden border border-gray-200',
        isHorizontal ? 'flex-row' : 'flex-col',
      )}
    >
      <div
        style={isHorizontal ? {} : { height: editorHeight }}
        className={cn('relative', isHorizontal && 'w-1/2')}
      >
        <iframe
          src={preview}
          loading="lazy"
          width="100%"
          height="100%"
          className="example"
        />
      </div>
      <div
        className={cn(
          'rounded-xl overflow-hidden',
          isHorizontal ? 'w-1/2 rounded-l-none' : 'rounded-t-none',
        )}
      >
        {snippets && (
          <Tabs defaultValue={_initialActiveFile}>
            <ActionBar
              tabslist={
                <TabsList className="tablist border-none w-min mb-0 overflow-x-auto overflow-y-hidden text-nowrap">
                  {Object.keys(snippets).map((filename) => (
                    <TabsTrigger
                      key={filename}
                      className="font-light text-sm data-[state=active]:bg-primary/5"
                      value={filename}
                    >
                      {filename}
                    </TabsTrigger>
                  ))}
                </TabsList>
              }
              editor={
                <div
                  style={{ height: editorHeight }}
                  className="tabcontent overflow-y-scroll bg-primary/5"
                >
                  {Object.entries(snippets).map(([filename, compiledSource]) => (
                    <TabsContent
                      key={filename}
                      className="min-h-[500px]"
                      value={filename}
                    >
                      <MDXRemote compiledSource={compiledSource} />
                    </TabsContent>
                  ))}
                </div>
              }
            >
              {showOpenInStackblitz && (
                <OpenInStackblitz framework={_framework} route={route} />
              )}
              {showOpenInCodeSandbox && (
                <OpenInCodesandbox
                  framework={_framework}
                  route={route}
                  sandpackOptions={sandpackOptions}
                />
              )}
            </ActionBar>
          </Tabs>
        )}
      </div>
    </div>
  );
};
