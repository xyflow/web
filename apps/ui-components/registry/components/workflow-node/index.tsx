import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

import { Position } from "@xyflow/react";

import { BaseNode } from "@/registry/components/base-node";
import { BaseHandle } from "@/registry/components/base-handle";
import { ButtonHandle } from "@/registry/components/button-handle";
import { NodeStatusIndicator } from "@/registry/components/node-status-indicator";

/* HANDLES PROPS ------------------------------------------------------------ */

export type Handles =
  | "default"
  | "source"
  | "target"
  | "branch"
  | "join"
  | "none";

/* WORKFLOW NODE HANDLES ---------------------------------------------------- */

export const WorkflowNodeHandles = ({
  handles = "default",
}: {
  handles?: Handles;
}) => {
  return (
    <>
      {handles === "default" && (
        <>
          <BaseHandle position={Position.Top} type="target" />
          <ButtonHandle type="source" position={Position.Bottom} />
        </>
      )}
      {handles === "source" && (
        <ButtonHandle type="source" position={Position.Bottom} />
      )}
      {handles === "target" && (
        <BaseHandle position={Position.Top} type="target" />
      )}
      {handles === "join" && (
        <>
          <BaseHandle
            position={Position.Top}
            type="target"
            id="true"
            className="!left-4"
          />
          <BaseHandle
            position={Position.Top}
            type="target"
            id="false"
            className="!left-auto !right-4"
          />
          <ButtonHandle type="source" position={Position.Bottom} />
        </>
      )}
      {handles === "branch" && (
        <>
          <BaseHandle position={Position.Top} type="target" />
          <ButtonHandle
            type="source"
            position={Position.Bottom}
            id="true"
            className="!left-4"
          />
          <ButtonHandle
            type="source"
            position={Position.Bottom}
            id="false"
            className="!left-auto !right-4"
          />
        </>
      )}
    </>
  );
};

/* WORKFLOW NODE CONTENT -------------------------------------------------------------- */

export type WorkflowNodeContentProps = HTMLAttributes<HTMLElement>;

/**
 * A container for a consistent Node Content intended to be used inside the
 * `<WorkflowNode />` component.
 */
export const WorkflowNodeContent = forwardRef<
  HTMLDivElement,
  WorkflowNodeContentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "flex items-center justify-between gap-2 border-t px-3 py-2",
        className,
      )}
    />
  );
});

WorkflowNodeContent.displayName = "WorkflowNodeContent";

/* WORKFLOW NODE ------------------------------------------------------------ */

export const WorkflowNode = ({
  status,
  className,
  children,
}: {
  status?: "loading" | "success" | "error" | "initial";
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <NodeStatusIndicator status={status}>
      <BaseNode className={cn("p-0", className)}>{children}</BaseNode>
    </NodeStatusIndicator>
  );
};

/* EXPORTS ------------------------------------------------------------------ */

export default WorkflowNode;
