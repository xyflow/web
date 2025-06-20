import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

export type ErasableNodeType = Node<
  { toBeDeleted?: boolean; label?: string },
  'erasable-node'
>;

export function ErasableNode({
  data: { label, toBeDeleted },
}: NodeProps<ErasableNodeType>) {
  return (
    <div style={{ opacity: toBeDeleted ? 0.3 : 1 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 10 }}>{label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
