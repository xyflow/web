import { useEffect } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';

function CustomHandle({ id, label, onChange }) {
  const connections = useHandleConnections({
    type: 'target',
    id,
  });

  const nodeData = useNodesData(connections?.[0].source);

  useEffect(() => {
    onChange(nodeData?.data ? nodeData.data.value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
      <label htmlFor="red" className="label">
        {label}
      </label>
    </div>
  );
}

function ColorPreview({ id, data }) {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      className="node"
      style={{
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
