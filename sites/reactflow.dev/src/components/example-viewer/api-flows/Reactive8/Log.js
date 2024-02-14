import { Handle, useHandleConnections, useNodesData } from '@xyflow/react';

function Log() {
  const connections = useHandleConnections({ type: 'target' });

  const nodeData = useNodesData(
    connections.map((connection) => connection.source),
  );

  return (
    <div>
      {nodeData.length > 0 && nodeData[0]
        ? JSON.stringify(nodeData[0][connections[0].sourceHandle])
        : 'No data to log'}
      <Handle type="target" position="left" />
    </div>
  );
}

export default Log;
