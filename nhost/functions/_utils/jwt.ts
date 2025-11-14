import { verify } from 'jsonwebtoken';

export const jwtSecretKey = JSON.parse(process.env.NHOST_JWT_SECRET!).key;

// retrieve the user id from the access token
export function getUserIdFromAuthToken(
  authToken: string | undefined
): string | null {
  if (!authToken) {
    return null;
  }

  const token = authToken.split(' ')[1];

  // @ts-ignore
  const decoded = verify(token, jwtSecretKey)['https://hasura.io/jwt/claims'];

  return decoded['x-hasura-user-id'];
}
