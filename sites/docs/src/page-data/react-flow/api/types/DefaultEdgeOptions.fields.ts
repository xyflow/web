import { type PropsTableProps } from '@/components/props-table';

export const defaultEdgeOptionsFields: PropsTableProps = {
  props: [
    { name: 'type?', type: 'string' },
    { name: 'animated?', type: 'boolean' },
    { name: 'hidden?', type: 'boolean' },
    { name: 'deletable?', type: 'boolean' },
    { name: 'selectable?', type: 'boolean' },
    { name: 'data?', type: 'T' },
    { name: 'selected?', type: 'boolean' },
    { name: 'markerStart?', type: 'string | EdgeMarker' },
    { name: 'markerEnd?', type: 'string | EdgeMarker' },
    { name: 'zIndex?', type: 'number' },
    { name: 'ariaLabel?', type: 'string' },
    { name: 'interactionWidth?', type: 'number' },
    { name: 'focusable?', type: 'boolean' },
  ],
};
