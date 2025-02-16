import path from 'path';
import { FC } from 'react';
import { MDXRemote } from 'nextra/mdx-remote';
import { loadJSONFile } from 'xy-shared/server';
import { ExampleCode, OpenInCodesandbox, OpenInStackblitz } from 'xy-shared';
import {
  cn,
  Framework,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@xyflow/xy-ui';
import { compileCodeSnippet } from '../utils';

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
  editorHeight?: string | number;
  orientation?: 'horizontal' | 'vertical';
  sandpackOptions?: Record<string, any>;
};

export const RemoteCodeViewer: FC<RemoteCodeViewerProps> = async ({
  route,
  framework,
  showEditor = true,
  showOpenInCodeSandbox = framework === 'react',
  sandpackOptions = {},
  editorHeight = '60vh',
  activeFile,
  orientation,
}) => {
  const _framework: Framework =
    framework ?? (process.env.NEXT_PUBLIC_Framework as Framework) ?? 'react';
  const p = path.join(
    '../../apps/example-apps/public',
    _framework,
    route,
    'source.json',
  );
  const json = loadJSONFile<ExampleCode>(p);
  const isOk = !!json && 'files' in json && 'dependencies' in json;
  if (!isOk) {
    throw new Error(
      `Example code not found! Did you forget to call "export const getStaticProps = getStaticCode(["${route}"])" inside your route?`,
    );
  }
  // 1. If showEditor is false, the layout is vertical (isHorizontal = false).
  // 2. If orientation is provided, it is horizontal only if orientation === 'horizontal'.
  // 3. If the route includes 'examples/', the layout is vertical (isHorizontal = false).
  // 4. Default fallback: the layout is horizontal (isHorizontal = true).
  const isExample = route.includes('examples/');
  const isHorizontal =
    showEditor === false
      ? false
      : orientation
        ? orientation === 'horizontal'
        : !isExample;
  const preview = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/index.html`;
  const snippets: Record<string, string> = {};
  for (const [filename, file] of Object.entries(json.files)) {
    const filetype = filename.split('.').pop();
    const compiledSnippet = await compileCodeSnippet(file, { filetype });
    snippets[filename] = compiledSnippet;
  }

  if (isExample) {
    delete snippets['index.html'];
    delete snippets['index.jsx'];
  }

  const _initialActiveFile =
    activeFile ??
    (Object.keys(snippets).includes('App.jsx')
      ? 'App.jsx'
      : Object.keys(snippets)[0]);

  return (
    <div
      className={cn(
        'remote-code-viewer mt-5 rounded-lg flex',
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
        <div className="absolute bottom-5 right-5 flex">
          <OpenInStackblitz framework={_framework} route={route} />
          {showOpenInCodeSandbox && (
            <OpenInCodesandbox
              framework={_framework}
              route={route}
              sandpackOptions={sandpackOptions}
            />
          )}
        </div>
      </div>
      {showEditor && (
        <div
          className={cn(
            'rounded-xl overflow-hidden',
            isHorizontal ? 'w-1/2 rounded-l-none' : 'rounded-t-none',
          )}
        >
          {snippets && (
            <Tabs defaultValue={_initialActiveFile}>
              <TabsList className="tablist border-none mb-0 overflow-x-auto overflow-y-hidden text-nowrap bg-primary/5">
                {Object.keys(snippets).map((filename) => (
                  <TabsTrigger
                    key={filename}
                    className="font-light text-sm data-[state=active]:bg-primary/5 pt-3"
                    value={filename}
                  >
                    {filename}
                  </TabsTrigger>
                ))}
              </TabsList>
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
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
};
