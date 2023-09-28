import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import {
  isRunning,
  toggleAudio,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
} from './audio';

export const useStore = create((set, get) => ({
  nodes: [
    { id: 'a', type: 'osc', data: { frequency: 220, type: 'square' }, position: { x: 0, y: 0 } },
    { id: 'b', type: 'amp', data: { gain: 0.5 }, position: { x: -100, y: 250 } },
    { id: 'c', type: 'out', position: { x: 100, y: 500 } },
  ],
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

  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: Object.assign(node.data, data) } : node
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
