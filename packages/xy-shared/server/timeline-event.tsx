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
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="border-border mt-4 space-y-2 lg:border-r">
        <AuthorList
          authors={frontmatter.authors}
          className="w-52 flex-shrink-0 self-start"
          noLink
        />
        <div className="text-light ml-12 text-sm" title={frontmatter.date}>
          <TimeAgo datetime={frontmatter.date} />
        </div>
      </div>
      <div className="pl-2">
        <Heading as="h3" size="md">
          {frontmatter.title}
        </Heading>
        <MDXContent />
        <Text size="sm" variant="primary" className="mt-4 text-right">
          <Link href={route}>Permalink</Link>
        </Text>
      </div>
    </div>
  );
}
