import cn from 'clsx';

import authorData from './authors';
import Link from 'next/link';

function Author({
  name,
  title,
  image,
  url,
  className,
}: {
  name: string;
  title: string;
  image: string;
  url: string;
  className?: string;
}) {
  return (
    <div className={cn('flex', className)}>
      <Link href={url}>
        <img
          src={image}
          className="rounded-full mr-2 w-10 h-10 border border-solid border-gray-100"
        />
      </Link>

      <div>
        <Link href={url}>{name}</Link>
        <div className="text-sm text-light">{title}</div>
      </div>
    </div>
  );
}

export default function AuthorList({
  authors = [],
  className,
}: {
  authors: string[];
  className?: string;
}) {
  const authorsArray = Array.isArray(authors) ? authors : [authors];

  return (
    <div className={cn('flex', className)}>
      {authorsArray.map((author) => (
        <Author key={author} {...authorData[author]} className="mr-4" />
      ))}
    </div>
  );
}
