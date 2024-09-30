import { MarkerType } from '@xyflow/react';

export const initialEdges = [
  {
    id: 'edges-e1-2',
    source: 'edges-1',
    target: 'edges-2',
    label: 'bezier edge (default)',
    className: 'normal-edge',
  },
  {
    id: 'edges-e2-2a',
    source: 'edges-2',
    target: 'edges-2a',
    type: 'smoothstep',
    label: 'smoothstep edge',
  },
  {
    id: 'edges-e2-3',
    source: 'edges-2',
    target: 'edges-3',
    type: 'step',
    label: 'step edge',
  },
  {
    id: 'edges-e3-4',
    source: 'edges-3',
    target: 'edges-4',
    type: 'straight',
    label: 'straight edge',
  },
  {
    id: 'edges-e3-3a',
    source: 'edges-3',
    target: 'edges-3a',
    type: 'straight',
    label: 'label only edge',
    style: { stroke: 'none' },
  },
  {
    id: 'edges-e3-5',
    source: 'edges-4',
    target: 'edges-5',
    animated: true,
    label: 'animated styled edge',
    style: { stroke: 'red' },
  },
  {
    id: 'edges-e5-6',
    source: 'edges-5',
    target: 'edges-6',
    label: 'styled label',
    labelStyle: { fill: 'red', fontWeight: 700 },
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: 'edges-e5-7',
    source: 'edges-5',
    target: 'edges-7',
    label: 'label with styled bg',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
