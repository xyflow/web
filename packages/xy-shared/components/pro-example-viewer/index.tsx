import { Suspense } from 'react';
import Link from 'next/link';
import { MDXRemote } from 'nextra/mdx-remote';
import { Tabs } from 'nextra/components';
import { SandpackFiles } from '@codesandbox/sandpack-react';

import { Framework } from '../../types';
import { getFramework } from '../../lib/get-framework';
import { cn } from '../../lib/utils';

import { compileMdx } from 'nextra/compile';

import { fetchProExample } from './fetch-pro-example';
import { fetchTemplatePreviewUrl } from './fetch-template-preview-url';

import { DownloadButton } from './download-button';
import { CollaborativePreview } from './collaborative-preview-dynamic';
import { Subscribed } from '../pro/SubscriptionStatus';

import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Text } from '../ui/text';
import { ProExampleCodeEditor } from './editor';

type ProExampleViewerProps = {
  slug: string;
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
  framework?: Framework;
  collaborative?: boolean;
};

export default async function ProExampleViewer(props: ProExampleViewerProps) {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          aria-label="Loading example preview"
          className={cn(
            'border-border mt-4 h-[75vh] max-h-[650px] min-h-[400px] overflow-hidden rounded-sm border',
            'bg-muted animate-pulse',
          )}
        />
      }
    >
      <ProExample {...props} />
    </Suspense>
  );
}

async function getProExample(slug: string, framework: Framework) {
  'use cache';
  const proExampleFiles = await fetchProExample({ exampleId: slug, framework });

  const readmeFile = proExampleFiles?.['/README.mdx'] ?? proExampleFiles?.['/README.md'];
  const readme = (typeof readmeFile === 'string' ? readmeFile : readmeFile?.code) || '';

  const markdown = await compileMdx(readme);

  return { proExampleFiles, markdown };
}

export async function ProExample({
  slug,
  type = 'example',
  className,
  innerClassName,
  framework: frameworkOverride,
  collaborative,
}: ProExampleViewerProps) {
  const { framework } = getFramework(frameworkOverride);
  const baseUrl = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${slug}`;

  const templatePreviewUrl =
    type === 'template' ? await fetchTemplatePreviewUrl(baseUrl) : null;
  const iframeBaseSrc = type === 'template' ? (templatePreviewUrl ?? baseUrl) : baseUrl;

  const { proExampleFiles, markdown } = await getProExample(slug, framework);

  return (
    <>
      <Subscribed
        fallback={
          <LoggedOut
            className={className}
            innerClassName={innerClassName}
            type={type}
            iframeBaseSrc={iframeBaseSrc}
            slug={slug}
            collaborative={collaborative}
          />
        }
      >
        <LoggedIn
          markdown={markdown}
          proExampleFiles={proExampleFiles}
          iframeBaseSrc={iframeBaseSrc}
          collaborative={collaborative}
          slug={slug}
          framework={framework}
        />
      </Subscribed>
    </>
  );
}

function LoggedOut({
  className,
  innerClassName,
  type,
  iframeBaseSrc,
  slug,
  collaborative,
}: {
  className?: string;
  innerClassName?: string;
  type: string;
  iframeBaseSrc: string;
  slug: string;
  collaborative?: boolean;
}) {
  return (
    <Container className={cn(['mt-7', className])} innerClassName={innerClassName}>
      <div
        className={cn(
          'bg-gradient flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-[length:200%] bg-center px-6 py-8',
        )}
      >
        <Text className="max-w-xl flex-1 basis-full">
          <strong>This is a Pro {type}.</strong> Get{' '}
          <Link className="underline" href="/pro/content">
            all pro examples
          </Link>
          , templates, 1:1 support from the xyflow team and prioritized Github issues with
          a React Flow Pro subscription.
        </Text>
        <div className="flex space-x-4">
          <Button asChild className="shrink-0">
            <Link href="/pro">See Pricing Plans</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="text-primary shrink-0 dark:text-white"
          >
            <a href="/pro/sign-in">Sign In</a>
          </Button>
        </div>
      </div>

      <div className="flex w-full">
        {collaborative ? (
          <CollaborativePreview iframeSrc={iframeBaseSrc} />
        ) : (
          <iframe
            src={iframeBaseSrc}
            title={`${slug} preview`}
            className={cn('bg-background block h-[645px] w-full')}
          />
        )}
      </div>
    </Container>
  );
}

function LoggedIn({
  iframeBaseSrc,
  collaborative,
  markdown,
  proExampleFiles,
  slug,
  framework,
}: {
  iframeBaseSrc: string;
  collaborative?: boolean;
  markdown: string;
  proExampleFiles: SandpackFiles;
  slug: string;
  framework: Framework;
}) {
  return (
    <>
      <DownloadButton
        slug={slug}
        framework={framework}
        className="float-right mb-[-2em] mt-6"
      />
      <Tabs items={['Preview', 'Code', 'Readme']} defaultIndex={0}>
        <Tabs.Tab>
          {collaborative ? (
            <CollaborativePreview iframeSrc={iframeBaseSrc} />
          ) : (
            <>
              <div className="border-border relative mb-2 mt-4 h-[75vh] max-h-[650px] min-h-[400px] overflow-hidden rounded-sm border">
                <iframe className="h-full w-full" src={iframeBaseSrc} />
              </div>
              <a target="_blank" rel="noreferrer" href={iframeBaseSrc}>
                <Button variant="link">Open preview in a new tab</Button>
              </a>
            </>
          )}
        </Tabs.Tab>
        <Tabs.Tab>
          <ProExampleCodeEditor files={proExampleFiles} />
        </Tabs.Tab>
        <Tabs.Tab>
          <MDXRemote compiledSource={markdown} />
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
