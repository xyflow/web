import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Heading, Text } from '@xyflow/xy-ui';

import { type Author, AuthorList } from '../../';

export type BlogPostPreviewProps = {
  date: ReactNode;
  title: ReactNode;
  intro: ReactNode;
  authors: Author[];
  route?: string;
  className?: string;
};

export function BlogPostPreview({
  date,
  title,
  intro,
  authors = [],
  route,
  className,
}: BlogPostPreviewProps) {
  const LinkOrSpan = (props: React.HTMLAttributes<Element>) =>
    route ? <Link href={route} {...props} /> : <span {...props} />;

  return (
    <div className={className}>
      <Text size="sm" variant="light">
        {date}
      </Text>
      <Heading
        as="p"
        size="md"
        className="!text-left mb-8 mt-1 underline-offset-3 underline"
      >
        {title}
      </Heading>
      <AuthorList authors={authors} className="mb-8" noLink={!route} />

      <Text variant="light" className="mb-4">
        {intro}
      </Text>

      <LinkOrSpan>
        Read more <ArrowRightCircleIcon className="inline w-4 h-4" />
      </LinkOrSpan>
    </div>
  );
}
