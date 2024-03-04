import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

import initialNodes from './nodes';
import initialEdges from './edges';
import { AppNode, AppState, ColorChooserNode } from './types';

function isColorChooserNode(node: AppNode): node is ColorChooserNode {
  return node.type === 'colorChooser';
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  updateNodeColor: (nodeId, color) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId && isColorChooserNode(node) {
          // it's important to create a new object here, to inform React Flow about the cahnges
          return { ...node, data: { ...node.data, color } };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
