import { type ReactNode } from 'react';

import { cn } from '../../lib/utils';
import { type HeroIcon } from '../../types';

type ListWrapperProps = {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: HeroIcon;
  iconClassName?: string;
  subtitle?: string;
};

function ListWrapper({
  icon: Icon,
  iconClassName,
  title,
  subtitle,
  className,
  children,
}: ListWrapperProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <div className="max-w-3xl w-full">
        {Icon && (
          <div className="flex justify-center items-center mb-4">
            <Icon className={cn('w-8 h-8', iconClassName)} />
          </div>
        )}
        <div className="text-center text-4xl font-bold">{title}</div>
        {subtitle && (
          <div className="text-center text-light text-lg mt-2">{subtitle}</div>
        )}

        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}

export { ListWrapper, type ListWrapperProps };
