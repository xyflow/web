import { Flex, Box, Button, Heading } from '@chakra-ui/react';
import { HiOutlineCheckCircle, HiOutlineArrowNarrowRight } from 'components/Icons';
import Card, { CardHeader, CardItem } from 'components/Card';

import useSubscription from 'hooks/useSubscription';

import { PricingPlanFeature } from 'config/plans';

export type ProFeatureProps = {
  label: React.ReactNode;
  description?: React.ReactNode;
  button?: PricingPlanFeature['button'] | null;
  // @todo is there a better type than string for colors?
  color?: string;
  key?: string;
};

function ProFeature({ label, description = '', button = null, color = 'gray.500' }: ProFeatureProps) {
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
  const { data } = useSubscription();

  if (!data) {
    return null;
  }

  const { features } = data;

  return (
    <Card>
      <CardHeader
        title="Your Subscription Features"
        action={
          <Heading bg="pink.500" color="white" px={2} py={1} borderRadius="md" size="sm">
            {data.label} Plan
          </Heading>
        }
      />
      <Box>
        {features.map((feature, index) => (
          <ProFeature
            key={`PricingPlanFeature__${index}`}
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
