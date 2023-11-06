import { type PropsTableProps } from 'xy-shared';

export const edgeTextProps: PropsTableProps = {
  props: [
    {
      name: 'x',
      type: 'number',
      description: 'The x position where the label should be rendered.',
    },
    {
      name: 'y',
      type: 'number',
      description: 'The y position where the label should be rendered.',
    },
    {
      name: 'label',
      type: 'string | React.ReactNode',
      description: 'The text or label to render along an edge.',
    },
    {
      name: 'labelStyle',
      type: 'React.CSSProperties',
      description: 'Custom styles to apply to the label.',
      default: '{}',
    },
    { name: 'labelShowBg', type: 'boolean' },
    { name: 'labelBgStyle', type: 'React.CSSProperties' },
    { name: 'labelBgPadding', type: '[number, number]' },
    { name: 'labelBgBorderRadius', type: 'number' },
  ],
};
