import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../../utils';
import { subscribePublicMailinglist } from '../../utils/mailjet';

export default async function publicNewsletterConfirm(req, res) {
  const token = req.query.token;

  try {
    const tokenDecoded = jwt.verify(token, jwtSecretKey);

    if (tokenDecoded.email) {
      // subscribe to public mailing list
      await subscribePublicMailinglist(tokenDecoded.email);
    }

    return res.redirect('https://reactflow.dev/newsletter-thank-you');
  } catch (err) {
    return res.redirect('https://reactflow.dev/newsletter-signup-failed');
  }
}
