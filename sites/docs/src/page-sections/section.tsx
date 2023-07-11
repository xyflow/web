import { type ReactNode } from 'react';
import { cn } from 'xy-ui';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function Section({ children, className }: SectionProps) {
  return (
    <div className={cn('px-2 lg:px-4 mt-16 lg:mt-24', className)}>
      {children}
    </div>
  );
}
