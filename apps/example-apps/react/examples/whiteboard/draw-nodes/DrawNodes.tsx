import { useReactFlow, type XYPosition } from '@xyflow/react';
import { useState, type PointerEvent } from 'react';

function getPosition(start: XYPosition, end: XYPosition) {
  return {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
  };
}

function getDimensions(start: XYPosition, end: XYPosition, zoom: number = 1) {
  return {
    width: Math.abs(end.x - start.x) / zoom,
    height: Math.abs(end.y - start.y) / zoom,
  };
}

const colors = [
  '#D14D41',
  '#DA702C',
  '#D0A215',
  '#879A39',
  '#3AA99F',
  '#4385BE',
  '#8B7EC8',
  '#CE5D97',
];

function getRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

const drawBoxStyles = {
  pointerEvents: 'auto',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 4,
  height: '100%',
  width: '100%',
  transformOrigin: 'top left',
  cursor: 'copy',
  touchAction: 'none',
} as const;

const previewBoxStyles = {
  position: 'absolute',
  zIndex: 10,
} as const;

export function DrawNodes() {
  const { screenToFlowPosition, getViewport, setNodes } = useReactFlow();

  const [start, setStart] = useState<XYPosition | null>(null);
  const [end, setEnd] = useState<XYPosition | null>(null);

  function handlePointerDown(e: PointerEvent) {
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    setStart({ x: e.pageX, y: e.pageY });
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;
    setEnd({ x: e.pageX, y: e.pageY });
  }

  function handlePointerUp() {
    if (!start || !end) return;
    const position = screenToFlowPosition(getPosition(start, end));
    const dimension = getDimensions(start, end, getViewport().zoom);

    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'box',
        position,
        ...dimension,
        data: {
          color: getRandomColor(),
        },
      },
    ]);

    setStart(null);
    setEnd(null);
  }

  const rect =
    start && end
      ? {
          position: getPosition(start, end),
          dimension: getDimensions(start, end),
        }
      : null;

  return (
    <div
      className="nopan nodrag"
      style={drawBoxStyles}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {rect && (
        <div
          style={{
            ...previewBoxStyles,
            ...rect.dimension,
            transform: `translate(${rect.position.x}px, ${rect.position.y}px)`,
            border: '2px dashed rgba(0, 89, 220, 0.8)',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
}
