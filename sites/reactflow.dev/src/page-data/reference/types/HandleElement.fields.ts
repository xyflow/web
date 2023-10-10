import { type PropsTableProps } from 'xy-ui';

export const handleElementFields: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string | null' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'position', type: 'Position' },
  ],
};
