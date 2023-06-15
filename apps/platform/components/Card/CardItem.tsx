import { Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

type CardItemProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
  actionItem?: React.ReactNode;
  flexProps?: FlexProps;
};

const CardItem = (props: CardItemProps) => {
  const { label, value, actionItem = null, ...flexProps } = props;
  return (
    <Flex
      as="dl"
      direction={{
        base: 'column',
        sm: 'row',
      }}
      px="6"
      py="4"
      _even={{
        borderColor: useColorModeValue('gray.100', 'gray.600'),
        borderWidth: '1px',
        borderLeft: 'none',
        borderRight: 'none',
      }}
      {...flexProps}
    >
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
      <Box>{actionItem}</Box>
    </Flex>
  );
};

export default CardItem;
