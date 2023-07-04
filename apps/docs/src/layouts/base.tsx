import { type ReactNode } from 'react';
import cn from 'clsx';

type BaseLayoutProps = {
  children: ReactNode;
  className?: string;
};

// used to center center the content on the page
export default function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <main
      className={cn(
        'pt-16 pb-24 mx-auto max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]',
        className
      )}
    >
      {children}
    </main>
  );
}
