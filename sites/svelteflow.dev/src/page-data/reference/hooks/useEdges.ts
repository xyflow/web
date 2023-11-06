import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: 'Writable<Edge[]>',
      description: 'The current edge store.',
    },
  ],
};
