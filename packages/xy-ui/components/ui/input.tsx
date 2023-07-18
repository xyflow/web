import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const inputVariants = cva('border border-solid rounded-3xl', {
  variants: {
    variant: {
      default: 'border border-gray-300 rounded-full w-full',
      square: 'border border-gray-300 rounded-lg w-full',
    },
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

function Input({ variant = 'default', className, ...rest }: InputProps) {
  return (
    <input
      className={cn('px-4 py-2', inputVariants({ variant, className }))}
      {...rest}
    />
  );
}

export type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

function InputLabel({ className, ...rest }: InputLabelProps) {
  return (
    <label
      className={cn(
        'mb-1 block text-sm font-bold text-muted-foreground',
        className
      )}
      {...rest}
    />
  );
}

export { Input, InputLabel, inputVariants };
