import { Flex, Box } from '@chakra-ui/react';

import ReactFlowLogo from './ReactFlowLogo';

export default function Logo({ width = 32, height = 32 }: { width?: number; height?: number }) {
  return (
    <Flex flexShrink={0} alignItems="center">
      <ReactFlowLogo width={width} height={height} />
      <Box fontWeight="black" lineHeight={1} ml={2}>
        XY Flow
      </Box>
      <Box
        ml="4px"
        textTransform="uppercase"
        fontSize={11}
        bg="pink.500"
        color="white"
        borderRadius="md"
        px={1}
        py={0}
        lineHeight={1.5}
        mt="3px"
        fontWeight="black"
      >
        Pro
      </Box>
    </Flex>
  );
}
