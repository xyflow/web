import Link from 'next/link';
import { Heading } from '../components/ui/heading';
import { Text } from '../components/ui/text';
import { Author, AuthorList } from '../components/authors-list';
import { TimeAgo } from '../components/time-ago';
import { importPage } from 'nextra/pages';

export type TimelineEventProps = {
  frontmatter: {
    title: string;
    description: string;
    authors: Author[];
    date: `${number}-${number}-${number}}`;
    route: string;
  };
  route: string;
};

export async function TimelineEvent({ frontmatter, route }: TimelineEventProps) {
  const pathSegments = route.split('/').slice(1);
  const { default: MDXContent } = await importPage(pathSegments);
  return (
    <div className="flex-col lg:flex-row flex gap-4">
      <div className="space-y-2 lg:border-r border-gray-200 mt-4">
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
        <Heading as="h3" size="md">
          {frontmatter.title}
        </Heading>
        <MDXContent />
        <Text size="sm" variant="primary" className="text-right mt-4">
          <Link href={route}>Permalink</Link>
        </Text>
      </div>
    </div>
  );
}
