import { CSSProperties, ReactNode } from 'react';
import { cn } from '../../.';

type HeadlineNodeProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function HeadlineNode({ children, className, style }: HeadlineNodeProps) {
  return (
    <span
      className={cn(['relative shadow-lg py-2 rounded-xl bg-white', className])}
      style={style}
    >
      <span
        style={{
          backgroundImage:
            'linear-gradient(89deg, rgba(218,63,205,1) 0%, rgba(68,91,222,1) 16%, rgba(215,78,243,1) 88%, rgba(240,234,110,1) 100%)',
        }}
        className="px-8 text-transparent bg-clip-text"
      >
        {children}
      </span>
    </span>
  );
}

export { HeadlineNode, type HeadlineNodeProps };
