import { InformationCircleIcon } from '@heroicons/react/24/outline';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  ListWrapper,
} from 'xy-ui';

import faqItems from './items';

export default function FAQ({ className }: { className?: string }) {
  return (
    <ListWrapper
      title="Frequently Asked Questions"
      icon={InformationCircleIcon}
      iconClassName="text-react"
      className={className}
    >
      <Accordion type="multiple">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ListWrapper>
  );
}
