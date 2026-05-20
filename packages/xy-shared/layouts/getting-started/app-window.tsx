import { type ReactNode } from 'react';

type AppWindowProps = {
  children?: ReactNode;
};

function AppWindow({ children }: AppWindowProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-md border border-solid border-gray-700 bg-black/90">
      <div className="flex p-4">
        <div className="mr-2 h-3 w-3 rounded-full bg-red-400" />
        <div className="mr-2 h-3 w-3 rounded-full bg-yellow-400" />
        <div className="mr-2 h-3 w-3 rounded-full bg-green-400" />
      </div>
      <div className="px-4 py-2 pb-6 pl-8">{children}</div>
    </div>
  );
}

export { AppWindow, type AppWindowProps };
