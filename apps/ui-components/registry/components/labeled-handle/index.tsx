import React, { type ComponentProps } from "react";
import { type HandleProps } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { BaseHandle } from "@/registry/components/base-handle";

const flexDirections = {
  top: "flex-col",
  right: "flex-row-reverse justify-end",
  bottom: "flex-col-reverse justify-end",
  left: "flex-row",
};

export function LabeledHandle({
  className,
  labelClassName,
  handleClassName,
  title,
  position,
  ...props
}: HandleProps &
  ComponentProps<"div"> & {
    title: string;
    handleClassName?: string;
    labelClassName?: string;
  }) {
  const { ref, ...handleProps } = props;

  return (
    <div
      title={title}
      className={cn(
        "relative flex items-center",
        flexDirections[position],
        className,
      )}
      ref={ref}
    >
      <BaseHandle
        position={position}
        className={handleClassName}
        {...handleProps}
      />
      <label className={cn("text-foreground px-3", labelClassName)}>
        {title}
      </label>
    </div>
  );
}
