import { InformationCircleIcon } from '@heroicons/react/24/outline';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  ListWrapper,
} from '../../..';

export type FAQItem = {
  question: React.ReactNode;
  answer: React.ReactNode;
  id?: string;
};

export function FAQ({
  className,
  items = [],
  children = null,
}: { className?: string; items?: FAQItem[]; children?: React.ReactNode } = {}) {
  return (
    <ListWrapper
      id="FAQ"
      title="Frequently Asked Questions"
      icon={InformationCircleIcon}
      iconClassName="text-primary"
      className={className}
    >
      <>{children}</>
      <Accordion type="multiple">
        {items.map((item, index) => (
          <AccordionItem id={item.id} value={`item-${index}`} key={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="leading-normal">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ListWrapper>
  );
}
