import { Request, Response } from 'express';
import { stripe, getUserIdFromAuthToken, getStripeCustomerId } from '../_utils';

export type CreateCheckoutSessionResponse = {
  sessionId?: string;
  sessionUrl?: string;
  error?: string;
};

export default async function createStripeCheckoutSession(req: Request, res: Response<CreateCheckoutSessionResponse>) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        return res.status(400).json({ error: 'Unauthorized' });
      }

      const userId = getUserIdFromAuthToken(authToken);
      const userEmail = req.body.customerEmail as string;
      const price = req.body.priceId as string;

      if (!userId || !userEmail || !price) {
        return res.status(400).json({ error: 'Bad request.' });
      }

      const customer = await getStripeCustomerId({ userId, userEmail });

      if (!customer) {
        return res.status(400).json({ error: 'Bad request.' });
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        customer,
        automatic_tax: {
          enabled: true,
        },
        tax_id_collection: {
          enabled: true,
        },
        customer_update: {
          address: 'auto',
          name: 'auto',
        },
        locale: 'en',
        mode: 'subscription',
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        success_url: `${req.headers.origin}/dashboard?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/dashboard?payment_cancelled=true`,
      });

      if (session.url && session.id) {
        return res.status(200).json({ sessionId: session.id, sessionUrl: session.url });
      }

      return res.status(500).json({ error: 'Something went wrong.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
}
