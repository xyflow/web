import { type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import { Heading, Text, Button } from 'xy-ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type ProjectPreviewProps = {
  image?: string | StaticImport;
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  description: ReactNode;
  route?: string;
  linkLabel?: string;
  className?: string;
};

export default function ProjectPreview({
  image,
  kicker,
  title,
  subtitle,
  description,
  route,
  linkLabel = 'Read more',
  className,
}: ProjectPreviewProps) {
  const isExternal = route?.includes('https://');
  const linkProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};
  const LinkOrSpan = (props) =>
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
        <div className="aspect-video relative shadow-md mb-6 rounded-md border border-solid border-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={`${title} screenshot`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {kicker && (
        <Text size="sm" variant="light">
          {kicker}
        </Text>
      )}
      <Heading as="p" size="sm" className="mb-2 mt-1">
        {title}
      </Heading>
      {subtitle && (
        <Text variant="light" size="sm" className="leading-snug">
          {subtitle}
        </Text>
      )}
      <Text className="leading-snug my-4">{description}</Text>
      <Button asChild variant="link">
        <LinkOrSpan className="flex items-center">
          {linkLabel} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </LinkOrSpan>
      </Button>
    </div>
  );
}
