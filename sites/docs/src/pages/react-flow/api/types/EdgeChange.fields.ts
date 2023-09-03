import { type PropsTableProps } from '@/components/props-table';

export const edgeAddChangeFields: PropsTableProps = {
  props: [
    ['type', '"add"'],
    ['item', 'Edge<T>'],
  ],
  deeplinkPrefix: 'edge-add-change',
};

export const edgeRemoveChangeFields: PropsTableProps = {
  props: [
    ['type', '"remote"'],
    ['id', 'string'],
  ],
  deeplinkPrefix: 'edgeremovechange',
};

export const edgeResetChangeFields: PropsTableProps = {
  props: [
    ['type', '"reset"'],
    ['item', 'Edge<T>'],
  ],
  deeplinkPrefix: 'edgeresetchange',
};

export const edgeSelectionChangeFields: PropsTableProps = {
  props: [
    ['type', '"select"'],
    ['id', 'string'],
    ['selected', 'boolean'],
  ],
  deeplinkPrefix: 'edgeselectionchange',
};
