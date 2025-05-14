import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'first click a handle',
      arrowStyle:
        'left: 0; bottom: 0; transform: translate(0px, -25px) rotate(160deg) scale(-1, 1);',
    },
    position: { x: 75, y: 30 },
  },
  {
    id: 'annotation-2',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'then click another',
      arrowStyle:
        'right: 0; bottom: 0; transform: translate(-10px, 0px) rotate(160deg) scale(1, -1);',
    },
    position: { x: 35, y: 140 },
  },
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
  },
  { id: '2', data: { label: 'Node 2' }, position: { x: 200, y: 200 } },
];

export const initialEdges: Edge[] = [];
