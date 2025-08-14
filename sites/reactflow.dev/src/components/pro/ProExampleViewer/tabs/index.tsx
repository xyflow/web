'use client';

import { Button, Tabs, TabsContent, TabsList, TabsTrigger, cn } from '@xyflow/xy-ui';
import PreviewTab from './preview';
import EditorTab from './editor';
import MarkdownTab from './markdown';
import { SandpackFiles } from '@codesandbox/sandpack-react';
import NotSubscribedNotification from '../../Notification/not-subscribed';
import {
  BookOpenIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import Loader from '../../Loader';

const TabButton = (props) => {
  const isActive = props['data-state'] === 'active';
  const className = cn(
    'border-b-2 border-transparent rounded-none -mb-px hover:bg-transparent',
    isActive && 'border-primary text-primary hover:text-primary',
    props.className,
  );

  return (
    <Button variant="ghost" {...props} className={className}>
      <div className="mr-2">
        {props.disabled ? <LockClosedIcon className="w-4 h-4 stroke-2" /> : props.icon}
      </div>
      {props.children}
    </Button>
  );
};

const TabContent = (props: {
  value: string;
  loading?: boolean;
  children: React.ReactNode;
}) => {
  const children = props.loading ? (
    <div className="flex items-center justify-center h-[300px]">
      <Loader />
    </div>
  ) : (
    props.children
  );

  return <TabsContent value={props.value}>{children}</TabsContent>;
};

export default function ProExampleViewerTabs({
  exampleId,
  files,
  isUnlocked,
  previewUrl,
}: {
  exampleId: string;
  files: null | SandpackFiles;
  isUnlocked: boolean;
  previewUrl?: string;
}) {
  // @ts-expect-error
  const readme = files?.['/README.mdx']?.code || files?.['/README.md']?.code;
  const iframePreviewUrl =
    previewUrl ?? `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${exampleId}`;

  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList className="flex gap-x-0 mb-4 border-b border-gray-200">
          <TabsTrigger asChild value="preview">
            <TabButton icon={<ComputerDesktopIcon className="w-4 h-4 stroke-2" />}>
              Preview
            </TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="editor" disabled={!isUnlocked}>
            <TabButton icon={<CodeBracketIcon className="w-4 h-4 stroke-2" />}>
              Code
            </TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="readme" disabled={!isUnlocked}>
            <TabButton icon={<BookOpenIcon className="w-4 h-4 stroke-2" />}>
              Readme
            </TabButton>
          </TabsTrigger>
        </TabsList>

        {!isUnlocked && (
          <NotSubscribedNotification description="Please subscribe to unlock all pro examples and templates." />
        )}

        <TabContent value="preview">
          <PreviewTab iframePreviewUrl={iframePreviewUrl} />
        </TabContent>

        {isUnlocked && (
          <TabContent value="editor" loading={!files}>
            {files && <EditorTab files={files} />}
          </TabContent>
        )}

        {isUnlocked && (
          <TabContent value="readme" loading={!files}>
            <MarkdownTab markdown={readme} />
          </TabContent>
        )}
      </Tabs>
    </>
  );
}
