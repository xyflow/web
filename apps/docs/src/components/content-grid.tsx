import cn from 'clsx';

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
        'grid border-t border-solid border-gray-100 grid-cols-2',
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
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'odd:border-r border-b border-gray-100 border-solid',
        className
      )}
    >
      {children}
    </div>
  );
}
