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
      'node-toolbar': '',
      'proximity-connect': '',
      'rotatable-node': '',
      'node-position-animation': '',
      stress: '',
      'update-node': '',
      shapes: '',
    },
  },
  edges: {
    items: {
      'animating-edges': '',
      'custom-connectionline': 'Custom Connection Line',
      'custom-edges': '',
      'delete-edge-on-drop': '',
      'edge-label-renderer': '',
      'edge-intersection': '',
      'edge-types': '',
      'floating-edges': '',
      markers: '',
      'multi-connection-line': '',
      'reconnect-edge': '',
      'simple-floating-edges': '',
      'temporary-edges': '',
      'editable-edge': ''
    },
  },
  interaction: {
    items: {
      'computing-flows': '',
      'connection-events': '',
      'context-menu': '',
      'contextual-zoom': '',
      'drag-and-drop': '',
      'prevent-cycles': '',
      'save-and-restore': '',
      'touch-device': '',
      validation: '',
      'helper-lines': '',
      collaborative: '',
      'copy-paste': '',
      'undo-redo': '',
    },
  },
  grouping: {
    title: 'Subflows & Grouping',
    items: {
      'selection-grouping': '',
      'parent-child-relation': '',
      'sub-flows': '',
    },
  },
  layout: {
    items: {
      dagre: '',
      elkjs: '',
      'elkjs-multiple-handles': '',
      horizontal: '',
      'expand-collapse': '',
      'auto-layout': '',
      'force-layout': '',
      'dynamic-layouting': '',
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
      'lasso-selection': '',
      rectangle: '',
    },
  },
  misc: {
    items: {
      'download-image': '',
      'server-side-image-creation': '',
    },
  },
};
