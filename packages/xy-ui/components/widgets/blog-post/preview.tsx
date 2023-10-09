import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { type ReactNode } from 'react';
import Link from 'next/link';

import { type Author, AuthorList, Heading, Text } from '../../../';

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
        size="sm"
        className="!text-left mb-4 mt-1 underline-offset-2 underline"
      >
        {title}
      </Heading>
      <Text variant="light" className="mb-4">
        {intro}
      </Text>

      <AuthorList authors={authors} className="mb-2" noLink={!route} />

      <LinkOrSpan>
        Read more <ArrowRightIcon className="inline w-3 h-3" />
      </LinkOrSpan>
    </div>
  );
}
