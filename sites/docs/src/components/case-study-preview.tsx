import { type ReactNode } from 'react';
import Link from 'next/link';
import { RxArrowRight } from 'react-icons/rx';

import { Heading, Text } from 'xy-ui';

type CaseStudyPreviewProps = {
  client: ReactNode;
  title: ReactNode;
  description: ReactNode;
  route: string;
  className?: string;
};

export default function CaseStudyPreview({
  client,
  title,
  description,
  route,
  className,
}: CaseStudyPreviewProps) {
  return (
    <div className={className}>
      <Text size="sm" variant="light">
        {client}
      </Text>
      <Heading as="p" size="sm" className="mb-4 mt-1">
        {title}
      </Heading>
      <Text variant="light" className="leading-snug mb-4">
        {description}
      </Text>
      <div>
        <Link href={route}>
          Read more <RxArrowRight className="inline w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
