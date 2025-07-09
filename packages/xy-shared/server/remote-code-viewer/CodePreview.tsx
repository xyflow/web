'use client';

import {
  ArrowPathIcon,
  CheckIcon,
  ClipboardIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import {
  Framework,
  IconButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@xyflow/xy-ui';
import { ReactNode, useRef, useState } from 'react';
import { OpenInCodesandbox } from './open-in-codesandbox';
import { OpenInStackblitz } from './open-in-stackblitz';

const clipBoardIcons = [
  <ClipboardIcon key={0} className="size-5 stroke-2" />,
  <CheckIcon key={1} className="size-5 stroke-2" />,
];

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
  mdxSnippets: [string, ReactNode, string][];
  showEditor: boolean;
  editorHeight: string | number;
  preview: string;
}) {
  const [isOpen, setIsOpen] = useState(showEditor);
  const [tabsValue, setTabsValue] = useState(initialActiveFile);
  const [copyIcon, setCopyIcon] = useState(clipBoardIcons[0]);
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
        <Tabs
          defaultValue={initialActiveFile}
          value={tabsValue}
          onValueChange={(value) => setTabsValue(value)}
        >
          <div
            className={`grid gap-2 grid-flow-col grid-cols-[1fr_min-content] 
                        border-t ${isOpen ? 'border-b' : ''} border-gray-200`}
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
              className={`${isOpen ? 'col-span-1' : 'col-span-2'} h-10 self-center flex p-1 gap-1 text-sm justify-end`}
            >
              {isOpen && (
                <IconButton
                  icon={copyIcon}
                  title="Copy Snippet"
                  onClick={() => {
                    const snippetContent = mdxSnippets.find(
                      ([fileName]) => fileName == tabsValue,
                    )?.[2];
                    navigator.clipboard.writeText(snippetContent ?? '');
                    setCopyIcon(clipBoardIcons[1]);
                    setTimeout(() => setCopyIcon(clipBoardIcons[0]), 1000);
                  }}
                />
              )}
              <IconButton
                icon={<CodeBracketIcon className="size-6" />}
                title="Toggle code"
                className={`${isOpen ? 'bg-gray-100' : 'text-[#ff0073]'}`}
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              />
              <IconButton
                icon={<ArrowPathIcon className="size-5 stroke-2" />}
                title="Reset preview"
                onClick={() =>
                  iframeRef.current?.src &&
                  // refreshes the iframe without CORS problems
                  (iframeRef.current.src = iframeRef.current.src)
                }
              />

              {showOpenInStackblitz && (
                <OpenInStackblitz framework={framework} route={route} />
              )}
              {showOpenInCodeSandbox && (
                <OpenInCodesandbox framework={framework} route={route} />
              )}
            </div>
          </div>
          {isOpen && (
            <div className="h-[50vh] overflow-y-scroll bg-primary/5">
              {mdxSnippets.map(([filename, snippet]) => (
                <TabsContent key={filename} className="min-h-[500px]" value={filename}>
                  {snippet}
                </TabsContent>
              ))}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
