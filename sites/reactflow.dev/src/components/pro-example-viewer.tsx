import Link from 'next/link';
import { Container, ContainerProps, Text, Button, cn } from '@xyflow/xy-ui';

export default function ({
  slug,
  variant = 'default',
}: {
  slug: string;
  variant?: ContainerProps['variant'];
}) {
  const isLightMode = variant === 'default';

  const teaserClasses = cn(
    'px-6 py-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
    {
      'bg-gradient': isLightMode,
      'bg-[length:200%]': isLightMode,
      'bg-center': isLightMode,
    },
  );

  return (
    <Container className="mt-7" variant={variant}>
      <div className={teaserClasses}>
        <Text className="flex-1 basis-full max-w-xl">
          <strong>This is a Pro example.</strong> Get{' '}
          <Link className="underline" href="https://reactflow.dev/pro/examples">
            all pro examples
          </Link>
          , 1:1 support from the xyflow team and prioritized Github issues with
          a React Flow Pro subscription.
        </Text>
        <div className="flex space-x-4">
          <Button asChild className="shrink-0">
            <Link href="/pro">See Pricing Plans</Link>
          </Button>
          <Button asChild variant="secondary" className="text-primary shrink-0">
            <a href={`https://pro.reactflow.dev/examples/react/${slug}`}>
              Sign In
            </a>
          </Button>
        </div>
      </div>

      <div>
        <iframe
          src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${slug}`}
          className="block h-[645px] w-full bg-white"
        />
      </div>
    </Container>
  );
}
