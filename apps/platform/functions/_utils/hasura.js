const axios = require('axios');
const { nhost } = require('./nhost');

// @todo don't use the nhost client here https://github.com/nhost/nextjs-stripe-starter/blob/main/functions/_utils/graphql-client.ts
export async function graphqlQuery(query, variables = {}) {
  try {
    const { data } = await axios.post(
      nhost.graphql.httpUrl,
      { query, variables },
      { headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET } }
    );
    return data;
  } catch (err) {
    return err;
  }
}
