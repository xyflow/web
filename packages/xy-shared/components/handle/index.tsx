import { type ReactNode } from 'react';
import { Position } from '@xyflow/react';
import { cn } from '../../lib/utils';

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
        'port absolute hidden',
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
          'bg-background border-primary absolute z-20 rounded-full border-2 border-solid',
          handleWidthClass,
          handleHeightClass,
          handleClassName,
        )}
      />
      {type === 'source' && (
        <svg className="pointer-events-none absolute overflow-visible">
          <path
            className={cn('stroke-primary fill-none stroke-2', svgClassName)}
            style={{ strokeDasharray: dashed ? '4 2' : 'none' }}
          />
        </svg>
      )}
    </div>
  );
}

export { Handle, type HandleProps };
