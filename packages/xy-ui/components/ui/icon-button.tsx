import { ReactNode } from 'react';
import { TooltipSimple } from './tooltip-simple';

export function IconButton({
  title,
  className,
  onClick,
  icon,
}: {
  title: string;
  className?: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <TooltipSimple label={title}>
      <button
        className={
          'p-1 size-8 grid place-items-center rounded-lg hover:bg-gray-100 ' + className
        }
        onClick={onClick}
        title={title}
      >
        {icon}
      </button>
    </TooltipSimple>
  );
}
