import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Heading, HeadingProps } from '../ui/heading';
import { Text } from '../ui/text';

import { type Author, AuthorList } from '../authors-list';

export type BlogPostPreviewProps = {
  date: ReactNode;
  title: ReactNode;
  intro: ReactNode;
  headingSize?: HeadingProps['size'];
  authors: Author[];
  route?: string;
  className?: string;
};

export function BlogPostPreview({
  date,
  title,
  intro,
  headingSize = 'sm',
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
        size={headingSize}
        className="!text-left mb-6 mt-1 underline-offset-3 underline"
      >
        {title}
      </Heading>
      <AuthorList authors={authors} className="md:mb-4 mb-4" noLink={!route} />

      <Text variant="light" className="mb-4">
        {intro}
      </Text>

      <LinkOrSpan>
        Read more <ArrowRightCircleIcon className="inline w-4 h-4" />
      </LinkOrSpan>
    </div>
  );
}
