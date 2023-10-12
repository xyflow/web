import authorData from './authors';
import cn from 'clsx';
import Link from 'next/link';

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
};

export function AuthorList({
  authors = [],
  className,
  noLink = false,
}: AuthorListProps) {
  const authorsArray = Array.isArray(authors) ? authors : [authors];

  return (
    <div className={cn('flex', className)}>
      {authorsArray.map((author) => (
        <Author
          key={author}
          {...authorData[author]}
          className="mr-4"
          noLink={noLink}
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
};

function Author({ name, title, image, url, className, noLink }: AuthorProps) {
  const LinkOrSpan = (props: React.HTMLAttributes<Element>) =>
    noLink ? <span {...props} /> : <Link href={url} {...props} />;

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <LinkOrSpan className="!w-10 !h-10">
        <img
          src={image}
          className="inline w-10 h-10 mr-2 border border-gray-100 border-solid rounded-full"
        />
      </LinkOrSpan>

      <div>
        <LinkOrSpan>{name}</LinkOrSpan>
        <div className="text-sm text-light">{title}</div>
      </div>
    </div>
  );
}
