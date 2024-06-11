import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ReactPlayer } from '../../../../xy-shared';

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
}: { className?: string; items?: FAQItem[] } = {}) {
  return (
    <ListWrapper
      id="FAQ"
      title="Frequently Asked Questions"
      icon={InformationCircleIcon}
      iconClassName="text-react"
      className={className}
    >
      <ReactPlayer
        className="mb-8"
        url="https://www.youtube.com/watch?v=jm_UoZXEEnU"
        width="100%"
        height="100%"
        style={{ aspectRatio: '16 / 9', width: '100%' }}
        config={{
          youtube: {
            embedOptions: {
              playerVars: {
                color: 'white',
                cc_load_policy: 1,
                cc_lang_pref: 'en',
                controls: 1,
              },
            },
          },
        }}
      />
      <Accordion type="multiple">
        {items.map((item, index) => (
          <AccordionItem
            id={item.id}
            value={`item-${index}`}
            key={`item-${index}`}
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="leading-normal">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ListWrapper>
  );
}
