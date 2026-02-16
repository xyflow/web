import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { useCallback, useEffect } from 'react';

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '../base-node';
import { LabeledHandle } from '../labeled-handle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '../ui/button';

export type SumNode = Node<{
  value: number;
}>;

export function SumNode({ id }: NodeProps<SumNode>) {
  const { updateNodeData, getNodeConnections, setNodes, setEdges } = useReactFlow();
  const { x, y } = useStore((state) => ({
    x: getHandleValue(
      getNodeConnections({ nodeId: id, handleId: 'x', type: 'target' }),
      state.nodeLookup,
    ),
    y: getHandleValue(
      getNodeConnections({ nodeId: id, handleId: 'y', type: 'target' }),
      state.nodeLookup,
    ),
  }));

  const handleDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  useEffect(() => {
    updateNodeData(id, { value: x + y });
  }, [x, y]);

  return (
    <BaseNode className="w-32">
      <BaseNodeHeader className="border-b">
        <BaseNodeHeaderTitle>Sum</BaseNodeHeaderTitle>

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
            <DropdownMenuLabel className="font-bold">Node Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BaseNodeHeader>

      <BaseNodeContent className="px-0">
        <LabeledHandle title="x" id="x" type="target" position={Position.Left} />
        <LabeledHandle title="y" id="y" type="target" position={Position.Left} />
      </BaseNodeContent>
      <BaseNodeFooter className="bg-card items-end px-0 py-1 w-full rounded-b-md">
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </BaseNodeFooter>
    </BaseNode>
  );
}

function getHandleValue(
  connections: Array<{ source: string }>,
  lookup: Map<string, Node<any>>,
) {
  return connections.reduce((acc, { source }) => {
    const node = lookup.get(source)!;
    const value = node.data.value;

    return typeof value === 'number' ? acc + value : acc;
  }, 0);
}
