import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import {
  TooltipNode,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/components/tooltip-node";

// You can use Tooltip Node only inside of custom nodes.
const Tooltip = memo(({ selected }: NodeProps) => {
  return (
    <TooltipNode selected={selected}>
      <TooltipContent position={Position.Top}>Hidden Content</TooltipContent>
      <TooltipTrigger>Hover</TooltipTrigger>
    </TooltipNode>
  );
});

export default Tooltip;
