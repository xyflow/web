import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { useEffect } from 'react';

import {
  BaseNode,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '../base-node';
import { LabeledHandle } from '../labeled-handle';

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
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>Sum</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeFooter className="bg-gray-100 items-end px-0 py-1 w-full rounded-b-md">
        <LabeledHandle title="x" id="x" type="target" position={Position.Left} />
        <LabeledHandle title="y" id="y" type="target" position={Position.Left} />
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
