import { type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import { Heading, Text, Button, Container } from 'xy-ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import AuthorList from '@/components/authors-list';

type ProjectPreviewProps = {
  image?: string | StaticImport;
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  description: ReactNode;
  authors?: string[];
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
  authors,
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
        <Container className="mx-auto">
          <div className="overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-3xl">
            <div className="aspect-video relative shadow-md mb-6 rounded-md border border-solid border-gray-100 overflow-hidden">
              <Image
                src={image}
                alt={`${title} screenshot`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 600px, 600px"
              />
            </div>
          </div>
        </Container>
      )}
      {kicker && (
        <Text size="sm" variant="light">
          {kicker}
        </Text>
      )}
      <Heading as="p" size="sm" className="mb-2 mt-1 lg:leading-snug">
        {title}
      </Heading>
      {subtitle && (
        <Text variant="light" size="sm" className="leading-snug">
          {subtitle}
        </Text>
      )}
      <AuthorList authors={authors} className="mt-6" />
      <Text className="leading-snug my-4">{description}</Text>
      <Button asChild variant="link">
        <LinkOrSpan className="flex items-center">
          {linkLabel} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </LinkOrSpan>
      </Button>
    </div>
  );
}
