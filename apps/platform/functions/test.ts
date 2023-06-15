import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  res.status(200).send(`${process.env.STRIPE_SECRET_KEY}!!`);
};
