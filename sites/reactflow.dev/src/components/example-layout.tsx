import { FC, ReactNode } from 'react';

export const ExampleLayout: FC<{ children: ReactNode, title: string }> = ({ children, title }) => {
  return (
    <>
      <div className="mt-2 flex items-center space-x-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 leading-normal">
          {title}
        </h1>
      </div>
      {children}
    </>
  );
}
