import { NodeToolbar, NodeToolbarProps } from "@xyflow/react";
import React, { createContext, forwardRef, useContext } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

/* TOOLTIP CONTEXT ---------------------------------------------------------- */

const TooltipContext = createContext(false);

/* TOOLTIP NODE ------------------------------------------------------------- */

export function NodeTooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="node-tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}
NodeTooltipProvider.displayName = "NodeTooltipProvider";

export const NodeTooltip = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  React.ComponentProps<typeof TooltipPrimitive.Root>
>((props, ref) => {
  return (
    <NodeTooltipProvider>
      <TooltipPrimitive.Root data-slot="node-tooltip" ref={ref} {...props} />
    </NodeTooltipProvider>
  );
});
NodeTooltip.displayName = "NodeTooltip";

/* TOOLTIP TRIGGER ---------------------------------------------------------- */

export const NodeTooltipTrigger = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentProps<typeof TooltipPrimitive.Trigger>
>((props, ref) => {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      ref={ref}
      {...props}
    />
  );
});
NodeTooltipTrigger.displayName = "NodeTooltipTrigger";

/* TOOLTIP CONTENT ---------------------------------------------------------- */

// /**
//  * A component that displays the tooltip content based on visibility context.
//  */

export type NodeTooltipContentProps = NodeToolbarProps &
  React.ComponentProps<typeof TooltipPrimitive.Content>;

export const NodeTooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  NodeTooltipContentProps
>(({ sideOffset = 0, children, position, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      ref={ref}
      {...props}
    >
      <NodeToolbar
        className="rounded-sm bg-primary p-2 text-primary-foreground"
        tabIndex={1}
        position={position}
      >
        {children}
      </NodeToolbar>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
