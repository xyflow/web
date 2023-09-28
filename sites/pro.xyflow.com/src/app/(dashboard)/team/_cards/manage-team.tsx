'use client';

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@nhost/react-apollo';
import { useUserId } from '@nhost/nextjs';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'xy-ui';
import useNhostFunction from '@/hooks/useNhostFunction';
import useSubscription from '@/hooks/useSubscription';

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($userId: uuid) {
    team_subscriptions(where: { created_by: { _eq: $userId } }, order_by: { created_at: asc }) {
      email
    }
  }
`;

type TeamMember = {
  email: string;
};

type TeamStatus = { includedSeats: number; currency: 'usd' | 'eur'; billingPeriod: 'month' | 'year' };

export default function ManageTeamCard() {
  const userId = useUserId();
  const [status, setStatus] = useState<TeamStatus | null>(null);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [confirmDeleteMember, setConfirmDeleteMember] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [memberEmail, setMemberEmail] = useState<string>('');
  const { data, refetch } = useAuthQuery(GET_TEAM_MEMBERS, { variables: { userId } });
  const nhostFunction = useNhostFunction();
  const { isSubscribed } = useSubscription();

  useEffect(() => {
    const updateStatus = async () => {
      const status = await nhostFunction<TeamStatus>('team/status', {});

      if (!status || !status.res || !status.res.data) {
        return;
      }

      setStatus(status.res.data);
    };

    updateStatus();
  }, []);

  const removeMember = async (email: string) => {
    setIsError(false);
    setIsDeleteLoading(true);
    const { error } = await nhostFunction('team/remove', { email });

    if (error) {
      setIsError(true);
    }

    await refetch();
    setIsDeleteLoading(false);
    setConfirmDeleteMember(null);
  };

  const addMember = async ({ paymentConfirmed }: { paymentConfirmed: boolean }) => {
    setIsLoading(true);
    setIsError(false);

    const { res, error } = await nhostFunction<{ needsPaymentConfirmation?: boolean }>('team/invite', {
      email: memberEmail,
      paymentConfirmed,
    });

    if (error) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    if (res.data?.needsPaymentConfirmation) {
      setConfirmPayment(true);
      setIsLoading(false);
      return;
    }

    await refetch();
    setIsLoading(false);
    setConfirmPayment(false);
  };

  const onAdd = async (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await addMember({ paymentConfirmed: false });
  };

  const currencySign = status?.currency === 'eur' ? '€' : '$';
  const seatPrice = status?.billingPeriod === 'year' ? 240 : 20;

  if (!isSubscribed || !status) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Team</CardTitle>
        {status && (
          <CardDescription>
            Your subscription includes {status.includedSeats} free seats. Additional seats can be added for{' '}
            {currencySign}
            {seatPrice} per {status.billingPeriod}.
          </CardDescription>
        )}
        {confirmPayment && (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Free seat limit reached</AlertDialogTitle>
                <AlertDialogDescription>
                  Adding a new seat will charge {currencySign}
                  {seatPrice} per {status.billingPeriod} with your next invoice. Please confirm to continue.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmPayment(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="react"
                  disabled={isLoading}
                  onClick={() => addMember({ paymentConfirmed: true })}
                >
                  {isLoading ? 'Please wait...' : 'Confirm Payment'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {confirmDeleteMember && (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove <strong>{confirmDeleteMember}</strong> from your team. They will no longer have
                  access to your subscription features.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmDeleteMember(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="react"
                  disabled={isDeleteLoading}
                  onClick={() => removeMember(confirmDeleteMember)}
                >
                  {isDeleteLoading ? 'Please wait...' : 'Confirm Deletion'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardHeader>

      <div className="border-t">
        {data?.team_subscriptions?.map((member: TeamMember, i: number) => (
          <CardContent className="py-4 flex items-center justify-between border-b" key={member.email}>
            <div className="font-semibold">
              {member.email}{' '}
              {i < (status?.includedSeats ?? 0) && (
                <span className="text-muted-foreground ml-2 bg-muted px-2 py-0.5 border border-gray-300 rounded-md">
                  included
                </span>
              )}
            </div>
            <Button onClick={() => setConfirmDeleteMember(member.email)} variant="outline">
              Remove
            </Button>
          </CardContent>
        ))}
      </div>
      <CardFooter className="bg-muted space-x-10">
        <form onSubmit={onAdd} className="flex justify-between w-full">
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
            {isError && <InputLabel className="text-red-600 mt-1">Something went wrong. Please try again.</InputLabel>}
          </div>
          <Button disabled={isLoading} className="shrink-0 ml-auto mt-auto" variant="react" type="submit">
            {isLoading ? 'Please wait...' : `Add To Subscription`}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
