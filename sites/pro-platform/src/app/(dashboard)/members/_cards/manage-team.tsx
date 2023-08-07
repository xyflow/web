'use client';

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@nhost/react-apollo';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  InputLabel,
} from 'xy-ui';
import useNhostFunction from '@/hooks/useNhostFunction';

const GET_TEAM_MEMBERS = gql`
  query {
    team_subscriptions {
      email
    }
  }
`;

type TeamMember = {
  email: string;
};

export default function ManageTeamCard() {
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [remainingSeats, setRemainingSeats] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberEmail, setMemberEmail] = useState<string>('');
  const nhostFunction = useNhostFunction();
  const { data, refetch } = useAuthQuery(GET_TEAM_MEMBERS);
  const needsConfirmation = remainingSeats <= 0;

  const updateRemainingSeats = async () => {
    const status = await nhostFunction<{ remainingSeats: number }>('team/status', {});
    setRemainingSeats(status.res.data.remainingSeats);
    return status.res.data.remainingSeats;
  };

  const addMember = async () => {
    setIsLoading(true);
    const response = await nhostFunction('team/invite', { email: memberEmail });
    await refetch();
    await updateRemainingSeats();
    setIsLoading(false);
    setConfirmPayment(false);
  };

  const removeMember = async (email: string) => {
    const isConfirmed = confirm(`Are you sure you want to remove ${email} from your team?`);
    console.log(isConfirmed);

    if (!isConfirmed) {
      return;
    }

    const response = await nhostFunction('team/remove', { email });
    await refetch();
    console.log(response);
  };

  useEffect(() => {
    updateRemainingSeats();
  }, []);

  const handleFormSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setIsLoading(true);

    if (needsConfirmation) {
      setConfirmPayment(true);
      return;
    }

    addMember();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Team</CardTitle>
        <CardDescription>
          You have {remainingSeats} free seats remaining. You can buy more seats by adding members to your team.
        </CardDescription>
        {confirmPayment && (
          <div className="mt-4">
            <Button variant="react" onClick={addMember}>
              Confirm Payment
            </Button>
          </div>
        )}
      </CardHeader>
      <div className="border-t">
        {data?.team_subscriptions?.map((member: TeamMember) => (
          <CardContent className="py-4 flex items-center justify-between border-b" key={member.email}>
            <div className="font-semibold">{member.email}</div>
            <Button onClick={() => removeMember(member.email)} variant="outline">
              Remove
            </Button>
          </CardContent>
        ))}
      </div>
      <CardFooter className="bg-muted space-x-10">
        <form onSubmit={handleFormSubmit} className="flex justify-between w-full">
          <div className="flex-1">
            <InputLabel htmlFor="email">Add New Member</InputLabel>
            <Input
              variant="square"
              className="max-w-xs"
              type="email"
              value={memberEmail}
              onChange={(evt) => setMemberEmail(evt.target.value)}
              required
              id="email"
              placeholder="Enter Email..."
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="shrink-0 ml-auto mt-auto" variant="react" type="submit">
            {isLoading ? 'Please wait...' : `Add To Subscription${needsConfirmation ? ' ($20 per month)' : ''}`}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
