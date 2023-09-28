import { cn } from 'xy-ui';

export default function SwoopyNode({ data }) {
  return (
    <div className="text-light flex relative">
      <div
        className={cn(
          'text-2xl',
          data.swoopyDir === 'top' ? 'rotate-180 -scale-x-[1]' : 'none'
        )}
      >
        ⤹
      </div>
      <div
        className={cn(
          'ml-6 text-sm absolute leading-none w-[100px]',
          data.swoopyDir === 'top'
            ? 'bottom-0 -translate-y-[1px]'
            : '-translate-y-[2px]'
        )}
      >
        {data.label}
      </div>
    </div>
  );
}
