'use client';

import { cn } from '@xyflow/xy-ui';
import { memo } from 'react';

type ProgressBarProps = {
  width: number;
  className?: string;
};

const ProgressBar = memo(({ width, className }: ProgressBarProps) => {
  return (
    <div
      style={{ width: `${width}%` }}
      className={cn(
        'absolute h-full rounded bg-gradient-to-r from-accent/40 to-accent/70',
        className,
      )}
    />
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
