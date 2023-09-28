import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'initialEdges', type: 'Edge<T>[]' },
    { name: 'Returns' },
    {
      name: '[0]',
      type: 'Edge<T>[]',
      description: `The current array of edges. You might pass this directly to
      the edges prop of your <ReactFlow /> component or you may want to
      manipulate it first to perform some layouting, for example.`,
    },
    {
      name: '[1]',
      type: 'React.Dispatch<React.SetStateAction<Edge<T>[]>>',
      description: `A function that you can use to update the edges. You can pass
      it a new array of edges or a callback that receives the current array of
      edges and returns a new array of edges. This is the same as the second element
      of the tuple returned by React's useState hook.`,
    },
    {
      name: '[2]',
      type: '(changes: EdgeChange[]) => void',
      description: `A handy callback that can take an array of EdgeChanges and
      update the edges state accordingly. You'll typically pass this directly
      to the onEdgesChange prop of your <ReactFlow /> component.`,
    },
  ],
};
