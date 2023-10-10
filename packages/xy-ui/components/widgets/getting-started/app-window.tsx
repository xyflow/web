import { ReactNode } from 'react';

type AppWindowProps = {
  children?: ReactNode;
};

function AppWindow({ children }: AppWindowProps) {
  return (
    <div className="border border-solid border-gray-600 rounded-md max-w-3xl mx-auto bg-black">
      <div className="flex p-4">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

export { AppWindow, type AppWindowProps };
