import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'nodeId', type: 'string | string[]' },
    { name: 'Returns' },
    {
      name: '',
      type: 'void',
    },
  ],
};
