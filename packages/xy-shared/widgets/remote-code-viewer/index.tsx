import { useContext } from 'react';
import { clsx } from 'clsx';
import { Code } from 'nextra/components';

import {
  Framework,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@xyflow/xy-ui';

import { RemoteContent } from '../../components/remote-content';
import { SharedContext } from '../../context/shared-context';
import { CompiledMdx } from '../../types';


import './style.css';
import { OpenInStackblitz } from './open-in-stackblitz';
import { OpenInCodesandbox } from './open-in-codesandbox';

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

export function RemoteCodeViewer({
  route,
  framework,
  showEditor = true,
  showOpenInCodeSandbox = framework === 'react',
  sandpackOptions = {},
  editorHeight = '60vh',
  activeFile,
  orientation,
}: RemoteCodeViewerProps) {
  const _framework: Framework =
    framework ?? (process.env.NEXT_PUBLIC_Framework as Framework) ?? 'react';
  
  const preview = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/index.html`;

  const isExample = route.includes('examples/');
  const isHorizontal = orientation
    ? orientation === 'horizontal'
    : isExample
      ? false
      : true;

  const { useData } = useContext(SharedContext);
  const snippets: Record<string, CompiledMdx> | undefined =
    useData('codeSnippets')?.[route];

  if (!snippets) {
    throw new Error(
      `Example code not found! Did you forget to call "export const getStaticProps = getStaticCode(["${route}"])" inside your route?`,
    );
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
      className={clsx(
        'remote-code-viewer mt-5 rounded-lg flex',
        isHorizontal ? 'flex-row' : 'flex-col',
      )}
    >
      <div
        style={{ height: editorHeight }}
        className={clsx('relative', isHorizontal ? 'w-1/2' : '')}
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
          className={clsx(
            'rounded-xl overflow-hidden',
            isHorizontal ? 'w-1/2 rounded-l-none' : 'rounded-t-none ',
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
                {Object.entries(snippets).map(([filename, file]) => (
                  <TabsContent
                    key={filename}
                    className="min-h-[500px]"
                    value={filename}
                  >
                    <RemoteContent
                      mdx={file.compiledSource}
                      components={{ code: Code }}
                      scope={{}}
                    />
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
}
