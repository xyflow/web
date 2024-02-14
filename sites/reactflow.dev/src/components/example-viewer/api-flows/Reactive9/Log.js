import { Handle, useHandleConnections, useNodesData } from '@xyflow/react';

function Log({ data }) {
  const connections = useHandleConnections({ type: 'target' });

  const nodeData = useNodesData(
    connections.map((connection) => connection.source),
  );

  const color = nodeData[0] ? nodeData[0][connections[0].sourceHandle] : null;

  return (
    <div
      style={{
        background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white',
        width: 80,
        height: 80,
        wordWrap: 'break-word',
        padding: 5,
        fontWeight: 'bold',
        color: color ? data.fontColor : 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {color ? data.label : 'Do nothing'}
      <Handle type="target" position="left" />
    </div>
  );
}

export default Log;
