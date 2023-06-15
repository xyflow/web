import NextLink from 'next/link';
import { List, ListItem, ListIcon, Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { HiOutlineCheckCircle } from 'components/Icons';
import { useAuthenticated } from '@nhost/nextjs';
import CustomerPortalButton from 'components/CustomerPortalButton';
import { useIsSubscribed } from 'context/subscription';
import { PricingPlanFeature, PriceConfig } from 'config/plans';
import SubscribeButton from './SubscribeButton';

type ActionButtonProps = {
  requireSignup: boolean;
  price?: PriceConfig;
  priceTag: React.ReactNode;
  colorScheme: string;
  defaultAction?: React.ReactNode;
};

function ActionButton({ requireSignup, colorScheme, price, priceTag, defaultAction = null }: ActionButtonProps) {
  const isAuthenticated = useAuthenticated();
  const isSubscribed = useIsSubscribed();

  if (requireSignup && isAuthenticated && isSubscribed) {
    return (
      <CustomerPortalButton variant="solid" size="md" colorScheme={colorScheme}>
        Manage Subscription
      </CustomerPortalButton>
    );
  }

  if (requireSignup && !isAuthenticated) {
    return (
      <Flex alignItems="center">
        <NextLink href="/signup?redirectTo=%2Fpricing">
          <Button colorScheme={colorScheme}>Sign Up</Button>
        </NextLink>
        <Box ml={2}>{priceTag}</Box>
      </Flex>
    );
  }

  if (price) {
    return <SubscribeButton priceTag={priceTag} price={price} colorScheme={colorScheme} />;
  }

  return defaultAction as React.ReactElement;
}

type SubscriptionPlanProps = {
  name: string;
  description: string;
  color?: string;
  linkColor?: string;
  borderColor?: string;
  features?: PricingPlanFeature[];
  requireSignup?: boolean;
  action?: React.ReactNode;
  price?: PriceConfig;
  priceStrikethrough?: PriceConfig;
  featuresLabel?: string;
};

function SubscriptionPlan({
  name,
  description,
  color,
  linkColor,
  borderColor,
  features = [],
  requireSignup = true,
  action = null,
  price,
  priceStrikethrough,
  featuresLabel = 'Included Features',
}: SubscriptionPlanProps) {
  const colorScheme = color || 'gray';
  const chakraBorderColor = `${borderColor}.500`;
  const chakraLinkColor = `${linkColor}.500`;

  const priceTag = price ? (
    <Box>
      <Box lineHeight="1.2">
        {priceStrikethrough && (
          <Box mr={1} fontWeight="black" fontSize={18} color="gray.400" textDecoration="line-through" as="span">
            {priceStrikethrough.label}
          </Box>
        )}
        <Box fontWeight="black" fontSize={18} as="span">
          {price.label}
        </Box>

        <Box fontSize={12} color="gray.500">
          per {price.unit}
        </Box>
      </Box>
    </Box>
  ) : null;

  return (
    <Flex
      borderWidth="1px"
      borderStyle="solid"
      borderColor={chakraBorderColor}
      borderRadius="lg"
      overflow="hidden"
      flexDirection="column"
      bg="white"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
    >
      <Flex flexDir="column" minHeight={280} color="gray.800" p={6}>
        <Heading>{name}</Heading>
        <Text my={3} color="gray.800" fontSize="lg">
          {description}
        </Text>
        <Flex mt="auto">
          <ActionButton
            requireSignup={requireSignup}
            price={price}
            priceTag={priceTag}
            colorScheme={colorScheme}
            defaultAction={action}
          />
        </Flex>
      </Flex>
      <Box p={6}>
        <Text mb={3} textTransform="uppercase" fontWeight="bold" color="gray.800" fontSize={14}>
          {featuresLabel}
        </Text>
        <List p={0} m={0} spacing={3}>
          {features.map((feature, i) => (
            <ListItem display="flex" key={i} lineHeight={1.4}>
              <ListIcon as={HiOutlineCheckCircle} mr={4} fontSize={24} color={chakraBorderColor} />
              <Text
                mb={0}
                color="gray.800"
                sx={{ a: { color: chakraLinkColor, '&:hover': { textDecoration: 'underline' } } }}
              >
                {feature.label}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </Flex>
  );
}

export default SubscriptionPlan;
