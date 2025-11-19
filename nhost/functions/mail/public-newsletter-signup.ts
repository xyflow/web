import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../_utils/jwt';
import { sendMailTemplate } from '../_utils/mailjet';
import { MAILJET_PUBLIC_NEWSLETTER_CONFIRM_TEMPLATE_ID } from '../_utils/constants';

export default async function publicNewsletterSignup(
  req: Request,
  res: Response
) {
  if (req.method === 'POST') {
    try {
      const email = req.body.email;
      const token = jwt.sign({ email }, jwtSecretKey);

      if (!token) {
        return res.status(400).json({ error: true });
      }

      const success = await sendMailTemplate(
        email,
        'React Flow Newsletter: Please confirm your subscription',
        MAILJET_PUBLIC_NEWSLETTER_CONFIRM_TEMPLATE_ID,
        { JWT_TOKEN: token }
      );

      return res.status(200).send({ success });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true });
    }
  }
  return res.json({ error: 'method not allowed.' });
}
