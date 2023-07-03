import React from 'react';
import { Flex, FlexProps, Spinner, SpinnerProps } from '@chakra-ui/react';

export default function Loader(props: SpinnerProps) {
  return <Spinner color="pink.500" {...props} />;
}

export { Loader };

export function PageLoader(props: FlexProps) {
  return (
    <Flex justifyContent="center" alignItems="center" height={250} flex="1" {...props}>
      <Loader size="lg" />
    </Flex>
  );
}
