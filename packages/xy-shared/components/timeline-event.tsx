import Link from 'next/link';
import { Text } from '@xyflow/xy-ui';
import { Image } from '../';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import TimeAgo from 'timeago-react';

import { Author, AuthorList } from '../';

export type TimelineEventProps = MDXRemoteSerializeResult & {
  exampleViewer: React.ComponentProps<any>;
  proExampleViewer: React.ComponentProps<any>;
  frontmatter: {
    title: string;
    description: string;
    authors: Author[];
    date: `${number}-${number}-${number}}`;
    route: string;
  };
};

export function TimelineEvent({
  frontmatter,
  exampleViewer: ExampleViewer,
  proExampleViewer: ProExampleViewer,
  ...src
}: TimelineEventProps) {
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
          components={{ ExampleViewer, ProExampleViewer, Image }}
          {...src}
        />

        <Text size="sm" variant="primary" className="text-right mt-4">
          <Link href={frontmatter.route}>Permalink</Link>
        </Text>
      </div>
    </div>
  );
}
