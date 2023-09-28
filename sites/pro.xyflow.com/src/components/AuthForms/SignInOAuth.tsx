'use client';

import { useProviderLink } from '@nhost/nextjs';
import { Button } from 'xy-ui';

const SignInOAuth = () => {
  const { github } = useProviderLink({ metadata: {} });

  return (
    <div>
      <a href={github}>
        <Button size="lg" className="w-full" variant="outline">
          Sign in with Github
        </Button>
      </a>
    </div>
  );
};

export default SignInOAuth;
