import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'changes', type: 'EdgeChange[]' },
    { name: 'edges', type: 'Edge[]' },
    { name: 'Returns' },
    { name: '', type: 'Edge[]' },
  ],
};
