import { type PropsTableProps } from '@/components/props-table';

export const defaultEdgeOptionsFields: PropsTableProps = {
  props: [
    ['type', 'string'],
    ['animated', 'boolean'],
    ['hidden', 'boolean'],
    ['deletable', 'boolean'],
    ['selectable', 'boolean'],
    ['data', 'T'],
    ['selected', 'boolean'],
    ['markerStart', 'string | EdgeMarker'],
    ['markerEnd', 'string | EdgeMarker'],
    ['zIndex', 'number'],
    ['ariaLabel', 'string'],
    ['interactionWidth', 'number'],
    ['focusable', 'boolean'],
  ],
};
