import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  nodes: [
    { id: 'a', data: { label: 'oscillator' }, position: { x: 0, y: 0 } },
    { id: 'b', data: { label: 'gain' }, position: { x: 50, y: 100 } },
    { id: 'c', data: { label: 'output' }, position: { x: -50, y: 200 } },
  ],
  edges: [],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
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
