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
  id?: string;
};

function ListWrapper({
  icon: Icon,
  iconClassName,
  title,
  subtitle,
  className,
  children,
  id,
}: ListWrapperProps) {
  return (
    <div className={cn('flex justify-center', className)} id={id}>
      <div className="w-full max-w-3xl">
        {Icon && (
          <div className="mb-4 flex items-center justify-center">
            <Icon className={cn('h-8 w-8', iconClassName)} />
          </div>
        )}
        <div className="text-center text-4xl font-bold">{title}</div>
        {subtitle && (
          <div className="text-light mt-2 text-center text-lg">{subtitle}</div>
        )}

        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}

export { ListWrapper, type ListWrapperProps };
