import { type PropsTableProps } from 'xy-shared';

export const connectionFields: PropsTableProps = {
  props: [
    {
      name: 'source',
      type: 'string | null',
      description: `When not null, the id of the node this connection originates
      from.`,
    },
    {
      name: 'target',
      type: 'string | null',
      description: `When not null, the id of the node this connection terminates
      at.`,
    },
    {
      name: 'sourceHandle',
      type: 'string | null',
      description: `When not null, the id of the handle on the source node that
      this connection originates from.`,
    },
    {
      name: 'targetHandle',
      type: 'string | null',
      description: `When not null, the id of the handle on the target node that
      this connection terminates at.`,
    },
  ],
};
