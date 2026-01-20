'use client';

import { FC, useState, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'xy-shared/components/ui/alert-dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from 'xy-shared/components/ui/card';
import { Button } from 'xy-shared/components/ui/button';
import { Input } from 'xy-shared/components/ui/input';
import { callNhostFunction } from 'xy-shared/server-actions/call-nhost-function';
import { signOut } from 'xy-shared/server-actions/sign-out';

const DeleteAccountCard: FC<{ userEmail: string }> = ({ userEmail }) => {
  const [confirmUserEmail, setConfirmUserEmail] = useState('');
  const [isDeleteLoading, startTransition] = useTransition();
  const isDeleteConfirmed = userEmail === confirmUserEmail;

  function deleteAccount() {
    startTransition(async () => {
      const { success } = await callNhostFunction('/users/delete', {});
      if (success) {
        await signOut();
      }
    });
  }

  return (
    <AlertDialog>
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="flex flex-col gap-y-3">
                  <p>
                    By clicking the button below, you will delete your Svelte Flow Pro
                    account. This action is irreversible. Please confirm that you want to:
                  </p>
                  <ul className="list-disc font-bold">
                    <li>
                      Delete your Svelte Flow Pro account and all the data associated with
                      it
                    </li>
                    <li>
                      Cancel your subscription and lose access for the remaining time
                    </li>
                    <li>Remove access to the pro features for invited team members</li>
                  </ul>
                  <p>
                    If you want to proceed, please enter your email in the form below:
                  </p>
                  <Input
                    onChange={(evt) => setConfirmUserEmail(evt.target.value)}
                    value={confirmUserEmail}
                    type="email"
                    placeholder={`Type ${userEmail} to confirm...`}
                    required
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={!isDeleteConfirmed} onClick={deleteAccount}>
                {isDeleteLoading ? 'Please wait...' : 'Confirm Deletion'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          <CardDescription>
            Use this button to delete your account and all your data. This action is
            irreversible.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialogTrigger
            // fixes <button> cannot be a descendant of <button>
            asChild
          >
            <Button
              onClick={() => setConfirmUserEmail('')}
              className="bg-red-500 hover:bg-red-400 -mt-4 mb-2"
            >
              Delete Account
            </Button>
          </AlertDialogTrigger>
        </CardFooter>
      </Card>
    </AlertDialog>
  );
};

export default DeleteAccountCard;
