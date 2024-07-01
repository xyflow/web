import { Handle, useHandleConnections, useNodesData } from '@xyflow/react';

function Log({ data }) {
  const connections = useHandleConnections({ type: 'target' });
  const nodeData = useNodesData(connections?.[0].source);
  const color = nodeData ? nodeData.data?.[connections[0].sourceHandle] : null;

  return (
    <div
      className="log-node"
      style={{
        background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white',
        color: color ? data.fontColor : 'black',
      }}
    >
      <div
        style={{
          fontWeight: color ? 'bold' : 'normal',
          opacity: color ? 1 : 0.5,
        }}
      >
        {color ? data.label : 'Do nothing'}
      </div>
      <Handle type="target" position="left" />
    </div>
  );
}

export default Log;
