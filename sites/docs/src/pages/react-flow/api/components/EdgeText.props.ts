import { type PropsTableProps } from '@/components/props-table';

export const edgeTextProps: PropsTableProps = {
  props: [
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'label', type: 'string | React.ReactNode' },
    { name: 'labelStyle', type: 'React.CSSProperties' },
    { name: 'labelShowBg', type: 'boolean' },
    { name: 'labelBgStyle', type: 'React.CSSProperties' },
    { name: 'labelBgPadding', type: '[number, number]' },
    { name: 'labelBgBorderRadius', type: 'number' },
  ],
};
