import { cn } from '../../../lib/utils';

export default function SwoopyNode({
  data,
}: {
  data: { label: string; swoopyDir: 'top' | 'bottom' };
}) {
  return (
    <div className="text-light relative flex">
      <div
        className={cn(
          'text-2xl',
          data.swoopyDir === 'top' ? 'rotate-180 -scale-x-[1]' : 'none',
        )}
      >
        ⤹
      </div>
      <div
        className={cn(
          'absolute ml-6 w-[100px] text-sm leading-none',
          data.swoopyDir === 'top' ? 'bottom-0 -translate-y-[1px]' : '-translate-y-[2px]',
        )}
      >
        {data.label}
      </div>
    </div>
  );
}
