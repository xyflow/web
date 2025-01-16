"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HandleProps } from "@xyflow/react";

import { BaseHandle } from "@/registry/components/base-handle";

const flexDirections = {
  top: "flex-col",
  right: "flex-row-reverse justify-end",
  bottom: "flex-col-reverse justify-end",
  left: "flex-row",
};

const LabeledHandle = React.forwardRef<
  HTMLDivElement,
  HandleProps &
    React.HTMLAttributes<HTMLDivElement> & {
      title: string;
      handleClassName?: string;
      labelClassName?: string;
    }
>(
  (
    { className, labelClassName, handleClassName, title, position, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      title={title}
      className={cn(
        "relative flex items-center",
        flexDirections[position],
        className,
      )}
    >
      <BaseHandle position={position} className={handleClassName} {...props} />
      <label className={cn("px-3 text-foreground", labelClassName)}>
        {title}
      </label>
    </div>
  ),
);

LabeledHandle.displayName = "LabeledHandle";

export { LabeledHandle };
