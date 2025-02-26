import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    {
      name: 'id?',
      type: 'string',
      description:
        'ID of the node, filled in automatically if used inside custom node',
    },
    {
      name: 'handleType?',
      type: '"source" | "target"',
      description: `What type of handle connections do you want to observer?`,
    },
    { name: 'handleId?', type: 'string', description: 'ID of the handle' },
    {
      name: 'onConnect?',
      type: '(connections: Connection[]) => void',
    },
    {
      name: 'onDisconnect?',
      type: '(connections: Connection[]) => void',
    },
    { name: 'Returns' },
    { name: '', type: 'NodeConnection[]' },
  ],
};
