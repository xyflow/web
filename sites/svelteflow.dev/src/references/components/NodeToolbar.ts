import { type PropsTableProps } from 'xy-shared';

export const nodeToolbarProps: PropsTableProps = {
  props: [
    { name: 'nodeId?', type: 'string | string[]' },
    { name: 'position?', type: 'Position' },
    { name: 'align?', type: 'Align' },
    { name: 'offset?', type: 'number' },
    { name: 'isVisible?', type: 'number' },
  ],
};
