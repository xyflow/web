import { Flex, Box } from '@chakra-ui/react';
import NextLink from 'next/link';

import SignInButton from './SignInButton';
import NavItems from './NavItems';
import Logo from '../Logo';

function Navigation() {
  return (
    <Box zIndex={1000} position="sticky" top={0} borderBottom="1px solid" borderBottomColor="gray.100" bg="white">
      <Box px={5} mx="auto">
        <Flex py={5} justifyContent="space-between">
          <NextLink href="/">
            <Flex alignItems="center" cursor="pointer" userSelect="none" fontWeight="bold" fontSize={21}>
              <Logo />
            </Flex>
          </NextLink>
          <Flex>
            {/* <NavItems /> */}
            {/* <SignInButton /> */}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default Navigation;
