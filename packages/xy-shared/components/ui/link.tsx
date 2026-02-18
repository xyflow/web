import * as React from 'react';
import NextLink from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const linkVariants = cva('', {
  variants: {
    variant: {
      default: 'hover:underline',
      light: 'text-light hover:underline',
      primary: 'text-primary hover:underline',
    },
    size: {
      default: 'text-muted-foreground leading-relaxed',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg leading-tight',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface LinkProps
  extends React.ComponentProps<typeof NextLink>, VariantProps<typeof linkVariants> {
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, className, size, variant, ...props }, ref) => {
    return (
      <NextLink
        href={href}
        className={cn(linkVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Link.displayName = 'Link';

export { Link, linkVariants };
