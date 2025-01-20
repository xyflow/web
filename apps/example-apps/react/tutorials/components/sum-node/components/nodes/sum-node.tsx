import React, { useEffect } from 'react';
import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
  useStore,
} from '@xyflow/react';

import { BaseNode } from '../base-node';
import { LabeledHandle } from '../labeled-handle';
import { NodeHeader, NodeHeaderTitle } from '../node-header';

export type SumNode = Node<{
  value: number;
}>;

export function SumNode({ id }: NodeProps<SumNode>) {
  const { updateNodeData, getHandleConnections } = useReactFlow();
  const { x, y } = useStore((state) => ({
    x: getHandleValue(
      getHandleConnections({ nodeId: id, id: 'x', type: 'target' }),
      state.nodeLookup,
    ),
    y: getHandleValue(
      getHandleConnections({ nodeId: id, id: 'y', type: 'target' }),
      state.nodeLookup,
    ),
  }));

  useEffect(() => {
    updateNodeData(id, { value: x + y });
  }, [x, y]);

  return (
    <BaseNode className="w-32">
      <NodeHeader>
        <NodeHeaderTitle>Sum</NodeHeaderTitle>
      </NodeHeader>

      <footer className="bg-gray-100 -m-5">
        <LabeledHandle
          title="x"
          id="x"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle
          title="y"
          id="y"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
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
