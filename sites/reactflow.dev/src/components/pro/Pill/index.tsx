import { cn } from '@xyflow/xy-ui';

export type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className }: PillProps) {
  return (
    <div
      className={cn(
        'bg-blue-50 text-blue-700 border-blue-500 border text-[15px] tracking-normal rounded-full px-1.5 py-0.5',
        className,
      )}
    >
      {children}
    </div>
  );
}
