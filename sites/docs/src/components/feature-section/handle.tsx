import { ReactNode } from 'react';
import { cn } from 'xy-ui';

const handleWidthClass = 'w-[18px]';
const handleHeightClass = 'h-[18px]';

export default function Handle({
  variant = 'react',
  className,
  children,
}: {
  variant?: 'react' | 'svelte' | 'xyflow';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'handle to absolute rounded-full border-2 border-solid md:left-1/2',
        variant === 'react' && 'border-react',
        variant === 'svelte' && 'border-svelte',
        variant === 'xyflow' && 'border-xyflow',
        handleWidthClass,
        handleHeightClass,
        className
      )}
    >
      {children}
    </div>
  );
}
