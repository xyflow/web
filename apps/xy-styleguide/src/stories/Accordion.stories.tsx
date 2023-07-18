import type { Meta, StoryObj } from '@storybook/react';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'xy-ui';

const meta = {
  title: 'Example/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  name: 'Single Accordion',
  args: {
    type: 'single',
  },
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>List item heading 1</AccordionTrigger>
        <AccordionContent>List item content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>List item heading 2</AccordionTrigger>
        <AccordionContent>List item content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>List item heading 3</AccordionTrigger>
        <AccordionContent>List item content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multi: Story = {
  name: 'Multi Accordion',
  args: {
    type: 'multiple',
  },
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>List item heading 1</AccordionTrigger>
        <AccordionContent>List item content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>List item heading 2</AccordionTrigger>
        <AccordionContent>List item content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>List item heading 3</AccordionTrigger>
        <AccordionContent>List item content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
