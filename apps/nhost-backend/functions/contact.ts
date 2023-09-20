import { Request, Response } from 'express';
import { sendMail } from './_utils/mailjet';

function getContent(body: Record<string, string>): string {
  return Object.entries(body)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');
}

const ContactFormHandler = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method Not Allowed' });
  }

  const content = getContent(req.body);

  const success = await sendMail({
    to: 'christopher@webkid.io',
    subject: 'Your message to the xyflow team',
    content,
    replyTo: req.body.email,
  });

  if (!success) {
    return res.status(500).json({ message: 'something went wrong.' });
  }

  return res.status(200).json({ message: 'ok' });
};

export default ContactFormHandler;
