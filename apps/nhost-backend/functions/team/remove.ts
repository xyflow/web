import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getUserIdFromAuthToken } from '../_utils/jwt';
import { removeTeamMember } from '../_utils/graphql/team-subscriptions';

async function removeTeamMemberHandler(req: Request, res: Response) {
  const createdById = getUserIdFromAuthToken(req.headers.authorization);
  const { email } = req.body;

  if (!createdById || !email) {
    return res.status(405).send({ message: 'Bad request.' });
  }

  const removedCount = await removeTeamMember({ createdById, email });

  return res
    .status(200)
    .send({ message: `removed ${removedCount} team member` });
}

export default authPost(removeTeamMemberHandler);
