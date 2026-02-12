'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container, ContainerProps } from '../ui/container';
import { Text } from '../ui/text';
import { useSubscription } from '../../hooks/use-subscription';
import ProPlatformExampleViewer from '../../components/pro/ProExampleViewer';
import { Framework } from '../../types';

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
  variant?: ContainerProps['variant'];
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
  framework?: Framework;
  // If true, display two columns with two previews side by side
  sideBySide?: boolean;
  queryParams?: QueryParams;
}> = ({
  slug,
  variant = 'default',
  type = 'example',
  className,
  innerClassName,
  framework = 'react',
  sideBySide = false,
  queryParams = {},
}) => {
  const isLightMode = variant === 'default';
  const { isSubscribed } = useSubscription();

  // Examples live under `/<framework>/<slug>`, templates under `/<slug>`.
  const baseUrl = useMemo(() => {
    const root = process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL;
    return type === 'template' ? `${root}/${slug}` : `${root}/${framework}/${slug}`;
  }, [framework, slug, type]);

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

  const teaserClasses = useMemo(
    () =>
      cn('px-6 py-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2', {
        'bg-gradient bg-[length:200%] bg-center': isLightMode,
      }),
    [isLightMode],
  );

  const signInLink =
    type === 'template'
      ? `https://pro.reactflow.dev/templates/${slug}`
      : `https://pro.reactflow.dev/examples/react/${slug}`;

  const iframeBaseSrc = templatePreviewUrl ?? baseUrl;
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

  const iframeCount = sideBySide ? 2 : 1;

  return (
    <Container
      className={cn(['mt-7', className])}
      variant={variant}
      innerClassName={innerClassName}
    >
      <div className={teaserClasses}>
        <Text className="flex-1 basis-full max-w-xl">
          <strong>This is a Pro {type}.</strong> Get{' '}
          <Link className="underline" href="/pro/examples">
            all pro examples
          </Link>
          , templates, 1:1 support from the xyflow team and prioritized Github issues with
          a React Flow Pro subscription.
        </Text>
        <div className="flex space-x-4">
          <Button asChild className="shrink-0">
            <Link href="/pro">See Pricing Plans</Link>
          </Button>
          <Button asChild variant="secondary" className="text-primary shrink-0">
            <a href={signInLink}>Sign In</a>
          </Button>
        </div>
      </div>

      <div className="flex">
        {Array.from({ length: iframeCount }, (_, idx) => idx + 1).map((index) => {
          // Only append `flow` if the caller didn't already provide one
          // (e.g. `CollaborativeFlowViewer` passes `flow=<uuid>`).
          const perIframeParams =
            queryParams.flow === undefined
              ? { ...queryParams, flow: index }
              : queryParams;

          const src = appendSearchParams(iframeBaseSrc, toSearchParams(perIframeParams));

          return (
            <iframe
              key={index}
              src={src}
              title={`${slug} preview ${index}`}
              className={cn(
                'block h-[645px] bg-white',
                sideBySide ? 'w-1/2' : 'w-full',
              )}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ProExampleViewer;
