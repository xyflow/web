import cn from 'clsx';
import Link from 'next/link';

export default function ContentGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'grid border-t border-solid border-gray-100 grid-cols-1 lg:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ContentGridItem({
  className,
  children,
  route,
}: {
  className?: string;
  route?: string;
  children: React.ReactNode;
}) {
  const isExternal = route?.includes('https://');
  const linkProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  const LinkOrDiv = (props) =>
    route && isExternal ? (
      <a href={route} {...props} {...linkProps} />
    ) : route ? (
      <Link href={route} {...props} />
    ) : (
      <div {...props} />
    );

  return (
    <LinkOrDiv
      className={cn(
        'odd:border-r border-b border-gray-100 border-solid px-8 py-10 lg:py-16',
        route && 'cursor-pointer hover:bg-gray-100/50',
        className
      )}
    >
      {children}
    </LinkOrDiv>
  );
}
