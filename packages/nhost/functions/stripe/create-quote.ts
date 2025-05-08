import { Request, Response } from 'express';
import { sendMail } from '../_utils/mailjet';
import { getLineItem, stripe } from '../_utils/stripe';
import { cors, post } from '../_utils/middleware';

function stringifyContent(body: Record<string, string>): string {
  return Object.entries(body)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n\n');
}

async function getQuoteBase64(id: string): Promise<string> {
  const pdfStream = await stripe.quotes.pdf(id);

  return new Promise((resolve, reject) => {
    const chunks: any = [];
    pdfStream.on('data', (chunk) => chunks.push(chunk));
    pdfStream.on('end', () => {
      const result = Buffer.concat(chunks);
      resolve(result.toString('base64'));
    });
  });
}

// @todo type request body here
const createQuote = async (req: Request, res: Response) => {
  const { plan, email, name } = req.body;

  if (!email || !plan || !name) {
    return res.status(405).send({ message: 'Bad Request.' });
  }

  const customer = await stripe.customers.create({ email, name });
  const lineItem = await getLineItem({ plan, quantity: 1, interval: 'year' });

  if (!customer || !lineItem) {
    return res.status(405).send({ message: 'Bad Request.' });
  }

  const quote = await stripe.quotes.create({ customer: customer.id, line_items: [lineItem] });
  const finalizedQuote = await stripe.quotes.finalizeQuote(quote.id);

  if (!quote || !finalizedQuote) {
    return res.status(405).send({ message: 'Bad Request.' });
  }

  const quoteBase64 = await getQuoteBase64(finalizedQuote.id);
  const content = stringifyContent(req.body);

  const success = await sendMail({
    to: 'info@xyflow.com',
    subject: 'Your React Flow Pro Quote Request',
    content,
    replyTo: email,
    attachments: [
      { ContentType: 'application/pdf', Filename: `${finalizedQuote.number}.pdf`, Base64Content: quoteBase64 },
    ],
  });

  if (!success) {
    return res.status(500).json({ message: 'something went wrong.' });
  }

  return res.status(200).json({ message: 'ok' });
};

export default cors(post(createQuote));
