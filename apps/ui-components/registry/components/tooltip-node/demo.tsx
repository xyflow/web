import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import {
  TooltipNode,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/components/tooltip-node";

const TooltipNodeDemo = memo(({ selected }: NodeProps) => {
  return (
    <TooltipNode selected={selected}>
      <TooltipContent position={Position.Top}>Hidden Content</TooltipContent>
      <TooltipTrigger>Hover</TooltipTrigger>
    </TooltipNode>
  );
});

export default TooltipNodeDemo;
