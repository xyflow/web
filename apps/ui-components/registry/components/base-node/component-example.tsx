import { memo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/registry/components/base-node";
import { NodeProps, useNodeId, useReactFlow } from "@xyflow/react";
import { EllipsisVertical, Rocket, Trash } from "lucide-react";

export const BaseNodeSimpleDemo = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected}>
      <BaseNodeContent>Base Node</BaseNodeContent>
    </BaseNode>
  );
});

export const BaseNodeFullDemo = memo(({ selected }: NodeProps) => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleClick = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  return (
    <BaseNode selected={selected} className="w-96">
      <BaseNodeHeader className="border-b">
        <Rocket className="size-4" />
        <BaseNodeHeaderTitle>Base Node With Header</BaseNodeHeaderTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="nodrag p-1"
              aria-label="Node Actions"
              title="Node Actions"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Node Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Action 1</DropdownMenuItem>
            <DropdownMenuItem>Action 2</DropdownMenuItem>
            <DropdownMenuItem>Action 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          className="nodrag p-1"
          onClick={handleClick}
          aria-label="Delete Node"
          title="Delete Node"
        >
          <Trash className="size-4" />
        </Button>
      </BaseNodeHeader>
      <BaseNodeContent>
        <h3 className="text-lg font-bold">Base Node Content</h3>
        <p className="text-xs">
          You would typically put your node's content here, such as
          configuration options, input and output handles.
        </p>
      </BaseNodeContent>
      <BaseNodeFooter>
        <h4 className="text-md self-start font-bold">Base Node Footer</h4>
        <p className="text-xs">
          You may want to add some actions or information in the footer.
        </p>
        <Button variant="outline" className="w-full">
          Action 1
        </Button>
      </BaseNodeFooter>
    </BaseNode>
  );
});
