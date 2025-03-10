import {
  Handle,
  Position,
  useNodesData,
  useNodeConnections,
} from '@xyflow/react';

function ColorPreview() {
  const redConnections = useNodeConnections({
    handleType: 'target',
    handleId: 'red',
  });
  const redNodeData = useNodesData(redConnections?.[0].source);

  const greenConnections = useNodeConnections({
    handleType: 'target',
    handleId: 'green',
  });
  const greenNodeData = useNodesData(greenConnections?.[0].source);

  const blueConnections = useNodeConnections({
    handleType: 'target',
    handleId: 'blue',
  });
  const blueNodeData = useNodesData(blueConnections?.[0].source);

  const color = {
    r: blueNodeData?.data ? redNodeData.data.value : 0,
    g: greenNodeData?.data ? greenNodeData.data.value : 0,
    b: blueNodeData?.data ? blueNodeData.data.value : 0,
  };

  return (
    <div
      className="node"
      style={{
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="red"
          className="handle"
        />
        <label htmlFor="red" className="label">
          R
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="green"
          className="handle"
        />
        <label htmlFor="green" className="label">
          G
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="blue"
          className="handle"
        />
        <label htmlFor="red" className="label">
          B
        </label>
      </div>
    </div>
  );
}

export default ColorPreview;
