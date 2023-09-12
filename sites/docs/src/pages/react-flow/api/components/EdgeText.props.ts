import { type PropsTableProps } from '@/components/props-table';

export const edgeTextProps: PropsTableProps = {
  props: [
    ['x', 'number'],
    ['y', 'number'],
    ['label', 'string | React.ReactNode'],
    ['labelStyle', 'React.CSSProperties'],
    ['labelShowBg', 'boolean'],
    ['labelBgStyle', 'React.CSSProperties'],
    ['labelBgPadding', '[number, number]'],
    ['labelBgBorderRadius', 'number'],
  ],
};
