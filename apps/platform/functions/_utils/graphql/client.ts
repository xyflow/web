import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.NHOST_GRAPHQL_URL as string, {
  headers: {
    ['x-hasura-admin-secret']: process.env.NHOST_ADMIN_SECRET as string,
  },
});

export default client;
