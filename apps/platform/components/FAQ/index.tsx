import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Heading,
  AccordionItemProps,
  AccordionProps,
} from '@chakra-ui/react';

type FAQItemProps = {
  title: React.ReactNode;
  text: React.ReactNode;
} & AccordionItemProps;

type FAQWrapperProps = {
  showTitle?: boolean;
} & AccordionProps;

export function FAQItem({ title, text, ...rest }: FAQItemProps) {
  const highlighted = typeof window !== 'undefined' && window?.location.hash === `#accordion-button-${rest.id}`;

  return (
    <AccordionItem px={0} mb={4} border="none" {...rest} color={highlighted ? 'pink.500' : ''}>
      <AccordionButton
        _hover={{ background: 'none', opacity: 0.8 }}
        px={0}
        border="none"
        cursor="pointer"
        userSelect="none"
        size="md"
        as={Heading}
      >
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="600">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0} pb={4}>
        <Box fontSize="md" color="gray.800">
          {text}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export function FAQWrapper({ showTitle = true, children, ...rest }: FAQWrapperProps) {
  return (
    <Accordion p={0} allowMultiple {...rest} reduceMotion>
      {showTitle && (
        <Heading fontSize={{ base: '3xl', xl: '4xl' }} mb={{ base: 4, lg: 8 }}>
          Frequently Asked Questions
        </Heading>
      )}
      {children}
    </Accordion>
  );
}
