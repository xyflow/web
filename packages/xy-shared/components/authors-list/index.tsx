import cn from 'clsx';

import { LinkOrSpan } from '../link-or-span';
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
        <Author key={author} {...authorData[author]} noLink={noLink} slim={slim} />
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

function Author({ name, title, image, url, className, noLink, slim }: AuthorProps) {
  return (
    <div className={cn('mb-4 mr-4 flex items-center', className)}>
      {!slim && (
        <LinkOrSpan noLink={noLink} url={url} className="mr-2 !h-10 !w-10">
          <img
            src={image}
            className="border-border inline h-10 w-10 rounded-full border border-solid"
          />
        </LinkOrSpan>
      )}

      <div className={cn(slim && 'inline-flex items-end gap-2', 'text-sm')}>
        <LinkOrSpan noLink={noLink} url={url}>
          {name}
        </LinkOrSpan>
        {slim && <span className="user-select-none text-light"> – </span>}
        <div className="text-light">{title}</div>
      </div>
    </div>
  );
}
