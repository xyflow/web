import Link from 'next/link';
import { connection } from 'next/server';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Text } from '../ui/text';
import { Framework, SubscriptionPlan } from '../../types';
import { getSubscription } from '../../server-actions/get-subscription';

// import ProPlatformExampleViewer from '../pro/ProExampleViewer';
import { downloadExample } from '../../server-actions/download-example';
// import { SandpackFiles } from '@codesandbox/sandpack-react';
import { compileMdx } from 'nextra/compile';
import { MDXRemote } from 'nextra/mdx-remote';
import { Tabs } from 'nextra/components';

import PreviewTab from '../pro/ProExampleViewer/tabs/preview';
import EditorTab from '../pro/ProExampleViewer/tabs/editor';

type QueryParams = Record<string, string | number | boolean | null | undefined>;

function toSearchParams(queryParams: QueryParams) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(queryParams)) {
    if (value === null || value === undefined) continue;
    sp.set(key, String(value));
  }
  return sp;
}

function appendSearchParams(url: string, sp: URLSearchParams) {
  if (sp.size === 0) return url;
  return url.includes('?') ? `${url}&${sp.toString()}` : `${url}?${sp.toString()}`;
}

async function fetchTemplatePreviewUrl(baseUrl: string): Promise<string | null> {
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
  queryParams?: QueryParams;
};

export default async function ProExampleViewer({
  slug,
  type = 'example',
  className,
  innerClassName,
  framework = 'react',
  queryParams = {},
}: ProExampleViewerProps) {
  await connection();
  const baseUrl = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${slug}`;

  const templatePreviewUrl =
    type === 'template' ? await fetchTemplatePreviewUrl(baseUrl) : null;

  const { plan, teamPlan } = await getSubscription();
  const isProPlan = plan !== SubscriptionPlan.FREE || teamPlan !== SubscriptionPlan.FREE;

  const iframeBaseSrc = type === 'template' ? (templatePreviewUrl ?? baseUrl) : baseUrl;
  const iframeSearchParams = toSearchParams(queryParams);

  if (isProPlan) {
    const proExampleFiles = await downloadExample({ exampleId: slug, framework });

    const readmeFile =
      proExampleFiles?.['/README.mdx'] ?? proExampleFiles?.['/README.md'];
    const readme = (typeof readmeFile === 'string' ? readmeFile : readmeFile?.code) || '';

    const markdown = await compileMdx(readme);
    return (
      // <ProPlatformExampleViewer
      //   files={proExampleFiles}
      //   markdown={markdown}
      //   framework={framework}
      //   exampleId={slug}
      //   config={{
      //     type,
      //     id: slug,
      //     framework,
      //     previewUrl: appendSearchParams(iframeBaseSrc, iframeSearchParams),
      //   }}
      // />
      <Tabs items={['Preview', 'Code', 'Readme']} defaultIndex={0}>
        <Tabs.Tab>
          <PreviewTab
            iframePreviewUrl={appendSearchParams(iframeBaseSrc, iframeSearchParams)}
          />
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
        <iframe
          src={appendSearchParams(iframeBaseSrc, iframeSearchParams)}
          title={`${slug} preview`}
          className={cn('bg-background block h-[645px] w-full')}
        />
      </div>
    </Container>
  );
}

// export default async function ProExampleViewer({
//   slug,
//   type = 'example',
//   className,
//   innerClassName,
//   framework = 'react',
//   queryParams = {},
// }: ProExampleViewerProps) {
//   const baseUrl = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${slug}`;

//   const templatePreviewUrl =
//     type === 'template' ? await fetchTemplatePreviewUrl(baseUrl) : null;

//   const proExampleFiles = await downloadExample({ exampleId: slug, framework });

//   const readmeFile = proExampleFiles?.['/README.mdx'] ?? proExampleFiles?.['/README.md'];
//   const readme = (typeof readmeFile === 'string' ? readmeFile : readmeFile?.code) || '';

//   const markdown = await compileMdx(readme);

//   return (
//     <DynamicViewer
//       slug={slug}
//       type={type}
//       className={className}
//       innerClassName={innerClassName}
//       framework={framework}
//       queryParams={queryParams}
//       templatePreviewUrl={templatePreviewUrl}
//       proExampleFiles={proExampleFiles}
//       baseUrl={baseUrl}
//     />
//   );
// }
