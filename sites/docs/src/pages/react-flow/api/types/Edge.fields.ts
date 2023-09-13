import { type PropsTableProps } from '@/components/props-table';

const links = {
  ProOptions: '#prooptions',
  OnConnectStartParams: '#onconnectstartparams',
  OnSelectionChangeParams: '#onselectionchangeparams',
};

export const edgeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type?', type: 'string' },
    { name: 'source', type: 'string' },
    { name: 'target', type: 'string' },
    { name: 'sourceHandle?', type: 'string | null' },
    { name: 'targetHandle?', type: 'string | null' },
    { name: 'animated?', type: 'boolean' },
    { name: 'hidden?', type: 'boolean' },
    { name: 'deletable?', type: 'boolean' },
    { name: 'selectable?', type: 'boolean' },
    { name: 'data?', type: 'EdgeData' },
    { name: 'selected?', type: 'boolean' },
    { name: 'markerStart?', type: 'string | EdgeMarker' },
    { name: 'markerEnd?', type: 'string | EdgeMarker' },
    { name: 'zIndex?', type: 'number' },
    { name: 'ariaLabel?', type: 'string' },
    { name: 'interactionWidth?', type: 'number' },
    { name: 'focusable?', type: 'boolean' },
  ],
  links: links,
};
