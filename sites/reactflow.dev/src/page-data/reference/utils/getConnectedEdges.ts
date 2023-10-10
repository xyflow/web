import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'nodes', type: 'Node[]' },
    { name: 'edges', type: 'Edge[]' },
    { name: 'Returns' },
    { name: '', type: 'Edge[]' },
  ],
};
