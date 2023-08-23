import { SignInMagicLink, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin', label: 'Sign in using Email and Password' }];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      title="Sign In with Magic Link"
      description="Enter your email to sign in or create an account."
    >
      <SignInMagicLink />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
