import { useContext, useEffect, useState } from 'react';
import cn from 'clsx';

import {
  Framework,
  Heading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@xyflow/xy-ui';
import { RemoteContent } from '../../components/remote-content';
import { SharedContext } from '../../context/shared-context';
import { Callout, Code } from 'nextra/components';

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
  customOpenButton?: React.ReactNode;
  sandpackOptions?: Record<string, any>;
  showOpenInCodeSandbox?: boolean;
  editorHeight?: string | number;
  orientation?: 'horizontal' | 'vertical';
};

export function RemoteCodeViewer({
  route,
  framework,
  showEditor = true,
  customOpenButton = null,
  sandpackOptions = {},
  showOpenInCodeSandbox = framework === 'react',
  editorHeight = '60vh',
  activeFile,
  orientation,
}: RemoteCodeViewerProps) {
  const _framework = framework ?? process.env.NEXT_PUBLIC_Framework ?? 'react';
  const routeURL = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/source.json`;
  const preview = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/index.html`;

  const _orientation = orientation
    ? orientation
    : route.includes('examples/')
      ? 'vertical'
      : 'horizontal';

  const { useData } = useContext(SharedContext);
  const snippets = useData('codeSnippets')?.[route];

  return (
    <div className="mt-5">
      <div style={{ height: editorHeight }}>
        <iframe
          src={preview}
          loading="lazy"
          width="100%"
          height="100%"
          className="example"
        />
      </div>
      <div className="border-[1px]">
        {!snippets && (
          <div className="h-full flex justify-center items-center">
            <Callout>
              Did you forget to use <Code>getStaticCode(["{route}"])</Code>?
            </Callout>
          </div>
        )}
        {snippets && (
          <Tabs defaultValue="App.jsx">
            <TabsList className="mb-0">
              {Object.keys(snippets).map((filename) => (
                <TabsTrigger
                  className="font-light text-gray-500 text-sm"
                  value={filename}
                >
                  {filename}
                </TabsTrigger>
              ))}
            </TabsList>
            <div
              style={{ height: editorHeight }}
              className="overflow-y-scroll bg-primary/5"
            >
              {Object.entries(snippets).map(([filename, file]) => (
                <TabsContent className="min-h-[500px]" value={filename}>
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
    </div>
  );
}
