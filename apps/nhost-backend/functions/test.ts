import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  res.status(200).send(`Hello ${process.env.NHOST_SUBDOMAIN}!`);
};
