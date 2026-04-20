'use client';

import { FC, useRef, useState, useTransition } from 'react';

import { Button } from '../../../../components/ui/button';
import { Input, InputLabel } from '../../../../components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../components/ui/alert-dialog';
import { callNhostFunction } from '../../../../server-actions/call-nhost-function';
import { revalidatePathFromClient } from '../../../../server-actions/revalidate-path-from-client';

const AddTeamMember: FC<{
  currencySign: string;
  monthlySeatPrice: number;
}> = ({ currencySign, monthlySeatPrice }) => {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null!);

  const addMember = ({ paymentConfirmed }: { paymentConfirmed: boolean }) => {
    startTransition(async () => {
      const memberEmail = inputRef.current.value;
      setErrorMessage(null);
      const response = await callNhostFunction('/team/invite', {
        email: memberEmail,
        paymentConfirmed,
      });

      if (!response || response.error) {
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
        return;
      }
      revalidatePathFromClient('/pro/team');
      setConfirmPayment(false);
    });
  };

  const onAdd = async (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    addMember({ paymentConfirmed: false });
  };

  return (
    <>
      {confirmPayment && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add a new team member</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  By clicking Confirm Payment, you will add one additional seat to your
                  pro plan at the cost of {currencySign}
                  {monthlySeatPrice} per month.
                </p>{' '}
                <p className="mt-2">
                  You will only pay for the time that the seat is listed in your team and
                  the amount will be added to your next invoice.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmPayment(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={() => addMember({ paymentConfirmed: true })}
              >
                {isLoading ? 'Please wait...' : 'Confirm Payment'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <form onSubmit={onAdd} className="flex w-full justify-between">
        <div className="flex-1">
          <InputLabel htmlFor="email">Add Team Member</InputLabel>
          <Input
            variant="square"
            className="max-w-xs"
            type="email"
            ref={inputRef}
            required
            id="email"
            placeholder="Member Email"
            disabled={isLoading}
          />
          {errorMessage && (
            <InputLabel className="mt-1 text-red-600">{errorMessage}</InputLabel>
          )}
        </div>
        <Button disabled={isLoading} className="ml-auto mt-auto shrink-0" type="submit">
          {isLoading ? 'Please wait...' : 'Add Team Member'}
        </Button>
      </form>
    </>
  );
};

export default AddTeamMember;
