import { type PropsTableProps } from '@/components/props-table';

export const nodeToolbarProps: PropsTableProps = {
  props: [
    { name: 'nodeId?', type: 'string | string[]' },
    { name: 'isVisible?', type: 'boolean' },
    { name: 'position?', type: 'Position' },
    { name: 'offset?', type: 'number' },
    { name: 'align?', type: '"center" | "start" | "end"' },
  ],
};
