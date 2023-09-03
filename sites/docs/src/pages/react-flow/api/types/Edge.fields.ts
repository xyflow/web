import { type PropsTableProps } from '@/components/props-table';
import * as Types from '../types/_meta.json';

const links = {
  // Local links
  ProOptions: '#prooptions',
  OnConnectStartParams: '#onconnectstartparams',
  OnSelectionChangeParams: '#onselectionchangeparams',

  // External links
  CSSProperties:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1545',
  MouseEvent:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1226C6-L1226C6',
  ComponentType:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L75',

  // Types docs
  ...Object.fromEntries(
    Object.keys(Types).map((t) => [
      t.split('.')[0],
      `/react-flow/api/types/${t}`,
    ])
  ),
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
