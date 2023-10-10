import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: 'Writable<Node[]>',
      description: 'The current nodes store.',
    },
  ],
};
