import { graphqlQuery } from './hasura';
const { plans } = require('../../config/plans');

const SET_SUBSCRIPTION_PLAN = `
  mutation ($stripe_customer_id: String!, $subscription_plan_id: String!) {
    update_user_subscriptions(
      where: { stripe_customer_id: { _eq: $stripe_customer_id } }
      _set: { subscription_plan_id: $subscription_plan_id }
    ) {
      affected_rows
      returning {
        stripe_customer_id
        user_id
      }
    }
  }
`;

async function setSubscriptionPlan(stripe_customer_id, subscription_plan_id) {
  const res = await graphqlQuery(SET_SUBSCRIPTION_PLAN, { stripe_customer_id, subscription_plan_id });
  return res?.data?.update_user_subscriptions?.returning?.[0];
}

function getPlanIdFromProductId(productId) {
  switch (productId) {
    case plans.starter.stripe.product.development:
    case plans.starter.stripe.product.production:
      return plans.starter.id;
    case plans.pro.stripe.product.development:
    case plans.pro.stripe.product.production:
      return plans.pro.id;
    default:
      return plans.free.id;
  }
}

export async function handleSubscriptionChange(stripeEventObject) {
  const { status, plan, customer } = stripeEventObject;
  const planId = getPlanIdFromProductId(plan.product);

  if (status === 'past_due' || status === 'canceled') {
    const response = await setSubscriptionPlan(customer, plans.free.id);
    console.log(response);
    return;
  }

  if (status === 'active' && planId) {
    const response = await setSubscriptionPlan(customer, planId);
    console.log(response);
    return;
  }
}
