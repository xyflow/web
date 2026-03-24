import { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type HeadlineNodeProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const gradients = {
  react:
    'linear-gradient(89deg, rgba(218,63,205,1) 0%, rgba(68,91,222,1) 16%, rgba(215,78,243,1) 88%, rgba(240,234,110,1) 100%)',
  svelte:
    'linear-gradient(89deg, rgba(255,100,0,1) 0%, rgba(255,154,0,1) 16%, rgba(208,125,33,0.8) 88%, rgba(255,234,110,1) 100%)',
};

const linearGradient =
  gradients[process.env.NEXT_PUBLIC_FRAMEWORK as keyof typeof gradients] ||
  gradients.react;

function HeadlineNode({ children, className, style }: HeadlineNodeProps) {
  return (
    <span
      className={cn(['relative shadow-lg py-2 rounded-xl bg-background', className])}
      style={style}
    >
      <span
        style={{
          backgroundImage: linearGradient,
        }}
        className="px-2 md:px-4 lg:px-7 text-transparent bg-clip-text"
      >
        {children}
      </span>
    </span>
  );
}

export { HeadlineNode, type HeadlineNodeProps };
