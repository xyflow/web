import { type PropsTableProps } from 'xy-shared';

export const baseEdgeProps: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'style', type: 'React.CSSProperties' },
    {
      name: 'interactionWidth',
      type: 'number',
      description: `The width of the invisible area around the edge that the user
      can interact with. This is useful for making the edge easier to click or
      hover over.`,
    },
    {
      name: 'path',
      type: 'string',
      description: `The SVG path string that defines the edge. This should look
      something like 'M 0 0 L 100 100' for a simple line. The utility functions
      like getSimpleBezierEdge can be used to generate this string for you.`,
    },
    {
      name: 'markerStart',
      type: 'string',
      description: `The id of the SVG marker to use at the start of the edge. This
      should be defined in a <defs> element in a separate SVG document or element.`,
    },
    {
      name: 'markerEnd',
      type: 'string',
      description: `The id of the SVG marker to use at the end of the edge. This
      should be defined in a <defs> element in a separate SVG document or element.`,
    },
    {
      name: 'label',
      type: 'string | React.ReactNode',
      description: `The label or custom element to render along the edge. This is
      commonly a text label or some custom controls.`,
    },
    { name: 'labelX', type: 'number' },
    { name: 'labelY', type: 'number' },
    { name: 'labelStyle', type: 'React.CSSProperties' },
    { name: 'labelShowBg', type: 'boolean' },
    { name: 'labelBgStyle', type: 'React.CSSProperties' },
    { name: 'labelBgPadding', type: '[number, number]' },
    { name: 'labelBgBorderRadius', type: 'number' },
  ],
};
