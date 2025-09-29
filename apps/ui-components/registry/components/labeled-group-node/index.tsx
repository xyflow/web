import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Panel, type NodeProps, type PanelPosition } from "@xyflow/react";

import { BaseNode } from "@/registry/components/base-node";
import { cn } from "@/lib/utils";

/* GROUP NODE Label ------------------------------------------------------- */

export type GroupNodeLabelProps = HTMLAttributes<HTMLDivElement>;

export const GroupNodeLabel = forwardRef<HTMLDivElement, GroupNodeLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className="h-full w-full" {...props}>
        <div
          className={cn(
            "text-card-foreground w-fit bg-gray-200 p-2 text-xs",
            className,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

GroupNodeLabel.displayName = "GroupNodeLabel";

export type GroupNodeProps = Partial<NodeProps> & {
  label?: ReactNode;
  position?: PanelPosition;
};

/* GROUP NODE -------------------------------------------------------------- */

export const GroupNode = forwardRef<HTMLDivElement, GroupNodeProps>(
  ({ label, position, ...props }, ref) => {
    const getLabelClassName = (position?: PanelPosition) => {
      switch (position) {
        case "top-left":
          return "rounded-br-sm";
        case "top-center":
          return "rounded-b-sm";
        case "top-right":
          return "rounded-bl-sm";
        case "bottom-left":
          return "rounded-tr-sm";
        case "bottom-right":
          return "rounded-tl-sm";
        case "bottom-center":
          return "rounded-t-sm";
        default:
          return "rounded-br-sm";
      }
    };

    return (
      <BaseNode
        ref={ref}
        className="bg-opacity-50 h-full overflow-hidden rounded-sm bg-white"
        {...props}
      >
        <Panel className="m-0 p-0" position={position}>
          {label && (
            <GroupNodeLabel className={getLabelClassName(position)}>
              {label}
            </GroupNodeLabel>
          )}
        </Panel>
      </BaseNode>
    );
  },
);

GroupNode.displayName = "GroupNode";
