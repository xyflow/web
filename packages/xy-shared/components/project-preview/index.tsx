import { type ReactNode } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Heading } from '../ui/heading';
import { Text, TextProps } from '../ui/text';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { LinkOrSpan } from '../link-or-span';
import { cn } from '../../lib/utils';

import { type Author, AuthorList } from '../authors-list';

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
          <LinkOrSpan route={route} className="flex items-center">
            {linkLabel} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
          </LinkOrSpan>
        </Button>
        {altRoute && (
          <Button asChild variant="link" className="text-md">
            <a
              href={altRoute.href}
              target="_blank"
              rel="noopener noreferrer"
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
