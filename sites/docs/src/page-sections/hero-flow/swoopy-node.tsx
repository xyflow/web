import { cn } from 'xy-ui';

export default function SwoopyNode({ data }) {
  return (
    <div
      className={cn(
        'text-gray-600 flex',
        data.swoopyDir === 'top' ? 'flex-end' : 'flex-start'
      )}
    >
      <div
        className={cn(
          'text-bold text-2xl',
          data.swoopyDir === 'top' ? 'rotate(180deg) scale(-1, 1)' : 'none'
        )}
      >
        ⤹
      </div>
      <div className="ml-1">{data.label}</div>
    </div>
  );
}
