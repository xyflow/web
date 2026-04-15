import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Text } from '../ui/text';
import { Framework, SubscriptionPlan } from '../../types';
import { getSubscription } from '../../server-actions/get-subscription';

import { compileMdx } from 'nextra/compile';
import { MDXRemote } from 'nextra/mdx-remote';
import { Tabs } from 'nextra/components';

import EditorTab from '../pro/ProExampleViewer/tabs/editor';
import { fetchProExample } from './fetch-pro-example';
import { getFramework } from '../../lib/get-framework';
import { CollaborativePreview } from './collaborative-preview-dynamic';
import { Suspense } from 'react';
import { cacheLife } from 'next/cache';

async function fetchTemplatePreviewUrl(baseUrl: string): Promise<string | null> {
  'use cache';
  try {
    const res = await fetch(`${baseUrl}/config.json`, {
      cache: 'force-cache',
      next: { revalidate: false },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { previewUrl?: unknown };
    if (typeof json.previewUrl === 'string' && json.previewUrl.length > 0) {
      return json.previewUrl;
    }
  } catch {
    // fall back to baseUrl
  }
  return null;
}

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

  const { plan, teamPlan } = await getSubscription();
  const isProPlan = plan !== SubscriptionPlan.FREE || teamPlan !== SubscriptionPlan.FREE;

  const iframeBaseSrc = type === 'template' ? (templatePreviewUrl ?? baseUrl) : baseUrl;

  if (isProPlan) {
    return (
      <LoggedIn
        slug={slug}
        framework={framework}
        iframeBaseSrc={iframeBaseSrc}
        collaborative={collaborative}
      />
    );
  }

  return (
    <LoggedOut
      className={className}
      innerClassName={innerClassName}
      type={type}
      iframeBaseSrc={iframeBaseSrc}
      slug={slug}
      collaborative={collaborative}
    />
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
          <Link className="underline" href="/examples/pro">
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

      <div className="flex">
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

async function LoggedIn({
  slug,
  framework,
  iframeBaseSrc,
  collaborative,
}: {
  slug: string;
  framework: Framework;
  iframeBaseSrc: string;
  collaborative?: boolean;
}) {
  'use cache';
  cacheLife('max');
  const proExampleFiles = await fetchProExample({ exampleId: slug, framework });

  const readmeFile = proExampleFiles?.['/README.mdx'] ?? proExampleFiles?.['/README.md'];
  const readme = (typeof readmeFile === 'string' ? readmeFile : readmeFile?.code) || '';

  const markdown = await compileMdx(readme);
  return (
    <Tabs items={['Preview', 'Code', 'Readme']} defaultIndex={0}>
      <Tabs.Tab>
        {collaborative ? (
          <CollaborativePreview iframeSrc={iframeBaseSrc} />
        ) : (
          <>
            <div className="mb-2relative border-border mt-4 h-[75vh] max-h-[650px] min-h-[400px] overflow-hidden rounded-sm border">
              <iframe className="h-full w-full" src={iframeBaseSrc} />
            </div>
            <a target="_blank" rel="noreferrer" href={iframeBaseSrc}>
              <Button variant="link">Open preview in a new tab</Button>
            </a>
          </>
        )}
      </Tabs.Tab>
      <Tabs.Tab>
        <EditorTab files={proExampleFiles} />
      </Tabs.Tab>
      <Tabs.Tab>
        <MDXRemote compiledSource={markdown} />
      </Tabs.Tab>
    </Tabs>
  );
}
