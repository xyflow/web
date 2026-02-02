import { FC } from 'react';
import Link from 'next/link';
import { Container, ContainerProps, Text, Button, cn } from '@xyflow/xy-ui';

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
  queryParams = {},
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

    // Make a query params string from the queryParams object
    const queryParamsString = new URLSearchParams(queryParams).toString();

    let iframeSrc = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${slug}?${queryParamsString}`;

    if (type === 'template') {
      const config = await fetch(
        `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${slug}/config.json`,
      );

      const { previewUrl } = await config.json();
      iframeSrc = previewUrl;
    }

    console.log('iframeSrc', iframeSrc);

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

        <div className="flex">
          {Array.from({ length: (sideBySide ? 2 : 1) }, (_,idx) => idx+1).map((index) => (
            <iframe key={index} src={`${iframeSrc}&flow=${index}`} className={cn("block h-[645px] bg-white", sideBySide ? "w-1/2" : "w-full")} />
          ))}
        </div>
      </Container>
    );
  };

export default ProExampleViewer;
