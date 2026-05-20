import { cn } from '../../lib/utils';
import { Text } from '../ui/text';
import { AuthorList } from '../../components/authors-list';
import { TimeAgo } from '../../components/time-ago';
import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { MdxFile } from 'nextra';
import { WhatsNewItemFrontMatter } from '../../server/get-last-changelog';

export type WhatsNewPreviewProps = {
  items: MdxFile<WhatsNewItemFrontMatter>[];
  variant?: 'full' | 'compact' | 'mini';
};

export default function WhatsNewPreview({
  items,
  variant = 'compact',
}: WhatsNewPreviewProps) {
  return (
    <ol className="border-border grid w-full grid-cols-1 gap-x-8 rounded-3xl border p-8 lg:grid-cols-2">
      {items.slice(0, 3).map((item, i) => (
        <li
          key={item.route}
          role="article"
          className={cn(
            i === 0 && 'row-span-2 flex h-full items-center',
            i === 1 && 'border-border border-b',
            'p-4 py-8',
          )}
        >
          <WhatsNewItemPreview variant={variant} featured={i === 0} item={item} />
        </li>
      ))}
    </ol>
  );
}

type WhatsNewItemPreviewProps = {
  item: MdxFile<WhatsNewItemFrontMatter>;
  featured?: boolean;
  variant: 'full' | 'compact' | 'mini';
};

function WhatsNewItemPreview({
  variant,
  featured = false,
  item: {
    // @ts-expect-error -- fixme
    frontMatter: { title, description, authors, date },
    route,
  },
}: WhatsNewItemPreviewProps) {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <Text size="sm" className="text-light">
          <TimeAgo date={date} />
        </Text>
        <h1 className={cn(featured ? 'text-2xl' : 'text-lg', 'font-semibold')}>
          <Link href={route} prefetch={false}>
            {title}
          </Link>
        </h1>
        <AuthorList authors={authors} slim={variant !== 'full'} />
      </header>
      {variant !== 'mini' && <p>{description}</p>}
      {featured && (
        <footer>
          <Text size="sm" variant="primary" className="mt-4 inline-flex items-center">
            <Link className="hover:underline" href={route}>
              Check it out here
            </Link>
            <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
          </Text>
        </footer>
      )}
    </div>
  );
}
