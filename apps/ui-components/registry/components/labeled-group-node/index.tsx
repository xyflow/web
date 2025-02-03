import React, { forwardRef } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";
import { cn } from "@/lib/utils";

/* GROUP NODE Label ------------------------------------------------------- */

interface GroupNodeLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GroupNodeLabel = forwardRef<HTMLDivElement, GroupNodeLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("h-full w-full", className)} {...props}>
        <div className="w-fit rounded-br-sm bg-gray-200 bg-secondary p-2 text-xs text-card-foreground">
          {children}
        </div>
      </div>
    );
  },
);

GroupNodeLabel.displayName = "GroupNodeLabel";

/* GROUP NODE TYPES --------------------------------------------------------- */

export interface GroupNodeProps extends Partial<NodeProps> {
  children?: React.ReactNode;
}

/* GROUP NODE -------------------------------------------------------------- */

export const GroupNode = forwardRef<HTMLDivElement, GroupNodeProps>(
  ({ selected, children, ...props }, ref) => {
    return (
      <BaseNode
        ref={ref}
        selected={selected}
        className="h-full overflow-hidden rounded-sm bg-white bg-opacity-50 p-0"
        {...props}
      >
        {children}
      </BaseNode>
    );
  },
);

GroupNode.displayName = "GroupNode";
