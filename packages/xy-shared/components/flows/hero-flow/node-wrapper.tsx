import type { ReactNode } from 'react';

type NodeWrapperProps = {
  label: string;
  children: ReactNode;
};

export default function NodeWrapper({ label, children }: NodeWrapperProps) {
  return (
    <div className="border-border bg-background/70 flex h-full flex-col rounded-2xl border border-solid shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
      <div className="border-border rounded-t-2xl border-b border-solid px-3 py-2 font-mono text-xs font-semibold">
        {label}
      </div>
      <div className="bg-background relative flex rounded-b-2xl p-3">{children}</div>
    </div>
  );
}
