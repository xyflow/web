import {
  BaseEdge,
  type EdgeProps,
  type Edge,
  getSmoothStepPath,
  useInternalNode,
} from '@xyflow/react';
import { ErasableNodeType } from './ErasableNode';

export type ErasableEdgeType = Edge<{ toBeDeleted?: boolean }, 'erasable-edge'>;

export function ErasableEdge({
  id,
  source,
  sourceX,
  sourceY,
  target,
  targetX,
  targetY,
  data,
}: EdgeProps<ErasableEdgeType>) {
  const [edgePath] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY });

  const sourceNode = useInternalNode<ErasableNodeType>(source);
  const targetNode = useInternalNode<ErasableNodeType>(target);

  const toBeDeleted =
    data?.toBeDeleted || sourceNode?.data.toBeDeleted || targetNode?.data.toBeDeleted;

  return <BaseEdge id={id} path={edgePath} style={{ opacity: toBeDeleted ? 0.3 : 1 }} />;
}
