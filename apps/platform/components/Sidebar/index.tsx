import { Flex, Box } from '@chakra-ui/react';
import NextLink from 'next/link';

import Logo from '../Logo';
import SidebarItems from './SidebarItems';

function Sidebar() {
  return (
    <Flex
      flex="1"
      flexDirection="column"
      borderRight="1px solid"
      borderRightColor="gray.100"
      height="100%"
      bg="#f8f8fa"
    >
      <Box borderBottom="1px solid" borderBottomColor="gray.100" p={5}>
        <NextLink href="/dashboard">
          <Flex alignItems="center" cursor="pointer" userSelect="none" fontWeight="bold" fontSize={21}>
            <Logo width={25} height={25} />
          </Flex>
        </NextLink>
      </Box>
      <SidebarItems />
    </Flex>
  );
}

export default Sidebar;
