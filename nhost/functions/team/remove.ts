import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { removeTeamMember } from '../_utils/graphql/team-subscriptions';
import { updateSeatQuantity } from '../_utils/stripe';

async function removeTeamMemberHandler(req: Request, res: Response) {
  const { email } = req.body;
  const userId = res.locals.userId;

  if (!userId || !email) {
    return res.status(405).send({ message: 'Bad request.' });
  }

  const removedCount = await removeTeamMember({ createdById: userId, email });

  await updateSeatQuantity(userId);

  return res.status(200).send({ message: `removed ${removedCount} team member` });
}

export default authPost(removeTeamMemberHandler);
