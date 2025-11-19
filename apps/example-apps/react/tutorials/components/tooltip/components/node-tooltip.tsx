'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ComponentProps,
} from 'react';
import { NodeToolbar, type NodeToolbarProps } from '@xyflow/react';

import { cn } from '../lib/utils';

/* TOOLTIP CONTEXT ---------------------------------------------------------- */

type TooltipContextType = {
  isVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

/* TOOLTIP NODE ------------------------------------------------------------- */

export function NodeTooltip({ children }: ComponentProps<'div'>) {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = useCallback(() => setIsVisible(true), []);
  const hideTooltip = useCallback(() => setIsVisible(false), []);

  return (
    <TooltipContext.Provider value={{ isVisible, showTooltip, hideTooltip }}>
      <div>{children}</div>
    </TooltipContext.Provider>
  );
}

/* TOOLTIP TRIGGER ---------------------------------------------------------- */

export function NodeTooltipTrigger(props: ComponentProps<'div'>) {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext) {
    throw new Error('NodeTooltipTrigger must be used within NodeTooltip');
  }
  const { showTooltip, hideTooltip } = tooltipContext;

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      props.onMouseEnter?.(e);
      showTooltip();
    },
    [props, showTooltip],
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      props.onMouseLeave?.(e);
      hideTooltip();
    },
    [props, hideTooltip],
  );

  return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...props} />;
}

/* TOOLTIP CONTENT ---------------------------------------------------------- */

// /**
//  * A component that displays the tooltip content based on visibility context.
//  */

export function NodeTooltipContent({
  children,
  position,
  className,
  ...props
}: NodeToolbarProps) {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext) {
    throw new Error('NodeTooltipContent must be used within NodeTooltip');
  }
  const { isVisible } = tooltipContext;

  return (
    <div>
      <NodeToolbar
        isVisible={isVisible}
        className={cn('bg-primary text-primary-foreground rounded-sm p-2', className)}
        tabIndex={1}
        position={position}
        {...props}
      >
        {children}
      </NodeToolbar>
    </div>
  );
}
