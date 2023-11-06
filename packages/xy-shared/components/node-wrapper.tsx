import { ReactNode } from 'react';

type NodeWrapperProps = {
  children?: ReactNode;
  title?: ReactNode;
};

// helper for building flows for the website
function NodeWrapper({ children, title }: NodeWrapperProps) {
  return (
    <>
      <div className="node-wrapper">
        {title && <div className="node-wrapper__title">{title}</div>}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}

export { NodeWrapper, type NodeWrapperProps };
