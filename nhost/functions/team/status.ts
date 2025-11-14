import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getIncludedSeats, getSeatPricing } from '../_utils/graphql/team-subscriptions';

async function getTeamStatus(req: Request, res: Response) {
  const userId = res.locals.userId;
  const includedSeats = await getIncludedSeats(userId);

  try {
    const pricing = await getSeatPricing(userId);
    return res.status(200).send({ includedSeats, ...pricing });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ includedSeats });
  }
}

export default authPost(getTeamStatus);
