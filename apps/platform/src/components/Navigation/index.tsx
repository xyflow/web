'use client';

import Link from 'next/link';

import Logo from '@/components/Logo';

function Navigation() {
  return (
    <div className="px-3 position-sticky top-0">
      <div className="py-3 border-b border-gray-200">
        <Link href="/">
          <div className="flex items-center">
            <Logo width={32} height={32} />
            <div className="ml-2 font-black text-gray-900 text-xl">xyflow pro</div>
          </div>
        </Link>
      </div>
    </div>

    // <Box zIndex={1000} position="sticky" top={0} borderBottom="1px solid" borderBottomColor="gray.100" bg="white">
    //   <Box px={5} mx="auto">
    //     <Flex py={5} justifyContent="space-between">
    //       <NextLink href="/">
    //         <Flex alignItems="center" cursor="pointer" userSelect="none" fontWeight="bold" fontSize={21}>
    //           <Logo />
    //         </Flex>
    //       </NextLink>
    //       <Flex>
    //         {/* <NavItems /> */}
    //         {/* <SignInButton /> */}
    //       </Flex>
    //     </Flex>
    //   </Box>
    // </Box>
  );
}

export default Navigation;
