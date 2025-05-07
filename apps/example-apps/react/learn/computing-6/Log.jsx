import { Handle, useNodeConnections, useNodesData } from '@xyflow/react';

function Log({ data }) {
  const connections = useNodeConnections({ handleType: 'target' });

  const nodeData = useNodesData(connections?.[0].source);

  const color = nodeData.data
    ? nodeData.data[connections?.[0].sourceHandle]
    : null;

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
