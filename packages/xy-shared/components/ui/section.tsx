import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

type SectionProps = React.HTMLAttributes<HTMLDivElement>;

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('my-16 lg:my-24', className)} {...props} />
  ),
);

Section.displayName = 'Section';

export { Section, type SectionProps };
