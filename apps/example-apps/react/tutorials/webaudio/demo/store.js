import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';

import {
  isRunning,
  toggleAudio,
  createAudioNode,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
} from './audio';

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [{ id: 'output', type: 'out', position: { x: 0, y: 0 } }],
  edges: [],
  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  createNode(type, x, y) {
    const id = nanoid();

    switch (type) {
      case 'osc': {
        const data = { frequency: 440, type: 'sine' };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }

      case 'amp': {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
    }
  },

  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: Object.assign(node.data, data) }
          : node,
      ),
    });
  },

  onNodesDelete(deleted) {
    for (const { id } of deleted) {
      removeAudioNode(id);
    }
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    connect(edge.source, edge.target);
    set({ edges: [edge, ...get().edges] });
  },

  onEdgesDelete(deleted) {
    for ({ source, target } of deleted) {
      disconnect(source, target);
    }
  },
}));
