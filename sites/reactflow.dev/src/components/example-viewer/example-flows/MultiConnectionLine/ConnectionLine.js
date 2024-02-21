import { internalsSymbol, getSimpleBezierPath, useNodes } from '@xyflow/react';

export default ({ fromNode, toX, toY }) => {
  const handleBounds = useNodes().flatMap((node) => {
    if (node.id !== fromNode.id && !node.selected) return [];

    return node[internalsSymbol].handleBounds.source.map((bounds) => ({
      id: node.id,
      positionAbsolute: node.computed?.positionAbsolute,
      bounds,
    }));
  });

  return handleBounds.map(({ id, positionAbsolute, bounds }) => {
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
