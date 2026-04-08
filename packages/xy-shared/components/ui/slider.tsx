'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib/utils';

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  rangeClassName?: string;
  thumbClassName?: string;
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, rangeClassName, thumbClassName, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[5px] w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range
        className={cn('bg-primary absolute h-full', rangeClassName)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        'bg-primary ring-offset-background focus-visible:ring-ring block h-4 w-4 cursor-grab rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        thumbClassName,
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
