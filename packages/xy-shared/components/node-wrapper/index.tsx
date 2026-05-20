import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type NodeWrapperProps = {
  children?: ReactNode;
  title?: ReactNode;
  className?: string;
};

// helper for building flows for the website
function NodeWrapper({ children, title, className }: NodeWrapperProps) {
  return (
    <>
      <div className={cn('node-wrapper', className)}>
        {title && (
          <div className="border-b border-gray-700 px-4 py-2 font-mono text-xs text-gray-200">
            {title}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}

export { NodeWrapper, type NodeWrapperProps };
