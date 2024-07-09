import { type PropsTableProps } from 'xy-shared';

export const handleFields: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string | null' },
    { name: 'nodeId', type: 'string' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'type', type: '"source" | "target"' },
    { name: 'position', type: 'Position' },
  ],
};
