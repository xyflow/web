import { User } from '@nhost/nhost-js/auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { callNhostFunction } from '../../../../server-actions/call-nhost-function';
import { PlanLabel } from '../../../../components/pro/SubscriptionStatus';
import { Currency } from '../../../../types';
import { getCurrencySign } from '../../../../lib/pro-utils';
import AddTeamMember from './add-team-member';
import RemoveTeamMember from './remove-team-member';
import { getTeamMembers } from '../../../../server-actions/get-team-members';

type TeamStatus = {
  includedSeats: number;
  currency: Currency;
  billingPeriod: 'month' | 'year';
};

async function ManageTeamCard({ user }: { user: User }) {
  const teamSubscriptions = (await getTeamMembers()) ?? [];
  const teamStatus = (await callNhostFunction('/team/status', {})) as
    | (TeamStatus & { error?: unknown })
    | null;

  if (!teamStatus || teamStatus.error) {
    return null;
  }

  const currencySign = getCurrencySign(teamStatus.currency);
  const monthlySeatPrice = teamStatus.currency === Currency.INR ? 2000 : 20;
  const includedSeats = teamStatus.includedSeats;
  const remainingSeats = Math.max(0, includedSeats - teamSubscriptions.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          You have {remainingSeats} remaining {remainingSeats === 1 ? 'seat' : 'seats'}{' '}
          included in your <PlanLabel /> plan.
          {remainingSeats === 0 && (
            <span> Additional seats will be charged based on your usage.</span>
          )}
        </CardDescription>
      </CardHeader>

      <div className="border-border border-t">
        <CardContent className="border-border flex items-center justify-between border-b py-4">
          <div className="font-semibold">{user.email}</div>
        </CardContent>
        {teamSubscriptions.map((member, i) => (
          <CardContent
            className="flex items-center justify-between border-b py-4"
            key={member.email}
          >
            <div className="font-semibold">
              {member.email}{' '}
              {i >= includedSeats && (
                <span className="text-muted-foreground bg-muted ml-2 rounded-md border border-gray-300 px-2 py-0.5 text-xs">
                  extra seat
                </span>
              )}
            </div>
            <RemoveTeamMember email={member.email} />
          </CardContent>
        ))}
      </div>
      <CardFooter className="bg-muted space-x-10">
        <AddTeamMember currencySign={currencySign} monthlySeatPrice={monthlySeatPrice} />
      </CardFooter>
    </Card>
  );
}

export default ManageTeamCard;
