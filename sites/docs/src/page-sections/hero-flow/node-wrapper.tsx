import { type ReactNode } from 'react';

type NodeWrapperProps = {
  label: string;
  children: ReactNode;
};

export default function NodeWrapper({ label, children }: NodeWrapperProps) {
  return (
    <div className="flex flex-col border border-solid border-gray-300 h-full rounded-md shadow-md">
      <div className="bg-gray-50 text-xs px-2 py-1 border-b border-solid border-gray-200 font-mono rounded-t-md">
        {label}
      </div>
      <div className="relative bg-white p-2 flex rounded-b-md">{children}</div>
    </div>
  );
}
