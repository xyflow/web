import { Request, Response } from 'express';

const test = (req: Request, res: Response) => {
  res.status(200).send(`Hello ${process.env.NHOST_SUBDOMAIN}!`);
};

export default test;
