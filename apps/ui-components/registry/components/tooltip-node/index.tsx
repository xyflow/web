import React, { createContext, useContext, useState } from "react";
import { NodeToolbar, NodeProps, NodeToolbarProps } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

/* TOOLTIP CONTEXT ---------------------------------------------------------- */

const TooltipContext = createContext(false);

/* TOOLTIP NODE ------------------------------------------------------------- */

export interface TooltipNodeProps extends Partial<NodeProps> {
  children?: React.ReactNode;
}

/**
 * A component that wraps a node and provides tooltip visibility context.
 */
export const TooltipNode = React.forwardRef<HTMLDivElement, TooltipNodeProps>(
  ({ selected, children }, ref) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleFocus = () => setTooltipVisible(true);
    const handleBlur = () => setTooltipVisible(false);

    return (
      <TooltipContext.Provider value={isTooltipVisible}>
        <BaseNode
          ref={ref}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          selected={selected}
        >
          {children}
        </BaseNode>
      </TooltipContext.Provider>
    );
  },
);

TooltipNode.displayName = "TooltipNode";

/* TOOLTIP CONTENT ---------------------------------------------------------- */

export interface TooltipContentProps extends NodeToolbarProps {}

/**
 * A component that displays the tooltip content based on visibility context.
 */
export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ position, children }, ref) => {
  const isTooltipVisible = useContext(TooltipContext);

  return (
    <NodeToolbar
      ref={ref}
      isVisible={isTooltipVisible}
      className="rounded-sm bg-primary p-2 text-primary-foreground"
      tabIndex={1}
      position={position}
    >
      {children}
    </NodeToolbar>
  );
});

TooltipContent.displayName = "TooltipContent";

/* TOOLTIP TRIGGER ---------------------------------------------------------- */

export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * A component that triggers the tooltip visibility.
 */
export const TooltipTrigger = React.forwardRef<
  HTMLParagraphElement,
  TooltipTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

TooltipTrigger.displayName = "TooltipTrigger";
