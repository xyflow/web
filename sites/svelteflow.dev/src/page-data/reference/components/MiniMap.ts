import { type PropsTableProps } from 'xy-ui';

const links = {
  MiniMapNodeProps: '#props-1',
};

export const miniMapProps: PropsTableProps = {
  props: [
    {
      name: 'class?',
      type: 'string',
      default: '-',
    },
    {
      name: 'style?',
      type: 'string',
      default: '-',
    },
    {
      name: 'width?',
      type: 'number',
      default: '-',
    },
    {
      name: 'height?',
      type: 'number',
      default: '-',
    },
    {
      name: 'bgColor?',
      type: 'string',
      default: '"#fff"',
    },
    {
      name: 'nodeColor?',
      type: 'string | (node: Node<T>) => string',
      default: '"#e2e2e2"',
    },
    {
      name: 'nodeStrokeColor?',
      type: 'string | (node: Node<T>) => string',
      default: '"transparent"',
    },
    { name: 'nodeClass?', type: 'string | (node: Node<T>) => string' },
    { name: 'nodeBorderRadius?', type: 'number', default: '5' },
    { name: 'nodeStrokeWidth?', type: 'number', default: '2' },
    {
      name: 'maskColor?',
      type: 'string',
      default: '"rgb(240, 240, 240, 0.6)"',
    },
    { name: 'maskStrokeColor?', type: 'string', default: '"none"' },
    { name: 'maskStrokeWidth?', type: 'number', default: '1' },
    { name: 'position?', type: 'PanelPosition', default: '"bottom-right"' },

    {
      name: 'pannable?',
      type: 'boolean',
      default: 'false',
      description: `Determines whether you can pan the viewport by dragging
      inside the minimap.`,
    },
    {
      name: 'zoomable?',
      type: 'boolean',
      default: 'false',
      description: `Determines whether you can zoom the viewport by scrolling
      inside the minimap.`,
    },
    {
      name: 'ariaLabel?',
      type: 'string | null',
      default: '"Svelte Flow mini map"',
      description: `There is no text inside the minimap for a screen reader to
      use as an accessible name, so it's important we provide one to make the
      minimap accessible. The default is sufficient but you may want to replace 
      it with something more relevant to your app or product.`,
    },
    { name: 'inversePan?', type: 'boolean' },
    { name: 'zoomStep?', type: 'number', default: '10' },
  ],
  links: links,
};

export const miniMapNodeProps: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'borderRadius?', type: 'number' },
    { name: 'class?', type: 'string' },
    { name: 'color?', type: 'string' },
    { name: 'shapeRendering?', type: 'string' },
    { name: 'strokeColor?', type: 'string' },
    { name: 'strokeWidth?', type: 'number' },
    { name: 'style?', type: ' CSSProperties' },
    { name: 'selected?', type: 'boolean' },
  ],
  links: links,
};
