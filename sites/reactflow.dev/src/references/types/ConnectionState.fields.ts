import { type PropsTableProps } from 'xy-shared';

export const connectionStateFields: PropsTableProps = {
  props: [
    {
      name: 'inProgress',
      type: 'boolean',
      description: `Indicates whether a connection is currently in progress.`,
    },
    {
      name: 'isValid',
      type: 'boolean | null',
      description: `If a an ongoing connection is above a handle or inside the connection radius, this will be true or false - otherwise null`,
    },
    {
      name: 'from',
      type: 'XYPosition | null',
      description: `Returns the xy start position or null if no connection is inprogress.`,
    },
    {
      name: 'fromHandle',
      type: 'Handle | null',
      description: `Returns the start handle or null if no connection is inprogress.`,
    },
    {
      name: 'fromPosition',
      type: 'Position | null',
      description: `Returns the side (called position) of the start handle or null if no connection is inprogress.`,
    },
    {
      name: 'fromNode',
      type: 'Node | null',
      description: `Returns the start node or null if no connection is inprogress.`,
    },
    {
      name: 'to',
      type: 'XYPosition | null',
      description: `Returns the xy end position or null if no connection is inprogress.`,
    },
    {
      name: 'toHandle',
      type: 'Handle | null',
      description: `Returns the end handle or null if no connection is inprogress.`,
    },
    {
      name: 'toPosition',
      type: 'Position | null',
      description: `Returns the side (called position) of the end handle or null if no connection is inprogress.`,
    },
    {
      name: 'toNode',
      type: 'Node | null',
      description: `Returns the end node or null if no connection is inprogress.`,
    },
  ],
};
