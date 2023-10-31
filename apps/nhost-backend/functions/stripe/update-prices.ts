import { Request, Response } from 'express';
import { getPrices } from '../_utils/stripe';

export default async function (request: Request, response: Response) {
  const prices = await getPrices({ forceUpdate: true });
  response.status(200).json(prices);
}
