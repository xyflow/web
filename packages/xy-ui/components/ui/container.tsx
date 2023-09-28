import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const containerVariants = cva('border border-solid', {
  variants: {
    variant: {
      default: 'border-gray-100 bg-white',
      dark: 'border-gray-700 text-white bg-black',
    },
    size: {
      default: 'rounded-3xl',
      sm: 'rounded-xl',
    },
  },
});

const innerContainerVariants = cva('border border-solid', {
  variants: {
    variant: {
      default: 'border-gray-100 bg-white',
      dark: 'border-gray-700 text-white bg-gradient-to-br from-black from-15% via-[#311c33] via-65% to-[#1c1826]',
    },
    size: {
      default: 'rounded-[18px]',
      sm: 'rounded-[9px]',
    },
  },
});

export interface ContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof containerVariants> {
  innerClassName?: string;
}

function Container({
  variant = 'default',
  size = 'default',
  className,
  innerClassName,
  children,
}: ContainerProps) {
  return (
    <div className={cn('p-1', containerVariants({ variant, size, className }))}>
      <div
        className={cn(
          'shadow-md relative overflow-hidden h-full',
          innerContainerVariants({ variant, size, className: innerClassName })
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { Container, containerVariants };
