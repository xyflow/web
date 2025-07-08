'use client';

import { ArrowPathIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import {
  Framework,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TooltipSimple,
} from '@xyflow/xy-ui';
import { ReactNode, useRef, useState } from 'react';
import { OpenInCodesandbox } from './open-in-codesandbox';
import { OpenInStackblitz } from './open-in-stackblitz';

export function CodePreview({
  initialActiveFile,
  framework,
  showOpenInStackblitz,
  route,
  showOpenInCodeSandbox,
  mdxSnippets,
  showEditor,
  editorHeight,
  preview,
}: {
  initialActiveFile: string;
  showOpenInStackblitz: boolean;
  framework: Framework;
  route: string;
  showOpenInCodeSandbox: boolean;
  mdxSnippets: [string, ReactNode][];
  showEditor: boolean;
  editorHeight: string | number;
  preview: string;
}) {
  const [isOpen, setIsOpen] = useState(showEditor);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!mdxSnippets) return;
  return (
    <div className="remote-code-viewer mt-5 rounded-xl flex overflow-hidden border border-border flex-col">
      <div style={{ height: editorHeight }}>
        <iframe
          ref={iframeRef}
          id={route}
          src={preview}
          loading="lazy"
          width="100%"
          height="100%"
          className="example"
        />
      </div>
      <div className={'rounded-xl overflow-hidden rounded-t-none'}>
        <Tabs defaultValue={initialActiveFile}>
          <>
            <div
              className={`grid gap-2 grid-flow-col grid-cols-[1fr_min-content] border-t ${isOpen ? 'border-b' : ''} border-gray-200`}
            >
              {isOpen && (
                <TabsList className="tablist h-full border-none overflow-x-auto overflow-y-hidden text-nowrap">
                  {mdxSnippets.map(([filename]) => (
                    <TabsTrigger
                      key={filename}
                      className="text-sm text-gray-500"
                      value={filename}
                    >
                      {filename}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}
              <div
                className={`h-10 ${isOpen ? 'col-span-1' : 'col-span-2'} self-center flex p-1 gap-1 text-sm justify-end  
                            [&>button]:p-1 [&>button]:size-8 [&>button]:grid [&>button]:place-items-center 
                            [&>button]:rounded-lg [&>button:hover]:bg-gray-100`}
              >
                <TooltipSimple label="Toggle code">
                  <button
                    className={`${isOpen ? 'bg-gray-100' : 'text-[#ff0073]'}`}
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                    title="Toggle code"
                  >
                    <CodeBracketIcon className="size-6" />
                  </button>
                </TooltipSimple>
                <TooltipSimple label="Reset preview">
                  <button
                    title="Reset preview"
                    onClick={() =>
                      iframeRef.current?.src &&
                      // refreshes the iframe without CORS problems
                      (iframeRef.current.src = iframeRef.current.src)
                    }
                  >
                    <ArrowPathIcon className="size-5 stroke-2" />
                  </button>
                </TooltipSimple>
                {showOpenInStackblitz && (
                  <OpenInStackblitz framework={framework} route={route} />
                )}
                {showOpenInCodeSandbox && (
                  <OpenInCodesandbox framework={framework} route={route} />
                )}
              </div>
            </div>
            {isOpen && (
              <div className="h-[50vh] tabcontent overflow-y-scroll bg-primary/5">
                {mdxSnippets.map(([filename, snippet]) => (
                  <TabsContent key={filename} className="min-h-[500px]" value={filename}>
                    {snippet}
                  </TabsContent>
                ))}
              </div>
            )}
          </>
        </Tabs>
      </div>
    </div>
  );
}
