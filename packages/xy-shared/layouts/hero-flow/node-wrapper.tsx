import type { ReactNode } from 'react';

type NodeWrapperProps = {
  label: string;
  children: ReactNode;
};

export default function NodeWrapper({ label, children }: NodeWrapperProps) {
  return (
    <div className="flex flex-col border border-solid border-gray-200 h-full rounded-2xl bg-white/70 shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
      <div className="text-xs px-3 py-2 border-b border-solid border-gray-200 font-mono font-semibold rounded-t-2xl">
        {label}
      </div>
      <div className="relative bg-white p-3 flex rounded-b-2xl">{children}</div>
    </div>
  );
}
