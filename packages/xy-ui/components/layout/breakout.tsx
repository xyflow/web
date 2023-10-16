import { ReactNode } from 'react';
import { cn } from '../../.';

type LayoutBreakoutProps = {
  children: ReactNode;
  className?: string;
};

const breakoutClassName =
  'relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] max-w-[100vw] w-[100vw]';

function LayoutBreakout({ children, className }: LayoutBreakoutProps) {
  return <div className={cn(breakoutClassName, className)}>{children}</div>;
}

export { LayoutBreakout, type LayoutBreakoutProps, breakoutClassName };
