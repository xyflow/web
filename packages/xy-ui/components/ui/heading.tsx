import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const headingSizes = cva('font-bold', {
  variants: {
    size: {
      default: 'text-6xl font-black',
      sm: 'text-3xl',
      md: 'text-5xl',
      lg: 'text-6xl font-black',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingSizes> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as: asProp = null, ...props }, ref) => {
    const Comp = asProp ? asProp : 'h1';

    return (
      <Comp
        className={cn(headingSizes({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

export { Heading, headingSizes };
