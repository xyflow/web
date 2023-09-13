import { type PropsTableProps } from '@/components/props-table';

export const edgeAddChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"add"' },
    { name: 'item', type: 'Edge<T>' },
  ],
  deeplinkPrefix: 'edge-add-change',
};

export const edgeRemoveChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"remote"' },
    { name: 'id', type: 'string' },
  ],
  deeplinkPrefix: 'edgeremovechange',
};

export const edgeResetChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"reset"' },
    { name: 'item', type: 'Edge<T>' },
  ],
  deeplinkPrefix: 'edgeresetchange',
};

export const edgeSelectionChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"select"' },
    { name: 'id', type: 'string' },
    { name: 'selected', type: 'boolean' },
  ],
  deeplinkPrefix: 'edgeselectionchange',
};
