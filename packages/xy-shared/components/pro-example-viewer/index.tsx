'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Button, cn, Container, ContainerProps, Text } from '../../';
import { useSubscription } from '../../hooks';
import ProPlatformExampleViewer from '../../components/pro/ProExampleViewer';
import { Framework } from '../../components/pro/ProExampleViewer/types';

const ProExampleViewer: FC<{
  slug: string;
  variant?: ContainerProps['variant'];
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
}> = ({ slug, variant = 'default', type = 'example' }) => {
  const isLightMode = variant === 'default';
  const { isSubscribed } = useSubscription();

  if (isSubscribed) {
    return (
      <ProPlatformExampleViewer
        frameworkId={Framework.REACT}
        exampleId={slug}
        config={{ type: 'example', id: slug, framework: Framework.REACT }}
      />
    );
  }

  return (
    <Container className="mt-7" variant={variant}>
      {!isSubscribed && (
        <div
          className={cn(
            'px-6 py-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
            isLightMode && 'bg-gradient bg-[length:200%] bg-center',
          )}
        >
          <Text className="flex-1 basis-full max-w-xl">
            <strong>This is a Pro {type}.</strong> Get{' '}
            <Link className="underline" href="/examples/pro">
              all pro examples
            </Link>
            , templates, 1:1 support from the xyflow team and prioritized GitHub issues
            with a Pro subscription.
          </Text>
          <Button asChild>
            <Link href="/pro/subscribe">Subscribe</Link>
          </Button>
        </div>
      )}

      <div>
        <iframe
          src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${slug}`}
          className="block h-[645px] w-full bg-white"
        />
      </div>
    </Container>
  );
};

export default ProExampleViewer;
