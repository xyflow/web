import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    {
      name: 'selector?',
      type: '(connection: ConnectionState<InternalNode<NodeType>>) => T',
      description: `An optional selector function used to extract a slice of the
      ConnectionState data. Using a selector can prevent component re-renders where
      data you don't otherwise care about might change. If a selector is not provided,
      the entire ConnectionState object is returned unchanged.`,
    },
    { name: 'Returns' },
    {
      name: '',
      type: 'T',
      description: '',
    },
  ],
};
