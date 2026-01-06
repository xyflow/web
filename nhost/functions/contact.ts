import { Request, Response } from 'express';
import { sendMail } from './_utils/mailjet';
import { cors, post } from './_utils/middleware';

function getContent(body: Record<string, string>): string {
  return Object.entries(body)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');
}

const ContactFormHandler = async (req: Request, res: Response) => {
  const content = getContent(req.body);

  const success = await sendMail({
    to: 'info@xyflow.com',
    subject: 'Your message to the xyflow team',
    content,
    replyTo: req.body.email,
  });

  if (!success) {
    return res.status(500).json({ message: 'something went wrong.' });
  }

  return res.status(200).json({ message: 'ok' });
};

export default cors(post(ContactFormHandler));
