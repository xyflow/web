import { type ReactNode } from 'react';
import { Position } from '@xyflow/system';

import { cn } from 'xy-ui';

export default function Handle({
  id,
  variant = 'react',
  className,
  handleClassName,
  svgClassName,
  children,
  position = Position.Bottom,
  handleWidthClass = 'w-[18px]',
  handleHeightClass = 'h-[18px]',
  type = 'source',
  dashed = true,
  to,
}: {
  id: string;
  variant?: 'react' | 'svelte' | 'xyflow';
  className?: string;
  handleClassName?: string;
  svgClassName?: string;
  children?: ReactNode;
  position?: Position;
  handleWidthClass?: string;
  handleHeightClass?: string;
  dashed?: boolean;
  type?: 'source' | 'target';
  to?: string;
}) {
  return (
    <div
      data-portid={id}
      data-position={position}
      data-to={to}
      className={cn(
        'port absolute',
        handleWidthClass,
        handleHeightClass,
        className,
        type
      )}
    >
      {children}
      <div
        data-portid={id}
        data-position={position}
        data-to={to}
        className={cn(
          'absolute rounded-full border-2 border-solid bg-white z-20',
          variant === 'react' && 'border-react',
          variant === 'svelte' && 'border-svelte',
          variant === 'xyflow' && 'border-[#D74EF3]',
          handleWidthClass,
          handleHeightClass,
          handleClassName
        )}
      />
      {type === 'source' && (
        <svg className="absolute pointer-events-none overflow-visible">
          <path
            className={cn(
              'fill-none stroke-2',
              variant === 'react' && 'stroke-react',
              variant === 'svelte' && 'stroke-svelte',
              variant === 'xyflow' && 'stroke-[#D74EF3]',
              svgClassName
            )}
            style={{ strokeDasharray: dashed ? '4 2' : 'none' }}
          />
        </svg>
      )}
    </div>
  );
}
