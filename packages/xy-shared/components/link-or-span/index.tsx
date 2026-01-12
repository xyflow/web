import Link from 'next/link';
import { type ReactNode } from 'react';

export type LinkOrSpanProps = {
  href?: string;
  url?: string;
  route?: string;
  noLink?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<Element>;

export function LinkOrSpan({
  href,
  url,
  route,
  noLink = false,
  children,
  ...props
}: LinkOrSpanProps) {
  const linkUrl = href || url || route;

  if (noLink || !linkUrl) {
    return <span {...props}>{children}</span>;
  }

  const isExternal = linkUrl.includes('https://') || linkUrl.includes('http://');
  const linkProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  if (isExternal) {
    return (
      <a href={linkUrl} {...props} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={linkUrl} {...props}>
      {children}
    </Link>
  );
}
