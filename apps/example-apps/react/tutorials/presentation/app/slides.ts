import { type Edge, type Node } from '@xyflow/react';

import {
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  SLIDE_PADDING,
  type SlideData,
} from './Slide';

const slide01 = {
  id: '01',
  data: {
    right: '02',
    source: `
# Slide 1

- This is the first slide
- It has a right arrow to go to the next slide
`,
  },
};

const slide02 = {
  id: '02',
  data: {
    left: '01',
    up: '03',
    right: '04',
    source: `
# Slide 2

- This is the second slide
- It has a left arrow to go back to the first slide
- It has an up arrow to go to the third slide
- It has a right arrow to go to the fourth slide
`,
  },
};

const slide03 = {
  id: '03',
  data: {
    down: '02',
    source: `
# Slide 3

- This is the third slide
- It has a down arrow to go back to the second slide
`,
  },
};

const slide04 = {
  id: '04',
  data: {
    left: '02',
    source: `
# Slide 4

- This is the fourth slide
- It has a left arrow to go back to the second slide
`,
  },
};

export const slides = Object.fromEntries(
  [slide01, slide02, slide03, slide04].map(({ id, data }) => [id, data]),
) as Record<string, SlideData>;

export const slidesToElements = (
  initial: string,
  slides: Record<string, SlideData>,
) => {
  const stack = [{ id: initial, position: { x: 0, y: 0 } }];
  const visited = new Set();
  const nodes: Node<SlideData>[] = [];
  const edges: Edge[] = [];

  while (stack.length) {
    const { id, position } = stack.pop()!;
    const data = slides[id];
    const node = { id, type: 'slide', position, data };

    if (data.left && !visited.has(data.left)) {
      const nextPosition = {
        x: position.x - (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: data.left, position: nextPosition });
      edges.push({
        id: `${id}->${data.left}`,
        source: id,
        target: data.left,
      });
    }

    if (data.up && !visited.has(data.up)) {
      const nextPosition = {
        x: position.x,
        y: position.y - (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: data.up, position: nextPosition });
      edges.push({ id: `${id}->${data.up}`, source: id, target: data.up });
    }

    if (data.down && !visited.has(data.down)) {
      const nextPosition = {
        x: position.x,
        y: position.y + (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: data.down, position: nextPosition });
      edges.push({
        id: `${id}->${data.down}`,
        source: id,
        target: data.down,
      });
    }

    if (data.right && !visited.has(data.right)) {
      const nextPosition = {
        x: position.x + (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: data.right, position: nextPosition });
      edges.push({
        id: `${id}->${data.down}`,
        source: id,
        target: data.right,
      });
    }

    nodes.push(node);
    visited.add(id);
  }

  return { nodes, edges };
};
