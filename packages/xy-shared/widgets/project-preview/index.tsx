import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Heading, Text, Button, Container, TextProps, cn } from '@xyflow/xy-ui';

import { type Author, AuthorList } from '../../';

export type ProjectPreviewProps = {
  image?: string | StaticImport;
  kicker?: ReactNode;
  kickerSize?: TextProps['size'];
  title: ReactNode;
  titleSize?: TextProps['size'];
  subtitle?: ReactNode;
  description: ReactNode;
  descriptionVariant?: TextProps['variant'];
  authors?: Author[];
  route?: string;
  altRoute?: {
    href: string;
    label: string;
  };
  linkLabel?: string;
  linkClassName?: string;
  className?: string;
  imageWrapperClassName?: string;
};

export function ProjectPreview({
  image,
  kicker,
  kickerSize = 'sm',
  title,
  titleSize = 'sm',
  subtitle,
  description,
  descriptionVariant = 'default',
  authors = [],
  route,
  linkLabel = 'Read more',
  linkClassName,
  altRoute,
  className,
  imageWrapperClassName,
}: ProjectPreviewProps) {
  const isExternal = route?.includes('https://');
  const linkProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  const LinkOrSpan = (props: React.HTMLAttributes<Element>) =>
    isExternal ? (
      <a href={route} {...props} {...linkProps} />
    ) : route ? (
      <Link href={route} {...props} />
    ) : (
      <span {...props} />
    );

  return (
    <div className={className}>
      {image && (
        <Container
          className={cn(
            'mx-auto',
            'aspect-video',
            'relative',
            'overflow-hidden',
            'bg-gray-50',
            imageWrapperClassName,
          )}
          size="sm"
        >
          <Image
            src={image}
            alt={`${title} screenshot`}
            className="object-cover group-hover:scale-105 transition-transform"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </Container>
      )}
      {kicker && (
        <Text size={kickerSize} variant="light" className="mt-8 tracking-wide">
          {kicker}
        </Text>
      )}
      <Heading as="div" size={titleSize} className="mb-2 mt-1 lg:leading-snug">
        {title}
      </Heading>
      {subtitle && (
        <Text variant="light" size="sm" className="leading-snug">
          {subtitle}
        </Text>
      )}
      <AuthorList noLink={!route} authors={authors} className="mt-6" />
      <Text className="leading-snug my-4" variant={descriptionVariant}>
        {description}
      </Text>
      <div className="flex gap-4 mt-auto">
        <Button asChild variant="link" className={cn('text-md', linkClassName)}>
          <LinkOrSpan className="flex items-center">
            {linkLabel} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
          </LinkOrSpan>
        </Button>
        {altRoute && (
          <Button asChild variant="link" className="text-md">
            <a
              href={altRoute.href}
              target="_blank"
              className="flex items-center"
            >
              {altRoute.label} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
