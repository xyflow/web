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
          'hover:bg-card grid size-8 place-items-center rounded-lg p-1 ' + className
        }
        onClick={onClick}
        title={title}
      >
        {icon}
      </button>
    </TooltipSimple>
  );
}
