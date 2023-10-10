import { type PropsTableProps } from 'xy-ui';

export const nodeToolbarProps: PropsTableProps = {
  props: [
    {
      name: 'nodeId?',
      type: 'string | string[]',
      description: `By passing in an array of node id's you can render a single
      tooltip for a group or collection of nodes.`,
    },
    { name: 'isVisible?', type: 'boolean' },
    { name: 'position?', type: 'Position' },
    {
      name: 'offset?',
      type: 'number',
      default: '10',
      description: `The space between the node and the toolbar, measured in 
      pixels.`,
    },
    { name: 'align?', type: '"center" | "start" | "end"' },
  ],
};
