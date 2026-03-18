import { Request, Response } from 'express';

import { sendDiscordNotification } from '../_utils/discord';

const TRACKED_USERS: Record<string, string> = {
  '7b0927a1-1949-46d4-b648-5dc8c1f68580': 'moritz',
  'b263d38c-7af6-4ab1-8fc2-4c84266d840e': 'peter',
};

export default async function refreshTokenChangeHandler(req: Request, res: Response) {
  // Check header to make sure the request comes from Hasura
  if (req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET) {
    return res.status(400).send({ message: 'Incorrect webhook secret' });
  }

  const currentRow = req.body.event?.data?.new;
  const previousRow = req.body.event?.data?.old;
  const userId = currentRow?.user_id ?? previousRow?.user_id;

  if (!userId) {
    return res.status(400).send({ message: 'no user id.' });
  }

  const username = TRACKED_USERS[userId];

  if (!username) {
    return res.status(200).json({
      success: true,
      message: `ignored refresh token event for user ${userId}.`,
    });
  }

  const operation = req.body.event?.op;
  const newTokenId = currentRow?.refresh_token_hash || 'undefined';
  const oldTokenId = previousRow?.refresh_token_hash || 'undefined';

  await sendDiscordNotification(
    `refresh token ${operation} for ${username} | new: ${newTokenId} | old: ${oldTokenId}`,
  );

  return res.status(200).json({
    success: true,
    message: `sent refresh token ${operation} notification for ${username}.`,
  });
}
