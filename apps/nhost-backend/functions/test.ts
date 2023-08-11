import { Request, Response } from 'express';
import { allowCors } from './_utils/middleware';

const test = (req: Request, res: Response) => {
  res.status(200).send(`Hello ${process.env.NHOST_SUBDOMAIN}!`);
};

export default allowCors(test);
