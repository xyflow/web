import { type PropsTableProps } from '@/components/props-table';

const links = {
  ProOptions: '#prooptions',
  OnConnectStartParams: '#onconnectstartparams',
  OnSelectionChangeParams: '#onselectionchangeparams',
};

export const edgeFields: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['type?', 'string'],
    ['source', 'string'],
    ['target', 'string'],
    ['sourceHandle?', 'string | null'],
    ['targetHandle?', 'string | null'],
    ['animated?', 'boolean'],
    ['hidden?', 'boolean'],
    ['deletable?', 'boolean'],
    ['selectable?', 'boolean'],
    ['data?', 'EdgeData'],
    ['selected?', 'boolean'],
    ['markerStart?', 'EdgeMarkerType'],
    ['markerEnd?', 'EdgeMarkerType'],
    ['zIndex?', 'number'],
    ['ariaLabel?', 'string'],
    ['interactionWidth?', 'number'],
    ['focusable?', 'boolean'],
  ],
  links: links,
};
