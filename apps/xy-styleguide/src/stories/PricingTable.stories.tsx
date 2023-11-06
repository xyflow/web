import type { Meta, StoryObj } from '@storybook/react';

import { PricingTable } from '@xyflow/xy-ui';

const meta = {
  title: 'Example/PricingTable',
  component: PricingTable,
  tags: ['autodocs'],
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Pricing Table',
  render: () => <PricingTable />,
};
