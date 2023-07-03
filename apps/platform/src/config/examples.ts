import { isDevelopment } from '../utils/browser';

export type Example = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  files: string[];
  icon: string;
  dependencies?: Record<string, string>;
  published?: boolean;
  hidden?: boolean;
  isReadOnly?: boolean;
  publicPath: string;
  // @todo remove this once we have a better way to configure leva
  levaConfig?: any;
  variants?: { id: string; label: string }[];
};

const examples: Example[] = [
  {
    id: 'workflow-builder',
    name: 'Workflow Builder',
    description: 'A starting point for building an interactive workflow builder with a tree layout.',
    tags: ['layout', 'workflow', 'animation', 'custom nodes'],
    files: [
      'App.tsx',
      'hooks/useLayout.ts',
      'hooks/useEdgeClick.ts',
      'hooks/useNodeClick.ts',
      'hooks/usePlaceholderClick.ts',
      'NodeTypes/index.ts',
      'NodeTypes/NodeTypes.module.css',
      'NodeTypes/PlaceholderNode.tsx',
      'NodeTypes/WorkflowNode.tsx',
      'EdgeTypes/WorkflowEdge.tsx',
      'EdgeTypes/EdgeTypes.module.css',
      'EdgeTypes/index.ts',
      'EdgeTypes/PlaceholderEdge.tsx',
      'utils.ts',
    ],
    dependencies: { 'd3-hierarchy': 'latest', 'd3-timer': 'latest', classnames: 'latest', '@types/d3': 'latest' },
    published: true,
    icon: 'data-lineage',
    publicPath: 'layout/workflow-builder-starter/',
  },

  {
    id: 'auto-layout',
    name: 'Auto Layout',
    description: 'This example shows how you can automatically arrange your nodes after adding items from the sidebar.',
    tags: ['workflow', 'layout'],
    files: ['App.tsx', 'Sidebar.tsx', 'CustomNode.tsx', 'useAutoLayout.ts', 'initialElements.ts', 'styles.module.css'],
    dependencies: { classnames: 'latest', 'd3-hierarchy': 'latest' },
    levaConfig: {
      direction: {
        value: 'TB',
        options: { 'left to right': 'LR', 'top to bottom': 'TB', 'right to left': 'RL', 'bottom to top': 'BT' },
      },
    },
    published: true,
    icon: 'diagram-tree',
    variants: [
      { id: 'auto-layout', label: 'd3-hierarchy' },
      { id: 'auto-layout-dagre', label: 'dagre.js' },
    ],
    publicPath: 'layout/auto-layout/',
  },

  {
    id: 'auto-layout-dagre',
    name: 'Auto Layout',
    description: 'This example shows how you can automatically arrange your nodes after adding items from the sidebar.',
    tags: ['workflow', 'layout'],
    files: ['App.tsx', 'Sidebar.tsx', 'CustomNode.tsx', 'useAutoLayout.ts', 'initialElements.ts', 'styles.module.css'],
    dependencies: { classnames: 'latest', dagre: 'latest' },
    levaConfig: {
      direction: {
        value: 'TB',
        options: { 'left to right': 'LR', 'top to bottom': 'TB', 'right to left': 'RL', 'bottom to top': 'BT' },
      },
    },
    published: true,
    icon: 'diagram-tree',
    hidden: true,
    variants: [
      { id: 'auto-layout', label: 'd3-hierarchy' },
      { id: 'auto-layout-dagre', label: 'dagre.js' },
    ],
    publicPath: 'layout/auto-layout/',
  },
  {
    id: 'helper-lines',
    name: 'Helper Lines',
    description:
      'This example demonstrates how to display helper lines in a React Flow graph while a node is being dragged.',
    tags: ['UI & UX'],
    files: ['App.tsx', 'utils.ts', 'HelperLines.tsx', 'initialElements.ts', 'styles.module.css'],
    published: true,
    icon: 'grid',
    publicPath: 'interaction/helper-lines/',
  },
  {
    id: 'shapes',
    name: 'Shapes',
    description: 'A collection of custom nodes in different shapes.',
    tags: ['custom nodes'],
    files: ['App.tsx', 'ShapeNode.tsx'],
    levaConfig: {
      backgroundColor: '#1a202c',
    },
    published: true,
    icon: 'shapes',
    publicPath: 'nodes/shapes/',
  },
  {
    id: 'dynamic-grouping',
    name: 'Dynamic Grouping',
    dependencies: { '@reactflow/node-resizer': '1.2.0' },
    description: 'In this example you will learn how to group nodes dynamically.',
    tags: ['custom nodes', 'layout'],
    files: [
      'App.tsx',
      'SimpleNode.tsx',
      'GroupNode.tsx',
      'Sidebar.tsx',
      'SelectedNodesToolbar.tsx',
      'useDetachNodes.ts',
      'utils.ts',
      'initial-elements.ts',
      'style.module.css',
    ],
    published: true,
    icon: 'clip',
    publicPath: 'nodes/dynamic-grouping/',
  },
  {
    id: 'resize-rotate',
    name: 'Resize and Rotate',
    description: 'A custom node component that can be resized and rotated.',
    dependencies: { 'react-moveable': '0.32.3', 'moveable-helper': 'latest' },
    tags: ['custom nodes'],
    files: ['App.tsx', 'ResizeRotateNode.tsx'],
    published: true,
    hidden: true,
    icon: 'inheritance',
    publicPath: 'nodes/resize-rotate/',
  },
  {
    id: 'undo-redo',
    name: 'Undo and Redo',
    description: 'This example shows how to implement a simple undo and redo functionality for a React Flow graph.',
    tags: ['UI & UX'],
    files: ['App.tsx', 'useUndoRedo.ts', 'styles.module.css'],
    published: true,
    icon: 'history',
    publicPath: 'interaction/undo-and-redo/',
  },
  {
    id: 'copy-paste',
    name: 'Copy and Paste',
    description: "In this example we'll look at how to copy and paste a selection of nodes in a flow.",
    tags: ['UI & UX'],
    files: ['App.tsx', 'useCopyPaste.ts', 'styles.module.css'],
    published: true,
    icon: 'duplicate',
    publicPath: 'interaction/copy-and-paste/',
  },
  {
    id: 'collaborative',
    name: 'Collaborative',
    description: 'A collaborative flow for multiple users based on yjs.',
    dependencies: { yjs: 'latest', 'y-webrtc': 'latest' },
    tags: [],
    files: [
      'App.tsx',
      'Sidebar.tsx',

      'useEdgesStateSynced.ts',
      'useNodesStateSynced.ts',
      'ydoc.ts',
      'style.module.css',
    ],
    published: true,
    isReadOnly: true,
    icon: 'people',
    publicPath: 'interaction/collaborative/',
  },
  {
    id: 'expand-collapse',
    name: 'Expand and Collapse',
    description:
      'Interactive example to demonstrate how you can navigate hierarchical data structures with React Flow.',
    tags: ['animation', 'layout'],
    dependencies: { 'd3-hierarchy': 'latest', 'd3-timer': 'latest', '@types/d3': 'latest' },
    files: [
      'App.tsx',
      'useExpandCollapse.ts',
      'useAnimatedNodes.ts',
      'CustomNode.tsx',
      'initialElements.ts',
      'styles.module.css',
      'types.ts',
    ],
    levaConfig: {
      treeWidth: {
        value: 220,
        min: 0,
        max: 440,
      },
      treeHeight: {
        value: 100,
        min: 0,
        max: 200,
      },
      animationDuration: {
        value: 300,
        min: 0,
        max: 600,
      },
    },
    published: true,
    icon: 'collapse-all',
    publicPath: 'layout/expand-collapse/',
  },
  {
    id: 'expand-collapse-deprecated',
    name: 'Expand and Collapse (deprecated)',
    description:
      'Interactive example to demonstrate how you can navigate hierarchical data structures with React Flow.',
    tags: ['animation', 'layout'],
    dependencies: { 'd3-hierarchy': 'latest', 'd3-scale': 'latest', 'd3-timer': 'latest', '@types/d3': 'latest' },
    files: ['App.tsx', 'useAnimatedNodes.ts', 'tree.js'],
    levaConfig: {
      animationDuration: 300,
    },
    published: true,
    hidden: true,
    icon: 'new-link',
    publicPath: 'layout/expand-collapse-deprecated/',
  },
  {
    id: 'force-layout',
    name: 'Force Layout',
    description: 'Example of combining d3-force layout and React Flow.',
    tags: ['layout', 'animation'],
    files: ['App.tsx', 'useForceLayout.ts', 'initialElements.ts', 'styles.module.css'],
    dependencies: { 'd3-hierarchy': 'latest', 'd3-force': 'latest', 'd3-scale': 'latest', '@types/d3': 'latest' },
    levaConfig: {
      strength: {
        value: -1000,
        min: -2000,
        max: 0,
      },
      distance: {
        value: 150,
        min: 0,
        max: 1000,
      },
    },
    published: true,
    icon: 'layout-auto',
    publicPath: 'layout/force-layout/',
  },

  {
    id: 'force-layout-deprecated',
    name: 'Force Layout (deprecated)',
    description: 'Example of combining d3-force layout and React Flow.',
    tags: ['layout', 'animation'],
    files: ['App.tsx', 'useForceLayout.ts', 'GraphNode.tsx', 'tree.js'],
    dependencies: { 'd3-hierarchy': 'latest', 'd3-force': 'latest', 'd3-scale': 'latest', '@types/d3': 'latest' },
    levaConfig: {
      strength: {
        value: -1000,
        min: -2000,
        max: 0,
      },
      distance: {
        value: 150,
        min: 0,
        max: 1000,
      },
    },
    published: true,
    hidden: true,
    icon: 'layout-auto',
    publicPath: 'layout/force-layout/',
  },
  {
    id: 'remove-attribution',
    name: 'Remove Attribution',
    description: 'This example demonstrates how you can remove the attribution from the React Flow renderer.',
    tags: ['UI & UX'],
    files: ['App.tsx', 'initialElements.ts'],
    levaConfig: {
      hideAttribution: true,
    },
    published: true,
    icon: 'graph-remove',
    hidden: false,
    publicPath: 'misc/remove-attribution/',
  },
];

const publishedExamples = isDevelopment() ? examples : examples.filter((example) => example.published);

export default publishedExamples;
