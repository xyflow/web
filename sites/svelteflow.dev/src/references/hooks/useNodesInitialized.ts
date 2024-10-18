import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: 'Readable<boolean>',
      description:
        'Returns true when all nodes are initialized. When new nodes are added, this will be false again until all nodes are initialized.',
    },
  ],
};
