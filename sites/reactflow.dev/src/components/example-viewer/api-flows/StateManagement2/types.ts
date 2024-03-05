import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BuiltInNode,
} from '@xyflow/react';

export type NodeData = {
  color: string;
};

export type ColorChooserNode = Node<NodeData, 'colorChooser'>;

export type AppNode = ColorChooserNode | BuiltInNode;

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
};
