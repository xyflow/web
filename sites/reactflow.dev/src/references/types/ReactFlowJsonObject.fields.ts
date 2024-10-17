import { type PropsTableProps } from 'xy-shared';

export const reactFlowJsonObjectFields: PropsTableProps = {
  props: [
    { name: 'nodes', type: 'Node<T>[]' },
    { name: 'edges', type: 'Edge<U>[]' },
    { name: 'viewport', type: 'Viewport' },
  ],
};
