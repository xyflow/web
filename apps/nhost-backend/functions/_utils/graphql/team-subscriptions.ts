import { gql } from 'graphql-request';

import GraphQLClient from './client';

const UPSERT_TEAM_SUBSCRIPTION = gql`
  mutation UpsertTeamSubscription(
    $createdById: uuid!
    $email: citext!
    $userId: uuid
    $planId: String
  ) {
    insert_team_subscriptions_one(
      object: {
        created_by: $createdById
        subscription_plan_id: $planId
        user_id: $userId
        email: $email
      }
      on_conflict: {
        constraint: team_subscriptions_email_key
        update_columns: [user_id, email, subscription_plan_id, created_by]
      }
    ) {
      id
      user_id
      email
      subscription_plan_id
      created_by
    }
  }
`;

type UpsertSubscriptionParams = {
  userId: string;
  createdById: string;
  planId?: string;
  email?: string;
};

type UpsertSubscriptionResponse = {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  subscription_plan_id: string;
};

export async function upsertTeamSubscription({
  userId,
  planId,
  createdById,
  email,
}: UpsertSubscriptionParams): Promise<UpsertSubscriptionResponse> {
  return await GraphQLClient.request<UpsertSubscriptionResponse>(
    UPSERT_TEAM_SUBSCRIPTION,
    {
      createdById,
      userId,
      planId,
      email,
    }
  );
}
