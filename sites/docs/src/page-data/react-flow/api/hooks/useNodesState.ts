import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'initialNodes', type: 'Node<T>[]' },
    { name: 'Returns' },
    {
      name: '[0]',
      type: 'Node<T>[]',
      description: `The current array of nodes. You might pass this directly to
      the nodes prop of your <ReactFlow /> component or you may want to
      manipulate it first to perform some layouting, for example.`,
    },
    {
      name: '[1]',
      type: 'React.Dispatch<React.SetStateAction<Node<T>[]>>',
      description: `A function that you can use to update the nodes. You can pass
      it a new array of nodes or a callback that receives the current array of
      nodes and returns a new array of nodes. This is the same as the second element
      of the tuple returned by React's useState hook.`,
    },
    {
      name: '[2]',
      type: '(changes: NodeChange[]) => void',
      description: `A handy callback that can take an array of NodeChanges and
      update the nodes state accordingly. You'll typically pass this directly
      to the onNodesChange prop of your <ReactFlow /> component.`,
    },
  ],
};
