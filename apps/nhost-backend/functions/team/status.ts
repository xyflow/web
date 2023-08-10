import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getIncludedSeats } from '../_utils/graphql/team-subscriptions';

async function getTeamStatus(
  req: Request,
  res: Response,
  { userId }: { userId: string }
) {
  const includedSeats = await getIncludedSeats(userId);
  res.status(200).send({ includedSeats });
}

export default authPost(getTeamStatus);
