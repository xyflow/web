'use client';

import {
  ArrowPathIcon,
  CheckIcon,
  ClipboardIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { Framework } from '../../types';
import { IconButton } from '../../components/ui/icon-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
  aspectRatio,
  preview,
}: {
  initialActiveFile: string;
  showOpenInStackblitz: boolean;
  framework: Framework;
  route: string;
  showOpenInCodeSandbox: boolean;
  mdxSnippets: [string, ReactNode, string][];
  showEditor?: boolean;
  aspectRatio?: '4' | '3' | '2' | '1' | '16/9';
  preview: string;
}) {
  const [isOpen, setIsOpen] = useState(showEditor);
  const [tabsValue, setTabsValue] = useState(initialActiveFile);
  const [copyIcon, setCopyIcon] = useState(clipBoardIcons[0]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!mdxSnippets) return;
  return (
    <div className="remote-code-viewer border-border mt-5 flex flex-col overflow-hidden rounded-xl border dark:border-gray-700">
      <div style={{ aspectRatio }}>
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
      <div className={'overflow-hidden rounded-xl rounded-t-none'}>
        <Tabs
          defaultValue={initialActiveFile}
          value={tabsValue}
          onValueChange={(value) => setTabsValue(value)}
        >
          <div
            className={`grid grid-flow-col grid-cols-[1fr_min-content] gap-2 border-t ${isOpen ? 'border-b' : ''} border-border dark:border-gray-700`}
          >
            {isOpen && (
              <TabsList className="tablist h-full overflow-x-auto overflow-y-hidden text-nowrap border-none">
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
              className={`${isOpen ? 'col-span-1' : 'col-span-2'} flex h-10 justify-end gap-1 self-center p-1 text-sm`}
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
                className={`${isOpen ? 'bg-card' : 'text-[#ff0073]'}`}
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              />
              <IconButton
                icon={<ArrowPathIcon className="size-5 stroke-2" />}
                title="Reset preview"
                onClick={() =>
                  iframeRef.current?.src &&
                  // refreshes the iframe without CORS problems
                  // eslint-disable-next-line no-self-assign
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
            <div className="bg-primary/5 h-[50vh] overflow-y-scroll">
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
