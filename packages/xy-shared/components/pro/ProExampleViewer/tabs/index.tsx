import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { cn } from '../../../../lib/utils';
import PreviewTab from './preview';
import EditorTab from './editor';
import MarkdownTab from './markdown';
import { SandpackFiles } from '@codesandbox/sandpack-react';

import {
  BookOpenIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import Loader from '../../Loader';

import { ButtonProps } from '../../../ui/button';

interface TabButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  'data-state'?: 'active' | 'inactive';
}

const TabButton = (props: TabButtonProps) => {
  const isActive = props['data-state'] === 'active';
  const className = cn(
    'border-b-2 border-transparent rounded-none -mb-px hover:bg-transparent',
    isActive && 'border-primary text-primary hover:text-primary',
    props.className,
  );

  return (
    <Button variant="ghost" {...props} className={className}>
      <div className="mr-2">
        {props.disabled ? <LockClosedIcon className="h-4 w-4 stroke-2" /> : props.icon}
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
    <div className="flex h-[300px] items-center justify-center">
      <Loader />
    </div>
  ) : (
    props.children
  );

  return <TabsContent value={props.value}>{children}</TabsContent>;
};

export default function ProExampleViewerTabs({
  files,
  previewUrl,
  markdown,
}: {
  files: null | SandpackFiles;
  previewUrl: string;
  markdown: string;
}) {
  // const readmeFile = files?.['/README.mdx'] ?? files?.['/README.md'];
  // const readme = (typeof readmeFile === 'string' ? readmeFile : readmeFile?.code) || '';

  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList className="border-border mb-4 flex gap-x-0 border-b">
          <TabsTrigger asChild value="preview">
            <TabButton icon={<ComputerDesktopIcon className="h-4 w-4 stroke-2" />}>
              Preview
            </TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="editor">
            <TabButton icon={<CodeBracketIcon className="h-4 w-4 stroke-2" />}>
              Code
            </TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="readme">
            <TabButton icon={<BookOpenIcon className="h-4 w-4 stroke-2" />}>
              Readme
            </TabButton>
          </TabsTrigger>
        </TabsList>

        <TabContent value="preview">
          <PreviewTab iframePreviewUrl={previewUrl} />
        </TabContent>

        <TabContent value="editor" loading={!files}>
          {files && <EditorTab files={files} />}
        </TabContent>

        <TabContent value="readme" loading={!files}>
          <MarkdownTab markdown={markdown} />
        </TabContent>
      </Tabs>
    </>
  );
}
