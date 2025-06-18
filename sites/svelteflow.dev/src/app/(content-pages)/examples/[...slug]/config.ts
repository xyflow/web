import { DynamicMeta } from 'nextra';

/**
 * This meta object is used to define which examples we want to display.
 * We are not using the exact folder structure of apps/example-apps/react/examples
 * because we want to have more control over the order and which examples are displayed.
 */
export const meta: DynamicMeta = {
  nodes: {
    items: {
      'add-node-on-edge-drop': '',
      'connection-limit': '',
      'custom-node': '',
      'delete-middle-node': '',
      'drag-handle': '',
      'easy-connect': '',
      intersections: '',
      'node-resizer': '',
      'proximity-connect': '',
      stress: '',
      'update-node': '',
    },
  },
  edges: {
    items: {
      'custom-connectionline': 'Custom Connection Line',
      'custom-edges': '',
      'edge-labels': '',
      'edge-markers': '',
      'edge-types': '',
      'floating-edges': '',
      'reconnect-edge': '',
    },
  },
  interaction: {
    items: {
      'computing-flows': '',
      'context-menu': '',
      'contextual-zoom': '',
      'drag-and-drop': '',
      validation: '',
    },
  },
  layout: {
    items: {
      dagre: '',
      elkjs: '',
      'horizontal-flow': '',
      subflows: '',
    },
  },
  styling: {
    items: {
      'base-style': '',
      'dark-mode': '',
      tailwind: '',
      'turbo-flow': '',
    },
  },
  whiteboard: {
    items: {
      eraser: '',
      lasso: '',
      'draw-nodes': '',
    },
  },
  misc: {
    items: {
      'download-image': '',
      'threlte-flow': '',
    },
  },
};
