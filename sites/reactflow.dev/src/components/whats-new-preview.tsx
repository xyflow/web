import { Text, cn } from '@xyflow/xy-ui';
import { AuthorList, TimeAgo } from 'xy-shared';
import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { MdxFile } from 'nextra';
import { WhatsNewItemFrontMatter } from 'xy-shared/server';

export type WhatsNewPreviewProps = {
  items: MdxFile<WhatsNewItemFrontMatter>[];
  variant?: 'full' | 'compact' | 'mini';
};

export default function WhatsNewPreview({
  items,
  variant = 'compact',
}: WhatsNewPreviewProps) {
  return (
    <ol className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl border border-gray-100 gap-x-8 p-8 w-full">
      {items.slice(0, 3).map((item, i) => (
        <li
          key={item.route}
          role="article"
          className={cn(
            i === 0 && 'row-span-2 h-full flex items-center',
            i === 1 && 'border-b border-gray-100',
            'p-4 py-8',
          )}
        >
          <WhatsNewItemPreview
            variant={variant}
            featured={i === 0}
            item={item}
          />
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
    frontMatter: { title, description, authors, date },
    route,
  },
}: WhatsNewItemPreviewProps) {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <Text size="sm" className="text-light">
          <TimeAgo datetime={date} />
        </Text>
        <h1 className={cn(featured ? 'text-2xl' : 'text-lg', 'font-semibold')}>
          <Link href={route}>{title}</Link>
        </h1>
        <AuthorList authors={authors} slim={variant !== 'full'} />
      </header>
      {variant !== 'mini' && <p>{description}</p>}
      {featured && (
        <footer>
          <Text
            size="sm"
            variant="primary"
            className="mt-4 inline-flex items-center"
          >
            <Link className="hover:underline" href={route}>
              Check it out here
            </Link>
            <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
          </Text>
        </footer>
      )}
    </div>
  );
}
