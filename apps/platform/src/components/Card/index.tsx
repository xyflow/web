import { Box, BoxProps } from '@chakra-ui/react';

const Card = (props: BoxProps) => (
  <Box bg="white" rounded="md" overflow="hidden" borderWidth="1px" borderColor="gray.100" {...props} />
);

Card.displayName = 'Card';

export default Card;

export { default as CardItem } from './CardItem';
export { default as CardHeader } from './CardHeader';
