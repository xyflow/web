import { type PropsTableProps } from '@/components/props-table';

const links = {
  BackgroundVariant: '#backgroundvariant',
};

export const backgroundProps: PropsTableProps = {
  props: [
    { name: 'id?', type: 'string' },
    { name: 'color?', type: 'string' },
    { name: 'bgColor?', type: 'string' },
    { name: 'className?', type: 'string' },
    { name: 'patternClassName?', type: 'string' },
    { name: 'gap?', type: 'number | [number, number]', default: '28' },
    { name: 'size?', type: 'number' },
    { name: 'offset?', type: 'number', default: '2' },
    { name: 'lineWidth?', type: 'number', default: '1' },
    {
      name: 'variant?',
      type: 'BackgroundVariant',
      default: 'BackgroundVariant.Dots',
    },
    { name: 'style?', type: 'React.CSSProperties' },
  ],
  links: links,
};
