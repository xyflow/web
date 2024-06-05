import { useNodes, EdgeLabelRenderer } from '@xyflow/react';

export default function NodeInspector() {
  const nodes = useNodes();

  return (
    <EdgeLabelRenderer>
      <div className="react-flow__devtools-nodeinspector">
        {nodes.map((node) => {
          const x = node.positionAbsolute?.x || 0;
          const y = node.positionAbsolute?.y || 0;
          const width = node.width || 0;
          const height = node.height || 0;

          return (
            <NodeInfo
              key={node.id}
              id={node.id}
              selected={node.selected}
              type={node.type || 'default'}
              x={x}
              y={y}
              width={width}
              height={height}
              data={node.data}
            />
          );
        })}
      </div>
    </EdgeLabelRenderer>
  );
}

type NodeInfoProps = {
  id: string;
  type: string;
  selected: boolean;
  x: number;
  y: number;
  width?: number;
  height?: number;
  data: any;
};

function NodeInfo({
  id,
  type,
  selected,
  x,
  y,
  width,
  height,
  data,
}: NodeInfoProps) {
  if (!width || !height) {
    return null;
  }

  return (
    <div
      className="react-flow__devtools-nodeinfo"
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y + height}px)`,
        width: width * 2,
      }}
    >
      <div>id: {id}</div>
      <div>type: {type}</div>
      <div>selected: {selected ? 'true' : 'false'}</div>
      <div>
        position: {x.toFixed(1)}, {y.toFixed(1)}
      </div>
      <div>
        dimensions: {width} × {height}
      </div>
      <div>data: {JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
