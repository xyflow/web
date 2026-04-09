import Link from 'next/link';
import { connection } from 'next/server';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Text } from '../ui/text';
import { Framework, SubscriptionPlan } from '../../types';
import { getSubscription } from '../../server-actions/get-subscription';

import ProPlatformExampleViewer from '../pro/ProExampleViewer';

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

export default async function ProExampleViewer({
  slug,
  type = 'example',
  className,
  innerClassName,
  framework = 'react',
  queryParams = {},
}: {
  slug: string;
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
  framework?: Framework;
  queryParams?: QueryParams;
}) {
  const baseUrl = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${slug}`;

  const templatePreviewUrl =
    type === 'template' ? await fetchTemplatePreviewUrl(baseUrl) : null;

  await connection();
  const { plan, teamPlan } = await getSubscription();
  const isProPlan = plan !== SubscriptionPlan.FREE || teamPlan !== SubscriptionPlan.FREE;

  const iframeBaseSrc = type === 'template' ? (templatePreviewUrl ?? baseUrl) : baseUrl;
  const iframeSearchParams = toSearchParams(queryParams);

  if (isProPlan) {
    return (
      <ProPlatformExampleViewer
        framework={framework}
        exampleId={slug}
        config={{
          type,
          id: slug,
          framework,
          previewUrl: appendSearchParams(iframeBaseSrc, iframeSearchParams),
        }}
      />
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
