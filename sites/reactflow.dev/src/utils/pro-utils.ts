import { Currency, SubscriptionPlan } from '@/types';
import { SubscriptionContextValue } from '@/components/pro/Providers';

export function getCurrencySign(currency?: Currency) {
  switch (currency) {
    case Currency.EUR:
      return '€';
    case Currency.INR:
      return '₹';
    default:
      return '$';
  }
}

export function normalizeSubscription(subscription: SubscriptionContextValue) {
  return {
    isSubscribed:
      subscription.plan !== SubscriptionPlan.FREE ||
      subscription.teamPlan !== SubscriptionPlan.FREE,
    isTeamSubscribed: subscription.teamPlan !== SubscriptionPlan.FREE,
    isAdmin:
      subscription.plan !== SubscriptionPlan.FREE &&
      subscription.plan !== SubscriptionPlan.OSS &&
      subscription.plan !== SubscriptionPlan.STUDENT,
    plan:
      subscription.plan !== SubscriptionPlan.FREE
        ? subscription.plan
        : subscription.teamPlan,
    userPlan: subscription.plan,
    teamPlan: subscription.teamPlan,
  };
}
