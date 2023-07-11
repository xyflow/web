import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { Heading, Text } from 'xy-ui';
import AuthorList from '@/components/authors-list';

type BlogPostPreviewProps = {
  date: ReactNode;
  title: ReactNode;
  intro: ReactNode;
  authors: string[];
  route: string;
  className?: string;
};

export default function BlogPostPreview({
  date,
  title,
  intro,
  authors,
  route,
  className,
}: BlogPostPreviewProps) {
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

      <AuthorList authors={authors} className="mb-2" />

      <Link href={route}>
        Read more <ArrowRightIcon className="inline w-3 h-3" />
      </Link>
    </div>
  );
}
