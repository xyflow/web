import { gql } from 'graphql-request';

import type { Subscription } from './types';

export type GetUserSubscriptionResponse = {
  user_subscriptions: Subscription[];
};

export const GET_USER_SUBSCRIPTION = gql`
  query GetUserSubscription($userId: uuid) {
    user_subscriptions(where: { user_id: { _eq: $userId } }, limit: 1) {
      id
      stripe_customer_id
      user_id
      subscription_plan_id
      sent_welcome_mail
    }
  }
`;

export type InsertSubscriptionResponse = {
  insert_user_subscriptions: {
    returning: Subscription[];
  };
};

export const INSERT_SUBSCRIPTION = gql`
  mutation ($subscription: user_subscriptions_insert_input!) {
    insert_user_subscriptions(objects: [$subscription]) {
      returning {
        id
        stripe_customer_id
        user_id
        subscription_plan_id
        sent_welcome_mail
      }
    }
  }
`;
