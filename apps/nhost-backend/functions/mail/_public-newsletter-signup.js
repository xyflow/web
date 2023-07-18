import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../../utils';
import { sendPublicNewsletterConfirmation } from '../../utils/mailjet';

// @todo re-enable this function and convert to TS
export default async function publicNewsletterSignup(req, res) {
  if (req.method === 'POST') {
    try {
      const email = req.body.email;
      const token = jwt.sign({ email }, jwtSecretKey);
      const { response } = await sendPublicNewsletterConfirmation(email, token);

      if (response.status === 200) {
        return res.status(200).send({ success: true });
      }
    } catch (err) {
      console.log(err);
    }
    return res.status(400).json({ error: true });
  }
  return res.json({ error: 'method not allowed.' });
}
