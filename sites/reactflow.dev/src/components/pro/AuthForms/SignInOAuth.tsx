import { Button } from '@xyflow/xy-ui';
import { getNhost } from '@/utils/nhost';

const SignInOAuth = async () => {
  const nhost = await getNhost();

  const { providerUrl } = await nhost.auth.signIn({
    provider: 'github',
  });
  return (
    <Button size="lg" className="w-full" variant="outline" asChild>
      <a href={providerUrl}>Sign in with GitHub</a>
    </Button>
  );
};

export default SignInOAuth;
