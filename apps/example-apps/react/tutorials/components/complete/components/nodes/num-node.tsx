import React, { useCallback } from 'react';
import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from '@xyflow/react';

import { BaseNode } from '../base-node';
import { LabeledHandle } from '../labeled-handle';
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderMenuAction,
} from '../node-header';
import { Button } from '../ui/button';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export type NumNode = Node<{
  value: number;
}>;

export function NumNode({ id, data }: NodeProps<NumNode>) {
  const { updateNodeData, setNodes } = useReactFlow();

  const handleReset = useCallback(() => {
    updateNodeData(id, { value: 0 });
  }, [id, updateNodeData]);

  const handleDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  const handleIncr = useCallback(() => {
    updateNodeData(id, { value: data.value + 1 });
  }, [id, data.value, updateNodeData]);

  const handleDecr = useCallback(() => {
    updateNodeData(id, { value: data.value - 1 });
  }, [id, data.value, updateNodeData]);

  return (
    <BaseNode>
      <NodeHeader>
        <NodeHeaderTitle>Num</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Expand account options">
            <DropdownMenuItem onSelect={handleReset}>Reset</DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
          </NodeHeaderMenuAction>
        </NodeHeaderActions>
      </NodeHeader>

      <div className="flex gap-2 items-center mb-10">
        <Button onClick={handleDecr}>-</Button>
        <pre>{String(data.value).padStart(3, ' ')}</pre>
        <Button onClick={handleIncr}>+</Button>
      </div>

      <footer className="bg-gray-100 -m-5">
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
}
