import { type PropsTableProps } from 'xy-shared';

const links = {
  MiniMapNodeProps: '#props-1',
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
    { name: 'style?', type: 'React.CSSProperties' },
    { name: 'selected', type: 'boolean' },
    { name: 'onClick?', type: ' (event: MouseEvent, id: string) => void' },
  ],
  links: links,
};
