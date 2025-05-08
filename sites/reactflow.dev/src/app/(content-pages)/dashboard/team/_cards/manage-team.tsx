'use client';

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@nhost/react-apollo';
import { useUserEmail, useUserId } from '@nhost/react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
  CardTitle,
} from '@xyflow/xy-ui';
import { callNhostFunction } from '@/server-actions';
import { PlanLabel } from '@/components/pro/SubscriptionStatus';
import Loader from '@/components/pro/Loader';
import { Currency } from '@/types';
import { getCurrencySign } from '@/utils/pro-utils';

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($userId: uuid) {
    team_subscriptions(
      where: { created_by: { _eq: $userId } }
      order_by: { created_at: asc }
    ) {
      email
    }
  }
`;

type TeamMember = {
  email: string;
};

type TeamStatus = {
  includedSeats: number;
  currency: Currency;
  billingPeriod: 'month' | 'year';
};

export default function ManageTeamCard() {
  const userId = useUserId();
  const [status, setStatus] = useState<TeamStatus | null>(null);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [confirmDeleteMember, setConfirmDeleteMember] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [memberEmail, setMemberEmail] = useState<string>('');
  const { data, refetch } = useAuthQuery(GET_TEAM_MEMBERS, {
    variables: { userId },
  });
  const userEmail = useUserEmail();

  useEffect(() => {
    const updateStatus = async () => {
      const status = await callNhostFunction('/team/status', {});

      if (!status || status.error) {
        return;
      }

      setStatus(status);
    };

    updateStatus();
  }, []);

  const removeMember = async (email: string) => {
    setErrorMessage(null);
    setIsDeleteLoading(true);
    const { error } = await callNhostFunction('/team/remove', { email });

    if (error) {
      setErrorMessage(
        typeof error.message === 'string'
          ? error.message
          : 'Something went wrong. Please contact us.',
      );
    }

    await refetch();
    setIsDeleteLoading(false);
    setConfirmDeleteMember(null);
  };

  const addMember = async ({
    paymentConfirmed,
  }: {
    paymentConfirmed: boolean;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    const response = await callNhostFunction('/team/invite', {
      email: memberEmail,
      paymentConfirmed,
    });

    if (!response || response.error) {
      setIsLoading(false);
      setErrorMessage(
        typeof response.message === 'string'
          ? response.message
          : 'Something went wrong. Please contact us.',
      );
      setConfirmPayment(false);
      return;
    }

    if (response.needsPaymentConfirmation) {
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

  const currencySign = getCurrencySign(status?.currency);
  const monthlySeatPrice = status?.currency === Currency.INR ? 2000 : 20;
  const includedSeats = status?.includedSeats ?? 0;
  const remainingSeats = Math.max(
    0,
    includedSeats - (data?.team_subscriptions?.length ?? 0),
  );

  if (!status) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription className="text-black">
          You have {remainingSeats} remaining{' '}
          {remainingSeats === 1 ? 'seat' : 'seats'} included in your{' '}
          <PlanLabel /> plan.
          {remainingSeats === 0 && (
            <span> Additional seats will be charged based on your usage.</span>
          )}
        </CardDescription>
        {confirmPayment && (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add a new team member</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>
                    By clicking Confirm Payment, you will add one additional
                    seat to your pro plan at the cost of {currencySign}
                    {monthlySeatPrice} per month.
                  </p>{' '}
                  <p className="mt-2">
                    You will only pay for the time that the seat is listed in
                    your team and the amount will be added to your next invoice.
                  </p>
                  {/* Adding a new seat will charge {currencySign} */}
                  {/* {seatPrice} per {status.billingPeriod} with your next invoice. Please confirm to continue. */}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmPayment(false)}>
                  Cancel
                </AlertDialogCancel>
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
                  This will remove <strong>{confirmDeleteMember}</strong> from
                  your team. They will no longer have access to your
                  subscription features.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmDeleteMember(null)}>
                  Cancel
                </AlertDialogCancel>
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
        <CardContent className="py-4 flex items-center justify-between border-b">
          <div className="font-semibold">{userEmail}</div>
        </CardContent>
        {data?.team_subscriptions?.map((member: TeamMember, i: number) => (
          <CardContent
            className="py-4 flex items-center justify-between border-b"
            key={member.email}
          >
            <div className="font-semibold">
              {member.email}{' '}
              {status && i >= includedSeats && (
                <span className="text-xs text-muted-foreground ml-2 bg-muted px-2 py-0.5 border border-gray-300 rounded-md">
                  extra seat
                </span>
              )}
            </div>
            <Button
              onClick={() => setConfirmDeleteMember(member.email)}
              variant="outline"
            >
              Remove
            </Button>
          </CardContent>
        ))}
      </div>
      <CardFooter className="bg-muted space-x-10">
        <form onSubmit={onAdd} className="flex justify-between w-full">
          <div className="flex-1">
            <InputLabel htmlFor="email">Add Team Member</InputLabel>
            <Input
              variant="square"
              className="max-w-xs"
              type="email"
              value={memberEmail}
              onChange={(evt) => setMemberEmail(evt.target.value)}
              required
              id="email"
              placeholder="Member Email"
              disabled={isLoading}
            />
            {errorMessage && (
              <InputLabel className="text-red-600 mt-1">
                {errorMessage}
              </InputLabel>
            )}
          </div>
          <Button
            disabled={isLoading}
            className="shrink-0 ml-auto mt-auto"
            variant="react"
            type="submit"
          >
            {isLoading ? 'Please wait...' : 'Add Team Member'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
