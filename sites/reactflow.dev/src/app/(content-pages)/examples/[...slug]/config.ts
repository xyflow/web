/**
 * This meta object is used to define which examples we want to display.
 * We are not using the exact folder structure of apps/example-apps/react/examples
 * because we want to have more control over the order and which examples are displayed.
 */
export const meta = {
  nodes: {
    items: {
      'add-node-on-edge-drop': '',
      'connection-limit': '',
      'custom-node': '',
      'delete-middle-node': '',
      'drag-handle': '',
      'easy-connect': '',
      hidden: '',
      intersections: '',
      'node-resizer': '',
      'node-toolbar': '',
      'proximity-connect': '',
      'rotatable-node': '',
      stress: '',
      'update-node': '',
      shapes: '',
    },
  },
  edges: {
    items: {
      'animating-edges-node': '',
      'custom-connectionline': '',
      'custom-edges': '',
      'delete-edge-on-drop': '',
      'edge-label-renderer': '',
      'edge-types': '',
      'floating-edges': '',
      markers: '',
      'multi-connection-line': '',
      'reconnect-edge': '',
      'simple-floating-edges': '',
      'temporary-edges': '',
    },
  },
  interaction: {
    items: {
      'computing-flows': '',
      'connection-events': '',
      'context-menu': '',
      'contextual-zoom': '',
      'drag-and-drop': '',
      'interaction-props': '',
      'prevent-cycles': '',
      'save-and-restore': '',
      'touch-device': '',
      validation: '',
      'zoom-transitions': '',
    },
  },
  layout: {
    items: {
      dagre: '',
      elkjs: '',
      'elkjs-multiple-handles': '',
      'entitree-flex': '',
      horizontal: '',
      'sub-flows': '',
    },
  },
  styling: {
    items: {
      'base-style': '',
      'dark-mode': '',
      'styled-components': '',
      tailwind: '',
      'turbo-flow': '',
    },
  },
  misc: {
    items: {
      'download-image': '',
      provider: '',
      'use-react-flow-hook': '',
      'static-server-side-generation': '',
    },
  },
};
