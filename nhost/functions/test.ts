import { Request, Response } from 'express';

const test = async (req: Request, res: Response) => {
  res.status(200).send(`Hello ${process.env.NHOST_SUBDOMAIN}!`);
};

export default test;
