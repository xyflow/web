import { type PropsTableProps } from '@/components/props-table';

const links = {
  MiniMapNodeProps: '#props-1',
};

export const miniMapProps: PropsTableProps = {
  props: [
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
    { name: 'nodeClassName?', type: 'string | (node: Node<T>) => string' },
    { name: 'nodeBorderRadius?', type: 'number', default: '5' },
    { name: 'nodeStrokeWidth?', type: 'number', default: '2' },
    { name: 'nodeComponent?', type: 'React.ComponentType<MiniMapNodeProps>' },
    {
      name: 'maskColor?',
      type: 'string',
      default: '"rgb(240, 240, 240, 0.6)"',
    },
    { name: 'maskStrokeColor?', type: 'string', default: '"none"' },
    { name: 'maskStrokeWidth?', type: 'number', default: '1' },
    { name: 'position?', type: 'PanelPosition', default: '"bottom-right"' },
    {
      name: 'onClick?',
      type: '(event: React.MouseEvent, position: XYPosition) => void',
    },
    {
      name: 'onNodeClick?',
      type: '(event: React.MouseEvent, node: Node<T>) => void',
    },
    { name: 'pannable?', type: 'boolean', default: 'false' },
    { name: 'zoomable?', type: 'boolean', default: 'false' },
    {
      name: 'ariaLabel?',
      type: 'string | null',
      default: '"React Flow mini map"',
    },
    { name: 'inversePan?', type: 'boolean' },
    { name: 'zoomStep?', type: 'number', default: '10' },
    { name: 'offsetScale?', type: 'number', default: '5' },
  ],
  links: links,
};

export const miniMapNodeProps: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'borderRadius', type: 'number' },
    { name: 'className', type: 'string' },
    { name: 'color', type: 'string' },
    { name: 'shapeRendering:', type: 'string' },
    { name: 'strokeColor', type: 'string' },
    { name: 'strokeWidth', type: 'number' },
    { name: 'style?', type: ' CSSProperties' },
    { name: 'selected', type: 'boolean' },
    { name: 'onClick?', type: ' (event: MouseEvent, id: string) => void' },
  ],
  links: links,
};