import { Handle, useHandleConnections, useNodesData } from '@xyflow/react';

import './style.css';

function Log({ data }) {
  const connections = useHandleConnections({ type: 'target' });

  const nodeData = useNodesData(
    connections.map((connection) => connection.source),
  );

  const color = nodeData[0] ? nodeData[0][connections[0].sourceHandle] : null;

  return (
    <div
      className="log-node"
      style={{
        background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white',
        color: color ? data.fontColor : 'black',
      }}
    >
      {color ? data.label : 'Do nothing'}
      <Handle type="target" position="left" />
    </div>
  );
}

export default Log;
