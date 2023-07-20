import { Request, Response } from 'express';

export const allowCors = (fn: any) => async (req: Request, res: Response) => {
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

  return await fn(req, res);
};

type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export const allowMethod =
  (fn: any, method: RequestMethod) => async (req: Request, res: Response) => {
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== method) {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    return await fn(req, res);
  };
