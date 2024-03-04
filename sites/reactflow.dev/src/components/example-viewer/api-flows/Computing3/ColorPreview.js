import {
  Handle,
  Position,
  useNodesData,
  useHandleConnections,
} from '@xyflow/react';

import './style.css';

function ColorPreview() {
  const redConnections = useHandleConnections({
    type: 'target',
    id: 'red',
  });
  const redNodeData = useNodesData(
    redConnections.map((connection) => connection.source),
  );

  const greenConnections = useHandleConnections({
    type: 'target',
    id: 'green',
  });
  const greenNodeData = useNodesData(
    greenConnections.map((connection) => connection.source),
  );

  const blueConnections = useHandleConnections({
    type: 'target',
    id: 'blue',
  });
  const blueNodeData = useNodesData(
    blueConnections.map((connection) => connection.source),
  );

  const color = {
    r: redNodeData.length > 0 ? redNodeData[0].data.value : 0,
    g: greenNodeData.length > 0 ? greenNodeData[0].data.value : 0,
    b: blueNodeData.length > 0 ? blueNodeData[0].data.value : 0,
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
