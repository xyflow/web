import { RxInfoCircled } from 'react-icons/rx';

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
      icon={RxInfoCircled}
      iconClassName="text-react"
      className={className}
    >
      <Accordion type="multiple">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.question}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ListWrapper>
  );
}
