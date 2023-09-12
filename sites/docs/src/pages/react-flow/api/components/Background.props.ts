import { type PropsTableProps } from '@/components/props-table';

const links = {
  BackgroundVariant: '#backgroundvariant',
};

export const backgroundProps: PropsTableProps = {
  props: [
    ['id?', 'string'],
    ['color?', 'string'],
    ['bgColor?', 'string'],
    ['className?', 'string'],
    ['patternClassName?', 'string'],
    ['gap?', 'number | [number, number]', '28'],
    ['size?', 'number'],
    ['offset?', 'number', '2'],
    ['lineWidth?', 'number', '1'],
    ['variant?', 'BackgroundVariant', 'BackgroundVariant.Dots'],
    ['style?', 'React.CSSProperties'],
  ],
  links: links,
};
