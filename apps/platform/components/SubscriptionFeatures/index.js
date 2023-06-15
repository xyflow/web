import { Flex, Box, Button, Link, Heading } from '@chakra-ui/react';
import { HiOutlineCheckCircle, HiOutlineArrowNarrowRight } from 'components/Icons';

import Card, { CardHeader, CardItem } from '../Card';
import { useSubscription } from '../../context/subscription';

function ProFeature({ label, description = '', button = null, color = 'gray.500' }) {
  const cardLabel = (
    <Flex>
      <Box mr={2} color={color} fontSize={24}>
        <HiOutlineCheckCircle />
      </Box>
      <Box maxWidth="650px">
        <Box fontWeight="bold">{label}</Box>
        <Box fontSize={14} mt={1} color="gray.600">
          {description}
        </Box>
      </Box>
    </Flex>
  );

  const cardAction = button ? (
    <Button
      as="a"
      target={button.external ? '_blank' : '_self'}
      href={button.href}
      variant="outline"
      size="sm"
      rightIcon={<HiOutlineArrowNarrowRight />}
    >
      {button.label}
    </Button>
  ) : null;

  return <CardItem label={cardLabel} actionItem={cardAction} />;
}

function SubscriptionFeatures() {
  const subscription = useSubscription();

  if (!subscription) {
    return null;
  }

  const { features } = subscription;

  return (
    <Card>
      <CardHeader
        title="Your Subscription Features"
        action={
          <Heading bg="pink.500" color="white" px={2} py={1} borderRadius="md" size="sm">
            {subscription.label} Plan
          </Heading>
        }
      />
      <Box>
        {features.map((feature, index) => (
          <ProFeature
            key={index}
            label={feature.label}
            description={feature.description}
            button={feature.button}
            color="pink.500"
          />
        ))}
      </Box>
    </Card>
  );
}

export default SubscriptionFeatures;
