import { type ReactNode } from 'react';
import { Position } from '@xyflow/system';

import { cn } from '../../.';

type HandleProps = {
  id: string;
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
};

function Handle({
  id,
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
}: HandleProps) {
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
        type,
      )}
    >
      {children}
      <div
        data-portid={id}
        data-position={position}
        data-to={to}
        className={cn(
          'absolute rounded-full border-2 border-solid bg-white z-20 border-primary',
          handleWidthClass,
          handleHeightClass,
          handleClassName,
        )}
      />
      {type === 'source' && (
        <svg className="absolute pointer-events-none overflow-visible">
          <path
            className={cn('fill-none stroke-2 stroke-primary', svgClassName)}
            style={{ strokeDasharray: dashed ? '4 2' : 'none' }}
          />
        </svg>
      )}
    </div>
  );
}

export { Handle, type HandleProps };
