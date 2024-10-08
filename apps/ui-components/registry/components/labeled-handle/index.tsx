"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { HandleProps } from "@xyflow/react";

import { BaseHandle } from "@/registry/components/base-handle";

function getFlexDirection(position: string) {
  let flexDirection =
    position === "top" || position === "bottom" ? "flex-col" : "flex-row";
  switch (position) {
    case "bottom":
    case "right":
      return flexDirection + "-reverse justify-end";
    default:
      return flexDirection;
  }
}

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
    {
      className,
      handleClassName,
      labelClassName,
      title,
      id,
      type,
      position,
      isConnectable,
      isConnectableStart,
      isConnectableEnd,
      onConnect,
      isValidConnection,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      title={title}
      className={cn(
        "relative flex items-center",
        getFlexDirection(position),
        className,
      )}
    >
      <BaseHandle
        id={id}
        type={type}
        position={position}
        isConnectable={isConnectable}
        isConnectableStart={isConnectableStart}
        isConnectableEnd={isConnectableEnd}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        className={handleClassName}
        {...props}
      />
      <label className={`px-3 text-foreground ${labelClassName}`}>
        {title}
      </label>
    </div>
  ),
);

LabeledHandle.displayName = "LabeledHandle";

export { LabeledHandle };
