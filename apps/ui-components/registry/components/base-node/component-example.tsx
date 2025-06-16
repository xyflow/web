import { memo } from "react";

import { Handle, NodeProps, Position } from "@xyflow/react";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/registry/components/base-node";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BaseNodeSimpleDemo = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected}>
      <BaseNodeContent>Base Node</BaseNodeContent>
    </BaseNode>
  );
});

export const BaseNodeFullDemo = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected} className="w-96">
      <BaseNodeHeader className="border-b">
        <Rocket className="size-4" />
        <BaseNodeHeaderTitle>Base Node With Header</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent>
        {/* TODO  HANDLES SHOULD GO IN THE CONTENT AREA, OR IN A BaseNodeHandles  COMPONENT ?
        <Handle type={"source"} position={Position.Left} /> */}
        <h2 className="text-xl font-bold">Base Node Content</h2>
        <p className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce enim
          lacus, dapibus eget tellus semper, interdum vehicula odio. Curabitur
          in elementum nibh. In accumsan ullamcorper orci et rhoncus.
        </p>
      </BaseNodeContent>
      <BaseNodeFooter>
        <h3 className="self-start text-lg font-bold">Base Node Footer</h3>
        <Button variant="outline" className="w-full">
          Action 1
        </Button>
      </BaseNodeFooter>
    </BaseNode>
  );
});
