import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'options', type: 'object' },
    { name: 'options.includeHiddenNodes?', type: 'boolean', default: 'false' },
    { name: 'Returns' },
    {
      name: '',
      type: 'boolean',
      description: `Whether or not the nodes have been initialized by the
      <ReactFlow /> component and given a width and height.`,
    },
  ],
};
