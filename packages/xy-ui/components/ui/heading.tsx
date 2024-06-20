import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const headingSizes = cva('font-bold leading-snug tracking-[-0.02rem]', {
  variants: {
    size: {
      default: 'text-5xl lg:text-6xl font-black leading',
      xs: 'text-lg lg:text-xl',
      sm: 'text-2xl lg:text-3xl',
      md: 'text-4xl lg:text-5xl',
      lg: 'text-5xl lg:text-6xl font-black',
      xl: 'text-6xl md:text-8xl/normal lg:text-9xl/normal font-black',
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
  },
);
Heading.displayName = 'Heading';

export { Heading, headingSizes };
