import Link from 'next/link';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import TimeAgo from 'timeago-react';
import { Callout, Tabs, Tab } from 'nextra/components';
import { Emoji, Text } from '@xyflow/xy-ui';

import { Author, AuthorList, Image } from '../';

export type TimelineEventProps = MDXRemoteSerializeResult & {
  proExampleViewer: React.ComponentProps<any>;
  remoteCodeViewer: React.ComponentProps<any>;
  exampleUrl: string;
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
  proExampleViewer: ProExampleViewer,
  remoteCodeViewer: RemoteCodeViewer,
  exampleUrl = '',
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
          components={{
            ProExampleViewer,
            RemoteCodeViewer,
            Image,
            Tabs,
            Tab,
            Callout,
            Emoji,
          }}
          {...src}
          scope={{
            exampleUrl,
            process: typeof process !== 'undefined' ? process : {},
          }}
        />

        <Text size="sm" variant="primary" className="text-right mt-4">
          <Link href={frontmatter.route}>Permalink</Link>
        </Text>
      </div>
    </div>
  );
}
