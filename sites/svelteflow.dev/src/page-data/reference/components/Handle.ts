import { type PropsTableProps } from 'xy-shared';

export const handleProps: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string' },
    { name: 'type', type: '"source" | "target"' },
    { name: 'class?', type: 'string' },
    { name: 'style?', type: 'string' },
    {
      name: 'position',
      type: 'Position',
      description: `The position of the handle relative to the node. In a horizontal
      flow source handles are typically Position.Right and in a vertical flow they
      are typically Position.Top.`,
    },
    { name: 'isConnectable?', type: 'boolean', default: 'true' },
    // not implemented yet
    // {
    //   name: 'isConnectableStart?',
    //   type: 'boolean',
    //   default: 'type === "source"',
    //   description: `Dictates whether a connection can start from this handle.`,
    // },
    // {
    //   name: 'isConnectableEnd?',
    //   type: 'boolean',
    //   default: 'type === "target"',
    //   description: `Dictates whether a connection can end on this handle.`,
    // },
    {
      name: 'onconnect?',
      type: '(connection: Connection[]) => void',
    },
    {
      name: 'ondisconnect?',
      type: '(connection: Connection[]) => void',
    },
  ],
};
