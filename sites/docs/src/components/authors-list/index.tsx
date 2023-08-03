import cn from "clsx";

import authorData from "./authors";
import Link from "next/link";

function Author({
  name,
  title,
  image,
  url,
  className,
  noLink,
}: {
  name: string;
  title: string;
  image: string;
  url: string;
  className?: string;
  noLink?: boolean;
}) {
  const LinkOrSpan = (props) =>
    noLink ? <span {...props} /> : <Link href={url} {...props} />;

  return (
    <div className={cn("flex", className)}>
      <LinkOrSpan>
        <img
          src={image}
          className="w-10 h-10 mr-2 border border-gray-100 border-solid rounded-full"
        />
      </LinkOrSpan>

      <div>
        <LinkOrSpan>{name}</LinkOrSpan>
        <div className="text-sm text-light">{title}</div>
      </div>
    </div>
  );
}

export default function AuthorList({
  authors = [],
  className,
  noLink = false,
}: {
  authors: string[];
  className?: string;
  noLink?: boolean;
}) {
  const authorsArray = Array.isArray(authors) ? authors : [authors];

  return (
    <div className={cn("flex", className)}>
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
