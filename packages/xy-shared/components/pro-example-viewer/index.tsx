'use client';

import { FC } from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container, ContainerProps } from '../ui/container';
import { Text } from '../ui/text';
import { useSubscription } from '../../hooks/use-subscription';
import ProPlatformExampleViewer from '../../components/pro/ProExampleViewer';
import { Framework } from '../../types';

const ProExampleViewer: FC<{
  slug: string;
  variant?: ContainerProps['variant'];
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
  framework: Framework;
}> = ({ slug, variant = 'default', type = 'example', framework = 'react' }) => {
  const isLightMode = variant === 'default';
  const { isSubscribed } = useSubscription();

  if (isSubscribed) {
    return (
      <ProPlatformExampleViewer
        framework={framework}
        exampleId={slug}
        config={{ type: 'example', id: slug, framework }}
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
            <Link className="underline" href="/pro">
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
          src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${slug}`}
          className="block h-[645px] w-full bg-white"
        />
      </div>
    </Container>
  );
};

export default ProExampleViewer;
