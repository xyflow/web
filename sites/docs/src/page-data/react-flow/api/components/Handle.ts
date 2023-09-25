import { type PropsTableProps } from '@/components/props-table';

export const handleProps: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string' },
    { name: 'type', type: 'HandleType' },
    {
      name: 'position',
      type: 'Position',
      description: `The position of the handle relative to the node. In a horizontal
      flow source handles are typically Position.Right and in a vertical flow they
      are typically Position.Top.`,
    },
    { name: 'isConnectable?', type: 'boolean', default: 'true' },
    {
      name: 'isConnectableStart?',
      type: 'boolean',
      default: 'type === "source"',
      description: `Dictates whether a connection can start from this handle.`,
    },
    {
      name: 'isConnectableEnd?',
      type: 'boolean',
      default: 'type === "target"',
      description: `Dictates whether a connection can end on this handle.`,
    },
    { name: 'onConnect?', type: '(connection: Connection) => void' },
    {
      name: 'isValidConnection?',
      type: '(connection: Connection) => boolean',
      description: `Called when a connection is dragged to this handle. You can
      use this callback to perform some custom validation logic based on the 
      connection target and source, for example. Where possible, we recommend you
      move this logic to the isValidConnection prop on the main ReactFlow component
      for performance reasons.`,
    },
  ],
};
