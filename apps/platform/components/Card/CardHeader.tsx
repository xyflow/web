import { Flex, Box, Heading, FlexProps } from '@chakra-ui/react';

type CardHeaderProps = {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
} & FlexProps;

const CardHeader = (props: CardHeaderProps) => {
  const { title, action, icon = null, ...rest } = props;
  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      {...rest}
    >
      <Flex alignItems="center">
        {icon && <Box mr={2}>{icon}</Box>}
        <Heading fontSize="lg">{title}</Heading>
      </Flex>
      {action}
    </Flex>
  );
};

export default CardHeader;
