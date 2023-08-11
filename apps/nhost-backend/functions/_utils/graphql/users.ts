import { NhostClient } from '@nhost/nhost-js';
import { gql } from 'graphql-request';

import GraphQLClient from './client';

export const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN,
  region: process.env.NHOST_REGION,
});

export async function createUser({ email }: { email: string }) {
  if (!email) {
    return false;
  }

  // use signIn instead of signUp because we don't want to set a password (we use magic link)
  return await nhost.auth.signIn({ email });
}

type User = {
  email: string;
  id: string;
};

type GetUserByMailResponse = {
  users: User[];
};

const GET_USER_BY_MAIL = gql`
  query GetUserByMail($email: citext!) {
    users(where: { email: { _eq: $email } }) {
      email
      id
    }
  }
`;

export async function getUserIdByEmail(email: string): Promise<string> {
  const response = await GraphQLClient.request<GetUserByMailResponse>(
    GET_USER_BY_MAIL,
    { email }
  );
  return response.users?.[0]?.id;
}

const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    user(id: $id) {
      email
      id
    }
  }
`;

export async function getUser(id: string): Promise<User> {
  const response = await GraphQLClient.request<{ user: User }>(GET_USER_BY_ID, {
    id,
  });

  return response.user;
}
