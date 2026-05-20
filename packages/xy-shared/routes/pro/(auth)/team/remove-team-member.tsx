'use client';

import { FC, useState, useTransition } from 'react';

import { Button } from '../../../../components/ui/button';
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

const RemoveTeamMember: FC<{ email: string }> = ({ email }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const removeMember = () => {
    startTransition(async () => {
      setErrorMessage(null);
      const { error } = await callNhostFunction('/team/remove', { email });

      if (error) {
        setErrorMessage(
          typeof error.message === 'string'
            ? error.message
            : 'Something went wrong. Please contact us.',
        );
      }
      revalidatePathFromClient('/pro/team');
      setConfirmDelete(false);
    });
  };

  return (
    <>
      {confirmDelete && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove <strong>{email}</strong> from your team. They will no
                longer have access to your subscription features.
                {errorMessage && (
                  <span className="mt-2 block text-red-600">{errorMessage}</span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmDelete(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={isLoading} onClick={removeMember}>
                {isLoading ? 'Please wait...' : 'Confirm Deletion'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Button onClick={() => setConfirmDelete(true)} variant="outline">
        Remove
      </Button>
    </>
  );
};

export default RemoveTeamMember;
