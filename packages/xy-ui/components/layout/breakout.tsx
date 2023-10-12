import { ReactNode } from 'react';
import { cn } from '../../.';

type LayoutBreakoutProps = {
  children: ReactNode;
  className?: string;
};

function LayoutBreakout({ children, className }: LayoutBreakoutProps) {
  return (
    <div
      className={cn(
        'relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] max-w-[100vw] w-[100vw] -mt-10 lg:-mt-14 2xl:-mt-18',
        className,
      )}
    >
      {children}
    </div>
  );
}

export { LayoutBreakout, type LayoutBreakoutProps };
