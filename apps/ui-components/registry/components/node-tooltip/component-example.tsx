import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import {
  NodeTooltip,
  NodeTooltipContent,
  NodeTooltipTrigger,
} from "@/registry/components/node-tooltip";
import { BaseNode, BaseNodeContent } from "../base-node";

const NodeTooltipDemo = memo(() => {
  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top} className="text-center">
        You can display any content here, like text, images, or even components.{" "}
        <br />
        The tooltip will appear when you hover over the trigger.
      </NodeTooltipContent>
      <BaseNode className="w-64 text-center">
        <BaseNodeContent className="flex flex-col items-center">
          <NodeTooltipTrigger className="rounded border border-gray-300 p-2 text-lg font-bold">
            Hover me! ⭐️
          </NodeTooltipTrigger>
          <span>
            You can add more content that does not trigger the tooltip.
          </span>
        </BaseNodeContent>
      </BaseNode>
    </NodeTooltip>
  );
});

export default NodeTooltipDemo;
