import { type ReactNode } from 'react';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Heading, HeadingProps } from '../ui/heading';
import { Text } from '../ui/text';
import { LinkOrSpan } from '../link-or-span';

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
  return (
    <div className={className}>
      <Text size="sm" variant="light">
        {date}
      </Text>
      <Heading
        as="p"
        size={headingSize}
        className="underline-offset-3 mb-6 mt-1 !text-left underline"
      >
        {title}
      </Heading>
      <AuthorList authors={authors} className="mb-4 md:mb-4" noLink={!route} />

      <Text variant="light" className="mb-4">
        {intro}
      </Text>

      <LinkOrSpan route={route}>
        Read more <ArrowRightCircleIcon className="inline h-4 w-4" />
      </LinkOrSpan>
    </div>
  );
}
