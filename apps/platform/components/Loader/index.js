import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

export default function Loader(props) {
  return <Spinner color="pink.500" {...props} />;
}

export { Loader };

export function PageLoader(props) {
  return (
    <Flex justifyContent="center" alignItems="center" height={250} flex="1" {...props}>
      <Loader size="lg" />
    </Flex>
  );
}
