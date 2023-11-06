import Link from 'next/link';
import { useSSG } from 'nextra/ssg';
import { Hero, Text } from '@xyflow/xy-ui';
import { Author, AuthorList, BaseLayout } from 'xy-shared';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import TimeAgo from 'timeago-react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import ExampleViewer from '@/components/example-viewer';

export default function WhatsNew() {
  const mdx = useSSG('mdx') as TimelineEventProps[];

  return (
    <BaseLayout className="space-y-32 max-w-screen-lg mx-auto">
      <Hero
        title="What's new?"
        align="center"
        subtitle="We're always improving our docs. This is a timeline of the things we've added or changed so far."
        kicker="Timeline"
        kickerIcon={PencilSquareIcon}
      />

      {mdx.map((src, i) => (
        <TimelineEvent key={i} {...src} />
      ))}
    </BaseLayout>
  );
}

type TimelineEventProps = MDXRemoteSerializeResult & {
  frontmatter: {
    title: string;
    description: string;
    authors: Author[];
    date: `${number}-${number}-${number}}`;
  };
};

function TimelineEvent({ frontmatter, ...src }: TimelineEventProps) {
  return (
    <div className="flex-col lg:flex-row flex gap-4">
      <div className="space-y-2 lg:border-r mt-4">
        <AuthorList
          authors={frontmatter.authors}
          className="w-52 flex-shrink-0 self-start"
          noLink
        />
        <div className="ml-12 text-sm text-light" title={frontmatter.date}>
          <TimeAgo datetime={frontmatter.date} />
        </div>
      </div>
      <div className="pl-2">
        <MDXRemote
          frontmatter={frontmatter}
          components={{ ExampleViewer }}
          {...src}
        />

        <Text size="sm" variant="primary" className="text-right mt-4">
          <Link href={frontmatter.route}>Permalink</Link>
        </Text>
      </div>
    </div>
  );
}
