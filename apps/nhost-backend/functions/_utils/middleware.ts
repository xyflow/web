import { Request, Response } from 'express';
import { getUserIdFromAuthToken } from './jwt';

export const authPost = (fn: any) => async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  const userId = getUserIdFromAuthToken(req.headers.authorization);

  if (!userId) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }

  return await fn(req, res, { userId });

  // try {
  //   return await fn(req, res, { userId });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).send({ message: 'Internal server error.' });
  // }
};
