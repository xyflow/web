import { useEffect, useState } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';

const nodeStyle = {
  height: 150,
  width: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: 10,
};

const labelStyle = {
  marginLeft: 10,
  mixBlendMode: 'difference',
  color: 'white',
  fontWeight: 'bold',
};

const handleStyle = {
  position: 'relative',
  top: 15,
};

function CustomHandle({ id, label, onChange }) {
  const connections = useHandleConnections({
    type: 'target',
    id,
  });

  const nodeData = useNodesData(
    connections.map((connection) => connection.source),
  );

  useEffect(() => {
    onChange(nodeData.length > 0 ? nodeData[0].value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        style={handleStyle}
      />
      <label htmlFor="red" style={labelStyle}>
        {label}
      </label>
    </div>
  );
}

function ColorPreview({ id, data }) {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      style={{
        ...nodeStyle,
        background: data.value
          ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
          : 'rgb(0, 0, 0)',
      }}
    >
      <CustomHandle
        id="red"
        label="R"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...node.data.value, r: value } };
          });
        }}
      />
      <CustomHandle
        id="green"
        label="G"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...node.data.value, g: value } };
          });
        }}
      />
      <CustomHandle
        id="blue"
        label="B"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...node.data.value, b: value } };
          });
        }}
      />
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
}

export default ColorPreview;
