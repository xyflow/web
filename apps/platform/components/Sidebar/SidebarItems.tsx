import React from 'react';
import { Flex, Box, FlexProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineUserCircle, HiOutlineLogout, HiOutlineCollection, HiOutlineCursorClick } from 'components/Icons';
import { useSignOut } from '@nhost/nextjs';

// import { Icon } from '@blueprintjs/core';

import examples from 'config/examples';

type SidebarItemsProps = { isActive?: boolean; icon: React.ReactNode } & FlexProps;

function SidebarItem({ isActive = false, icon, children, ...rest }: SidebarItemsProps) {
  return (
    <Flex
      color={isActive ? 'pink.500' : 'gray.800'}
      cursor="pointer"
      alignItems="center"
      _hover={{ bg: 'gray.50' }}
      px={5}
      py={3}
      userSelect="none"
      {...rest}
    >
      <Box mr={2}>{icon}</Box>
      <Box fontWeight="bold">{children}</Box>
    </Flex>
  );
}

type SidebarLinkProps = {
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
} & FlexProps;

function SidebarLink({ href = '/', icon = null, children, active = false, ...rest }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = active || pathname === href;

  return (
    <NextLink href={href}>
      <Box>
        <SidebarItem isActive={isActive} icon={icon} {...rest}>
          {children}
        </SidebarItem>
      </Box>
    </NextLink>
  );
}

function ExamplesCategory() {
  const pathname = usePathname();

  return (
    <Box>
      <SidebarLink href="/examples" icon={<HiOutlineCursorClick size={20} />}>
        Pro Examples
      </SidebarLink>
      {examples
        .filter((example) => !example.hidden)
        .map((example) => (
          <SidebarLink
            // @todo fix typing of icon
            // @ts-ignore
            // icon={<Icon icon={example.icon} color="currentColor" />}
            pl={10}
            href={`/examples/${example.id}`}
            key={example.id}
            active={(pathname ?? '').indexOf(`/examples/${example.id}`) === 0}
          >
            {example.name}
          </SidebarLink>
        ))}
    </Box>
  );
}

export default function SidebarItems() {
  const { signOut } = useSignOut();

  return (
    <Flex overflow="auto" flex="1" flexDirection="column">
      <Box mb={5}>
        <SidebarLink href="/dashboard" icon={<HiOutlineCollection size={20} fontWeight="normal" strokeWidth="1" />}>
          Dashboard
        </SidebarLink>
        <ExamplesCategory />
      </Box>
      <Box mt="auto">
        <SidebarLink icon={<HiOutlineUserCircle size={20} />} href="/account">
          Account
        </SidebarLink>
        <SidebarItem onClick={signOut} icon={<HiOutlineLogout size={20} />}>
          Logout
        </SidebarItem>
      </Box>
    </Flex>
  );
}
