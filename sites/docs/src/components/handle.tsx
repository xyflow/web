import { type ReactNode } from 'react';
import { Position } from '@xyflow/system';

import { cn } from 'xy-ui';

const handleWidthClass = 'w-[18px]';
const handleHeightClass = 'h-[18px]';

export default function Handle({
  id,
  variant = 'react',
  className,
  children,
  position = Position.Bottom,
  type = 'source',
  to,
}: {
  id: string;
  variant?: 'react' | 'svelte' | 'xyflow';
  className?: string;
  children?: ReactNode;
  position?: Position;
  type?: 'source' | 'target';
  to?: string;
}) {
  return (
    <div
      data-handleid={id}
      data-position={position}
      data-to={to}
      className={cn(
        'handle absolute',
        handleWidthClass,
        handleHeightClass,
        className,
        type
      )}
    >
      {children}
      <div
        data-handleid={id}
        data-position={position}
        data-to={to}
        className={cn(
          'absolute rounded-full border-2 border-solid bg-white z-20',
          variant === 'react' && 'border-react',
          variant === 'svelte' && 'border-svelte',
          variant === 'xyflow' && 'border-xyflow',
          handleWidthClass,
          handleHeightClass
        )}
      />
      {type === 'source' && (
        <svg className="absolute pointer-events-none overflow-visible -z-10">
          <path
            className={cn(
              'fill-none stroke-2',
              variant === 'react' && 'stroke-react',
              variant === 'svelte' && 'stroke-svelte',
              variant === 'xyflow' && 'stroke-xyflow'
            )}
            style={{ strokeDasharray: 5 }}
          />
        </svg>
      )}
    </div>
  );
}
