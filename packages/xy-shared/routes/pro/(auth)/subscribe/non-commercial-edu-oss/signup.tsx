import { getSubscriptionStatus } from '../../../../../server-actions/get-subscription';
import { SignUpForm } from './signup-form';
import { Success } from './sucess';

export default async function Signup() {
  const { isSubscribed } = await getSubscriptionStatus();

  if (isSubscribed) {
    return <Success />;
  }

  return <SignUpForm />;
}
