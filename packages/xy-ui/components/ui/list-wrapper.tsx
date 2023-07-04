import { IconType } from 'react-icons';

import { cn } from '../../lib/utils';

type ListWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: IconType;
  iconClassName?: string;
  description?: string;
};

function ListWrapper({
  icon: Icon,
  iconClassName,
  title,
  description,
  className,
  children,
}: ListWrapperProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <div className="max-w-3xl w-full">
        {Icon && (
          <div className="flex justify-center items-center mb-2">
            <Icon className={cn('w-6 h-6', iconClassName)} />
          </div>
        )}
        <div className="text-center text-3xl font-bold">{title}</div>
        {description && (
          <div className="text-center text-light text-lg mt-2">
            {description}
          </div>
        )}

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export { ListWrapper, type ListWrapperProps };
