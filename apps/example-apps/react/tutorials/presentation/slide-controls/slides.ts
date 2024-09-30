import { type SlideData } from './Slide';

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

export default [slide01, slide02, slide03, slide04].reduce(
  (slides, { id, data }) => ({ ...slides, [id]: data }),
  {},
) satisfies Record<string, SlideData>;
