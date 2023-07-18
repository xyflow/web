'use client';

import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberEmail, setMemberEmail] = useState<string>('');
  const nhostFunction = useNhostFunction();
  const { data, refetch } = useAuthQuery(GET_TEAM_MEMBERS);

  const inviteMember = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    const response = await nhostFunction('team/invite', { email: memberEmail });
    await refetch();
    setIsLoading(false);
  };

  const removeMember = async (email: string) => {
    const isConfirmed = confirm(`Are you sure you want to remove ${email} from your team?`);
    console.log(isConfirmed);

    if (!isConfirmed) {
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Team</CardTitle>
        <CardDescription>
          You can share your subscription with up to 3 team members. If you need more seats, please upgrade to a higher
          plan.
        </CardDescription>
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
        <form onSubmit={inviteMember} className="flex justify-between w-full">
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
            {isLoading ? 'Please wait...' : 'Add To Subscription'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
