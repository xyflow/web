import { Request, Response } from 'express';
import { sendMail } from './_utils/mailjet';

const ContactFormHandler = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  await sendMail({
    to: 'info@reactflow.dev',
    subject: 'New Form Submission',
    content: req.body.message,
    replyTo: req.body.email,
  });

  res.status(200).json({ message: 'ok' });
};

export default ContactFormHandler;
