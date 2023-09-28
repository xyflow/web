import React, { useEffect, useState, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Panel } from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';

import 'reactflow/dist/style.css';
import './style.css';

const panelStyle = {
  fontSize: 12,
  color: '#777',
};

const CollisionDetectionFlow = () => {
  // this ref stores the current dragged node
  const dragRef = useRef(null);

  // target is the node that the node is dragged over
  const [target, setTarget] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeDragStart = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag = (evt, node) => {
    // calculate the center point of the node from position and dimensions
    const centerX = node.position.x + node.width / 2;
    const centerY = node.position.y + node.height / 2;

    // find a node where the center point is inside
    const targetNode = nodes.find(
      (n) =>
        centerX > n.position.x &&
        centerX < n.position.x + n.width &&
        centerY > n.position.y &&
        centerY < n.position.y + n.height &&
        n.id !== node.id // this is needed, otherwise we would always find the dragged node
    );

    setTarget(targetNode);
  };

  const onNodeDragStop = (evt, node) => {
    // on drag stop, we swap the colors of the nodes
    const nodeColor = node.data.label;
    const targetColor = target?.data.label;

    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === target?.id) {
          n.data = { ...n.data, color: nodeColor, label: nodeColor };
        }
        if (n.id === node.id && target) {
          n.data = { ...n.data, color: targetColor, label: targetColor };
        }
        return n;
      })
    );

    setTarget(null);
    dragRef.current = null;
  };

  useEffect(() => {
    // whenever the target changes, we swap the colors temporarily
    // this is just a placeholder, implement your own logic here
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === target?.id) {
          node.style = { ...node.style, backgroundColor: dragRef.current?.data.color };
          node.data = { ...node.data, label: dragRef.current?.data.color };
        } else if (node.id === dragRef.current?.id && target) {
          node.style = { ...node.style, backgroundColor: target.data.color };
          node.data = { ...node.data, label: target.data.color };
        } else {
          node.style = { ...node.style, backgroundColor: node.data.color };
          node.data = { ...node.data, label: node.data.color };
        }
        return node;
      })
    );
  }, [target]);

  return (
    <div className="container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
      >
        <Panel position="top-left" style={panelStyle}>
          Drop any node on top of another node to swap their colors
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default CollisionDetectionFlow;
