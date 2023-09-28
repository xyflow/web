import { type PropsTableProps } from '@/components/props-table';

export const reactFlowJsonObjectFields: PropsTableProps = {
  props: [
    { name: 'nodes', type: 'Node<T>[]' },
    { name: 'edges', type: 'Edge<U>[]' },
    { name: 'viewport', type: 'Viewport' },
  ],
};
