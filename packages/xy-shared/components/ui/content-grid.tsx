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
        className,
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

const LinkOrDiv = ({ route, ...props }: ContentGridItemProps) => {
  const isExternal = route?.includes('https://');
  const linkProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  if (route && isExternal) {
    return <a href={route} {...props} {...linkProps} />;
  }
  if (route) {
    return <Link href={route} {...props} />;
  }
  return <div {...props} />;
};

/**
 * A content grid item adds some consistent styling for elements in a content
 * grid. It optionally receives a `route` prop that turns the container into
 * a link: useful for blog post previews, for example.
 *
 */
export function ContentGridItem({ className, route, children }: ContentGridItemProps) {
  return (
    <LinkOrDiv
      className={cn(
        'lg:odd:border-r border-b border-gray-100 hover:bg-muted px-8 py-10 lg:py-16 z-10',
        route && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </LinkOrDiv>
  );
}
