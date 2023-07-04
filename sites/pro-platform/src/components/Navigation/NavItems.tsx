import { useRef, useEffect } from 'react';
import {
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Link,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { HiOutlineMenu } from 'components/Icons';
import Logo from '../Logo';

const NavButton = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();

  return (
    <NextLink href={href}>
      <Link
        as="span"
        _hover={{ color: 'pink.500', textDecoration: 'none' }}
        fontWeight={900}
        color={pathname === href ? 'pink.500' : 'gray.900'}
      >
        {label}
      </Link>
    </NextLink>
  );
};

function MenuItems({ isSidebarMenu = false }) {
  const direction = isSidebarMenu ? 'column' : 'row';
  const alignItems = isSidebarMenu ? 'flex-start' : 'center';

  return (
    <Stack mr={7} spacing={7} direction={direction} alignItems={alignItems} justifyContent="space-between">
      <NavButton href="/pricing" label="Pricing" />
      <NavButton href="/pro-examples" label="Pro Examples" />
      <NavButton href="/contact" label="Contact" />
    </Stack>
  );
}

function SidebarMenu({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <IconButton
        aria-label="Open Sidebar Menu"
        ref={btnRef}
        onClick={onOpen}
        icon={<HiOutlineMenu />}
        variant="outline"
        mr={2}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function NavItems() {
  // @todo this causes a flash of the sidebar menu on page load
  const isSidebarMenu = useBreakpointValue({ base: true, sm: false }, 'sm');

  if (isSidebarMenu) {
    return (
      <SidebarMenu>
        <MenuItems isSidebarMenu />
      </SidebarMenu>
    );
  }

  return <MenuItems />;
}

export default NavItems;
