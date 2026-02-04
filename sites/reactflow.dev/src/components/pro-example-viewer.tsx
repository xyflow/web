import { FC } from 'react';
import Link from 'next/link';
import { Container, ContainerProps, Text, Button, cn } from '@xyflow/xy-ui';

const iframeClassName = cn('block h-[645px] bg-white w-full');

const ProExampleViewer: FC<{
  slug: string;
  variant?: ContainerProps['variant'];
  type?: 'example' | 'template';
  className?: string;
  innerClassName?: string;
  // If true, display two columns with two previews side by side
  sideBySide?: boolean;
  queryParams?: Record<string, string>;
}> = async ({
  slug,
  variant = 'default',
  type = 'example',
  className,
  innerClassName,
  sideBySide = false,
  queryParams,
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

  const iframeBasePath = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${slug}`;
  const iframeSrcUrl = new URL(iframeBasePath);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      iframeSrcUrl.searchParams.set(key, value);
    });
  }

  let iframeSrc = iframeSrcUrl.toString();
  let signInLink = `https://pro.reactflow.dev/examples/react/${slug}`;

  if (type === 'template') {
    const config = await fetch(`${iframeBasePath}/config.json`);
    const { previewUrl } = await config.json();

    iframeSrc = previewUrl;
    signInLink = `https://pro.reactflow.dev/templates/${slug}`;
  }

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

      {sideBySide ? (
        <div className="flex gap-2">
          <div className="w-1/2">
            <iframe src={iframeSrc} className={iframeClassName} />
          </div>
          <div className="border-l-gray-200 border-l-2 w-1/2">
            <iframe src={iframeSrc} className={iframeClassName} />
          </div>
        </div>
      ) : (
        <iframe src={iframeSrc} className={iframeClassName} />
      )}
    </Container>
  );
};

export default ProExampleViewer;
