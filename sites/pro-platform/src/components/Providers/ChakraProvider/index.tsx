'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};

function ChakraClientProvider({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}

export default ChakraClientProvider;
