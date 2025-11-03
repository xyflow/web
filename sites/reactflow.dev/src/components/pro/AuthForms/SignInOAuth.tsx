import { getNhost } from '@/utils/nhost';
import Link from 'next/link';

import { Button } from '@xyflow/xy-ui';

const SignInOAuth = async () => {
  const nhost = await getNhost();

  const providerUrl = await nhost.auth.signInProviderURL('github');

  if (!providerUrl) {
    return null;
  }

  return (
    <Button size="lg" className="w-full" variant="outline" asChild>
      <Link href={providerUrl}>Sign in with GitHub</Link>
    </Button>
  );
};

export default SignInOAuth;
