import cn from 'clsx';
import Link from 'next/link';

import authorData from './authors';

export type Author = keyof typeof authorData;

export type AuthorData = {
  name: string;
  title: string;
  url: string;
  image: string;
};

export type AuthorListProps = {
  authors: Author[];
  className?: string;
  noLink?: boolean;
  slim?: boolean;
};

export function AuthorList({
  authors = [],
  className,
  noLink = false,
  slim = false,
}: AuthorListProps) {
  const authorsArray = Array.isArray(authors) ? authors : [authors];

  if (!authorsArray.length) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap', className)}>
      {authorsArray.map((author) => (
        <Author
          key={author}
          {...authorData[author]}
          noLink={noLink}
          slim={slim}
        />
      ))}
    </div>
  );
}

type AuthorProps = {
  name: string;
  title: string;
  image: string;
  url: string;
  className?: string;
  noLink?: boolean;
  slim?: boolean;
};

function Author({
  name,
  title,
  image,
  url,
  className,
  noLink,
  slim,
}: AuthorProps) {
  const LinkOrSpan = (props: React.HTMLAttributes<Element>) =>
    noLink ? <span {...props} /> : <Link href={url} {...props} />;

  return (
    <div className={cn('flex items-center mr-4 mb-4', className)}>
      {!slim && (
        <LinkOrSpan className="!w-10 !h-10 mr-2">
          <img
            src={image}
            className="inline w-10 h-10 border border-gray-100 border-solid rounded-full"
          />
        </LinkOrSpan>
      )}

      <div className={cn(slim && 'inline-flex items-end gap-2', 'text-sm')}>
        <LinkOrSpan>{name}</LinkOrSpan>
        {slim && <span className="user-select-none text-light"> – </span>}
        <div className="text-light">{title}</div>
      </div>
    </div>
  );
}
