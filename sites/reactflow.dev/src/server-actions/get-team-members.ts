'use server';

import { gql } from '@apollo/client';
import { getNhost } from '@/utils/nhost';
import { prettifyError } from '@/utils/nhost-utils';

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
  const nhost = await getNhost();
  const userId = nhost.auth.getUser()!.id!;

  const { data, error } = await nhost.graphql.request(GET_TEAM_MEMBERS, { userId });

  if (error) {
    throw new Error(prettifyError(error));
  }
  return data.team_subscriptions;
}
