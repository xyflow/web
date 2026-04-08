import { type ReactNode } from 'react';
import cn from 'clsx';

export type BaseLayoutProps = {
  className?: string;
  children: ReactNode;
};

// used to center the content on the page
export function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <main
      className={cn(
        '2xl:pt-18 x:max-w-(--nextra-content-width) mx-auto pb-24 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] pt-10 lg:pt-14',
        className,
      )}
    >
      {children}
    </main>
  );
}
