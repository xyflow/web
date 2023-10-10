import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'markerType?', type: 'MarkerType' },
    { name: 'markerEndId?', type: 'string' },
    { name: 'Returns' },
    { name: '', type: 'string' },
  ],
};
