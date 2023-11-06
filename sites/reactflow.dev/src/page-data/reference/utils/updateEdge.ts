import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'edge', type: 'Edge' },
    { name: 'connection', type: 'Connection' },
    { name: 'edges', type: 'Edge[]' },
    { name: 'options?', type: 'object' },
    { name: 'options.shouldReplaceId', type: 'boolean' },
    { name: 'Returns' },
    { name: '', type: 'Edge[]' },
  ],
};
