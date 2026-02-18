'use client';
import { Button, cn, Container, ContainerProps, Link, Text } from '@xyflow/xy-ui';
import { useState, useEffect } from 'react';

const iframeClassName = 'block h-[645px] bg-white w-full';

/**
 * This component is used to wrap the pro example viewer to display a
 * side-by-side viewer for the collaborative example with a random flow id (generated in client state).
 */
export default function CollaborativeFlowViewer({
  variant = 'default',
}: {
  variant?: ContainerProps['variant'];
}) {
  const [flowId, setFlowId] = useState(() => crypto.randomUUID());

  const isLightMode = variant === 'default';
  const teaserClasses = cn(
    'px-6 py-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
    {
      'bg-gradient': isLightMode,
      'bg-[length:200%]': isLightMode,
      'bg-center': isLightMode,
    },
  );
  // Regenerate flowId when the page is restored from bfcache (e.g. after refresh or back navigation),
  // so we always get a fresh ID per "real" page load.
  useEffect(() => {
    setFlowId(crypto.randomUUID());
  }, []);

  let signInLink = `https://pro.reactflow.dev/examples/react/collaborative?flow=${flowId}`;

  let iframeSrc = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/collaborative?flow=${flowId}`;

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Button asChild className="shrink-0 max-w-64">
        <Link
          href={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/collaborative?flow=${flowId}`}
          target="_blank"
        >
          Open the flow in a new tab!
        </Link>
      </Button>
      <Container className={'mt-7'} variant="default">
        <div className={teaserClasses}>
          <Text className="flex-1 basis-full max-w-xl">
            <strong>This is a Pro Example.</strong> Get{' '}
            <Link className="underline" href="/pro/examples">
              all pro examples
            </Link>
            , templates, 1:1 support from the xyflow team and prioritized Github issues
            with a React Flow Pro subscription.
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

        <div className="flex gap-2">
          <div className="w-1/2">
            <iframe src={iframeSrc} className={iframeClassName} allow="clipboard-write" />
          </div>
          <div className="border-l-gray-200 border-l-2 w-1/2">
            <iframe src={iframeSrc} className={iframeClassName} allow="clipboard-write" />
          </div>
        </div>
      </Container>
    </div>
  );
}
