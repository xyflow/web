export const treeRootId = 1;
export const initialTree = {
  1: {
    id: '1',
    name: 'root',
    type: 'input',
    children: ['2', '3'],
    siblings: ['8'],
    spouses: ['10'],
  },
  2: { id: '2', name: 'child2' },
  3: {
    id: '3',
    name: 'child3',
    children: ['4', '5'],
    siblings: ['9'],
    spouses: ['6'],
  },
  4: { id: '4', name: 'grandChild4' },
  5: { id: '5', name: 'grandChild5' },
  6: { id: '6', name: 'spouse of child 3', isSpouse: true },
  8: {
    id: '8',
    name: 'root sibling',
    isSibling: true,
  },
  9: {
    id: '9',
    name: 'child3 sibling',
    isSibling: true,
  },
  10: {
    id: '10',
    name: 'root spouse',
    isSpouse: true,
  },
};
