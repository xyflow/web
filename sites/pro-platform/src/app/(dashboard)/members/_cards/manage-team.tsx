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
  const [includedSeats, setIncludedSeats] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberEmail, setMemberEmail] = useState<string>('');
  const { data, refetch } = useAuthQuery(GET_TEAM_MEMBERS);
  const nhostFunction = useNhostFunction();

  useEffect(() => {
    const updateIncludedSeats = async () => {
      const status = await nhostFunction<{ includedSeats: number }>('team/status', {});
      setIncludedSeats(status.res.data.includedSeats);
      return status.res.data.includedSeats;
    };

    updateIncludedSeats();
  }, []);

  const removeMember = async (email: string) => {
    const isConfirmed = confirm(`Are you sure you want to remove ${email} from your team?`);

    if (!isConfirmed) {
      return;
    }

    const response = await nhostFunction('team/remove', { email });
    await refetch();
  };

  const addMember =
    ({ paymentConfirmed }: { paymentConfirmed: boolean }) =>
    async (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      setIsLoading(true);

      const { res } = await nhostFunction<{ needsPaymentConfirmation?: boolean }>('team/invite', {
        email: memberEmail,
        paymentConfirmed,
      });

      if (res.data?.needsPaymentConfirmation) {
        setConfirmPayment(true);
        return;
      }

      await refetch();
      setIsLoading(false);
      setConfirmPayment(false);
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Team</CardTitle>
        <CardDescription>
          Your subscription includes {includedSeats} free seats. Additional seats can be added for $20 per month.
        </CardDescription>
        {confirmPayment && (
          <div className="mt-4">
            <Button variant="react" onClick={addMember({ paymentConfirmed: true })}>
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
        <form onSubmit={addMember({ paymentConfirmed: false })} className="flex justify-between w-full">
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
            {isLoading ? 'Please wait...' : `Add To Subscription`}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
