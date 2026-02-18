import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

import { Spinner } from './spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background shadow-md font-bold',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-gray-50 border border-solid border-border',
        ghost: 'hover:bg-accent hover:text-accent-foreground shadow-none',
        link: 'underline-offset-4 hover:underline text-primary shadow-none font-normal !px-0',
        pro: "relative isolate text-primary before:content-[''] before:absolute before:inset-0 before:rounded-full before:-z-[2] after:content-[''] after:absolute after:top-[1px] after:right-[1px] after:bottom-[1px] after:left-[1px] after:rounded-full after:-z-[1] after:bg-background dark:after:bg-white [--gradientAngle:258deg] hover:[--gradientAngle:45deg] transition-[--gradientAngle] duration-300 ease before:[background:linear-gradient(var(--gradientAngle),hsl(var(--primary))_36.34%,hsl(var(--secondary))_50.92%,rgba(240,240,240,1)_63.72%),linear-gradient(var(--gradientAngle),hsl(var(--primary))_2.22%,hsl(var(--secondary))_18.5%,rgba(240,240,240,1)_32.77%)] dark:before:[background:linear-gradient(var(--gradientAngle),hsl(var(--primary))_36.34%,hsl(0_0%_100%_/_0.95)_50.92%,hsl(0_0%_100%_/_0.25)_63.72%),linear-gradient(var(--gradientAngle),hsl(var(--primary))_2.22%,hsl(0_0%_100%_/_0.8)_18.5%,hsl(0_0%_100%_/_0.2)_32.77%)]",
        black: 'bg-black text-white hover:bg-black/90',
      },
      size: {
        default: 'py-2 h-9 px-6',
        sm: 'px-4 h-8 rounded-full',
        lg: 'px-6 h-10 text-md rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <Spinner size={size} /> : children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
