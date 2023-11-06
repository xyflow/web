import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@xyflow/xy-ui';

const meta = {
  title: 'Example/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Container',
  render: () => (
    <Container>
      <div className="p-10">some content</div>
    </Container>
  ),
};

export const Dark: Story = {
  name: 'Dark Container',
  render: () => (
    <Container variant="dark">
      <div className="p-10">some content</div>
    </Container>
  ),
};
