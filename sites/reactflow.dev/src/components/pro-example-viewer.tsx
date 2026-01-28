import { FC } from 'react';
import Link from 'next/link';
import { Container, ContainerProps, Text, Button, cn } from '@xyflow/xy-ui';

const ProExampleViewer: FC<{
  slug: string;
  variant?: ContainerProps['variant'];
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
}> = async ({
  slug,
  variant = 'default',
  type = 'example',
  className,
  innerClassName,
}) => {
  const isLightMode = variant === 'default';

  const teaserClasses = cn(
    'px-6 py-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
    {
      'bg-gradient': isLightMode,
      'bg-[length:200%]': isLightMode,
      'bg-center': isLightMode,
    },
  );

  let iframeSrc = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/react/${slug}`;

  if (type === 'template') {
    const config = await fetch(
      `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/react/${slug}/config.json`,
    );

    const { previewUrl } = await config.json();
    iframeSrc = previewUrl;
  }

  const signInLink =
    type === 'template'
      ? `https://pro.reactflow.dev/templates/${slug}`
      : `https://pro.reactflow.dev/examples/react/${slug}`;

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

      <iframe src={iframeSrc} className="block h-[645px] w-full bg-white" />
    </Container>
  );
};

export default ProExampleViewer;
