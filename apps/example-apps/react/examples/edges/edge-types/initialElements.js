const nodeWidth = 80;
const nodeGapWidth = nodeWidth * 2;
const nodeStyle = { width: nodeWidth, fontSize: 11, color: 'white' };

const sourceTargetPositions = [
  { source: 'bottom', target: 'top' },
  { source: 'right', target: 'left' },
];
const edgeTypes = ['default', 'step', 'smoothstep', 'straight'];
const offsets = [
  {
    x: 0,
    y: -nodeGapWidth,
  },
  {
    x: nodeGapWidth,
    y: -nodeGapWidth,
  },
  {
    x: nodeGapWidth,
    y: 0,
  },
  {
    x: nodeGapWidth,
    y: nodeGapWidth,
  },
  {
    x: 0,
    y: nodeGapWidth,
  },
  {
    x: -nodeGapWidth,
    y: nodeGapWidth,
  },
  {
    x: -nodeGapWidth,
    y: 0,
  },
  {
    x: -nodeGapWidth,
    y: -nodeGapWidth,
  },
];

let id = 0;
const getNodeId = () => `edgetypes-${(id++).toString()}`;

export function getNodesAndEdges() {
  const nodes = [];
  const edges = [];

  for (
    let sourceTargetIndex = 0;
    sourceTargetIndex < sourceTargetPositions.length;
    sourceTargetIndex++
  ) {
    const currSourceTargetPos = sourceTargetPositions[sourceTargetIndex];

    for (let edgeTypeIndex = 0; edgeTypeIndex < edgeTypes.length; edgeTypeIndex++) {
      const currEdgeType = edgeTypes[edgeTypeIndex];

      for (let offsetIndex = 0; offsetIndex < offsets.length; offsetIndex++) {
        const currOffset = offsets[offsetIndex];

        const sourcePosition = {
          x: offsetIndex * nodeWidth * 4,
          y: edgeTypeIndex * 300 + sourceTargetIndex * edgeTypes.length * 300,
        };
        const sourceId = getNodeId();
        const sourceData = { label: `Source ${sourceId}` };
        const sourceNode = {
          id: sourceId,
          data: sourceData,
          position: sourcePosition,
          sourcePosition: currSourceTargetPos.source,
          targetPosition: currSourceTargetPos.target,
        };

        const targetId = getNodeId();
        const targetData = { label: `Target ${targetId}` };
        const targetPosition = {
          x: sourcePosition.x + currOffset.x,
          y: sourcePosition.y + currOffset.y,
        };
        const targetNode = {
          id: targetId,
          data: targetData,
          position: targetPosition,
          sourcePosition: currSourceTargetPos.source,
          targetPosition: currSourceTargetPos.target,
        };

        nodes.push(sourceNode);
        nodes.push(targetNode);

        edges.push({
          id: `${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
          type: currEdgeType,
        });
      }
    }
  }

  return { nodes, edges };
}
