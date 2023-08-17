import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../_utils/jwt';
import { subscribeMailingList } from '../_utils/mailjet';
import { MAILJET_PUBLIC_MAILING_LIST_ID } from '../_utils/constants';

export default async function publicNewsletterConfirm(
  req: Request,
  res: Response
) {
  const token = req.query.token?.toString() || '';

  try {
    const tokenDecoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;

    if (tokenDecoded.email) {
      // subscribe to public mailing list
      await subscribeMailingList(
        tokenDecoded.email,
        MAILJET_PUBLIC_MAILING_LIST_ID
      );
    }

    return res.redirect('https://reactflow.dev/newsletter-thank-you');
  } catch (err) {
    return res.redirect('https://reactflow.dev/newsletter-signup-failed');
  }
}
