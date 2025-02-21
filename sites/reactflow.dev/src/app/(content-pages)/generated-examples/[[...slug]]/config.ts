export const meta = {
  index: {
    title: 'Examples',
    theme: {
      breadcrumb: false,
    },
  },
  overview: {
    title: 'Feature Overview',
  },
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
      'animating-edges': '',
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
      'default-style': '',
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
    },
  },
};

/**
 * There are some example pages that are not directly accessible via their file path.
 * This object allows you to override the default path to the MDX file.
 */
export const mdxPathOverrides = {
  'edges/animating-edges': 'edges/animating-edges-node',
  overview: 'misc/overview',
};

export const metadata = {
  index: {
    title: 'Examples',
    description:
      'Overview of React Flow examples for practical copy-paste solutions to common use cases.',
    filePath: 'index.mdx',
  },
};
