import { cn } from '../../../lib/utils';

export type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className }: PillProps) {
  return (
    <div
      className={cn(
        'rounded-full border border-blue-500 bg-blue-50 px-1.5 py-0.5 text-[15px] tracking-normal text-blue-700',
        className,
      )}
    >
      {children}
    </div>
  );
}
