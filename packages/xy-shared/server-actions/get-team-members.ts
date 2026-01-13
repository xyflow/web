'use server';

import { gql } from '@apollo/client';

import { createNhostClient } from '../utils/nhost';
import { prettifyError } from '../utils/nhost-utils';

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($userId: uuid) {
    team_subscriptions(
      where: { created_by: { _eq: $userId } }
      order_by: { created_at: asc }
    ) {
      email
    }
  }
`;

export async function getTeamMembers() {
  const nhost = await createNhostClient();
  const userId = nhost.getUserSession()?.user?.id;

  try {
    const response = await nhost.graphql.request<{
      // why is this not inferred from the query?
      team_subscriptions: { email: string }[];
    }>(GET_TEAM_MEMBERS, { userId });
    return response.body?.data?.team_subscriptions;
  } catch (error: unknown) {
    // TODO: handle errors uniformly throughout the codebase
    throw new Error(prettifyError(error as { message: string } | { message: string }[]));
  }
}
