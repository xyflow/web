import { getSimpleBezierPath, useNodes, useReactFlow } from '@xyflow/react';

export default ({ toX, toY }) => {
  const { getInternalNode } = useReactFlow();
  const nodes = useNodes();
  const selectedNodes = nodes.filter((node) => node.selected);

  console.log(selectedNodes)

  const handleBounds = selectedNodes.flatMap((userNode) => {
    const node = getInternalNode(userNode.id);

     // we only want to draw a connection line from a source handle
    if (!node.internals.handleBounds.source) {
      return [];
    }
     
    return node.internals.handleBounds.source?.map((bounds) => ({
      id: node.id,
      positionAbsolute: node.internals.positionAbsolute,
      bounds,
    }));
  })

  return handleBounds.map(({ id, positionAbsolute, bounds }) => {
    console.log(id, positionAbsolute, bounds)
    const fromHandleX = bounds.x + bounds.width / 2;
    const fromHandleY = bounds.y + bounds.height / 2;
    const fromX = positionAbsolute.x + fromHandleX;
    const fromY = positionAbsolute.y + fromHandleY;
    const [d] = getSimpleBezierPath({
      sourceX: fromX,
      sourceY: fromY,
      targetX: toX,
      targetY: toY,
    });

    return (
      <g key={`${id}-${bounds.id}`}>
        <path fill="none" strokeWidth={1.5} stroke="black" d={d} />
        <circle
          cx={toX}
          cy={toY}
          fill="#fff"
          r={3}
          stroke="black"
          strokeWidth={1.5}
        />
      </g>
    );
  });
};
