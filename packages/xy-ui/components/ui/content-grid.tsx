import cn from 'clsx';
import Link from 'next/link';

export type ContentGridProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * A content grid lays out its children in a 2-column grid. On smaller displays,
 * the content is stacked vertically instead.
 *
 */
export function ContentGrid({ className, children }: ContentGridProps) {
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

export type ContentGridItemProps = {
  className?: string;
  route?: string;
  children: React.ReactNode;
};

/**
 * A content grid item adds some consistent styling for elements in a content
 * grid. It optionally receives a `route` prop that turns the container into
 * a link: useful for blog post previews, for example.
 *
 */
export function ContentGridItem({
  className,
  route,
  children,
}: ContentGridItemProps) {
  const isExternal = route?.includes('https://');
  const linkProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  const LinkOrDiv = (props: React.HTMLAttributes<Element>) =>
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
