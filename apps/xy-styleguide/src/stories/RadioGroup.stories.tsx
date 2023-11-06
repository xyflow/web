import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem, Label } from '@xyflow/xy-ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: (
      <>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="a" id="option-a">
            test
          </RadioGroupItem>
          <Label htmlFor="option-a">Option A</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="b" id="option-b">
            test2
          </RadioGroupItem>
          <Label htmlFor="option-b">Option B</Label>
        </div>
      </>
    ),
  },
};
