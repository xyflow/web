import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const containerVariants = cva('border border-solid rounded-3xl', {
  variants: {
    variant: {
      default: 'border-gray-100 bg-white',
      dark: 'border-gray-700 text-white bg-black',
    },
  },
});

const innerContainerVariants = cva('border border-solid rounded-3xl', {
  variants: {
    variant: {
      default: 'border-gray-100 bg-white',
      dark: 'border-gray-700 text-white bg-gradient-to-br from-black from-15% via-[#311c33] via-65% to-[#1c1826]',
    },
  },
});

export interface ContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof containerVariants> {}

function Container({
  variant = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <div className={cn('p-3', containerVariants({ variant, className }))}>
      <div className={cn('shadow-lg', innerContainerVariants({ variant }))}>
        {children}
      </div>
    </div>
  );
}

export { Container, containerVariants };
