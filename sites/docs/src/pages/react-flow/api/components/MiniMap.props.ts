import { type PropsTableProps } from '@/components/props-table';

const links = {
  MiniMapNodeProps: '#props-1',
};

export const miniMapProps: PropsTableProps = {
  props: [
    ['nodeColor?', 'string | (node: Node<T>) => string', '"#e2e2e2"'],
    ['nodeStrokeColor?', 'string | (node: Node<T>) => string', '"transparent"'],
    ['nodeClassName?', 'string | (node: Node<T>) => string'],
    ['nodeBorderRadius?', 'number', '5'],
    ['nodeStrokeWidth?', 'number', '2'],
    ['nodeComponent?', 'React.ComponentType<MiniMapNodeProps>'],
    ['maskColor?', 'string', '"rgb(240, 240, 240, 0.6)"'],
    ['maskStrokeColor?', 'string', '"none"'],
    ['maskStrokeWidth?', 'number', '1'],
    ['position?', 'PanelPosition', '"bottom-right"'],
    ['onClick?', '(event: React.MouseEvent, position: XYPosition) => void'],
    ['onNodeClick?', '(event: React.MouseEvent, node: Node<T>) => void'],
    ['pannable?', 'boolean', 'false'],
    ['zoomable?', 'boolean', 'false'],
    ['ariaLabel?', 'string | null', '"React Flow mini map"'],
    ['inversePan?', 'boolean'],
    ['zoomStep?', 'number', '10'],
    ['offsetScale?', 'number', '5'],
  ],
  links: links,
};

export const miniMapNodeProps: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['x', 'number'],
    ['y', 'number'],
    ['width', 'number'],
    ['height', 'number'],
    ['borderRadius', 'number'],
    ['className', 'string'],
    ['color', 'string'],
    ['shapeRendering:', 'string'],
    ['strokeColor', 'string'],
    ['strokeWidth', 'number'],
    ['style?', ' CSSProperties'],
    ['selected', 'boolean'],
    ['onClick?', ' (event: MouseEvent, id: string) => void'],
  ],
  links: links,
};
