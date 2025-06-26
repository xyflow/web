import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  forwardRef,
  HTMLAttributes,
} from "react";
import { NodeToolbar, NodeProps, NodeToolbarProps } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

/* TOOLTIP CONTEXT ---------------------------------------------------------- */

const TooltipContext = createContext(false);

/* TOOLTIP NODE ------------------------------------------------------------- */

export type TooltipNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
};

/**
 * A component that wraps a node and provides tooltip visibility context.
 */
export const TooltipNode = forwardRef<HTMLDivElement, TooltipNodeProps>(
  ({ children }, ref) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const showTooltip = useCallback(() => setTooltipVisible(true), []);
    const hideTooltip = useCallback(() => setTooltipVisible(false), []);

    return (
      <TooltipContext.Provider value={isTooltipVisible}>
        <BaseNode
          ref={ref}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onFocus={showTooltip}
          onBlur={hideTooltip}
          tabIndex={0}
        >
          {children}
        </BaseNode>
      </TooltipContext.Provider>
    );
  },
);

TooltipNode.displayName = "TooltipNode";

/* TOOLTIP CONTENT ---------------------------------------------------------- */

export type TooltipContentProps = NodeToolbarProps;

/**
 * A component that displays the tooltip content based on visibility context.
 */
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ position, children }, ref) => {
    const isTooltipVisible = useContext(TooltipContext);

    return (
      <div ref={ref}>
        <NodeToolbar
          isVisible={isTooltipVisible}
          className="rounded-sm bg-primary p-2 text-primary-foreground"
          tabIndex={1}
          position={position}
        >
          {children}
        </NodeToolbar>
      </div>
    );
  },
);

TooltipContent.displayName = "TooltipContent";

/* TOOLTIP TRIGGER ---------------------------------------------------------- */

/**
 * A component that triggers the tooltip visibility.
 */
export const TooltipTrigger = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

TooltipTrigger.displayName = "TooltipTrigger";
