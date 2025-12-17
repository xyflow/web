import { Request, Response } from 'express';
import { isSubscribed } from '../_utils/graphql/subscriptions';
import { authPost } from '../_utils/middleware';
import { redis } from '../_utils/redis';

async function downloadProExample(req: Request, res: Response) {
  const userId = res.locals.userId;
  const { id, framework } = req.body;

  if (!id || !framework || !userId) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const redisKey = `@${framework}flow-pro/${id}`;
  const data = await redis.json.get(redisKey, '$');

  if (!data || !data[0]) {
    return res.status(500).send({ message: 'Example does not exist.' });
  }

  const { config, files } = data[0];

  // either it's a free example or the user must be subscribed to access it
  const hasAccess = config.free || (await isSubscribed(userId));

  if (!hasAccess) {
    return res
      .status(403)
      .send({ message: 'You must be subscribed to access this example.' });
  }

  return res.status(200).json({ timestamp: Date.now(), files });
}

export default authPost(downloadProExample);
