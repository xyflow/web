import { type PropsTableProps } from 'xy-shared';

export const edgeAddChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"add"' },
    { name: 'item', type: 'Edge<T>' },
  ],
};

export const edgeRemoveChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"remote"' },
    { name: 'id', type: 'string' },
  ],
};

export const edgeResetChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"reset"' },
    { name: 'item', type: 'Edge<T>' },
  ],
};

export const edgeSelectionChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"select"' },
    { name: 'id', type: 'string' },
    { name: 'selected', type: 'boolean' },
  ],
};
