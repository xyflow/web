import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getRemainingSeats } from '../_utils/graphql/team-subscriptions';

async function getTeamStatus(
  req: Request,
  res: Response,
  { userId }: { userId: string }
) {
  const remainingSeats = await getRemainingSeats(userId);
  res.status(200).send({ remainingSeats });
}

export default authPost(getTeamStatus);
