import { type ReactNode } from 'react';

type NodeWrapperProps = {
  label: string;
  children: ReactNode;
};

export default function NodeWrapper({ label, children }: NodeWrapperProps) {
  return (
    <div className="flex flex-col border border-solid border-gray-300 h-full rounded-md shadow-md">
      <div className="bg-white text-gray-700 uppercase text-xs px-2 py-1 border-bottom border-solid border-gray-300">
        {label}
      </div>
      <div className="relative bg-white p-2 flex">{children}</div>
    </div>
  );
}
