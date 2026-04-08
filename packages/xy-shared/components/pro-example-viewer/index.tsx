'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Text } from '../ui/text';
import { useSubscription } from '../../hooks/use-subscription';
import ProPlatformExampleViewer from '../../components/pro/ProExampleViewer';
import { Framework } from '../../types';
import { Spinner } from '../ui/spinner';

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

const ProExampleViewer: FC<{
  slug: string;
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
  framework?: Framework;
  queryParams?: QueryParams;
}> = ({
  slug,
  type = 'example',
  className,
  innerClassName,
  framework = 'react',
  queryParams = {},
}) => {
  const pathname = usePathname();
  const { isSubscribed, user } = useSubscription();
  const baseUrl = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${slug}`;

  // For templates we try to load `previewUrl` from `config.json`.
  const [templatePreviewUrl, setTemplatePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (type !== 'template') {
        setTemplatePreviewUrl(null);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/config.json`);
        if (!res.ok) return;
        const json = (await res.json()) as { previewUrl?: unknown };
        if (cancelled) return;
        if (typeof json.previewUrl === 'string' && json.previewUrl.length > 0) {
          setTemplatePreviewUrl(json.previewUrl);
        }
      } catch {
        // ignore: fall back to baseUrl
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [baseUrl, type]);

  const hasUser = !!user;
  const isLoading = type === 'template' && !templatePreviewUrl;
  const signInLink = `/pro/sign-in?redirectTo=${pathname}`;
  const subscribeLink = `/pro/subscribe?redirectTo=${pathname}`;
  const iframeBaseSrc = type === 'template' ? (templatePreviewUrl ?? '') : baseUrl;
  const iframeSearchParams = useMemo(() => toSearchParams(queryParams), [queryParams]);

  if (isSubscribed) {
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
            {hasUser ? (
              <Link href={subscribeLink}>Subscribe</Link>
            ) : (
              <Link href="/pro">See Pricing Plans</Link>
            )}
          </Button>
          {hasUser ? null : (
            <Button
              asChild
              variant="secondary"
              className="text-primary shrink-0 dark:text-white"
            >
              <a href={signInLink}>Sign In</a>
            </Button>
          )}
        </div>
      </div>

      <div className="flex">
        {isLoading ? (
          <div className="block flex h-[645px] w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <iframe
            src={appendSearchParams(iframeBaseSrc, iframeSearchParams)}
            title={`${slug} preview`}
            className={cn('bg-background block h-[645px] w-full')}
          />
        )}
      </div>
    </Container>
  );
};

export default ProExampleViewer;
