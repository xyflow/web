import { DynamicMeta } from 'nextra';

/**
 * Curated list of pro-only examples for the /pro/examples sidebar.
 * Only examples with `is_pro_example: true` in their README.mdx frontmatter
 * should be listed here.
 */
export const meta: DynamicMeta = {
  nodes: {
    items: {
      shapes: '',
      'node-position-animation': '',
    },
  },
  edges: {
    items: {
      'editable-edge': '',
    },
  },
  interaction: {
    items: {
      collaborative: '',
      'copy-paste': '',
      'helper-lines': '',
      'undo-redo': '',
    },
  },
  grouping: {
    title: 'Subflows & Grouping',
    items: {
      'selection-grouping': '',
      'parent-child-relation': '',
    },
  },
  layout: {
    items: {
      'auto-layout': '',
      'dynamic-layouting': '',
      'expand-collapse': '',
      'force-layout': '',
    },
  },
  whiteboard: {
    items: {
      'freehand-draw': '',
    },
  },
  misc: {
    items: {
      'server-side-image-creation': '',
    },
  },
};
