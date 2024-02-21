import { type PropsTableProps } from 'xy-shared';

export const backgroundProps: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string' },
    { name: 'color?', type: 'string' },
    { name: 'className?', type: 'string' },
    { name: 'style?', type: 'React.CSSProperties' },
    { name: 'patternClassName?', type: 'string' },
    {
      name: 'gap?',
      type: 'number | [number, number]',
      default: '28',
      description: `The gap between patterns. Passing in a tuple allows you to
      control the x and y gap independently.`,
    },
    {
      name: 'size?',
      type: 'number',
      description: `The radius of each dot or the size of each rectangle if
      BackgroundVariant.Dots or BackgroundVariant.Cross is used. This defaults to
      1 or 6 respectively, or ignored if BackgroundVariant.Lines is used.`,
    },
    { name: 'offset?', type: 'number', default: '2' },
    { name: 'lineWidth?', type: 'number', default: '1' },
    {
      name: 'variant?',
      type: 'BackgroundVariant',
      default: 'BackgroundVariant.Dots',
    },
  ],
};
