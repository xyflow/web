'use client';

import { useState, useEffect } from 'react';
import { SimpleGrid, Button, Stack, Flex, Box, ButtonGroup, FormControl, Select, useTheme } from '@chakra-ui/react';
import { SiGithubsponsors } from 'components/Icons';

import SubscriptionPlan from './SubscriptionPlan';
import { getDefaultCurrency } from 'utils/browser';
import plans, { Currency, BillingPeriod } from 'config/plans';

export default function PricingPlans() {
  const [period, setPeriod] = useState<BillingPeriod>(BillingPeriod.MONTHLY);
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const theme = useTheme();

  useEffect(() => {
    setCurrency(getDefaultCurrency());
  }, []);

  return (
    <Stack mx="auto" id="plans">
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Box ml={[0, 0, '50%']} transform={['none', 'none', 'translate(-50%, 0)']} userSelect="none">
          <ButtonGroup isAttached>
            <Button
              variant={period === BillingPeriod.MONTHLY ? 'solid' : 'outline'}
              onClick={() => setPeriod(BillingPeriod.MONTHLY)}
              colorScheme={period === BillingPeriod.MONTHLY ? 'purple' : 'gray'}
              color={period === BillingPeriod.MONTHLY ? 'white' : 'gray.700'}
              _focus={{ outline: 'none' }}
            >
              monthly
            </Button>
            <Button
              variant={period === BillingPeriod.ANNUALLY ? 'solid' : 'outline'}
              onClick={() => setPeriod(BillingPeriod.ANNUALLY)}
              colorScheme={period === BillingPeriod.ANNUALLY ? 'purple' : 'gray'}
              color={period === BillingPeriod.ANNUALLY ? 'white' : 'gray.700'}
              isActive={false}
              _focus={{ outline: 'none' }}
            >
              yearly
            </Button>
          </ButtonGroup>
        </Box>
        <Box userSelect="none" mt={[2, 2, 0]} ml={[0, 0, 'auto']}>
          <FormControl display="flex" alignItems="center">
            {/* @todo how to type the select options? */}
            <Select onChange={(evt) => setCurrency(evt.target.value as Currency)} value={currency}>
              <option value={Currency.EUR}>€ EUR</option>
              <option value={Currency.USD}>$ USD</option>
            </Select>
          </FormControl>
        </Box>
      </Flex>

      <SimpleGrid columns={[1, 2, 4]} spacing={[5, 5, 5, 5, 5, 5]}>
        <SubscriptionPlan
          name={plans.free.label}
          description={plans.free.description}
          features={plans.free.features}
          color={plans.free.color}
          linkColor={plans.free.linkColor}
          borderColor={plans.free.borderColor}
          requireSignup={false}
          action={
            <Button
              as="a"
              href="https://github.com/sponsors/wbkd"
              variant="outline"
              leftIcon={<SiGithubsponsors size={18} color={theme.colors.pink['500']} />}
            >
              Sponsor Us
            </Button>
          }
        />
        <SubscriptionPlan
          name={plans.starter.label}
          description={plans.starter.description}
          price={plans.starter.stripe!.prices[currency][period]}
          priceStrikethrough={period === 'annually' ? plans.starter.stripe!.prices[currency].monthly : undefined}
          features={plans.starter.features}
          color={plans.starter.color}
          linkColor={plans.starter.linkColor}
          borderColor={plans.starter.borderColor}
          requireSignup
        />
        <SubscriptionPlan
          name={plans.pro.label}
          description={plans.pro.description}
          price={plans.pro.stripe!.prices[currency][period]}
          priceStrikethrough={period === 'annually' ? plans.pro.stripe!.prices[currency].monthly : undefined}
          features={plans.pro.features}
          color={plans.pro.color}
          linkColor={plans.pro.linkColor}
          borderColor={plans.pro.borderColor}
          requireSignup
        />
        <SubscriptionPlan
          name={plans.enterprise.label}
          description={plans.enterprise.description}
          features={plans.enterprise.features}
          color={plans.enterprise.color}
          linkColor={plans.enterprise.linkColor}
          borderColor={plans.enterprise.borderColor}
          requireSignup={false}
          action={
            <Button as="a" href="/enterprise" variant="solid" colorScheme={plans.enterprise.color}>
              Request a Quote
            </Button>
          }
        />
      </SimpleGrid>
    </Stack>
  );
}
