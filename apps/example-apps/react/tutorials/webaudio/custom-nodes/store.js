import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [
    {
      id: 'a',
      type: 'osc',
      data: { frequency: 220, type: 'square' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'b',
      type: 'amp',
      data: { gain: 0.5 },
      position: { x: -100, y: 250 },
    },
    { id: 'c', type: 'out', position: { x: 100, y: 500 } },
  ],
  edges: [],
  isRunning: false,

  toggleAudio() {
    set({ isRunning: !get().isRunning });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: Object.assign(node.data, data) }
          : node,
      ),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },
}));
