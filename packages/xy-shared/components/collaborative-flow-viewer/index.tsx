'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Container, ContainerProps } from '../ui/container';
import { Link } from '../ui/link';
import { Text } from '../ui/text';
import { getFramework } from '../../lib/get-framework';
import { useSubscription } from '../../hooks/use-subscription';
import ProPlatformExampleViewer from '../../components/pro/ProExampleViewer';

const iframeClassName = 'block h-full bg-white w-full';

const { framework } = getFramework();

/**
 * This component is used to wrap the pro example viewer to display a
 * side-by-side viewer for the collaborative example with a random flow id (generated in client state).
 */
export default function CollaborativeFlowViewer({
  variant = 'default',
}: {
  variant?: ContainerProps['variant'];
}) {
  const { isSubscribed, user } = useSubscription();
  const pathname = usePathname();
  const [flowId] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const key = 'collab-flow-tab-session-id';
    let existing = window.sessionStorage.getItem(key);

    if (!existing) {
      existing = crypto.randomUUID();
      window.sessionStorage.setItem(key, existing);
    }

    return existing;
  });
  const hasUser = !!user;

  const isLightMode = variant === 'default';
  const teaserClasses = cn(
    'px-6 py-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
    {
      'bg-gradient': isLightMode,
      'bg-[length:200%]': isLightMode,
      'bg-center': isLightMode,
    },
  );

  const signInLink = `/pro/sign-in?redirectTo=${pathname}`;
  const iframeSrc = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/collaborative?flow=${flowId}`;
  const subscribeLink = `/pro/subscribe?redirectTo=${pathname}`;

  if (isSubscribed) {
    return (
      <ProPlatformExampleViewer
        framework={framework}
        exampleId="collaborative"
        config={{
          type: 'example',
          id: 'collaborative',
          framework,
          previewUrl: iframeSrc,
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Button asChild className="max-w-64 shrink-0">
        <Link
          href={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/react/collaborative?flow=${flowId}`}
          target="_blank"
        >
          Open the flow in a new tab!
        </Link>
      </Button>
      <Container className={'mt-7'} variant="default">
        <div className={teaserClasses}>
          <Text className="max-w-xl flex-1 basis-full">
            <strong>This is a Pro Example.</strong> Get{' '}
            <Link className="underline" href="/pro/content">
              all pro examples
            </Link>
            , templates, 1:1 support from the xyflow team and prioritized Github issues
            with a React Flow Pro subscription.
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

        <div className="flex gap-2">
          <div className="h-[645px] w-1/2">
            {flowId && (
              <iframe
                src={iframeSrc}
                className={iframeClassName}
                allow="clipboard-write"
              />
            )}
          </div>
          <div className="h-[645px] w-1/2 border-l-2 border-l-gray-200">
            {flowId && (
              <iframe
                src={iframeSrc}
                className={iframeClassName}
                allow="clipboard-write"
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
